(function() {

    var test = Mocha.test;
    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge content', function() {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region
        test('initial text of badge element is preserved', function() {
            span.html('text');
            badge = new Badge(span);

            assert.equal(badge.text(), 'text');
        });

        test('initial HTML of badge element is preserved', function() {
            span.html('<strong>HtMl</strong>');
            badge = new Badge(span);

            assert.equal(badge.text(), '<strong>HtMl</strong>');
        });
        // #endregion


        // #region badge.options.text
        test('badge.options.text sets the content of the badge', function() {
            badge = new Badge(span, {text: 100});

            assert.equal(badge.text(), 100);
        });

        test('badge.options.text overrides the initial HTML of the badge element', function() {
            span.html('<strong>text</strong>');
            badge = new Badge(span, {text: 100});

            assert.equal(badge.text(), 100);
        });
        // #endregion


        // #region badge.options.template
        test('badge.options.template sets the content of the badge', function() {
            badge = new Badge(span, {
                data: {
                    templateProp: 'template'
                },
                template: '#= templateProp #'
            });

            assert.equal(badge.element.html(), 'template');
        });

        test('badge.options.template overides the initial HTML of the badge element', function() {
            span.html('<strong>text</strong>');
            badge = new Badge(span, {
                data: {
                    templateProp: 'template'
                },
                template: '#= templateProp #'
            });

            assert.equal(badge.element.html(), 'template');
        });

        test('badge.options.template takes precedense over badge.options.text', function() {
            span.html('<strong>text</strong>');
            badge = new Badge(span, {
                text: 100,
                template: '<i>template</i>'
            });

            assert.equal(badge.text(), 100);
            assert.equal(badge.element.html(), '<i>template</i>');
        });

        test('badge.options.template takes precedense over badge.options.icon', function() {
            span.html('<strong>text</strong>');
            badge = new Badge(span, {
                icon: 'add',
                template: '<i>template</i>'
            });

            assert.equal(badge.icon(), undefined);
            assert.equal(badge.element.html(), '<i>template</i>');
        });
        // #endregion


        // #region badge.options.max
        test('badge.options.max has no badge element content', function() {
            span.html('100');
            badge = new Badge(span, { max: 99 });

            assert.equal(badge.element.html(), '100');
        });

        test('badge.options.max has no effect on strings', function() {
            badge = new Badge(span, { text: '100', max: 14 });

            assert.equal(badge.element.html(), '100');
        });

        test('badge.options.max has no effect on templates', function() {
            badge = new Badge(span, { template: '100', max: 14 });

            assert.equal(badge.element.html(), '100');
        });

        test('badge.options.max caps greater numbers but leaves badge.options.text intact', function() {
            badge = new Badge(span, {
                text: 100,
                max: 14
            });

            assert.equal(badge.text(), 100);
            assert.equal(badge.element.html(), '14+');
        });

        test('badge.options.max does not cap lesser or equal numbers', function() {
            badge = new Badge(span, {
                text: 100,
                max: 100
            });

            assert.equal(badge.text(), 100);
            assert.equal(badge.element.html(), '100');
        });
        // #endregion


        // #region badge.options.icon
        test('badge.options.icon sets the content of the badge', function() {
            badge = new Badge(span, {
                icon: 'add'
            });

            assert.equal(badge.element.html(), '<span class=\"k-badge-icon k-icon k-i-add\"></span>');
        });

        test('badge.options.icon overides the initial HTML of the badge element', function() {
            span.html('<strong>text</strong>');
            badge = new Badge(span, {
                icon: 'add'
            });

            assert.equal(badge.element.html(), '<span class=\"k-badge-icon k-icon k-i-add\"></span>');
        });

        test('badge.options.icon takes precedense over badge.options.text', function() {
            span.html('<strong>text</strong>');
            badge = new Badge(span, {
                text: 100,
                icon: 'add'
            });

            assert.equal(badge.text(), undefined);
            assert.equal(badge.element.html(), '<span class=\"k-badge-icon k-icon k-i-add\"></span>');
        });
        // #endregion


        // #region badge.text()
        test('badge.text() gets and sets correctly', function() {
            span.html('<strong>HtMl</strong>');
            badge = new Badge(span);

            assert.equal(badge.text(), badge.element.html());
            assert.equal(badge.text(), '<strong>HtMl</strong>');

            badge.text('');

            assert.equal(badge.text(), badge.element.html());
            assert.equal(badge.text(), '');

            badge.text('text');

            assert.equal(badge.text(), badge.element.html());
            assert.equal(badge.text(), 'text');
        });
        // #endregion


        // #region setOptions
        test('badge.setOptions({text: text}) works correctly', function() {
            badge = new Badge(span);

            badge.setOptions({ text: 100 });
            assert.equal(badge.text(), 100);
        });
        test('badge.setOptions({text: number}) works correctly', function() {
            badge = new Badge(span);

            badge.setOptions({ text: 300, max: 99 });

            assert.equal(badge.text(), 300);
            assert.equal(badge.element.html(), '99+');
        });
        test('badge.setOptions({icon: icon}) works correctly', function() {
            badge = new Badge(span);

            badge.setOptions({ icon: 'add' });

            assert.equal(badge.icon(), 'add');
            assert.equal(badge.element.html(), '<span class=\"k-badge-icon k-icon k-i-add\"></span>');
        });
        test('badge.setOptions({template: tmeplate}) works correctly', function() {
            badge = new Badge(span);

            badge.setOptions({ template: '200' });
            assert.equal(badge.element.html(), 200);
        });
        // #endregion

    });

})();