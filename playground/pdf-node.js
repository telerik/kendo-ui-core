global.kendo = {};

require("../src/pdf/core.js");
require("../src/pdf/ttf.js");

var fs = require("fs");

function mm2pt(mm) {
    return mm * (72/25.4);
}

var PDF = kendo.pdf;
var pdf = new PDF.Document();
var page = pdf.addPage();

page.save();
page.translate(120, 150);
page.beginText();
page.setFont("Times-Roman", 20);
page.showText("Hello");
page.endText();
page.restore();

page.save();
page.gradient({
    type: "linear",
    start: { x: 100, y: 100 },
    end: { x: 200, y: 200 },
    stops: [
        { offset:   0, color: { r: 1, g: 0, b: 0, a: 1 } },
        //{ offset: 0.5, color: { r: 1, g: 1, b: 0, a: 0.9 } },
        { offset:   1, color: { r: 0, g: 1, b: 1, a: 1 } },
    ]
}, {
    left: 100,
    top: 200,
    width: 100,
    height: 100
});

// page.rect(100, 100, 100, 100);
// page.fillStroke();
page.restore();


page.save();
page.gradient({
    type: "radial",
    start: { x: 150, y: 350, r: 100 },
    end: { x: 150, y: 350, r: 20 },
    stops: [
        { offset:   0, color: { r: 1, g: 0, b: 0, a: 1 } },
        { offset: 0.5, color: { r: 1, g: 1, b: 0, a: 0.7 } },
        { offset:   1, color: { r: 0, g: 1, b: 1, a: 1 } },
    ]
}, {
    left   : 0,
    top    : 800,
    width  : 300,
    height : 300
});
page.rect(0, 250, 450, 450);
page.fillStroke();
page.restore();






if(0){









var page = pdf.addPage();

var opacity = pdf.dict({
    Type: pdf.name("ExtGState"),
    CA: 1,
    ca: 1,
    SMask: {
        Type: pdf.name("Mask"),
        S: pdf.name("Luminosity"),
        G: pdf.stream({
            Type: pdf.name("XObject"),
            Subtype: pdf.name("Form"),
            FormType: 1,
            BBox: [ 100, 100, 200, 200 ],
            Group: {
                Type: pdf.name("Group"),
                S: pdf.name("Transparency"),
                CS: pdf.name("DeviceGray"),
                I: true
            },
            Resources: {
                ExtGState: {
                    a0: { CA: 1, ca: 1 }
                },
                Shading: {
                    s0: {
                        ColorSpace: pdf.name("DeviceGray"),
                        Coords: [ 100, 100, 200, 200 ],
                        Domain: [ 0, 1 ],
                        ShadingType: 2,
                        Function: {
                            FunctionType: 2,
                            Domain: [ 0, 1 ],
                            Range: [ 0, 1 ],
                            N: 3,
                            C0: [ 1 ],
                            C1: [ 0 ]
                        }
                    }
                }
            }
        }, "/a0 gs /s0 sh")
    }
});

page._gsResources["OP1"] = pdf.attach(opacity);

var pat = pdf.dict({
    Type: pdf.name("Pattern"),
    PatternType: 2,
    //ExtGState: opacity,
    Shading: {
        ShadingType: 2,
        ColorSpace: pdf.name("DeviceRGB"),
        BBox: [ 100, 200, 200, 100 ],
        Coords: [ 100, 100, 200, 200 ],
        Domain: [ 0, 1 ],
        Extend: [ false, false ],
        Function: {
            FunctionType: 3,
            Functions: [
                {
                    FunctionType: 2,
                    Domain: [ 0, 1 ],
                    Range: [ 0, 1, 0, 1, 0, 1 ],
                    N: 1,
                    C0: [ 1, 0, 0 ],
                    C1: [ 1, 1, 0 ]
                },
                {
                    FunctionType: 2,
                    Domain: [ 0, 1 ],
                    Range: [ 0, 1, 0, 1, 0, 1 ],
                    N: 1,
                    C0: [ 1, 1, 0 ],
                    C1: [ 0, 1, 1 ]
                }
            ],
            Domain: [ 0, 1 ],
            Bounds: [ 0.5 ],
            Encode: [ 0, 1, 0, 1 ]
        }
    },
    Matrix: [ 1, 0, 0, 1, 0, 0 ]
});

page._patResources["P1"] = pdf.attach(pat);

page.save();
page.translate(120, 150);
page.beginText();
page.setFont("Times-Roman", 20);
page.showText("Hello");
page.endText();
page.restore();

page.rect(100, 100, 100, 100);
page._out("/OP1 gs\n");
page._out("/Pattern cs\n");
page._out("/P1 scn\n");
page.fill();

}

var stream = pdf.render();
var data = stream.get();

fs.writeFileSync("/tmp/pdf.pdf", new Buffer(data));
