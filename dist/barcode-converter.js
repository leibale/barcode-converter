!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.barcodeConverter=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = _dereq_('./lib/converter');
},{"./lib/converter":2}],2:[function(_dereq_,module,exports){
var types = {
    'upc-a': _dereq_('./types/upc-a'),
    'upc-e': _dereq_('./types/upc-e')
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
},{"./types/upc-a":4,"./types/upc-e":5}],3:[function(_dereq_,module,exports){
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
},{}],4:[function(_dereq_,module,exports){
var Type = _dereq_('../type'),
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
},{"../type":3}],5:[function(_dereq_,module,exports){
var Type = _dereq_('../type'),
    upcE = new Type('upc-e');

upcE.converters['upc-a'] = function (barcode) {
    if (barcode.length < 12) {
        var holdString = '000000000000' + barcode;
        barcode = holdString.substring(holdString.length - 12, holdString.length);
    }


    if (barcode[0] != '0' && barcode[0] != '1') {
        throw new Error('Invalid Number System (only 0 & 1 are valid);');
    }

    if (barcode.substring(3, 6) == '000' || barcode.substring(3, 6) == '100' || barcode.substring(3, 6) == '200') {
        return barcode.substring(1, 3) + barcode.substring(8, 11) + barcode.substring(3, 4);
    } else if (barcode.substring(4, 6) == '00') {
        return barcode.substring(1, 4) + barcode.substring(9, 11) + '3';
    } else if (barcode.substring(5, 6) == '0') {
        return barcode.substring(1, 5) + barcode.substring(10, 11) + '4';
    } else if (barcode.substring(10,11) >= '5') {
        return barcode.substring(1, 6) + barcode.substring(10, 11);
    }

    throw new Error('Invalid UPC-E');
};

module.exports = upcE;
},{"../type":3}]},{},[1])
(1)
});