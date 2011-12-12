(function($, undefined) {
    /**
    * @name kendo.ui.MobileNavBar.Description
    *
    * @section Put the MobileNavBar widget inside a mobile view or layout header element to display an application navigation bar.
    * The MobileNavBar usually shows the current view title in the center, and optionally some additional left and right aligned elements (back button, settings button, etc.).
    *
    * <h3>Getting Started</h3>
    * If you use the Kendo MobileApplication, it will automatically initialize the MobileNavBar for every element with <code>role</code> data attribute set to <code>navbar</code> inside your views/layouts.
    * You can also initialize it using a jQuery selector.
    * @exampleTitle Initialize Kendo MobileNavBar based on role data attribute
    * @example
    * <div data-role="navbar">My View Title</div>
    *
    * @exampleTitle Initialize Kendo MobileNavBar using a jQuery selector
    * @example
    * var navbar = $("#navbar").kendoMobileNavBar();
    * @section <h3>Aligning widgets inside the navbar</h3>
    *
    * After initialization, the MobileNavBar positions elements, based on the specified <code>align</code> data attribute (either <code>left</code> or <code>right</code>). By default, elements without any align are centered.
    *
    * @exampleTitle Use the <code>align</code> data attribute to specify the elements inside the navbar
    * @example
    * <div data-role="navbar">
    *   <a data-role="back-button" data-align="left">Back</a>
    *   My View Title
    *   <a data-role="button" data-align="right">About</a>
    * </div>
    *
    * @section <h3>Automatically update navbar title based on current view's title</h3>
    * If an element with <code>role</code> data attribute set to <code>view-title</code> is present inside the MobileNavBar, the Kendo MobileApplication instance will automatically update its contents based on the current view's title when changing views. You can specify the view title by setting the <code>title</code> data attribute of the view element. This feature is particularly useful if the MobileNavBar is inside a layout.
    * @exampleTitle Use the <code>view-title</code> data attribute to auto-update the MobileNavBar title
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
    */
    var ui = window.kendo.ui,
        roleSelector = kendo.roleSelector,
        MobileWidget = ui.MobileWidget;

    function createContainer(align, element) {
        var items = element.find("[" + kendo.attr("align") + "=" + align + "]");

        if (items[0]) {
            element.prepend($('<div class="km-' + align + 'item" />').append(items));
        }
    }

    var MobileNavBar = MobileWidget.extend(/** @lends kendo.ui.MobileNavBar.prototype */{
        /**
        * @constructs
        * @extends kendo.ui.MobileWidget
        * @param {DomElement} element DOM element
        * @param {Object} options Configuration options.
        */
        init: function(element, options) {
            MobileWidget.fn.init.call(this, element, options);
            element = this.element;

            element.addClass("km-navbar").wrapInner($('<div class="km-view-title" />'));
            createContainer("left", element);
            createContainer("right", element);
        },

        options: {
            name: "MobileNavBar",
            selector: roleSelector("navbar")
        },

        title: function(value) {
            this.element.find(roleSelector("view-title")).text(value);
        }
    });

    ui.plugin(MobileNavBar);
})(jQuery);
