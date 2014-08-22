require("../src/kendo.pdf.js");
require("../src/kendo.pdf.ttf.js");

var fs = require("fs");

function mm2pt(mm) {
    return mm * (72/25.4);
}

var PDF = kendo.PDF;
var pdf = new PDF();
var fonturl = "/home/mishoo/.fonts/CharisSILLiteracyCompact-4.110/CharisSILLiteracyCompact-R.ttf";
pdf.getFont(fonturl, function(font){
    var page = pdf.addPage();
    page._beginText();
    page._out(mm2pt(5), " ", mm2pt(250), " TD\n");
    page._out(page._getFontResource(fonturl), " 15 Tf\n");
    page._out(font.encodeText("ăĂ"), " Tj\n");
    page._endText();

    var binary = pdf.render();
    fs.writeFileSync("/tmp/pdf.txt", binary, { encoding: "binary" });
});
