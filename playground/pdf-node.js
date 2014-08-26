require("../src/kendo.pdf.js");
require("../src/kendo.pdf.ttf.js");

var fs = require("fs");

function mm2pt(mm) {
    return mm * (72/25.4);
}

var PDF = kendo.PDF;
var pdf = new PDF();
var fonturl = "/usr/share/fonts/truetype/freefont/FreeSerif.ttf";
PDF.loadFonts([ fonturl ], function(){

    var font = pdf.getFont(fonturl);
    var strings = [
        "Kendo UI PDF generator. ♥",
        "♙♘♗♖♕♔ ♟♞♝♜♛♚",
        ""
    ];
    var txt = "";
    var cmap = font._font.cmap.getUnicodeEntry().codeMap;
    for (var i = 0; i < 65536; ++i) {
        if (cmap[i] == null) continue;
        if (font._font.widthOfGlyph(cmap[i]) <= 0) continue;
        txt += String.fromCharCode(i);
        if (txt.length == 80) {
            strings.push(txt);
            txt = "";
        }
    }
    if (txt) strings.push(txt);

    var page = pdf.addPage();
    page._beginText();
    page._out(mm2pt(5), " ", mm2pt(290), " TD\n");
    page._out(page._getFontResource(fonturl), " 8 Tf\n");
    for (var i = 0; i < strings.length; ++i) {
        var txt = strings[i];
        page._out(font.encodeText(txt), " Tj\n");
        page._out(mm2pt(0), " ", mm2pt(-3.5), " TD\n");
    }
    page._endText();

    var binary = pdf.render();
    fs.writeFileSync("/tmp/pdf.txt", binary, { encoding: "binary" });
});
