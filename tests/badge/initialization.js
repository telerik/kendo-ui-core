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

    it("k-badge class is set to the element of the widget", function() {
        badge = new Badge(span, {
            value: '99+'
        });

        assert.isOk(badge.element.is('.k-badge'));
    });

    it("default apperence is 'pill'", function() {
        badge = new Badge(span, {
            value: '99+'
        });

        assert.isOk(badge.element.is('.k-badge-pill'));
    });

    it("if apperence is 'rectangle' k-badge-pill class should be removed", function() {
        badge = new Badge(span, {
            value: '99+',
            appearance: 'rectangle'
        });

        assert.isOk(badge.element.not('.k-badge-pill'));
    });

    it("default type is 'primary'", function() {
        badge = new Badge(span, {
            value: '99+'
        });

        assert.isOk(badge.element.is('.k-badge-primary'));
    });

    it("if type is 'primary' the badge element should have a 'k-badge-primary'", function() {
        badge = new Badge(span, {
            value: '99+',
            type: 'primary'
        });

        assert.isOk(badge.element.is('.k-badge-primary'));
    });

    it("if type is 'info' the badge element should have a 'k-badge-info'", function() {
        badge = new Badge(span, {
            value: '99+',
            type: 'info'
        });

        assert.isOk(badge.element.is('.k-badge-info'));
    });

    it("if type is 'success' the badge element should have a 'k-badge-success'", function() {
        badge = new Badge(span, {
            value: '99+',
            type: 'success'
        });

        assert.isOk(badge.element.is('.k-badge-success'));
    });

    it("if type is 'warning ' the badge element should have a 'k-badge-warning'", function() {
        badge = new Badge(span, {
            value: '99+',
            type: 'warning'
        });

        assert.isOk(badge.element.is('.k-badge-warning'));
    });

    it("if type is 'error' the badge element should have a 'k-badge-error'", function() {
        badge = new Badge(span, {
            value: '99+',
            type: 'error'
        });

        assert.isOk(badge.element.is('.k-badge-error'));
    });

    it("if look is set to 'outline' the badge element should have 'k-badge-outline' class", function() {
        badge = new Badge(span, {
            value: '99+',
            look:'outline'
        });

        assert.isOk(badge.element.is('.k-badge-outline'));
    });

    it("if a template is specified, its content should be rendered within the badge", function() {
        badge = new Badge(span, {
            value: 100,
            template: '#=value - 1#'
        });

        assert.isOk(badge.element.text() == '99');
    });

    it("if visible is set to false, the badge should be initially hidden", function() {
        badge = new Badge(span, {
            value: 100,
            visible: false
        });

        assert.isOk(badge.element.not(':visible'));
    });

    });
}());
