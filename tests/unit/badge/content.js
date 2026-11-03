import '@progress/kendo-ui/src/kendo.badge.js';
import { assert, it } from 'vitest';

let Badge = kendo.ui.Badge;
let span;
let badge;

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
    it('initial text of badge element is preserved', function() {
        span.html('text');
        badge = new Badge(span);

        assert.equal(badge.text(), 'text');
    });

    it('initial HTML of badge element is preserved', function() {
        span.html('<strong>HtMl</strong>');
        badge = new Badge(span);

        assert.equal(badge.text(), '<strong>HtMl</strong>');
    });
    // #endregion


    // #region badge.options.text
    it('badge.options.text sets the content of the badge', function() {
        badge = new Badge(span, { text: 100 });

        assert.equal(badge.text(), 100);
        assert.equal(badge.element.children('.k-badge-text').text(), '100');
    });

    it('badge.options.text overrides the initial HTML of the badge element', function() {
        span.html('<strong>text</strong>');
        badge = new Badge(span, { text: 100 });

        assert.equal(badge.text(), 100);
    });
    // #endregion


    // #region badge.options.template
    it('badge.options.template sets the content of the badge', function() {
        badge = new Badge(span, {
            data: {
                templateProp: 'template'
            },
            template: ({ templateProp }) => `${templateProp}`
        });

        assert.equal(badge.element.html(), 'template');
    });

    it('badge.options.template overides the initial HTML of the badge element', function() {
        span.html('<strong>text</strong>');
        badge = new Badge(span, {
            data: {
                templateProp: 'template'
            },
            template: ({ templateProp }) => `${templateProp}`
        });

        assert.equal(badge.element.html(), 'template');
    });

    it('badge.options.template takes precedense over badge.options.text', function() {
        span.html('<strong>text</strong>');
        badge = new Badge(span, {
            text: 100,
            template: () => '<i>template</i>'
        });

        assert.equal(badge.text(), 100);
        assert.equal(badge.element.html(), '<i>template</i>');
    });

    it('badge.options.template takes precedense over badge.options.icon', function() {
        span.html('<strong>text</strong>');
        badge = new Badge(span, {
            icon: 'add',
            template: () => '<i>template</i>'
        });

        assert.equal(badge.icon(), undefined);
        assert.equal(badge.element.html(), '<i>template</i>');
    });
    // #endregion


    // #region badge.options.max
    it('badge.options.max has no badge element content', function() {
        span.html('100');
        badge = new Badge(span, { max: 99 });

        assert.equal(badge.element.children('.k-badge-text').text(), '100');
    });

    it('badge.options.max has no effect on strings', function() {
        badge = new Badge(span, { text: '100', max: 14 });

        assert.equal(badge.element.children('.k-badge-text').text(), '100');
    });

    it('badge.options.max has no effect on templates', function() {
        badge = new Badge(span, { template: () => '100', max: 14 });

        assert.equal(badge.element.html(), '100');
    });

    it('badge.options.max caps greater numbers but leaves badge.options.text intact', function() {
        badge = new Badge(span, {
            text: 100,
            max: 14
        });

        assert.equal(badge.text(), 100);
        assert.equal(badge.element.children('.k-badge-text').text(), '14+');
    });

    it('badge.options.max does not cap lesser or equal numbers', function() {
        badge = new Badge(span, {
            text: 100,
            max: 100
        });

        assert.equal(badge.text(), 100);
        assert.equal(badge.element.children('.k-badge-text').text(), '100');
    });
    // #endregion


    // #region badge.options.icon
    it('badge.options.icon sets the content of the badge', function() {
        badge = new Badge(span, {
            icon: 'plus'
        });

        assert.equal(badge.element.find(".k-badge-icon").length, 1);
    });

    it('badge.options.icon overides the initial HTML of the badge element', function() {
        span.html('<strong>text</strong>');
        badge = new Badge(span, {
            icon: 'plus'
        });

        assert.equal(badge.element.find(".k-badge-icon").length, 1);
    });

    it('badge.options.icon renders with badge.options.text', function() {
        span.html('<strong>text</strong>');
        badge = new Badge(span, {
            text: 100,
            icon: 'plus'
        });

        assert.equal(badge.text(), 100);
        assert.equal(badge.element.find(".k-badge-icon").length, 1);
        assert.equal(badge.element.children('.k-badge-text').text(), '100');
    });

    it('badge.icon(svg) does not render raw SVG content', function() {
        badge = new Badge(span);

        badge.icon('<svg id="raw-svg-test" viewBox="0 0 10 10"><path d="M0 0h10v10H0z"></path></svg>');

        assert.equal(badge.element.find('#raw-svg-test').length, 0);
        assert.equal(badge.element.find('.k-badge-icon').length, 1);
    });

    it('badge.icon(name) renders a known icon', function() {
        badge = new Badge(span);

        badge.icon('plus');

        assert.equal(badge.icon(), 'plus');
        assert.equal(badge.element.find('.k-badge-icon.k-svg-i-plus').length, 1);
    });
    // #endregion


    // #region badge.text()
    it('badge.text() gets and sets correctly', function() {
        span.html('<strong>HtMl</strong>');
        badge = new Badge(span, { encoded: false });

        assert.equal(badge.text(), '<strong>HtMl</strong>');
        assert.equal(badge.element.children('.k-badge-text').html(), '<strong>HtMl</strong>');

        badge.text('');

        assert.equal(badge.text(), badge.element.html());
        assert.equal(badge.text(), '');

        badge.text('text');

        assert.equal(badge.text(), 'text');
        assert.equal(badge.element.children('.k-badge-text').text(), 'text');
    });

    it('badge.text() preserves the icon', function() {
        badge = new Badge(span, { icon: 'plus', text: 100 });

        badge.text(101);

        assert.equal(badge.element.children('.k-badge-icon').length, 1);
        assert.equal(badge.element.children('.k-badge-text').text(), '101');
    });

    it('badge.icon() preserves the text', function() {
        badge = new Badge(span, { icon: 'plus', text: 100 });

        badge.icon('minus');

        assert.equal(badge.element.children('.k-badge-icon').length, 1);
        assert.equal(badge.element.children('.k-badge-text').text(), '100');
    });

    it('badge.text() encodes malicious markup by default', function() {
        const markup = '<img src=x onerror=alert(1)>';
        badge = new Badge(span, { text: markup });

        assert.equal(span.find("img").length, 0);
        assert.equal(span.text(), markup);
    });

    it('badge.text() encodes object-backed malicious markup by default', function() {
        const markup = '<img src=x onerror=alert(1)>';
        const text = { toString: () => markup };
        badge = new Badge(span, { text });

        assert.equal(span.find("img").length, 0);
        assert.equal(span.text(), markup);
    });
    // #endregion


    // #region setOptions
    it('badge.setOptions({text: text}) works correctly', function() {
        badge = new Badge(span);

        badge.setOptions({ text: 100 });
        assert.equal(badge.text(), 100);
    });
    it('badge.setOptions({text: number}) works correctly', function() {
        badge = new Badge(span);

        badge.setOptions({ text: 300, max: 99 });

        assert.equal(badge.text(), 300);
        assert.equal(badge.element.children('.k-badge-text').text(), '99+');
    });
    it('badge.setOptions({icon: icon}) works correctly', function() {
        badge = new Badge(span);

        badge.setOptions({ icon: 'plus' });

        assert.equal(badge.icon(), 'plus');
        assert.equal(badge.element.find(".k-badge-icon").length, 1);
    });
    it('badge.setOptions({text: ""}) clears the text and keeps the icon', function() {
        badge = new Badge(span, { icon: 'plus', text: 100 });

        badge.setOptions({ text: '' });

        assert.equal(badge.element.children('.k-badge-text').length, 0);
        assert.equal(badge.element.children('.k-badge-icon').length, 1);
    });
    it('badge.setOptions({icon: ""}) clears the icon and keeps the text', function() {
        badge = new Badge(span, { icon: 'plus', text: 100 });

        badge.setOptions({ icon: '' });

        assert.equal(badge.element.children('.k-badge-icon').length, 0);
        assert.equal(badge.element.children('.k-badge-text').text(), '100');
    });
    it('badge.setOptions({text: undefined, icon: undefined}) preserves content', function() {
        badge = new Badge(span, { icon: 'plus', text: 100 });

        badge.setOptions({ text: undefined, icon: undefined });

        assert.equal(badge.element.children('.k-badge-icon').length, 1);
        assert.equal(badge.element.children('.k-badge-text').text(), '100');
    });
    it('badge.setOptions() preserves text taken from the initial element content', function() {
        span.html('100');
        badge = new Badge(span);

        badge.setOptions({ fillMode: 'tint' });

        assert.equal(badge.text(), '100');
        assert.equal(badge.element.children('.k-badge-text').text(), '100');
    });
    it('badge.setOptions({template: tmeplate}) works correctly', function() {
        badge = new Badge(span);

        badge.setOptions({ template: () => '200' });
        assert.equal(badge.element.html(), 200);
    });
    // #endregion

});