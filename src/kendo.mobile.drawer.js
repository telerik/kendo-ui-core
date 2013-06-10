kendo_module({
    id: "mobile.drawer",
    name: "Drawer",
    category: "mobile",
    description: "The Kendo Mobile Drawer widget provides slide to reveal global application toolbox",
    depends: [ "mobile.application" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui;

    var Drawer = ui.View.extend({
        options: {
            name: "Drawer"
        }
    });

    ui.plugin(Drawer);
})(window.kendo.jQuery);
