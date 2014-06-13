(function() {
    var PivotConfigurator = kendo.ui.PivotConfigurator,
        div;

    module("PivotConfigurator initialziation", {
        setup: function() {
            kendo.ns = "kendo-";
            div = document.createElement("div");
            QUnit.fixture[0].appendChild(div);
        },
        teardown: function() {
            var component = $(div).data("kendoPivotConfigurator");
            if (component) {
                component.destroy();
            }
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
        }
    });

    test("kendoPivotConfigurator attaches a pivotconfigurator object to target", function() {
        var configurator = $(div).kendoPivotConfigurator({ });

        ok(configurator.data("kendoPivotConfigurator") instanceof PivotConfigurator);
    });

})();
