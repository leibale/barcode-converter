function Type (name) {
    var self = this;
    self.name = name;
    self.converters = {};
}

Type.prototype.convert = function (type, barcode, callback) {
    if (!this.converters[type]) {
        return callback(new Error("I don't know how to convert"));
    }

    return this.converters[type](barcode, callback);
};

module.exports = Type;