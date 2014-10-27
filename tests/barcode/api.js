(function() {
    function createBarcode() {
        QUnit.fixture.html("<div id='container'></div>")

        $("#container").kendoBarcode({
            value: "2346722",
            type: "ean8"
        });

        return $("#container").data("kendoBarcode");
    }

    exportTests("Barcode", createBarcode);
})();
