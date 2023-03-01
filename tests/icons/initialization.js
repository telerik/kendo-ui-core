(function() {

    var test = Mocha.test;
    var FontIcon = kendo.ui.FontIcon;
    var SvgIcon = kendo.ui.SvgIcon;
    var span;
    var icon;

    describe('kendo.ui.FontIcon initialization', function() {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            icon.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        test('adds required classes', function() {
            icon = new FontIcon(span, { icon: 'gear' });

            assert.isOk(span.hasClass('k-icon'));
            assert.isOk(span.hasClass('k-i-gear'));
        });

        test('adds styling classes', function() {
            icon = new FontIcon(span, { icon: 'gear', themeColor: 'primary', size: 'xsmall', flip: 'vertical', iconClass: 'custom-class' });

            assert.isOk(span.hasClass('k-icon'));
            assert.isOk(span.hasClass('k-i-gear'));
            assert.isOk(span.hasClass('k-color-primary'));
            assert.isOk(span.hasClass('k-icon-xs'));
            assert.isOk(span.hasClass('k-flip-v'));
            assert.isOk(span.hasClass('custom-class'));
        });
    });

    describe('kendo.ui.SvgIcon initialization', function() {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            icon.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        test('adds required classes', function() {
            icon = new SvgIcon(span, { icon: 'gear' });

            assert.isOk(span.hasClass('k-svg-icon'));
            assert.isOk(span.hasClass('k-svg-i-gear'));
            assert.isOk(span.find('svg').length);
            assert.isOk(span.find('svg path').length);
        });

        test('adds styling classes', function() {
            icon = new SvgIcon(span, { icon: 'gear', themeColor: 'primary', size: 'xsmall', flip: 'vertical', iconClass: 'custom-class' });

            assert.isOk(span.hasClass('k-svg-icon'));
            assert.isOk(span.hasClass('k-svg-i-gear'));
            assert.isOk(span.hasClass('k-color-primary'));
            assert.isOk(span.hasClass('k-icon-xs'));
            assert.isOk(span.hasClass('k-flip-v'));
            assert.isOk(span.hasClass('custom-class'));
        });
    });

}());
