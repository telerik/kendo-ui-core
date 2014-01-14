(function() {
    var dataviz = kendo.dataviz,
    encodings = dataviz.encodings,
    encoding,
        characters = {
            "0": function (ratio){return [1, 1,1, ratio,ratio,  1,ratio, 1,1];},
            "1": function (ratio){return [ratio, 1,1, ratio,1,  1,1, 1,ratio];},
            "2": function (ratio){return [1, 1,ratio, ratio,1,  1,1, 1,ratio];},
            "3": function (ratio){return [ratio, 1,ratio, ratio,1,  1,1, 1,1];},
            "4": function (ratio){return [1, 1,1, ratio,ratio,  1,1, 1,ratio];},
            "5": function (ratio){return [ratio, 1,1, ratio,ratio,  1,1, 1,1];},
            "6": function (ratio){return [1, 1,ratio, ratio,ratio,  1,1, 1,1];},
            "7": function (ratio){return [1, 1,1, ratio,1,  1,ratio, 1,ratio];},
            "8": function (ratio){return [ratio, 1,1, ratio,1,  1,ratio, 1,1];},
            "START": function(ratio){ return [1, ratio,1, 1,ratio,  1,ratio, 1,1];},
            "E": function (ratio){return [ratio, 1,1, 1,ratio,  ratio,1, 1,1];},
            "H": function (ratio){return [ratio, 1,1, 1,1,  ratio,ratio, 1,1];},
            "I": function (ratio){return [1, 1,ratio, 1,1,  ratio,ratio, 1,1];},
            "O": function (ratio){return [ratio, 1,1, 1,ratio,  1,1, ratio,ratio];},
            "P": function (ratio){return [1, 1,ratio, 1,ratio,  1,1, ratio,1];},
            "S": function (ratio){return [1, 1,ratio, 1,1,  1,ratio, ratio,1];},
            "T": function (ratio){return [1, 1,1, 1,ratio,  1,ratio, ratio,1];},
            "-": function (ratio){return [1, ratio,1, 1,1,  1,ratio, 1,ratio];},
            ".": function (ratio){return [ratio, ratio,1, 1,1,  1,ratio, 1,1];},
            " ": function (ratio){return [1, ratio,ratio, 1,1,  1,ratio, 1,1];},
            "$": function (ratio){return [1, ratio,1, ratio,1,  ratio,1, 1,1];},
            "/": function (ratio){return [1, ratio,1, ratio,1,  1,1, ratio,1];},
            "+": function (ratio){return [1, ratio,1, 1,1,  ratio,1, ratio,1];},
            "%":function (ratio){return [1, 1,1, ratio,1,  ratio,1, ratio,1];},
            "GAP": 1
        };

    function generateResult(value, ratio, options){
        var expectedResult = [];
        if(options.quietZoneLength){
            expectedResult.push(options.quietZoneLength);
        }

        expectedResult.push.apply(characters.START(ratio));
        expectedResult.push(characters.GAP);

        for( var i = 0; i < value.length; i++){
            expectedResult.push.apply(characters[value.charAt(i)](ratio));
            expectedResult.push(characters.GAP);
        }

        expectedResult.push.apply(characters.START(ratio));

        if(options.quietZoneLength){
            expectedResult.push(options.quietZoneLength);
        }

        return expectedResult;
    }

    // charLength = 3 * ratio + 6 * 1;
    // 2 * QZL + (length + startStopLength + checkLength)* charLength + gapWidth * (length + checkLength + startLength)
    function calculateBaseUnit(width, length, ratio, quietZoneLength, checkLength, gapWidth){
        var characterLength = 3 * (ratio + 2);
        return width /
            ( 2 * quietZoneLength + (length + 2 + checkLength) * characterLength + gapWidth * (length + checkLength + 1));
    }

    module("code39", {
        setup: function() {
            encoding = new encodings.code39();
        },
        teardown: function(){
            encoding = null;
        }
    });

    test("test value TEST8052 is correctly encoded", function() {
        var value = "TEST8052",
            result = encoding.encode(value, 300, 100),
            expectedResult = generateResult(value, encoding.ratio,
                {quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern, expectedResult));
    });

    test("test value HI345678 is correctly encoded", function() {
        var value = "HI345678",
            result = encoding.encode(value, 300, 100),
            expectedResult = generateResult(value, encoding.ratio,
                {quietZoneLength:  encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern, expectedResult));
    });

    test("test value ' 0.1-2$3/4+%' is correctly encoded", function() {
        var value = " 0.1-2$3/4+%",
            result = encoding.encode(value, 300, 100),
            expectedResult = generateResult(value, encoding.ratio,
                {quietZoneLength:  encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern, expectedResult));
    });      

    test("test invalid character error", function() {
        var thrownError = false;
        try{
            encoding.encode("aAAST*", 300, 100);
        }
        catch (ex){
            thrownError = true;
        }
        ok(thrownError);
    });


    test("test insufficient width error", function() {
        var value = "00000",
            width = 84,
            thrownError = false;

        try{
            encoding.encode(value, width, 100);
        }
        catch (ex){
            thrownError = true;
        }
        ok(thrownError);
    });

    test("test insufficient height error", function() {
        var value = "00000",
            width = 84,
            height = 20,
            thrownError = false;

        try{
            encoding.encode(value, width, height);
        }
        catch (ex){
            thrownError = true;
        }
        ok(thrownError);
    });

    test("test base unit calculation", function() {
        var width = 200,
            height = 100,
            value = "HI345678",
            quietZoneLength = encoding.options.quietZoneLength,
            result,
            expectedResult;

            result = encoding.encode(value, width, height).baseUnit;
            expectedResult = calculateBaseUnit(width, value.length, encoding.ratio, quietZoneLength, 0, encoding.gapWidth);
            equal(result, expectedResult);
    });

    test("test ratio calculation", function() {
        var result1,
            result2,
            result3,
            value = "00000",
            width1 = 92,
            width2 = 87.3,
            width3 = 84.5,
            expectedResult1 = 3,
            expectedResult2 = 2.7,
            expectedResult3 = 2.5;

            encoding.encode(value, width1, 100);
            result1 = parseFloat(encoding.ratio.toFixed(1));
            equal(result1, expectedResult1);

            encoding.encode(value, width2, 100);
            result2 = parseFloat(encoding.ratio.toFixed(1));
            equal(result2, expectedResult2);

            encoding.encode(value, width3, 100);
            result3 = parseFloat(encoding.ratio.toFixed(1));
            equal(result3, expectedResult3);
    });
})();
