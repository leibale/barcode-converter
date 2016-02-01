var types = {
    'upc-a': require('./types/upc-a'),
    'upc-e': require('./types/upc-e')
};

module.exports = {
    /**
     * @method convert
     * @param {String} fromType ('upc-a'/'upc-e')
     * @param {String} barcode
     * @param {String} toType ('upc-a'/'upc-e')
     * @param {Function} callback (error, barcode)
     */
    convert: function (fromType, barcode, toType, callback) {
        if (!types[toType]) {
            return callback(new Error('Unknown type ' + toType));
        }

        types[toType].convert(fromType, barcode, callback);
    }
};