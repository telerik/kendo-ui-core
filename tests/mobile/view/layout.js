(function() {
    var View = kendo.mobile.ui.View,
        Layout = kendo.mobile.ui.Layout,
        root,
        view,
        layout;

    function setup(viewHtml, layoutHtml) {
        root = $(viewHtml);
        layout = kendo.initWidget($(layoutHtml), {}, kendo.mobile.ui.roles);
        view = kendo.initWidget(root, {getLayout: function() { return layout; } }, kendo.mobile.ui.roles);
        view.showStart();
    }


    module("mobile view", {
        setup: function() {
            window.layoutSuccess = function() {
                ok(true);
            }
        },

        teardown: function() {
            kendo.destroy(root);
            layout.destroy();
        }
    });

    test("uses layout header and footer when shown", 2, function() {
        setup('<div data-role="view"></div>',
            '<div data-role="layout"><div data-role="header">Header</div><div data-role="footer">Footer</div></div>');

        equal(root.find('[data-role=header]').text(), 'Header');
        equal(root.find('[data-role=footer]').text(), 'Footer');
    });

    test("does not override own headers and footers", 2, function() {
        setup('<div data-role="view"><div data-role="header">Own Header</div><div data-role="footer">Own Footer</div></div>',
            '<div data-role="layout"><div data-role="header">Header</div><div data-role="footer">Footer</div></div>');

        equal(root.find('[data-role=header]').text(), 'Own Header');
        equal(root.find('[data-role=footer]').text(), 'Own Footer');
    });

    test("Layout triggers init", 1, function() {
        setup('<div data-role="view">', '</div><div data-role="layout" data-init="layoutSuccess" />');
    });

    test("Layout triggers show", 1, function() {
        setup('<div data-role="view" data-layout="foo"></div>', '<div data-id="foo" data-role="layout" data-show="layoutSuccess" />');
    });
})();
