function Type (name) {
    var self = this;
    self.name = name;
    self.converters = {};
}

Type.prototype.convert = function (type, barcode) {
    if (!this.converters[type]) {
        throw new Error("I don't know how to convert");
    }

    return this.converters[type](barcode);
};

module.exports = Type;