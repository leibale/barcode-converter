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
     *
     * @return {String}
     */
    convert: function (fromType, barcode, toType) {
        if (!types[toType]) {
            throw new Error('Unknown type ' + toType);
        }

        return types[toType].convert(fromType, barcode);
    }
};