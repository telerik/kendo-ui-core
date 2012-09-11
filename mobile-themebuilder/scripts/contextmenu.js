(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,

        ContextMenu = ui.Menu.extend({/** @lends kendo.ui.ContextMenu.prototype */
        /**
         * Creates a ContextMenu instance.
         * @constructs
         * @extends kendo.ui.Widget
         * @class ContextMenu UI widget
         * @param {Selector} element DOM element
         * @param {Object} options Configuration options.
         * @option {Object} [animation] A collection of <b>Animation</b> objects, used to change default animations. A value of false will disable all animations in the widget.
         * <p>Available animations for the <b>ContextMenu</b> are listed below.  Each animation has a reverse options which is used for the <b>close</b> effect by default, but can be over-ridden
         * by setting the <b>close</b> animation.  Each animation also has a direction which can be set off the animation (i.e. <b>slideIn:Down</b>).</p>
         * <div class="details-list">
         * <dl>
         *     <dt><b>slideIn</b></dt>
         *     <dd>ContextMenu content slides in from the top</dd>
         *     <dt><b>fadeIn</b></dt>
         *     <dd>ContextMenu content fades in</dd>
         *     <dt><b>expand</b></dt>
         *     <dd>ContextMenu content expands from the top down. Similar to slideIn.</dd>
         * </dl>
         * </div>
         * _example
         *  $("#menu").kendoContextMenu({
         *      animation: { open: { effects: "fadeIn" } }
         *  });
         * @option {Animation} [animation.open] The animation that will be used when opening sub menus.
         * @option {Animation} [animation.close] The animation that will be used when closing sub menus.
         * @option {Boolean} [closeOnClick] <true> Specifies that sub menus should close after item selection (provided they won't navigate).
         * _example
         *  $("#menu").kendoContextMenu({
         *      closeOnClick: false
         *  });
         * @option {Number} [hoverDelay] <100> Specifies the delay in ms before the menu is opened/closed - used to avoid accidental closure on leaving.
         * _example
         *  $("#menu").kendoContextMenu({
         *      hoverDelay: 200
         *  });
         * @option {String} [direction] <"default"> Specifies Menu opening direction. Can be "top", "bottom", "left", "right".
         * You can also specify different direction for root and sub menu items, separating them with space. The example below will initialize the root menu to open upwards and
         * its sub menus to the left.
         * _example
         * $("#menu").kendoContextMenu({
         *     direction: "top left"
         * });
         */
        init: function(element, options) {
            var that = this;

            ui.Menu.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            var target = options.target;

            that.popup = element
                            .wrap("<div></div>")
                            .parent()
                            .addClass("k-context-menu")
                            .kendoPopup({
                                anchor: target || "body",
                                collision: "fit flip"
                            }).data("kendoPopup");

            if (target) {
                $(target).on(options.event, function (e) {
                    that.show(e.pageX, e.pageY);
                    e.preventDefault();
                });
            }

            $(document.body).on(kendo.support.mouseup, function () { that.popup.close() });
        },
        options: {
            name: "ContextMenu",
            event: "contextmenu",
            orientation: "vertical",
            closeOnClick: true,
            target: null
        },

        show: function(x, y) {
            var that = this;

            that.popup.wrapper.hide();
            that.popup.open(x, y);
        }
    });

    kendo.ui.plugin(ContextMenu);

})(jQuery);
