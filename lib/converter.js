var types = {};

module.exports = {
    /**
     * @method convert
     * @param {String} fromType ('upc-a'/'upc-e')
     * @param {String} barcode
     * @param {String} toType ('upc-a'/'upc-e')
     * @param {Function} callback (error, barcode)test
     */
    convert: function (fromType, barcode, toType, callback) {
        if (!types[toType]) {
            try {
                types[toType] = require('./types/' + toType);
            } catch (e) {
                return callback(new Error('Unknown type ' + toType));
            }
        }

        if (types[toType]) {
            types[toType].convert(fromType, barcode, callback);
        }
    }
};