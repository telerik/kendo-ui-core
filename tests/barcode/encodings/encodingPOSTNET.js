(function() {
    var dataviz = kendo.dataviz,
        encodings = dataviz.encodings,
        encoding,
        START = function(height){ return {width: 1, y1: 0, y2: height};},
        GAP = 1,
        DIGIT_SEPARATOR = "-",
        characters = [
            function(height){ return [{width: 1, y1: 0, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1];},
            function(height){ return [{width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1,{width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1];},
            function(height){ return [{width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1];},
            function(height){ return [{width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1,{width: 1, y1: 0, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1];},
            function(height){ return [{width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1,{width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1];},
            function(height){ return [{width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1,{width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1];},
            function(height){ return [{width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1,{width: 1, y1: 0, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1];},
            function(height){ return [{width: 1, y1: 0, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1,{width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1];},
            function(height){ return [{width: 1, y1: 0, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1,{width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: 0, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1];},
            function(height){ return [{width: 1, y1: 0, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1,{width: 1, y1: 0, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1, {width: 1, y1: height / 2, y2: height}, 1];},
        ];

    function generateResult(value, height, options){
        value = value.replace(new RegExp(DIGIT_SEPARATOR,"g"),"");
        var expectedResult = [];
        if(options.quietZoneLength){
            expectedResult.push(options.quietZoneLength);
        }

        expectedResult.push(START(height));
        expectedResult.push(GAP);
        for( var i = 0; i < value.length; i++){
            expectedResult.push.array(characters[value.charAt(i)](height));
        }

        if(options.checkValue !== undefined){
            expectedResult.push.array(characters[options.checkValue](height));
        }

        expectedResult.push(START(height));

        if(options.quietZoneLength){
            expectedResult.push(options.quietZoneLength);
        }

        return expectedResult;
    }

    module("postnet", {
        setup: function() {
            encoding = new encodings.postnet();
        },
        teardown: function(){
            encoding = null;
        }
    });

    test("test value 01234", function(){
        var value = "01234",
            height= 100,
            result = encoding.encode(value, 200, height),
            expectedResult = generateResult(value, height,
                {checkValue: 0, quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test value 80122-1905", function(){
        var value = "80122-1905",
            height= 100,
            result = encoding.encode(value, 200, height),
            expectedResult = generateResult(value, height,
                {checkValue: 2, quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test value 80122-2014-01", function(){
        var value = "80122-2014-01",
            height= 100,
            result = encoding.encode(value, 200, height),
            expectedResult = generateResult(value, height,
                {checkValue: 9, quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test invalid character error", function() {
        var thrownError = false;
        try{
            encoding.encode("1111-1a21", 300, 100);
        }
        catch (ex){
            thrownError = true;
        }
        ok(thrownError);
    });

    test("test invalid length error", function() {
        var thrownError = false;
        try{
            encoding.encode("1111-112", 300, 100);
        }
        catch (ex){
            thrownError = true;
        }
        ok(thrownError);
    });

    test("test base unit calculation", function(){
        var width = 100,
            height = 100,
            precision = 2,
            quietZoneLength = 2 * encoding.options.quietZoneLength,
            value1 = "01234",
            value2 = "80122-1905",
            value3 = "80122-2014-01",
            expectedResult1 = fixed(width /(63 + quietZoneLength), precision),
            expectedResult2 = fixed(width /(103 + quietZoneLength), precision),
            expectedResult3 = fixed(width /(123 + quietZoneLength), precision),
            result1,
            result2,
            result3;

        result1 = fixed(encoding.encode(value1, width, height).baseUnit, precision);
        equal(result1, expectedResult1);

        result2 = fixed(encoding.encode(value2, width, height).baseUnit, precision);
        equal(result2, expectedResult2);

        result3 = fixed(encoding.encode(value3, width, height).baseUnit, precision);
        equal(result3, expectedResult3);

    });

})();
