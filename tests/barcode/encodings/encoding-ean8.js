(function() {
    var dataviz = kendo.dataviz,
    encodings = dataviz.encodings;
    var encoding;

    module("ean8", {
        setup: function() {
            encoding = new encodings.ean8();
        },
        teardown: function(){
            encoding = null;
        }
    });


    test("test pattern for value 1234567 ", function(){
        var result,
            value = "1234567",
            height = 100,
            expectedResult = [10,1,1,1,{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":4},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},1,1,1,1,1,{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":4},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},1,1,1,10];
            // [10,1,1,1,2,2,2,1,2,1,2,2,1,4,1,1,1,1,3,2,1,1,1,1,1,1,2,3,1,1,1,1,4,1,3,1,2,3,2,1,1,1,1,1,10]
            result = encoding.encode(value, 300, 100);
            ok(comparePatterns(result.pattern,expectedResult ));
    });

     test("test pattern for value 7248733 ", function(){
        var result,
            value = "7248733",
            expectedResult = [10,1,1,1,{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},1,1,1,1,1,{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":4},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":4},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},1,1,1,10];
            //[10,1,1,1,1,3,1,2,2,1,2,2,1,1,3,2,1,2,1,3,1,1,1,1,1,1,3,1,2,1,4,1,1,1,4,1,1,1,1,3,2,1,1,1,10]
            result = encoding.encode(value, 300, 100);
            ok(comparePatterns(result.pattern,expectedResult ));
    });

    test("test pattern for value 0000000 ", function(){
        var result,
            value = "0000000",
            expectedResult = [10,1,1,1,{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},1,1,1,1,1,{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},1,1,1,10];
            //[10,1,1,1,3,2,1,1,3,2,1,1,3,2,1,1,3,2,1,1,1,1,1,1,1,3,2,1,1,3,2,1,1,3,2,1,1,3,2,1,1,1,1,1,10]
            result = encoding.encode(value, 300, 100);
            ok(comparePatterns(result.pattern,expectedResult ));
    });


    test("test pattern for value 9999999 ", function(){
        var result,
            value = "9999999",
            expectedResult = [10,1,1,1,{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},1,1,1,1,1,{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},1,1,1,10];
            //[10,1,1,1,3,1,1,2,3,1,1,2,3,1,1,2,3,1,1,2,1,1,1,1,1,3,1,1,2,3,1,1,2,3,1,1,2,1,2,3,1,1,1,1,10]
            result = encoding.encode(value, 300, 100);
            ok(comparePatterns(result.pattern,expectedResult ));
    });

    test("test pattern for value 5432167 ", function(){
        var result,
            value = "5432167",
            expectedResult = [10,1,1,1,{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":4},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":2},1,1,1,1,1,{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":4},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":3},{"y1":0,"y2":95,"width":2},{"y1":0,"y2":95,"width":1},{"y1":0,"y2":95,"width":1},1,1,1,10];
            //[10,1,1,1,1,2,3,1,1,1,3,2,1,4,1,1,2,1,2,2,1,1,1,1,1,2,2,2,1,1,1,1,4,1,3,1,2,3,2,1,1,1,1,1,10]
            result = encoding.encode(value, 300, 100);
            ok(comparePatterns(result.pattern,expectedResult ));
    });

    test("test checksum of 5432167 ", function(){
        var result,
            value = "5432167";
            expectedChecksum = 0;
            encoding.encode(value, 300, 100);
            ok(comparePatterns(expectedChecksum,encoding.calculateChecksum()));
    });

    test("test checksum of 7248733 ", function(){
        var result,
            value = "7248733";
            expectedChecksum = 4;
            encoding.encode(value, 300, 100);
            ok(comparePatterns(expectedChecksum,encoding.calculateChecksum()));
    });
})();
