(function() {
    function createQRCode() {
        QUnit.fixture.html("<div id='container'></div>")
        $("#container").kendoQRCode({
            value: "mailto:clientservice@kendoui.com"
        });

        return $("#container").data("kendoQRCode");
    }

    exportTests("QRCode", createQRCode);
    legacyExportTests("QRCode", createQRCode);
})();
