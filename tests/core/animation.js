(function() {

    var animate = kendo.animate;
    var span;

    describe("animate", function() {
        beforeEach(function() {
            span = $("<span>foo</span>").appendTo(Mocha.fixture);
        });

        it("animate with effect which does not exist calls the callback imeadiately", function() {
            var callbackWasCalled = false;

            animate(span, "foo", function() {
                callbackWasCalled = true;
            });

            assert.isOk(callbackWasCalled);
        });

        it("animate calls the callback when the effect finishes", function(done) {
            kendo.fx.foo = {
                setup: function(element, options) {
                    options.complete();
                }
            };

            animate(span, "foo", function() {
                assert.isOk(true);
                done();
            });
        });

        it("element is shown every time", function() {
            span.hide();

            kendo.fx.foo = {
                bsetup: function(element, options) {
                    options.complete();
                }
            };

            animate(span, {
                effects: "foo"
            });

            assert.isOk(span.is(":visible"));
        });

        it("element is hidden when hide is true", function() {
            kendo.fx.foo = {
                setup: function(element, options) {
                    options.complete();
                }
            };

            animate(span, {
                effects: "foo",
                hide: true
            });
            assert.isOk(!span.is(":visible"));
        });

    });
}());
