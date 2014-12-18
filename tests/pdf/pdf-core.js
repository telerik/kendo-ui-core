(function(){

    var PDF = kendo.pdf;
    var drawing = kendo.drawing;
    var geo = kendo.geometry;

    module("pdf-core", {

    });

    test("[PDF] basic sanity checking", function(){
        var pdf = new PDF.Document();
        pdf.addPage();
        var data = pdf.render();
        var text = data.readString(data.length());
        checkDocumentStructure(data);
        infoOK(text, "Producer", "Kendo UI PDF Generator");
    });

    test("[PDF] options make it into the document", function(){
        var pdf = new PDF.Document({
            title: "The Title",
            author: "The Author",
            subject: "The Subject",
            keywords: "The Keywords",
            creator: "The Creator",
            date: new Date(1979, 02, 08, 12, 0, 0, 0)
        });
        var page = pdf.addPage({
            paperSize: [ 100, 200 ],
            landscape: true,
            margin: { left: 50, top: 50, right: 50, bottom: 50 },
            addMargin: true,
        });
        var data = pdf.render();
        var text = data.readString(data.length());

        checkDocumentStructure(data);

        ok(/\/MediaBox\s*\[\s*0\s+0\s+300\s+200\s*\]/.test(text));
        infoOK(text, "Title", "The Title");
        infoOK(text, "Author", "The Author");
        infoOK(text, "Subject", "The Subject");
        infoOK(text, "Keywords", "The Keywords");
        infoOK(text, "Creator", "The Creator");
        infoOK(text, "CreationDate", "D:19790308.*");

        // page is translated by paper size/margins and clipped to content box
        var pageText = getPageText(page);
        commandsOK(pageText, "1 0 0 -1 0 200 cm 1 0 0 1 50 50 cm 0 0 200 100 re W n", "paper translation/margins");
    });

    // this one is rather pointless.  the output will be completely
    // different when a truetype font is used.
    test("[PDF] page.showText", function(){
        var pdf = new PDF.Document();
        var page = pdf.addPage();

        page.beginText();
        page.setFont("Times-Roman", 12);
        page.showText("Foo bar baz");
        page.endText();

        var text = getPageText(page);

        // not testing for the transformation though; page-dependent,
        // OTOH we might change the way text is displayed.
        commandsOK(text, [
            "BT",
            "/F[0-9]+ 12 Tf",
            "\\(Foo bar baz\\) Tj",
            "ET"
        ], "basic text drawing");

        checkDocumentStructure(pdf.render());
    });

    test("[PDF] basic drawing primitives", function(){
        var pdf = new PDF.Document();
        var page = pdf.addPage({ paperSize: [ 100, 100 ] });

        page.scale(2, 3);
        page.rotate(Math.PI);
        page.setStrokeColor(1, 0, 0);
        page.setFillColor(0, 0, 1);
        page.setStrokeOpacity(0.5);
        page.setFillOpacity(0.5);
        page.save();
        page.setLineWidth(10);
        page.restore();

        // draw a rect 1
        page.moveTo(10, 10);
        page.lineTo(90, 10);
        page.lineTo(90, 90);
        page.lineTo(10, 90);
        page.close();
        page.stroke();

        // draw a rect 2
        page.rect(20, 20, 60, 60);
        page.fill();

        // circle
        page.circle(50, 50, 50);
        page.stroke();

        var text = getPageText(page);

        commandsOK(text, "1 0 0 -1 0 100 cm", "canvas-like coord system");
        commandsOK(text, "2 0 0 3 0 0 cm", "page.scale");
        commandsOK(text, "-1 0 0 -1 0 0 cm", "page.rotate");
        commandsOK(text, "1 0 0 RG", "page.setStrokeColor");
        commandsOK(text, "0 0 1 rg", "page.setFillColor");
        commandsOK(text, "/GS[0-9]+ gs /GS[0-9]+ gs", "page.setStrokeOpacity, page.setFillOpacity");
        commandsOK(text, "q 10 w Q", "page.save, page.setLineWidth, page.restore");
        commandsOK(text, "10 10 m 90 10 l 90 90 l 10 90 l h S", "draw a rectangle 1");
        commandsOK(text, "20 20 60 60 re f", "draw a rectangle 2");

        // not really checking the decimals below... might probably
        // differ a bit across browsers/platforms.  the integer parts
        // should be the same though.
        commandsOK(text, [
            "50 100 m",
            "77%DEC 100 100 77%DEC 100 50 c",
            "100 22%DEC 77%DEC 0 50 0 c",
            "22%DEC 0 0 22%DEC 0 50 c",
            "0 77%DEC 22%DEC 100 50 100 c",
            "S"
        ], "draw a circle");

        checkDocumentStructure(pdf.render());
    });

    // can't load binary file.
    // test("[PDF] loading a TTF font", 1, function(){
    //     var fonturl = "/base/tests/pdf/CharisSILLiteracy-R.ttf";
    //     PDF.defineFont({ CharisSI: fonturl });
    //     PDF.loadFonts([ fonturl ], function(){
    //         var pdf = new PDF.Document();
    //         var page = pdf.addPage();
    //         page.beginText();
    //         page.setFont("CharisSI", 12);
    //         page.showText("Foo");
    //         page.endText();
    //     });
    // });

    /* -----[ drawing -> PDF ]----- */

    function draw(func, asserts) {
        var group = new drawing.Group();
        func(function(shape){
            group.append(shape)
        });
        kendo.drawing.pdf.toStream(group, function(data, pdf){
            var page = pdf.pages[0];
            checkDocumentStructure(data);
            asserts(getPageText(page), data, pdf);
        });
    }

    test("[PDF] drawing.Arc", function(){
        draw(function(add){
            var arcGeometry = new geo.Arc([ 100, 100 ], {
                radiusX: 50,
                radiusY: 50,
                startAngle: 0,
                endAngle: 180
            });
            var arc = new drawing.Arc(arcGeometry, {
                stroke: { width: 2, color: "#00f" }
            });
            add(arc);
        }, function(text){
            commandsOK(text, "0 0 1 RG", "stroke color");
            commandsOK(text, "2 w", "stroke width");
            // %DEC means don't care about decimals
            commandsOK(text, [
                "150 100 m",
                "150 113%DEC 144%DEC 126%DEC 135%DEC 135%DEC c",
                "126%DEC 144%DEC 113%DEC 150 100 150 c",
                "86%DEC 150 73%DEC 144%DEC 64%DEC 135%DEC c",
                "55%DEC 126%DEC 50 113%DEC 50 100 c",
                "S"
            ], "draw arc and stroke");
        });
    });

    test("[PDF] drawing.Path", function(){
        draw(function(add){
            var path = new drawing.Path({
                fill: { color: "#f00" },
                stroke: { width: 2, color: "#00f" },
            });
            path.moveTo(10, 10)
                .lineTo(100, 10)
                .lineTo(100, 100)
                .lineTo(10, 100)
                .close();
            add(path);
        }, function(text){
            commandsOK(text, "0 0 1 RG", "stroke color");
            commandsOK(text, "2 w", "stroke width");
            commandsOK(text, "1 0 0 rg", "fill color");
            commandsOK(text, [
                "10 10 90 90 re",
                "B"
            ], "draw path and close/fill/stroke");
        });
    });

    // test("[PDF] drawing.Text", function(){
    //     draw(function(add){
    //         var pos = new geo.Point(10, 10);
    //         var text = new drawing.Text("Foo", pos).fill("#f00").stroke("#00f", 2);
    //         text.options.set("font", "serif 12");
    //         add(text);
    //     }, function(text, data){
    //         commandsOK(text, "0 0 1 RG", "stroke color");
    //         commandsOK(text, "2 w", "stroke width");
    //         commandsOK(text, "1 0 0 rg", "fill color");
    //         commandsOK(text, "BT[^]*? /F[0-9]+ 12 Tf [^]*?ET", "font and size"); // too hard to check whether it's the right font though.
    //         commandsOK(text, "BT[^]*? 2 Tr [^]*?ET", "stroke+fill text rendering mode");
    //         commandsOK(text, "BT[^]*? <000100020002> Tj [^]*?ET", "draw text");
    //     });
    // });

    /* -----[ utils ]----- */

    function checkDocumentStructure(stream) {
        stream.saveExcursion(function(){
            stream.offset(0);
            var text = stream.readString(stream.length());
            ok(/^%PDF-1\.[4567]/.test(text));

            // startxref present
            var m = /startxref\r?\n([0-9]+)\r?\n%%EOF\r?\n$/.exec(text);
            ok(m);
            var pos = parseFloat(m[1]);
            stream.offset(pos);

            // xref can be located
            var xref = stream.readString(4);
            equal(xref, "xref");

            var m = /\r?\n([0-9]+)\s+([0-9]+)\r?\n/.exec(text.substr(stream.offset()));
            ok(m);
            equal(m[1], "0");
            var objCount = parseFloat(m[2]);
            stream.skip(m[0].length);
            for (var i = 0; i < objCount; ++i) {
                var line = stream.readString(20);
                if (i == 0) {
                    ok(/^0000000000 65535 f[\r ]\n$/.test(line));
                } else {
                    var m = /^([0-9]{10}) 00000 n[\r ]\n$/.exec(line);
                    ok(m);
                    var pos = parseFloat(m[1]);
                    ok(text.substr(pos).indexOf(i + " 0 ") == 0);
                }
            }
        });
    }

    function infoOK(text, header, content) {
        var rx = new RegExp("\\/" + header + "\\s*\\(" + content + "\\)");
        ok(rx.test(text));
    }

    function commandsOK(text, sequence, msg) {
        if (sequence instanceof Array) {
            sequence = sequence.join(" ");
        }
        sequence = sequence.replace(/^\s+|\s+$/g, "").split(/\s+/g).join("\\s+");
        sequence = sequence.replace(/%DEC/g, "[0-9.]*");
        var rx = new RegExp("(?:^|\\s)" + sequence + "(?:$|\\s)");
        var fine = rx.test(text);

        ok(fine, msg);

        if (!fine) {
            console.error("Regexp failed:", rx+"");
            console.error(text);
        }
    }

    function getPageText(page) {
        var pageText = PDF.BinaryStream(page._content.data.stream().get());
        pageText = pageText.readString(pageText.length());
        return pageText;
    }

})();
