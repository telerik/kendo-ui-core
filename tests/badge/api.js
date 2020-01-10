(function(){

    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe("kendo.ui.Badge api", function () {
        beforeEach(function() {
            span = $("<span />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

    it("hide() hides the badge", function() {
        badge = new Badge(span, {
            value: '99+'
        });

        badge.hide();

        assert.isNotOk(badge.element.is(':visible'));
    });

    it("show() hides the badge", function() {
        badge = new Badge(span, {
            value: '99+',
            visible: false
        });

        badge.show();

        assert.isOk(badge.element.is(':visible'));
    });

    it("value() sets the content of the badge", function() {
        badge = new Badge(span, {
            value: '99+'
        });

        badge.value('100');

        assert.isOk(badge.element.text() == '100');
    });

    it("setOptions() modifies the current options of the badge", function() {
        badge = new Badge(span, {
            value: '99+'
        });

        badge.setOptions({
            value: 100
        });

        assert.isOk(badge.element.text() == '100');
    });

    });
}());
