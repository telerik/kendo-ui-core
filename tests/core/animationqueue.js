(function() {

    describe("animation queue", function() {
        it('executes provided command', function(done) {
            kendo.queueAnimation(function() {
                assert.isOk(true);
                done();
            });
        });

        it('keeps commands in order', function(done) {
            var i = 0;

            kendo.queueAnimation(function() {
                i++;
                assert.isOk(true);
            });

            kendo.queueAnimation(function() {
                assert.equal(i, 1);
                done();
            });
        });

    });
}());
