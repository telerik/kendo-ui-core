(function() {
    var SurfaceChooser = kendo.mobile.ui.ButtonGroup.extend({
        init: function(element, options) {
            element.append($("<ul><li>SVG</li><li>Canvas</li><li>VML</li></ul>"));
            kendo.mobile.ui.ButtonGroup.fn.init.call(this, element.find("ul"), options);
        },
        events: [
            "change"
        ]
    });

    window.kendoSurfaceChooser = SurfaceChooser;
})();
