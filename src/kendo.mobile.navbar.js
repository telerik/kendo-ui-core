(function($, undefined) {
    /**
    * @name kendo.mobile.ui.NavBar.Description
    *
    * @section mobile NavBar widget is iused inside a mobile view or layout header element to display an application navigation bar.
    * The mobile NavBar can show the current view title in the center, and optionally some additional left and right aligned elements (back button, settings button, etc.).
    *
    * <h3>Getting Started</h3>
    * The Kendo mobile Application will automatically initialize the mobile NavBar for every element with <code>role</code> data attribute set to <code>navbar</code> present in the views/layouts markup.
    * Alternatively, it can be initialized using a jQuery selector.
    * @exampleTitle Initialize Kendo mobile NavBar based on role data attribute
    * @example
    * <div data-role="navbar">My View Title</div>
    *
    * @exampleTitle Initialize Kendo mobile NavBar using a jQuery selector
    * @example
    * var navbar = $("#navbar").kendoMobileNavBar();
    * @section <h3>Aligning widgets inside the navbar</h3>
    *
    * After initialization, the mobile NavBar positions elements based on the specified <code>align</code> data attribute (either <code>left</code> or <code>right</code>). By default, elements without any align are centered.
    *
    * @exampleTitle Use the <code>align</code> data attribute to specify the elements position inside the navbar
    * @example
    * <div data-role="navbar">
    *   <a data-role="back-button" data-align="left">Back</a>
    *   My View Title
    *   <a data-role="button" data-align="right">About</a>
    * </div>
    *
    * @section <h3>Automatically update navbar title based on current view's title</h3>
    * If an element with <code>role</code> data attribute set to <code>view-title</code> is present inside the mobile NavBar, the Kendo mobile Application instance will update its text when changing views to on the current view's title.  The view title is specified by setting the <code>title</code> data attribute of the view element. This feature is particularly useful if the mobile NavBar is inside a layout.
    * @exampleTitle Use the <code>view-title</code> data attribute to auto-update the mobile NavBar title
    * @example
    * <div data-role="layout" data-id="foo">
    *   <div data-role="header">
    *       <div data-role="navbar">
    *          <span data-role="view-title">My View Title</span>
    *       </div>
    *   </div>
    * </div>
    *
    * <div data-role="view" data-layout="foo" data-title="bar"> ... </div>
    * <div data-role="view" data-layout="foo" data-title="baz"> ... </div>
    *
    * <h3>Customizing mobile NavBar appearance</h3>
    * Kendo Mobile NavBar color can be customized by simply setting its background-color (either inline or by using a CSS selector with specificity of 20+.
    * @exampleTitle Initialize a green Kendo mobile NavBar
    * @example
    * <div data-role="navbar" style="background-color: green">My View Title</div>
    *
    * @section
    * You can target platforms separately with their respective root classes.
    * @exampleTitle Initialize a green Kendo mobile NavBar in iOS and a red one in Android
    * @example
    * <style>
    *     .km-ios .checkout { background-color: green; }
    *     .km-android .checkout { background-color: red; }
    * </style>
    * <div data-role="navbar" class="checkout">My View Title</div>
    */
    var ui = window.kendo.mobile.ui,
        roleSelector = kendo.roleSelector,
        Widget = ui.Widget;

    function createContainer(align, element) {

        var items = element.find("[" + kendo.attr("align") + "=" + align + "]");

        if (items[0]) {
            element.prepend($('<div class="km-' + align + 'item" />').append(items));
        }
    }

    var NavBar = Widget.extend(/** @lends kendo.mobile.ui.NavBar.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element
        */
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            element = this.element;

            element.addClass("km-navbar").wrapInner($('<div class="km-view-title" />'));
            createContainer("left", element);
            createContainer("right", element);
        },

        options: {
            name: "NavBar",
            selector: roleSelector("navbar")
        },

        /**
        * Update the title element text. The title element is specified by setting the <code>role</code> data attribute to <code>view-title</code>
        * @param {String} value The text of title
        * @example
        * &lt;div data-role="navbar" id="foo"&gt;
        *     &lt;span data-role="view-title"&gt;&lt;/span&gt;
        * &lt;/div&gt;
        *
        * &lt;script&gt;
        *   $("#foo").data("kendoMobileNavBar").title("Foo");
        * &lt;/script&gt;
        */
        title: function(value) {
            this.element.find(roleSelector("view-title")).text(value);
        }
    });

    ui.plugin(NavBar);
})(jQuery);
