var barcodeConverter = require('../'),
    mocha = require('mocha'),
    should = require('should');

describe('Barcode converter tests', function () {
    it('from upc-a to upc-e', function (done) {
        barcodeConverter.convert('upc-a', '012300000642', 'upc-e', function (err, barcode) {
            (!err).should.be.ok;
            barcode.should.equal('123643');
            done();
        });
    });

    it('from upc-e to upc-a', function(done) {
        barcodeConverter.convert('upc-e', '123643', 'upc-a', function (err, barcode) {
            (!err).should.be.ok;
            barcode.should.equal('012300000642');
            done();
        });
    });
});


