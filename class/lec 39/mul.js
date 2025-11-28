function multiply(a, b) {
    if (!a || !b) {
        return "invalid argument";
    }
    return a * b;
}

module.exports = multiply;
