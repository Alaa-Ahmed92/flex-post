export const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    };

    return color;
};

export const getInitials = (name) => {
    const nameSplit = name?.substring(0, 1);
    return nameSplit?.toUpperCase();
};

export const createImg = (size, name) => {
    if (name === null) return;
    name = getInitials(name);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = canvas.height = size;

    context.fillStyle = "#808080";
    context.fillRect(0, 0, size, size);

    context.fillStyle = 'white';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = `${(size / 2) + 2}px Roboto`;
    context.fillText(name, (size / 2), (size / 2) + 2);

    return canvas.toDataURL();
}