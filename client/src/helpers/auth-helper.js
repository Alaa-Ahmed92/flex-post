import { Navigate } from "react-router-dom";

// To save the JWT credentials that are received from the server on successful sign-in
export function authenticate(jwt, next) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(jwt))
    };
    next();
};

export function isAuthenticated() {
    if (typeof window == 'undefined') return false;
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('jwt'))
    };
};

export function PrivateRoute({ children }) {
    let auth = isAuthenticated();
    return auth ? children : <Navigate to='/login' />
};

export function updateUserLocal(user, next) {
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('jwt'));
        auth.user = user;
        return localStorage.setItem('jwt', JSON.stringify(auth));
    };
    next();
};

export function checkFollow(user) {
    const auth = isAuthenticated();
    const match = user && user.followers.some((follower) => {
        return follower._id === auth.user._id;
    });
    return match;
}

export const read = async (id, token) => {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}