(function(f, define){
    define([ "./pdf/core", "./pdf/ttf", "./kendo.saveas" ], f);
}) (function(){

var __meta__ = {
    id: "ooxml",
    name: "PDF export",
    category: "framework",
    advanced: true,
    depends: [ "saveas" ]
};

(function(kendo){

kendo.PDFMixin = {
    extend: function(proto) {
        proto.events.push("pdfExport");
        proto.options.pdf = this.options;
        proto.saveAsPDF = this.saveAsPDF;
    },
    options: {
        fileName: "Export.pdf",
        proxyURL: "",
        paperSize: "auto"
    },
    saveAsPDF: function() {
        if (this.trigger("pdfExport")) {
            return;
        }

        var options = this.options.pdf;

        kendo.dataviz.drawing.drawDOM(this.wrapper[0], function(root) {
            root.options.set("pdf", options);
            kendo.dataviz.drawing.pdf.saveAs(root, options.fileName, options.proxyURL);
        });
    }
};

})(kendo);

return kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
