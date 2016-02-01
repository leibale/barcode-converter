var Type = require('../type'),
    upcE = new Type('upc-a');

upcE.converters['upc-e'] = function (barcode) {
    switch (barcode.length) {
        case 6:
            break;

        case 7:
            if (barcode[0] == '0') {
                barcode = barcode.substring(1, 7);
            } else {
                barcode = barcode.substring(0, 6);
            }
            break;

        case 8:
            barcode = barcode.substring(1, 7);
            break;

        default:
            throw new Error('Wrong size UPC-E');
    }

    switch (barcode[5]) {
        case '0': case '1': case '2':
            barcode = '0' + barcode[0] + barcode[1] + barcode[5] + '0000' + barcode[2] + barcode[3] + barcode[4];
            break;

        case '3':
            barcode = '0' + barcode[0] + barcode[1] + barcode[2] + '00000' + barcode[3] + barcode[4];
            break;

        case '4':
            barcode = '0' + barcode[0] + barcode[1] + barcode[2] + barcode[3] + '00000' + barcode[4];
            break;

        default:
            barcode = '0' + barcode[0] + barcode[1] + barcode[2] + barcode[3] + barcode[4] + '0000' + barcode[5];
            break;
    }

    return barcode + getCheckDigit(barcode);
};

function getCheckDigit (barcode) {
    var check = 0;
    for (var i = 1; i <= 11; i++){
        var test = barcode.substr(i - 1, 1);
        if (i % 2){
            check += parseInt(test) * 7;
        } else {
            check += parseInt(test) * 9;
        }
    }
    check = (check % 10) + 48;
    return unescape('%' + check.toString(16));
}

module.exports = upcE;