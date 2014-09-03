global.kendo = {};

require("../src/pdf/core.js");
require("../src/pdf/ttf.js");
require("../src/pdf/image.js");

var fs = require("fs");

function mm2pt(mm) {
    return mm * (72/25.4);
}

var PDF = kendo.PDF;
var pdf = new PDF();
var fonturl = "/usr/share/fonts/truetype/freefont/FreeSerif.ttf";
var imgurl = "/home/mishoo/boulder.jpg";

PDF.loadFonts([ fonturl ], function(){
    PDF.loadImages([ imgurl ], function(){
        makeIt();
    });
});

function makeIt() {
    var font = pdf.getFont(fonturl);
    var strings = [
        "Kendo UI PDF generator. ♥",
        "♙♘♗♖♕♔ ♟♞♝♜♛♚",
        ""
    ];
    // var txt = "";
    // var cmap = font._font.cmap.getUnicodeEntry().codeMap;
    // for (var i = 0; i < 65536; ++i) {
    //     if (cmap[i] == null) continue;
    //     if (font._font.widthOfGlyph(cmap[i]) <= 0) continue;
    //     txt += String.fromCharCode(i);
    //     if (txt.length == 80) {
    //         strings.push(txt);
    //         txt = "";
    //     }
    // }
    // if (txt) strings.push(txt);

    var page = pdf.addPage();
    page.transform(1, 0, 0, -1, 0, mm2pt(297));
    page.beginText();
    page._out(mm2pt(5), " ", mm2pt(290), " TD\n");
    page.setFont(font, 8);
    page.setTextLeading(mm2pt(3.5));
    for (var i = 0; i < strings.length; ++i) {
        page.showTextNL(strings[i]);
    }
    page.endText();

    page.translate(100, 100);
    page.scale(300, 225);
    page.drawImage(imgurl);

    var binary = pdf.render();
    fs.writeFileSync("/tmp/pdf.txt", binary, { encoding: "binary" });
}
