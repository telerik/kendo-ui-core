export const directions = {
    left: {
        reverse: "right",
        property: "left",
        transition: "translatex",
        vertical: false,
        modifier: -1
    },
    right: {
        reverse: "left",
        property: "left",
        transition: "translatex",
        vertical: false,
        modifier: 1
    },
    down: {
        reverse: "up",
        property: "top",
        transition: "translatey",
        vertical: true,
        modifier: 1
    },
    up: {
        reverse: "down",
        property: "top",
        transition: "translatey",
        vertical: true,
        modifier: -1
    },
    top: {
        reverse: "bottom"
    },
    bottom: {
        reverse: "top"
    },
    in: {
        reverse: "out",
        modifier: -1
    },
    out: {
        reverse: "in",
        modifier: 1
    },
    vertical: {
        reverse: "vertical"
    },
    horizontal: {
        reverse: "horizontal"
    }
};
