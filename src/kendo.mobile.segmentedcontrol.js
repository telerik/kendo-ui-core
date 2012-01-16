(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        MOUSEDOWN = touch ? "touchstart" : "mousedown",
        MOUSEUP = touch ? "touchend" : "mouseup";


    var SegmentedControl = ui.Widget.extend({
        init: function(element, options) {

        },
        options: {
            name: "SegmentedControl"
        }
    });

    ui.plugin(SegmentedControl);
})(jQuery);
