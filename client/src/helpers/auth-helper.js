import { Navigate } from "react-router-dom";

// To save the JWT credentials that are received from the server on successful sign-in
export function authenticate(jwt, next) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(jwt))
    };
    next();
};

// To Get Authentcated
export function isAuthenticated() {
    if (typeof window == 'undefined') return false;
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('jwt'))
    };
};

// Private Route
export function PrivateRoute({ children }) {
    let auth = isAuthenticated();
    return auth ? children : <Navigate to='/login' />
};

export function Toss({ children }) {
    let auth = isAuthenticated();
    return auth ? <Navigate to='/' /> : children;
}

// Update User on localStorage
export function updateUserLocal(user, next) {
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('jwt'));
        auth.user = user;
        return localStorage.setItem('jwt', JSON.stringify(auth));
    };
    next();
};

// Check Follow
export function checkFollow(user) {
    const auth = isAuthenticated();
    const match = user && user.followers.some((follower) => {
        return follower._id === auth.user._id;
    });
    return match;
}