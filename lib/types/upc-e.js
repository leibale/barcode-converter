var Type = require('../type'),
    upcE = new Type('upc-e');

upcE.converters['upc-a'] = function (barcode, callback) {
    if (barcode.length < 12) {
        var holdString = '000000000000' + barcode;
        barcode = holdString.substring(holdString.length - 12, holdString.length);
    }


    if (barcode[0] != '0' && barcode[0] != '1') {
        return callback(new Error('Invalid Number System (only 0 & 1 are valid);'));
    }

    if (barcode.substring(3, 6) == '000' || barcode.substring(3, 6) == '100' || barcode.substring(3, 6) == '200') {
        return callback(null, barcode.substring(1, 3) + barcode.substring(8, 11) + barcode.substring(3, 4));
    } else if (barcode.substring(4, 6) == '00') {
        return callback(null, barcode.substring(1, 4) + barcode.substring(9, 11) + '3');
    } else if (barcode.substring(5, 6) == '0') {
        return callback(null, barcode.substring(1, 5) + barcode.substring(10, 11) + '4');
    } else if (barcode.substring(10,11) >= '5') {
        return callback(null, barcode.substring(1, 6) + barcode.substring(10, 11));
    }

    return (new Error('Invalid UPC-E'));
};

module.exports = upcE;