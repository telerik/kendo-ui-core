(function(){

    var PDF = kendo.pdf;

    module("pdf-core", {

    });

    function infoOK(text, header, content) {
        var rx = new RegExp("\\/" + header + "\\s*\\(" + content + "\\)");
        ok(rx.test(text));
    }

    function commandsOK(text, sequence, msg) {
        if (sequence instanceof Array) {
            sequence = sequence.join(" ");
        }
        sequence = sequence.replace(/^\s+|\s+$/g, "").split(/\s+/g).join("\\s+");
        var rx = new RegExp(sequence);
        var pass = rx.test(text);
        ok(pass);
        if (!pass && msg) {
            console.error(msg);
        }
    }

    function getPageText(page) {
        var pageText = PDF.BinaryStream(page._content.data.stream().get());
        pageText = pageText.readString(pageText.length());
        return pageText;
    }

    test("[PDF] basic sanity checking", function(){
        var pdf = new PDF.Document();
        pdf.addPage();
        var data = pdf.render();
        var text = data.readString(data.length());
        ok(/^%PDF-1\.[4567]/.test(text));
        infoOK(text, "Producer", "Kendo UI PDF Generator");
    });

    test("[PDF] options make it into the document", function(){
        var pdf = new PDF.Document({
            paperSize: [ 100, 200 ],
            landscape: true,
            margin: { left: 50, top: 50, right: 50, bottom: 50 },
            addMargin: true,
            title: "The Title",
            author: "The Author",
            subject: "The Subject",
            keywords: "The Keywords",
            creator: "The Creator",
            date: new Date(1979, 02, 08, 12, 0, 0, 0)
        });
        var page = pdf.addPage();
        var data = pdf.render();
        var text = data.readString(data.length());

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
            "/F1 12 Tf",
            "\\(Foo bar baz\\) Tj",
            "ET"
        ], "basic text drawing");
    });

    test("[PDF] basic drawing primitives", function(){
        var pdf = new PDF.Document({ paperSize: [ 100, 100 ] });
        var page = pdf.addPage();

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
            "77[0-9.]* 100 100 77[0-9.]* 100 50 c",
            "100 22[0-9.]* 77[0-9.]* 0 50 0 c",
            "22[0-9.]* 0 0 22[0-9.]* 0 50 c",
            "0 77[0-9.]* 22[0-9.]* 100 50 100 c",
            "S"
        ], "draw a circle");
    });

})();
