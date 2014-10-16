(function() {
    var dataviz = kendo.dataviz,
        draw = kendo.drawing,
        pdf = draw.pdf;

    var group;

    module("exportPDF", {
        setup: function() {
            group = new draw.Group();
        }
    });

    test("exports group", function() {
        draw.exportPDF(group).done(function(pdf) {
            contains(pdf, "data:application/pdf;base64");
        });
    });

    test("sets options", function() {
        draw.exportPDF(group).done(function(portrait) {
            draw.exportPDF(group, { landscape: true }).done(function(landscape) {
                ok(landscape !== portrait);
            });
        });
    });
})();
