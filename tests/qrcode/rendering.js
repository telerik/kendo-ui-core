(function() {
    var dataviz = kendo.dataviz,
        QRCode = dataviz.ui.QRCode,
        qrcode,
        Point = dataviz.Point2D,
        view,
        size = 240,
        value = "mailto:clientservice@kendoui.com";

    function createQRCode() {
        QUnit.fixture.html("<div id='container'></div>");
        $("#container").kendoQRCode({});

        qrcode = $("#container").data("kendoQRCode");
    }      
    function setup() { 
        createQRCode();  
        view = new ViewStub();
        qrcode._view = view;
        view.renderTo = function(){};
        view.options = {};          
    }
    
    function teardown() {
        kendo.destroy(QUnit.fixture);
    }
    
    // ------------------------------------------------------------
    
    module("qr options", {
        setup: setup,
        teardown: teardown
    });
   
    test("the background rectangle is rendered with the qrcode size", function() { 
        qrcode.setOptions({
            value: value,            
            size: 240
        });
        
        var rect = view.log.rect[0];
        equal(rect.x1, 0);
        equal(rect.x2, 240);
        equal(rect.y1, 0);
        equal(rect.y2, 240);
    });
    
    test("the background box fill color is set from the background option", function() { 
        var background = "red",
            options;
        qrcode.setOptions({
            value: value,            
            size: 240,
            background: background
        });
        
        options = view.log.rect[0].style;
        equal(options.fill, background);
        
    });    

    test("the background rectangle is shifted if a border is set", function() {   
        qrcode.setOptions({
            value: value,
            border: {
                width: 4,
                color: "black"
            },
            size: 240
        });
        
        var rect = view.log.rect[0];
        equal(rect.x1, 2);
        equal(rect.x2, 238);
        equal(rect.y1, 2);
        equal(rect.y2, 238);
    });
    
    test("the border options are used for the background rectangle stroke options", function() { 
        var borderColor = "aqua",
            borderWidth = 4,
            options;
        qrcode.setOptions({
            value: value,
            border: {
                width: borderWidth,
                color: borderColor
            },
            size: 240
        });
        
        options = view.log.rect[0].style;
        equal(options.stroke, borderColor);        
        equal(options.strokeWidth, borderWidth);   
    });    
    
    test("the padding is taken into account when placing the qrcode modules", function() {   
        qrcode.setOptions({
            value: value,
            border: {
                width: 4,
                color: "black"
            },
            padding: 5,
            size: 240
        });
        
        var modules = view.log.multiLine[0];
        equal(modules.lines[0][0].y, 19);
        equal(modules.lines[0][0].x, 19);                
    });  
    
    module("rendering", {
        setup: setup,
        teardown: teardown
    });    
    
    test("bit matrix rendering", function() {
        qrcode.setOptions({
            value: value,
            border: {
                width: 4,
                color: "black"
            },
            padding: 5,
            size: 240
        });
        var expectedResult = [[Point(19,19),Point(68,19),Point(68,26),Point(19,26)],[Point(75,19),Point(82,19),Point(82,26),Point(75,26)],[Point(96,19),Point(110,19),Point(110,26),Point(96,26)],[Point(124,19),Point(152,19),Point(152,26),Point(124,26)],[Point(173,19),Point(222,19),Point(222,26),Point(173,26)],[Point(19,26),Point(26,26),Point(26,33),Point(19,33)],[Point(61,26),Point(68,26),Point(68,33),Point(61,33)],[Point(82,26),Point(96,26),Point(96,33),Point(82,33)],[Point(131,26),Point(138,26),Point(138,33),Point(131,33)],[Point(152,26),Point(159,26),Point(159,33),Point(152,33)],[Point(173,26),Point(180,26),Point(180,33),Point(173,33)],[Point(215,26),Point(222,26),Point(222,33),Point(215,33)],[Point(19,33),Point(26,33),Point(26,40),Point(19,40)],[Point(33,33),Point(54,33),Point(54,40),Point(33,40)],[Point(61,33),Point(68,33),Point(68,40),Point(61,40)],[Point(89,33),Point(96,33),Point(96,40),Point(89,40)],[Point(103,33),Point(110,33),Point(110,40),Point(103,40)],[Point(124,33),Point(138,33),Point(138,40),Point(124,40)],[Point(173,33),Point(180,33),Point(180,40),Point(173,40)],[Point(187,33),Point(208,33),Point(208,40),Point(187,40)],[Point(215,33),Point(222,33),Point(222,40),Point(215,40)],[Point(19,40),Point(26,40),Point(26,47),Point(19,47)],[Point(33,40),Point(54,40),Point(54,47),Point(33,47)],[Point(61,40),Point(68,40),Point(68,47),Point(61,47)],[Point(103,40),Point(110,40),Point(110,47),Point(103,47)],[Point(131,40),Point(145,40),Point(145,47),Point(131,47)],[Point(152,40),Point(166,40),Point(166,47),Point(152,47)],[Point(173,40),Point(180,40),Point(180,47),Point(173,47)],[Point(187,40),Point(208,40),Point(208,47),Point(187,47)],[Point(215,40),Point(222,40),Point(222,47),Point(215,47)],[Point(19,47),Point(26,47),Point(26,54),Point(19,54)],[Point(33,47),Point(54,47),Point(54,54),Point(33,54)],[Point(61,47),Point(68,47),Point(68,54),Point(61,54)],[Point(82,47),Point(89,47),Point(89,54),Point(82,54)],[Point(96,47),Point(103,47),Point(103,54),Point(96,54)],[Point(117,47),Point(138,47),Point(138,54),Point(117,54)],[Point(145,47),Point(159,47),Point(159,54),Point(145,54)],[Point(173,47),Point(180,47),Point(180,54),Point(173,54)],[Point(187,47),Point(208,47),Point(208,54),Point(187,54)],[Point(215,47),Point(222,47),Point(222,54),Point(215,54)],[Point(19,54),Point(26,54),Point(26,61),Point(19,61)],[Point(61,54),Point(68,54),Point(68,61),Point(61,61)],[Point(89,54),Point(96,54),Point(96,61),Point(89,61)],[Point(103,54),Point(110,54),Point(110,61),Point(103,61)],[Point(124,54),Point(138,54),Point(138,61),Point(124,61)],[Point(173,54),Point(180,54),Point(180,61),Point(173,61)],[Point(215,54),Point(222,54),Point(222,61),Point(215,61)],[Point(19,61),Point(68,61),Point(68,68),Point(19,68)],[Point(75,61),Point(82,61),Point(82,68),Point(75,68)],[Point(89,61),Point(96,61),Point(96,68),Point(89,68)],[Point(103,61),Point(110,61),Point(110,68),Point(103,68)],[Point(117,61),Point(124,61),Point(124,68),Point(117,68)],[Point(131,61),Point(138,61),Point(138,68),Point(131,68)],[Point(145,61),Point(152,61),Point(152,68),Point(145,68)],[Point(159,61),Point(166,61),Point(166,68),Point(159,68)],[Point(173,61),Point(222,61),Point(222,68),Point(173,68)],[Point(75,68),Point(82,68),Point(82,75),Point(75,75)],[Point(89,68),Point(103,68),Point(103,75),Point(89,75)],[Point(110,68),Point(117,68),Point(117,75),Point(110,75)],[Point(124,68),Point(138,68),Point(138,75),Point(124,75)],[Point(145,68),Point(166,68),Point(166,75),Point(145,75)],[Point(19,75),Point(33,75),Point(33,82),Point(19,82)],[Point(40,75),Point(54,75),Point(54,82),Point(40,82)],[Point(61,75),Point(68,75),Point(68,82),Point(61,82)],[Point(82,75),Point(103,75),Point(103,82),Point(82,82)],[Point(110,75),Point(117,75),Point(117,82),Point(110,82)],[Point(138,75),Point(145,75),Point(145,82),Point(138,82)],[Point(152,75),Point(159,75),Point(159,82),Point(152,82)],[Point(173,75),Point(180,75),Point(180,82),Point(173,82)],[Point(215,75),Point(222,75),Point(222,82),Point(215,82)],[Point(19,82),Point(26,82),Point(26,89),Point(19,89)],[Point(40,82),Point(47,82),Point(47,89),Point(40,89)],[Point(54,82),Point(61,82),Point(61,89),Point(54,89)],[Point(68,82),Point(75,82),Point(75,89),Point(68,89)],[Point(82,82),Point(89,82),Point(89,89),Point(82,89)],[Point(103,82),Point(117,82),Point(117,89),Point(103,89)],[Point(131,82),Point(138,82),Point(138,89),Point(131,89)],[Point(145,82),Point(152,82),Point(152,89),Point(145,89)],[Point(166,82),Point(173,82),Point(173,89),Point(166,89)],[Point(180,82),Point(201,82),Point(201,89),Point(180,89)],[Point(19,89),Point(26,89),Point(26,96),Point(19,96)],[Point(40,89),Point(47,89),Point(47,96),Point(40,96)],[Point(61,89),Point(68,89),Point(68,96),Point(61,96)],[Point(89,89),Point(103,89),Point(103,96),Point(89,96)],[Point(110,89),Point(117,89),Point(117,96),Point(110,96)],[Point(124,89),Point(145,89),Point(145,96),Point(124,96)],[Point(180,89),Point(187,89),Point(187,96),Point(180,96)],[Point(201,89),Point(208,89),Point(208,96),Point(201,96)],[Point(26,96),Point(40,96),Point(40,103),Point(26,103)],[Point(75,96),Point(117,96),Point(117,103),Point(75,103)],[Point(131,96),Point(152,96),Point(152,103),Point(131,103)],[Point(159,96),Point(166,96),Point(166,103),Point(159,103)],[Point(173,96),Point(180,96),Point(180,103),Point(173,103)],[Point(194,96),Point(201,96),Point(201,103),Point(194,103)],[Point(208,96),Point(222,96),Point(222,103),Point(208,103)],[Point(40,103),Point(54,103),Point(54,110),Point(40,110)],[Point(61,103),Point(68,103),Point(68,110),Point(61,110)],[Point(75,103),Point(89,103),Point(89,110),Point(75,110)],[Point(96,103),Point(117,103),Point(117,110),Point(96,110)],[Point(124,103),Point(138,103),Point(138,110),Point(124,110)],[Point(152,103),Point(166,103),Point(166,110),Point(152,110)],[Point(173,103),Point(187,103),Point(187,110),Point(173,110)],[Point(208,103),Point(215,103),Point(215,110),Point(208,110)],[Point(19,110),Point(26,110),Point(26,117),Point(19,117)],[Point(47,110),Point(61,110),Point(61,117),Point(47,117)],[Point(75,110),Point(89,110),Point(89,117),Point(75,117)],[Point(110,110),Point(124,110),Point(124,117),Point(110,117)],[Point(131,110),Point(152,110),Point(152,117),Point(131,117)],[Point(166,110),Point(194,110),Point(194,117),Point(166,117)],[Point(201,110),Point(208,110),Point(208,117),Point(201,117)],[Point(215,110),Point(222,110),Point(222,117),Point(215,117)],[Point(54,117),Point(68,117),Point(68,124),Point(54,124)],[Point(75,117),Point(82,117),Point(82,124),Point(75,124)],[Point(89,117),Point(117,117),Point(117,124),Point(89,124)],[Point(131,117),Point(145,117),Point(145,124),Point(131,124)],[Point(152,117),Point(201,117),Point(201,124),Point(152,124)],[Point(215,117),Point(222,117),Point(222,124),Point(215,124)],[Point(26,124),Point(33,124),Point(33,131),Point(26,131)],[Point(40,124),Point(61,124),Point(61,131),Point(40,131)],[Point(96,124),Point(103,124),Point(103,131),Point(96,131)],[Point(124,124),Point(131,124),Point(131,131),Point(124,131)],[Point(152,124),Point(173,124),Point(173,131),Point(152,131)],[Point(180,124),Point(222,124),Point(222,131),Point(180,131)],[Point(19,131),Point(33,131),Point(33,138),Point(19,138)],[Point(40,131),Point(47,131),Point(47,138),Point(40,138)],[Point(61,131),Point(82,131),Point(82,138),Point(61,138)],[Point(117,131),Point(124,131),Point(124,138),Point(117,138)],[Point(159,131),Point(166,131),Point(166,138),Point(159,138)],[Point(180,131),Point(187,131),Point(187,138),Point(180,138)],[Point(208,131),Point(215,131),Point(215,138),Point(208,138)],[Point(19,138),Point(33,138),Point(33,145),Point(19,145)],[Point(40,138),Point(47,138),Point(47,145),Point(40,145)],[Point(54,138),Point(61,138),Point(61,145),Point(54,145)],[Point(75,138),Point(124,138),Point(124,145),Point(75,145)],[Point(131,138),Point(145,138),Point(145,145),Point(131,145)],[Point(152,138),Point(166,138),Point(166,145),Point(152,145)],[Point(187,138),Point(208,138),Point(208,145),Point(187,145)],[Point(19,145),Point(54,145),Point(54,152),Point(19,152)],[Point(61,145),Point(68,145),Point(68,152),Point(61,152)],[Point(96,145),Point(103,145),Point(103,152),Point(96,152)],[Point(124,145),Point(131,145),Point(131,152),Point(124,152)],[Point(138,145),Point(145,145),Point(145,152),Point(138,152)],[Point(152,145),Point(159,145),Point(159,152),Point(152,152)],[Point(173,145),Point(180,145),Point(180,152),Point(173,152)],[Point(187,145),Point(194,145),Point(194,152),Point(187,152)],[Point(215,145),Point(222,145),Point(222,152),Point(215,152)],[Point(19,152),Point(40,152),Point(40,159),Point(19,159)],[Point(68,152),Point(82,152),Point(82,159),Point(68,159)],[Point(103,152),Point(110,152),Point(110,159),Point(103,159)],[Point(117,152),Point(124,152),Point(124,159),Point(117,159)],[Point(131,152),Point(138,152),Point(138,159),Point(131,159)],[Point(152,152),Point(173,152),Point(173,159),Point(152,159)],[Point(194,152),Point(215,152),Point(215,159),Point(194,159)],[Point(19,159),Point(47,159),Point(47,166),Point(19,166)],[Point(61,159),Point(82,159),Point(82,166),Point(61,166)],[Point(89,159),Point(96,159),Point(96,166),Point(89,166)],[Point(103,159),Point(124,159),Point(124,166),Point(103,166)],[Point(131,159),Point(145,159),Point(145,166),Point(131,166)],[Point(159,159),Point(194,159),Point(194,166),Point(159,166)],[Point(201,159),Point(208,159),Point(208,166),Point(201,166)],[Point(75,166),Point(82,166),Point(82,173),Point(75,173)],[Point(89,166),Point(96,166),Point(96,173),Point(89,173)],[Point(117,166),Point(131,166),Point(131,173),Point(117,173)],[Point(138,166),Point(152,166),Point(152,173),Point(138,173)],[Point(159,166),Point(166,166),Point(166,173),Point(159,173)],[Point(187,166),Point(194,166),Point(194,173),Point(187,173)],[Point(19,173),Point(68,173),Point(68,180),Point(19,180)],[Point(103,173),Point(110,173),Point(110,180),Point(103,180)],[Point(117,173),Point(166,173),Point(166,180),Point(117,180)],[Point(173,173),Point(180,173),Point(180,180),Point(173,180)],[Point(187,173),Point(194,173),Point(194,180),Point(187,180)],[Point(19,180),Point(26,180),Point(26,187),Point(19,187)],[Point(61,180),Point(68,180),Point(68,187),Point(61,187)],[Point(117,180),Point(131,180),Point(131,187),Point(117,187)],[Point(138,180),Point(145,180),Point(145,187),Point(138,187)],[Point(152,180),Point(166,180),Point(166,187),Point(152,187)],[Point(187,180),Point(201,180),Point(201,187),Point(187,187)],[Point(215,180),Point(222,180),Point(222,187),Point(215,187)],[Point(19,187),Point(26,187),Point(26,194),Point(19,194)],[Point(33,187),Point(54,187),Point(54,194),Point(33,194)],[Point(61,187),Point(68,187),Point(68,194),Point(61,194)],[Point(75,187),Point(82,187),Point(82,194),Point(75,194)],[Point(89,187),Point(96,187),Point(96,194),Point(89,194)],[Point(110,187),Point(124,187),Point(124,194),Point(110,194)],[Point(131,187),Point(138,187),Point(138,194),Point(131,194)],[Point(145,187),Point(201,187),Point(201,194),Point(145,194)],[Point(208,187),Point(222,187),Point(222,194),Point(208,194)],[Point(19,194),Point(26,194),Point(26,201),Point(19,201)],[Point(33,194),Point(54,194),Point(54,201),Point(33,201)],[Point(61,194),Point(68,194),Point(68,201),Point(61,201)],[Point(75,194),Point(89,194),Point(89,201),Point(75,201)],[Point(103,194),Point(110,194),Point(110,201),Point(103,201)],[Point(124,194),Point(159,194),Point(159,201),Point(124,201)],[Point(166,194),Point(173,194),Point(173,201),Point(166,201)],[Point(194,194),Point(208,194),Point(208,201),Point(194,201)],[Point(215,194),Point(222,194),Point(222,201),Point(215,201)],[Point(19,201),Point(26,201),Point(26,208),Point(19,208)],[Point(33,201),Point(54,201),Point(54,208),Point(33,208)],[Point(61,201),Point(68,201),Point(68,208),Point(61,208)],[Point(82,201),Point(89,201),Point(89,208),Point(82,208)],[Point(117,201),Point(131,201),Point(131,208),Point(117,208)],[Point(138,201),Point(145,201),Point(145,208),Point(138,208)],[Point(180,201),Point(194,201),Point(194,208),Point(180,208)],[Point(201,201),Point(222,201),Point(222,208),Point(201,208)],[Point(19,208),Point(26,208),Point(26,215),Point(19,215)],[Point(61,208),Point(68,208),Point(68,215),Point(61,215)],[Point(75,208),Point(96,208),Point(96,215),Point(75,215)],[Point(103,208),Point(138,208),Point(138,215),Point(103,215)],[Point(145,208),Point(159,208),Point(159,215),Point(145,215)],[Point(173,208),Point(180,208),Point(180,215),Point(173,215)],[Point(187,208),Point(208,208),Point(208,215),Point(187,215)],[Point(215,208),Point(222,208),Point(222,215),Point(215,215)],[Point(19,215),Point(68,215),Point(68,222),Point(19,222)],[Point(75,215),Point(82,215),Point(82,222),Point(75,222)],[Point(89,215),Point(110,215),Point(110,222),Point(89,222)],[Point(124,215),Point(131,215),Point(131,222),Point(124,222)],[Point(152,215),Point(180,215),Point(180,222),Point(152,222)]];        
        deepEqual(expectedResult, view.log.multiLine[0].lines);
    });
    
})();
