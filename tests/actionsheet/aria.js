(function() {
    var ActionSheet = kendo.ui.ActionSheet,
        div,
        instance;

    describe("kendo.ui.ActionSheet accessibility with AXE", function() {

        function createInstance(options) {
            instance = new ActionSheet(div, $.extend(true, {}, {
                title: "Some title",
                items: [
                    {
                        text: 'first item'
                    },
                    {
                        text: 'second item',
                        disabled: true
                    }
                ]
            }, options));
        }
        beforeEach(function() {
           div = $("<div style='color:green'></div>").appendTo(Mocha.fixture);

        });
        afterEach(function() {
            instance.destroy();
            kendo.destroy(Mocha.fixture);
        });

        it("ActionSheet is accessible", function(done) {
            createInstance({
                open: function(e) {
                    setTimeout(function() {
                        axeRunFixture(done);
                    });
                  },
            });

            instance.open();
        });
    });

    describe("kendo.ui.ActionSheet WAI-ARIA", function() {
        function createInstance(options) {
            instance = new ActionSheet(div, $.extend(true, {}, {
                title: "Some title",
                items: [
                    {
                        text: 'first item'
                    },
                    {
                        text: 'second item',
                        disabled: true
                    }
                ]
            }, options));
        }
        beforeEach(function() {
           div = $("<div style='color:green'></div>").appendTo(Mocha.fixture);

        });
        afterEach(function() {
            instance.destroy();
            kendo.destroy(Mocha.fixture);
        });

        it("ActionSheet items collection has role='group'", function(done) {
            createInstance({
                open: function() {
                    setTimeout(function() {
                        assert.equal(instance.wrapper.find(".k-list-ul").attr("role"), "group");
                        done();
                    });
                  },
            });

            instance.open();
        });

        it("ActionSheet li elements have role='none'", function(done) {
            createInstance({
                open: function() {
                    setTimeout(function() {
                        assert.equal(instance.wrapper.find(".k-actionsheet-item").attr("role"), "button");
                        done();
                    });
                  },
            });

            instance.open();
        });

        it("ActionSheet has role='dialog'", function(done) {
            createInstance({
                open: function() {
                    setTimeout(function() {
                        assert.equal(instance.wrapper.find(".k-actionsheet").attr("role"), "dialog");
                        done();
                    });
                  },
            });

            instance.open();
        });

        it("ActionSheet has aria-modal='true'", function(done) {
            createInstance({
                open: function() {
                    setTimeout(function() {
                        assert.equal(instance.wrapper.find(".k-actionsheet").attr("aria-modal"), "true");
                        done();
                    });
                  },
            });

            instance.open();
        });
    });
}());