(function() {
    return;

    var draw = kendo.drawing,
        geom = kendo.geometry,
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

    test("does not reparent target", function() {
        var parent = new draw.Group();
        parent.append(group);

        group.append(new draw.Text("Foo", [10, 10]));

        draw.exportPDF(group).done(function() {
            ok(group.parent === parent);
        });
    });

    test("does not set options", 0, function() {
        group.options.addObserver({
            optionsChange: function(e) {
                ok(false, "No options should be set during export, but " + e.field + " was set");
            }
        });

        group.append(new draw.Text("Foo", [10, 10]));

        draw.exportPDF(group);
    });
})();
