(function() {

    var test = Mocha.test;
    var FontIcon = kendo.ui.FontIcon;
    var SvgIcon = kendo.ui.SvgIcon;
    var span;
    var icon;

    describe('kendo.ui.FontIcon API', function() {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            icon.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        test('setOptions adds styling options', function() {
            icon = new FontIcon(span, { icon: 'gear' });
            icon.setOptions({ themeColor: 'primary', size: 'xsmall', flip: 'vertical' });

            assert.isOk(span.hasClass('k-color-primary'));
            assert.isOk(span.hasClass('k-icon-xs'));
            assert.isOk(span.hasClass('k-flip-v'));
        });

        test('setOptions remove adds removes old styling options', function() {
            icon = new FontIcon(span, { icon: 'gear', themeColor: 'primary', size: 'xsmall', flip: 'vertical' });
            icon.setOptions({ themeColor: 'inherit', size: 'large', flip: 'horizontal' });

            assert.isFalse(span.hasClass('k-color-primary'));
            assert.isOk(span.hasClass('k-color-inherit'));
            assert.isFalse(span.hasClass('k-icon-xs'));
            assert.isOk(span.hasClass('k-icon-lg'));
            assert.isFalse(span.hasClass('k-flip-v'));
            assert.isOk(span.hasClass('k-flip-h'));
        });

        test('setOptions changes the icon', function() {
            icon = new FontIcon(span, { icon: 'gear' });
            icon.setOptions({ icon: 'camera' });

            assert.isFalse(span.hasClass('k-i-gear'));
            assert.isOk(span.hasClass('k-i-camera'));
        });
    });

    describe('kendo.ui.SvgIcon API', function() {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            icon.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        test('setOptions adds styling options', function() {
            icon = new SvgIcon(span, { icon: 'gear' });
            icon.setOptions({ themeColor: 'primary', size: 'xsmall', flip: 'vertical' });

            assert.isOk(span.hasClass('k-color-primary'));
            assert.isOk(span.hasClass('k-icon-xs'));
            assert.isOk(span.hasClass('k-flip-v'));
        });

        test('setOptions remove adds removes old styling options', function() {
            icon = new SvgIcon(span, { icon: 'gear', themeColor: 'primary', size: 'xsmall', flip: 'vertical' });
            icon.setOptions({ themeColor: 'inherit', size: 'large', flip: 'horizontal' });

            assert.isFalse(span.hasClass('k-color-primary'));
            assert.isOk(span.hasClass('k-color-inherit'));
            assert.isFalse(span.hasClass('k-icon-xs'));
            assert.isOk(span.hasClass('k-icon-lg'));
            assert.isFalse(span.hasClass('k-flip-v'));
            assert.isOk(span.hasClass('k-flip-h'));
        });

        test('setOptions changes the icon', function() {
            icon = new SvgIcon(span, { icon: 'gear' });
            icon.setOptions({ icon: 'camera' });

            assert.isFalse(span.hasClass('k-svg-i-gear'));
            assert.isOk(span.hasClass('k-svg-i-camera'));
        });
    });

}());
