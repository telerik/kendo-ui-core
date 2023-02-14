(function() {
    var button;
    var instance;

    describe("events", function() {
        beforeEach(function() {
            button = $("<button id='btn' type='button'>Toggle Button</button>").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            if (button) {
                kendo.destroy(button);
                instance = null;
                button.remove();
                button = null;
            }
        });

        it("toggle event is fired", function() {
            var fired = false;

            function clickHandler(e) {
                fired = true;
            }

            button.kendoToggleButton({
                toggle: clickHandler
            });

            button.trigger('click');

            assert.isOk(fired);
        });

        it("toggle event is not fires if click is prevented fired", function() {
            var firedSkip = true;

            function toggleHandler(e) {
                firedSkip = false;
            }

            button.kendoToggleButton({
                toggle: toggleHandler,
                click: (e) => {
                    e.preventDefault();
                }
            });

            button.trigger('click');

            assert.isOk(firedSkip);
        });

        it("toggle event passes proper arguments", function(done) {
            button.kendoToggleButton({
                group: "myGroup",
                toggle: (arg) => {
                    assert.isOk(typeof arg == "object");
                    assert.equal(arg.group, "myGroup");
                    assert.equal(arg.id, "btn");
                    assert.equal(arg.target[0], button[0]);
                    assert.equal(arg.checked, true);
                    done();
                }
            });

            button.trigger('click');
        });

        it("disabled button does not fire toggle event", function() {
            var notFired = true;

            function clickHandler(e) {
                notFired = false;
            }

            button.kendoToggleButton({
                enable: false,
                toggle: clickHandler
            });

            button.trigger('click');

            assert.isOk(notFired);
        });

        it("toggle() method call does not fire toggle event", function() {
            var notFired = true;

            function clickHandler(e) {
                notFired = false;
            }

            instance = button.kendoToggleButton({
                enable: false,
                toggle: clickHandler
            }).getKendoToggleButton();

            instance.toggle();

            assert.isOk(notFired);
        });
    });
}());
