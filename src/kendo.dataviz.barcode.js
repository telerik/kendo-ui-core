kendo_module({
    id: "dataviz.barcode",
    name: "Barcode",
    category: "dataviz",
    description: "Barcode widget",
    depends: ["dataviz.core", "dataviz.svg"]
});

(function ($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        deepExtend = kendo.deepExtend,
        inArray = $.inArray,
        isPlainObject = $.isPlainObject,
        dataviz = kendo.dataviz,
        Widget = kendo.ui.Widget,
        Box2D = dataviz.Box2D,
        Text = dataviz.Text,
        DEFAULT_WIDTH = 300,
        DEFAULT_HEIGHT = 100,
        DEFAULT_QUIETZONE_LENGTH = 10,
        numberRegex = /^\d+$/,
        alphanumericRegex = /^[a-z0-9]+$/i,
        InvalidCharacterErrorTemplate = "Character '{0}'  is not valid for symbology {1}";

    function getNext(value, index, count){
        return value.substring(index, index + count);
    }

    var Encoding  = kendo.Class.extend({
        init: function (options) {
            this.setOptions(options);
        },
        setOptions: function(options){
            var that = this;
            that.options = extend({}, that.options, options);
            that.quietZoneLength = that.options.addQuietZone ? 2 * that.options.quietZoneLength : 0;
        },
        encode: function (value, width, height) {
            var that = this;
            if(value!==undefined){
                value+='';
            }
            that.initValue(value, width, height);
            if(that.options.addQuietZone){
                that.addQuietZone();
            }
            that.addData();
            if(that.options.addQuietZone){
                that.addQuietZone();
            }

            return {
                baseUnit: that.baseUnit,
                pattern: that.pattern
            };
        },
        options: {
            quietZoneLength: DEFAULT_QUIETZONE_LENGTH,
            addQuietZone: true,
            addCheckSum: true
        },
        initValue: function () {},
        addQuietZone: function () {
            this.pattern.push(this.options.quietZoneLength || DEFAULT_QUIETZONE_LENGTH);
        },
        addData: function () {
        },
        invalidCharacterError: function(character){
            throw new Error(kendo.format(InvalidCharacterErrorTemplate, character, this.name));
        }
    });

    var encodings = {};

    var code39Base = Encoding.extend({
        minBaseUnitLength: 0.7,
        addData: function(){
            var that = this,
                value  = that.value;

            that.addStart();

            for(var idx = 0; idx < value.length; idx++){
                that.addCharacter(value.charAt(idx));
            }

            if(that.options.addCheckSum){
                that.pushCheckSum();
            }

            that.addStop();
            that.prepareValues();
        },
        addCharacter: function(character){
            var that = this,
                charData = that.characterMap[character];
            if(!charData){
                that.invalidCharacterError(character);
            }
            that.addBase(charData);
        },
        addBase: function(){}
    });

    var code39ExtendedBase = {
        addCharacter: function(character){
            var that = this;
            if(that.characterMap[character]){
                that.addBase(that.characterMap[character]);
            }
            else if(character.charCodeAt(0) > 127){
                that.invalidCharacterError(character);
            }
            else{
                that.addExtended(character.charCodeAt(0));
            }
        },
        addExtended: function(code){
            var that = this,
                patterns;
            for(var i = 0; i < that.extendedMappings.length; i++){
                if((patterns = that.extendedMappings[i].call(that, code))){
                    for(var j = 0; j < patterns.length; j++){
                        that.addBase(patterns[j]);
                    }
                    that.dataLength+= patterns.length - 1;
                    return;
                }
            }
        },
        extendedMappings: [
            function(code){
                if(97 <= code && code <= 122){
                    var that = this;
                    return [that.characterMap[that.shiftCharacters[0]], that.characterMap[String.fromCharCode(code - 32)]];
                }
            },
            function(code){
                if(33 <= code && code <= 58){
                    var that = this;
                    return [that.characterMap[that.shiftCharacters[1]], that.characterMap[String.fromCharCode(code + 32)]];
                }
            },
            function(code){
                if(1 <= code && code <= 26){
                    var that = this;
                    return [that.characterMap[that.shiftCharacters[2]], that.characterMap[String.fromCharCode(code + 64)]];
                }
            },
            function(code){
                var that = this,
                    result,
                    dataCharacter;
                if(!that.specialAsciiCodes[code]){
                    dataCharacter =  Math.floor(code / 32) * 6 + (code - 27) % 32 + 64;
                    result = [that.characterMap[that.shiftCharacters[3]], that.characterMap[String.fromCharCode(dataCharacter)]];
                }
                else{
                    result = [];
                    for(var i = 0; i < that.specialAsciiCodes[code].length; i++){
                        result.push(that.characterMap[that.shiftCharacters[3]]);
                        result.push(that.characterMap[that.specialAsciiCodes[code][i]]);
                    }
                }

                return result;
            }
        ],
        specialAsciiCodes: {
            "0": ["U"],
            "64": ["V"],
            "96": ["W"],
            "127": ["T","X","Y","Z"]
        },
        shiftValuesAsciiCodes:{
            "39": 36,
            "40": 47,
            "41": 43,
            "42": 37
        },
        characterMap: {
            "+": false,
            "/": false,
            "$": false,
            "%": false
        },
        shiftCharacters: ["SHIFT0", "SHIFT1", "SHIFT2", "SHIFT3"]
    };

    encodings.code39 =  code39Base.extend({
        name: "Code 39",
        checkSumMod: 43,
        minRatio: 2.5,
        maxRatio: 3,
        gapWidth: 1,
        splitCharacter: "|",
        initValue: function (value, width, height) {
            var that = this;
            that.width = width;
            that.height = height;
            that.value = value;
            that.dataLength = value.length;
            that.pattern = [];
            that.patternString = "";
        },
        prepareValues: function(){
            var that = this,
                baseUnit,
                minBaseUnit = that.minBaseUnitLength,
                ratio = that.maxRatio,
                minRatio = that.minRatio,
                minHeight = Math.max(0.15 * that.width, 24);
            if (that.height < minHeight) {
                throw new Error("Insufficient Height. The minimum height for value: " + that.value + " is: " + minHeight);
            }

            while((baseUnit = that.getBaseUnit(ratio)) < minBaseUnit && ratio > minRatio){
                ratio = parseFloat((ratio - 0.1).toFixed(1));
            }

            if(baseUnit < minBaseUnit){
                var minWidth = Math.ceil(that.getBaseWidth(minRatio) * minBaseUnit);
                throw new Error("Insufficient width. The minimum width for value: " + that.value + " is: " + minWidth);
            }

            that.ratio = ratio;
            that.baseUnit = baseUnit;
            that.patternString = that.patternString.substring(0, that.patternString.length - 1);
            that.pattern = that.pattern.concat(that.patternString.replace(/ratio/g, ratio).split(that.splitCharacter));
        },
        getBaseUnit: function(ratio){
            return this.width / this.getBaseWidth(ratio);
        },
        getBaseWidth: function(ratio){
            var that = this,
                characterLength = 3 * (ratio + 2);
            return that.quietZoneLength + characterLength * (that.dataLength + 2) + that.gapWidth * (that.dataLength + 1);
        },
        addStart: function () {
            var that = this;
            that.addPattern(that.characterMap.START.pattern);
            that.addCharacterGap();
        },
        addBase: function(character){
            this.addPattern(character.pattern);
            this.addCharacterGap();
        },
        addStop: function () {
            this.addPattern(this.characterMap.START.pattern);
        },
        addPattern: function (pattern) {
            for (var i = 0; i < pattern.length; i++) {
                 this.patternString+= this.patternMappings[pattern.charAt(i)];
            }
        },
        addCharacterGap: function () {
            var that = this;
            that.patternString+=that.gapWidth + that.splitCharacter;
        },
        patternMappings: {
            "b": "1|",
            "w": "1|",
            "B": "ratio|",
            "W": "ratio|"
        },
        characterMap: {
            "0":{"pattern":"bwbWBwBwb","value":0},
            "1":{"pattern":"BwbWbwbwB","value":1},
            "2":{"pattern":"bwBWbwbwB","value":2},
            "3":{"pattern":"BwBWbwbwb","value":3},
            "4":{"pattern":"bwbWBwbwB","value":4},
            "5":{"pattern":"BwbWBwbwb","value":5},
            "6":{"pattern":"bwBWBwbwb","value":6},
            "7":{"pattern":"bwbWbwBwB","value":7},
            "8":{"pattern":"BwbWbwBwb","value":8},
            "9":{"pattern":"bwBWbwBwb","value":9},
            "A":{"pattern":"BwbwbWbwB","value":10},
            "B":{"pattern":"bwBwbWbwB","value":11},
            "C":{"pattern":"BwBwbWbwb","value":12},
            "D":{"pattern":"bwbwBWbwB","value":13},
            "E":{"pattern":"BwbwBWbwb","value":14},
            "F":{"pattern":"bwBwBWbwb","value":15},
            "G":{"pattern":"bwbwbWBwB","value":16},
            "H":{"pattern":"BwbwbWBwb","value":17},
            "I":{"pattern":"bwBwbWBwb","value":18},
            "J":{"pattern":"bwbwBWBwb","value":19},
            "K":{"pattern":"BwbwbwbWB","value":20},
            "L":{"pattern":"bwBwbwbWB","value":21},
            "M":{"pattern":"BwBwbwbWb","value":22},
            "N":{"pattern":"bwbwBwbWB","value":23},
            "O":{"pattern":"BwbwBwbWb","value":24},
            "P":{"pattern":"bwBwBwbWb","value":25},
            "Q":{"pattern":"bwbwbwBWB","value":26},
            "R":{"pattern":"BwbwbwBWb","value":27},
            "S":{"pattern":"bwBwbwBWb","value":28},
            "T":{"pattern":"bwbwBwBWb","value":29},
            "U":{"pattern":"BWbwbwbwB","value":30},
            "V":{"pattern":"bWBwbwbwB","value":31},
            "W":{"pattern":"BWBwbwbwb","value":32},
            "X":{"pattern":"bWbwBwbwB","value":33},
            "Y":{"pattern":"BWbwBwbwb","value":34},
            "Z":{"pattern":"bWBwBwbwb","value":35},
            "-":{"pattern":"bWbwbwBwB","value":36},
            ".":{"pattern":"BWbwbwBwb","value":37},
            " ":{"pattern":"bWBwbwBwb","value":38},
            "$":{"pattern":"bWbWbWbwb","value":39},
            "/":{"pattern":"bWbWbwbWb","value":40},
            "+":{"pattern":"bWbwbWbWb","value":41},
            "%":{"pattern":"bwbWbWbWb","value":42},
            START: { pattern: "bWbwBwBwb"}
        },
        options: {
            addCheckSum: false
        }
    });

    encodings.code39extended = encodings.code39.extend(deepExtend({}, code39ExtendedBase, {
        name: "Code 39 extended",
        characterMap: {
            SHIFT0: {"pattern":"bWbwbWbWb","value":41},
            SHIFT1: {"pattern":"bWbWbwbWb","value":40},
            SHIFT2: {"pattern":"bWbWbWbwb","value":39},
            SHIFT3: {"pattern":"bwbWbWbWb","value":42}
        }
    }));

    encodings.code93 = code39Base.extend({
        name: "Code 93",
        cCheckSumTotal: 20,
        kCheckSumTotal: 15,
        checkSumMod: 47,
        initValue: function(value, width, height){
            var that = this;
            that.value = value;
            that.width = width;
            that.height = height;
            that.pattern = [];
            that.values = [];
            that.dataLength = value.length;
        },
        prepareValues: function(){
            var that = this,
                minHeight = Math.max(0.15 * that.width, 24);
            if (that.height < minHeight) {
                throw new Error("Insufficient Height");
            }

            that.setBaseUnit();

            if(that.baseUnit < that.minBaseUnitLength){
                throw new Error("Insufficient Width");
            }
        },
        setBaseUnit: function(){
            var that = this,
                checkSumLength = 2;
            that.baseUnit = that.width / (9 * (that.dataLength + 2 + checkSumLength) + that.quietZoneLength + 1);
        },
        addStart: function(){
            var pattern = this.characterMap.START.pattern;
            this.addPattern(pattern);
        },
        addStop: function(){
            var that = this;
            that.addStart();
            that.pattern.push(that.characterMap.TERMINATION_BAR);
        },
        addBase: function(charData){
            this.addPattern(charData.pattern);
            this.values.push(charData.value);
        },
        pushCheckSum: function(){
            var that = this,
                checkValues = that._getCheckValues(),
                charData;

            that.checksum = checkValues.join("");
            for(var i = 0; i < checkValues.length; i++){
                charData = that.characterMap[that._findCharacterByValue(checkValues[i])];
                that.addPattern(charData.pattern);
            }
        },
        _getCheckValues: function(){
            var that = this,
                values = that.values,
                length = values.length,
                wightedSum = 0,
                cValue,
                kValue,
                idx;

            for(idx = length - 1; idx >= 0; idx--){
                wightedSum += that.weightedValue(values[idx],length - idx, that.cCheckSumTotal);
            }
            cValue = wightedSum % that.checkSumMod;

            wightedSum = that.weightedValue(cValue, 1, that.kCheckSumTotal);
            for(idx = length - 1; idx >= 0; idx--){
                wightedSum += that.weightedValue(values[idx], length - idx + 1, that.kCheckSumTotal);
            }

            kValue = wightedSum % that.checkSumMod;
            return [cValue, kValue];
        },
        _findCharacterByValue: function (value) {
            for (var character in this.characterMap) {
                if (this.characterMap[character].value === value) {
                    return character;
                }
            }
        },
        weightedValue: function(value, index, total){
            return (index % total || total) * value;
        },
        addPattern: function(pattern){
            var value;

            for(var i = 0; i < pattern.length; i++){
                value = parseInt(pattern.charAt(i),10);
                this.pattern.push(value);
            }
        },
        characterMap: {
            "0":{"pattern":"131112","value":0},
            "1":{"pattern":"111213","value":1},
            "2":{"pattern":"111312","value":2},
            "3":{"pattern":"111411","value":3},
            "4":{"pattern":"121113","value":4},
            "5":{"pattern":"121212","value":5},
            "6":{"pattern":"121311","value":6},
            "7":{"pattern":"111114","value":7},
            "8":{"pattern":"131211","value":8},
            "9":{"pattern":"141111","value":9},
            "A":{"pattern":"211113","value":10},
            "B":{"pattern":"211212","value":11},
            "C":{"pattern":"211311","value":12},
            "D":{"pattern":"221112","value":13},
            "E":{"pattern":"221211","value":14},
            "F":{"pattern":"231111","value":15},
            "G":{"pattern":"112113","value":16},
            "H":{"pattern":"112212","value":17},
            "I":{"pattern":"112311","value":18},
            "J":{"pattern":"122112","value":19},
            "K":{"pattern":"132111","value":20},
            "L":{"pattern":"111123","value":21},
            "M":{"pattern":"111222","value":22},
            "N":{"pattern":"111321","value":23},
            "O":{"pattern":"121122","value":24},
            "P":{"pattern":"131121","value":25},
            "Q":{"pattern":"212112","value":26},
            "R":{"pattern":"212211","value":27},
            "S":{"pattern":"211122","value":28},
            "T":{"pattern":"211221","value":29},
            "U":{"pattern":"221121","value":30},
            "V":{"pattern":"222111","value":31},
            "W":{"pattern":"112122","value":32},
            "X":{"pattern":"112221","value":33},
            "Y":{"pattern":"122121","value":34},
            "Z":{"pattern":"123111","value":35},
            "-":{"pattern":"121131","value":36},
            ".":{"pattern":"311112","value":37},
            " ":{"pattern":"311211","value":38},
            "$":{"pattern":"321111","value":39},
            "/":{"pattern":"112131","value":40},
            "+":{"pattern":"113121","value":41},
            "%":{"pattern":"211131","value":42},
            SHIFT0:{"pattern":"122211","value":46},
            SHIFT1:{"pattern":"311121","value":45},
            SHIFT2:{"pattern":"121221","value":43},
            SHIFT3:{"pattern":"312111","value":44},
            START: {"pattern":"111141"},
            TERMINATION_BAR: "1"
        }
    });

    encodings.code93extended = encodings.code93.extend(deepExtend({}, code39ExtendedBase, {
        name: "Code 93 extended",
        pushCheckSum: function(){
            var that = this,
                checkValues = that._getCheckValues(),
                value;

            that.checksum = checkValues.join("");

            for(var i = 0; i < checkValues.length; i++){
                value = checkValues[i];
                if(that.shiftValuesAsciiCodes[value]){
                    that.addExtended(that.shiftValuesAsciiCodes[value]);
                }
                else{
                    that.addPattern(that.characterMap[that._findCharacterByValue(value)].pattern);
                }
            }
        }
    }));

    var state128 = kendo.Class.extend({
        init: function(encoding){
            this.encoding = encoding;
        },
        addStart: function(){},
        is: function (){},
        move: function (){},
        pushState: function(){}
    });

    var state128AB = state128.extend({
        FNC4: "FNC4",
        init: function(encoding, states){
            var that = this;
            that.encoding = encoding;
            that.states = states;
            that._initMoves(states);
        },
        addStart: function(){
            this.encoding.addPattern(this.START);
        },
        is: function (value, index){
            var code = value.charCodeAt(index);
            return this.isCode(code);
        },
        move: function(encodingState){
            var that = this,
                idx = 0;

            while(!that._moves[idx].call(that, encodingState) && idx < that._moves.length){
                idx++;
            }
        },
        pushState: function(encodingState){
            var that = this,
                states = that.states,
                value = encodingState.value,
                maxLength = value.length,
                code;

            if(inArray("C", states) >= 0){
                var numberMatch = value.substr(encodingState.index).match(/\d{4,}/g);
                if(numberMatch){
                    maxLength = value.indexOf(numberMatch[0], encodingState.index);
                }
            }

            while((code = encodingState.value.charCodeAt(encodingState.index)) >= 0 &&
                that.isCode(code) && encodingState.index < maxLength){
                that.encoding.addPattern(that.getValue(code));
                encodingState.index++;
            }
        },
        _initMoves: function(states){
            var that = this;
            that._moves = [];

            if(inArray(that.FNC4, states) >= 0){
                that._moves.push(that._moveFNC);
            }

            if(inArray(that.shiftKey, states) >= 0){
                that._moves.push(that._shiftState);
            }
            that._moves.push(that._moveState);
        },
        _moveFNC: function(encodingState){
            if(encodingState.fnc){
                encodingState.fnc = false;
                return encodingState.previousState == this.key;
            }
        },
        _shiftState: function(encodingState){
            var that = this;
            if(encodingState.previousState == that.shiftKey &&
                (encodingState.index + 1 >= encodingState.value.length ||
                    that.encoding[that.shiftKey].is(encodingState.value, encodingState.index + 1))){
                that.encoding.addPattern(that.SHIFT);
                encodingState.shifted = true;
                return true;
            }
        },
        _moveState: function(){
            this.encoding.addPattern(this.MOVE);
            return true;
        },
        SHIFT: 98
    });

    var states128 = {};

    states128.A = state128AB.extend({
        key: "A",
        shiftKey: "B",
        isCode: function(code){
            return 0 <= code && code < 96;
        },
        getValue: function(code){
            if(code < 32){
                return code + 64;
            }

            return code - 32;
        },
        MOVE: 101,
        START: 103
    });

    states128.B = state128AB.extend({
        key: "B",
        shiftKey: "A",
        isCode: function(code){
            return 32 <= code && code < 128;
        },
        getValue: function(code){
            return code - 32;
        },
        MOVE: 100,
        START: 104
    });

    states128.C = state128.extend({
        key: "C",
        addStart: function(){
            this.encoding.addPattern(this.START);
        },
        is: function (value, index){
            var next4 = getNext(value, index, 4);
            return (index + 4 <= value.length || value.length == 2) && numberRegex.test(next4);
        },
        move: function (){
            this.encoding.addPattern(this.MOVE);
        },
        pushState: function(encodingState){
            var code;
            while(( code = getNext(encodingState.value, encodingState.index, 2)) &&
                numberRegex.test(code) && code.length == 2)
            {
                this.encoding.addPattern(parseInt(code, 10));
                encodingState.index+=2;
            }
        },
        getValue: function(code){
            return code;
        },
        MOVE: 99,
        START: 105
    });

    states128.FNC4 = state128.extend({
        key: "FNC4",
        dependentStates: ["A","B"],
        init: function(encoding, states){
            this.encoding = encoding;
            this._initSubStates(states);
        },
        addStart: function(encodingState){
            var code = encodingState.value.charCodeAt(0) - 128,
                subState = this._getSubState(code);

            this.encoding[subState].addStart();
        },
        is: function(value, index){
            var code = value.charCodeAt(index);
            return this.isCode(code);
        },
        isCode: function(code){
            return 128 <= code && code < 256;
        },
        pushState: function(encodingState){
            var that = this,
                subState = that._initSubState(encodingState),
                encoding = that.encoding,
                length = subState.value.length;
            encodingState.index += length;

            if(length < 3){
                var code;
                for(; subState.index < length; subState.index++){
                    code = subState.value.charCodeAt(subState.index);
                    subState.state = that._getSubState(code);
                    if(subState.previousState != subState.state){
                        subState.previousState = subState.state;
                        encoding[subState.state].move(subState);
                    }
                    encoding.addPattern(encoding[subState.state].MOVE);
                    encoding.addPattern(encoding[subState.state].getValue(code));
                }
            }
            else{
                if(subState.state != subState.previousState){
                    encoding[subState.state].move(subState);
                }
                that._pushStart(subState);
                encoding.pushData(subState, that.subStates);
                if(encodingState.index < encodingState.value.length){
                    that._pushStart(subState);
                }
            }

            encodingState.fnc = true;
            encodingState.state = subState.state;
        },
        _pushStart: function(subState){
            var that = this;
            that.encoding.addPattern(that.encoding[subState.state].MOVE);
            that.encoding.addPattern(that.encoding[subState.state].MOVE);
        },
        _initSubState: function(encodingState){
            var that = this,
                subState = {
                    value: that._getAll(encodingState.value, encodingState.index),
                    index: 0
                };
            subState.state = that._getSubState(subState.value.charCodeAt(0));
            subState.previousState = encodingState.previousState == that.key ?
                subState.state : encodingState.previousState;
            return subState;
        },
        _initSubStates: function(states){
            var that = this;
            that.subStates = [];
            for(var i = 0; i < states.length; i++){
                if(inArray(states[i], that.dependentStates) >= 0){
                    that.subStates.push(states[i]);
                }
            }
        },
        _getSubState: function(code){
            var that = this;
            for(var i = 0; i < that.subStates.length; i++){
                if(that.encoding[that.subStates[i]].isCode(code)){
                    return that.subStates[i];
                }
            }
        },
        _getAll: function(value, index){
            var code,
                result = "";
            while((code = value.charCodeAt(index++)) && this.isCode(code)){
                result += String.fromCharCode(code - 128);
            }
            return result;
        }
    });

    states128.FNC1 = state128.extend({
        key: "FNC1",
        startState: "C",
        dependentStates: ["C","B"],
        startAI: "(",
        endAI: ")",
        init: function(encoding, states){
            this.encoding = encoding;
            this.states = states;
        },
        addStart: function(){
            this.encoding[this.startState].addStart();
        },
        is: function(){
            return inArray(this.key, this.states) >= 0;
        },
        pushState: function(encodingState){
            var that = this,
                encoding = that.encoding,
                value = encodingState.value.replace(/\s/g, ""),
                regexSeparators = new RegExp("[" +  that.startAI + that.endAI + "]", "g"),
                index = encodingState.index,
                subState= {
                    state: that.startState
                },
                current,
                nextStart,
                separatorLength;

            encoding.addPattern(that.START);

            while(true){
                subState.index = 0;

                separatorLength = value.charAt(index) === that.startAI ? 2 : 0;
                current = separatorLength > 0 ? that.getBySeparator(value, index) : that.getByLength(value, index);
                if(current.ai.length){
                    nextStart = index + separatorLength + current.id.length + current.ai.length;
                }
                else{
                    nextStart = value.indexOf(that.startAI, index + 1);
                    if(nextStart < 0){
                        if(index + current.ai.max + current.id.length + separatorLength < value.length){
                            throw new Error("Separators are required after variable length identifiers");
                        }
                        nextStart = value.length;
                    }
                }
                subState.value = value.substring(index, nextStart).replace(regexSeparators, "");
                that.validate(current, subState.value);

                encoding.pushData(subState, that.dependentStates);

                if(nextStart >= value.length){
                    break;
                }

                index = nextStart;

                if(subState.state != that.startState){
                    encoding[that.startState].move(subState);
                    subState.state = that.startState;
                }

                if(!current.ai.length){
                    encoding.addPattern(that.START);
                }
            }
            encodingState.index = encodingState.value.length;
        },
        validate: function(current, value){
            var code = value.substr(current.id.length),
                ai = current.ai;
            if(!ai.type && !numberRegex.test(code)){
                throw new Error("Application identifier " + current.id+ " is numeric only but contains non numeric character(s).");
            }

            if(ai.type == "alphanumeric" && !alphanumericRegex.test(code)){
                 throw new Error("Application identifier " + current.id+ " is alphanumeric only but contains non alphanumeric character(s).");
            }

            if(ai.length && ai.length !== code.length){
                 throw new Error("Application identifier " + current.id + " must be " + ai.length + " characters long.");
            }

            if(ai.min && ai.min > code.length){
                 throw new Error("Application identifier " + current.id + " must be at least " + ai.min + " characters long.");
            }

            if(ai.max && ai.max < code.length){
                 throw new Error("Application identifier " + current.id + " must be at most " + ai.max + " characters long.");
            }
        },
        getByLength: function(value, index){
            var that = this,
                id,
                ai;
            for(var i = 2; i <= 4; i++){
                id = getNext(value, index, i);
                ai = that.getAI(id) || that.getAI(id.substring(0, id.length - 1));
                if(ai){
                    return {
                        id: id,
                        ai: ai
                    };
                }
            }
            that.unsupportedAIError(id);
        },
        unsupportedAIError: function(id){
            throw new Error(kendo.format("'{0}' is not a supported Application Identifier"),id);
        },
        getBySeparator: function(value, index){
            var that = this,
                start = value.indexOf(that.startAI, index),
                end = value.indexOf(that.endAI, start),
                id = value.substring(start + 1,end),
                ai = that.getAI(id) || that.getAI(id.substr(id.length - 1));
            if(!ai){
                that.unsupportedAIError(id);
            }

            return {
                ai: ai,
                id: id
            };
        },
        getAI: function(id){
            var ai = this.applicationIdentifiers,
                multiKey = ai.multiKey;
            if(ai[id]){
                return ai[id];
            }

            for(var i = 0; i < multiKey.length; i++){
                if(multiKey[i].ids && inArray(id, multiKey[i].ids) >= 0){
                    return multiKey[i].type;
                }
                else if(multiKey[i].ranges){
                    var ranges = multiKey[i].ranges;
                    for(var j = 0; j < ranges.length; j++){
                        if(ranges[j][0] <= id && id <= ranges[j][1]){
                            return multiKey[i].type;
                        }
                    }
                }
            }
        },
        applicationIdentifiers: {
            "22": {max: 29, type: "alphanumeric"},
            "402": {length: 17},
            "7004": {max: 4, type: "alphanumeric"},
            "242": {max: 6, type: "alphanumeric"},
            "8020": {max: 25, type: "alphanumeric"},
            "703": { min: 3, max: 30, type: "alphanumeric"},
            "8008": { min: 8, max: 12, type: "alphanumeric"},
            "253": { min: 13, max: 17, type: "alphanumeric"},
            "8003": { min: 14, max: 30, type: "alphanumeric"},
            multiKey: [{
                ids: ["15", "17", "8005", "8100"],
                ranges: [
                    [11, 13],
                    [310, 316],
                    [320, 336],
                    [340, 369]
                ],
                type: { length: 6}
            },{
                ids: ["240", "241", "250", "251", "400", "401", "403", "7002", "8004", "8007", "8110"],
                ranges: [[90-99]],
                type: {max: 30, type: "alphanumeric"}
            },{
                ids: ["7001"],
                ranges: [[410, 414]],
                type: { length: 13}
            },{
                ids: ["10","21", "254", "420", "8002"],
                type: {max: 20, type: "alphanumeric"}
            },{
                ids: ["00", "8006", "8017", "8018"],
                type: {length: 18}
            },{
                ids: ["01", "02", "8001"],
                type: { length: 14}
            },{
                ids: ["422"],
                ranges: [
                    [424, 426]
                ],
                type: {length: 3}
            },{
                ids: ["20", "8102"],
                type: { length: 2}
            },{
                ids: ["30","37"],
                type: {max: 8, type: "alphanumeric"}
            },{
                ids: ["390","392"],
                type: {max: 15, type: "alphanumeric"}
            },{
                ids: ["421", "423"],
                type: { min: 3, max: 15, type: "alphanumeric"}
            }, {
                ids: ["391", "393"],
                type: { min: 3, max: 18, type: "alphanumeric"}
            },{
                ids: ["7003", "8101"],
                type: {length: 10}
            }]
        },
        START: 102
    });

    var code128Base = Encoding.extend({
        init: function (options) {
            Encoding.fn.init.call(this, options);
            this._initStates();
        },
        _initStates: function(){
            var that = this;
            for(var i = 0; i < that.states.length; i++){
                that[that.states[i]]  = new states128[that.states[i]](that, that.states);
            }
        },
        initValue: function (value, width, height) {
           var that = this;
           that.pattern = [];
           that.value = value;
           that.width = width;
           that.height = height;
           that.checkSum = 0;
           that.totalUnits = 0;
           that.index = 0;
           that.position = 1;
        },
        addData: function(){
            var that = this,
                encodingState = {
                    value: that.value,
                    index: 0,
                    state: ""
                };
            if(that.value.length === 0){
                return;
            }

            encodingState.state =
                encodingState.previousState = that.getNextState(encodingState, that.states);

            that.addStart(encodingState);

            that.pushData(encodingState, that.states);

            that.addCheckSum();
            that.addStop();
            that.setBaseUnit();
        },
        pushData: function(encodingState, states){
            var that = this;
            while(true){
                that[encodingState.state].pushState(encodingState);
                if(encodingState.index >= encodingState.value.length){
                    break;
                }

                if(!encodingState.shifted){
                    encodingState.previousState = encodingState.state;
                    encodingState.state  = that.getNextState(encodingState, states);
                    that[encodingState.state].move(encodingState);
                }
                else{
                   var temp = encodingState.state;
                   encodingState.state = encodingState.previousState;
                   encodingState.previousState = temp;
                   encodingState.shifted = false;
                }
            }
        },
        addStart: function(encodingState){
            this[encodingState.state].addStart(encodingState);
            this.position = 1;
        },
        addCheckSum: function(){
            var that = this;

            that.checksum = that.checkSum % 103;
            that.addPattern(that.checksum);
        },
        addStop: function(){
            this.addPattern(this.STOP);
        },
        setBaseUnit: function(){
            var that = this;
            that.baseUnit = that.width / (that.totalUnits + that.quietZoneLength);
        },
        addPattern: function(code){
            var that = this,
                pattern = that.characterMap[code].toString(),
                value;

            for(var i = 0; i < pattern.length; i++){
                value = parseInt(pattern.charAt(i),10);
                that.pattern.push(value);
                that.totalUnits += value;
            }
            that.checkSum += code * that.position++;
        },
        getNextState: function(encodingState, states){
            for(var i = 0; i < states.length; i++){
                if(this[states[i]].is(encodingState.value, encodingState.index)){
                    return states[i];
                }
            }
            this.invalidCharacterError(encodingState.value.charAt(encodingState.index));
        },
        characterMap: [
            212222,222122,222221,121223,121322,131222,122213,122312,132212,221213,
            221312,231212,112232,122132,122231,113222,123122,123221,223211,221132,
            221231,213212,223112,312131,311222,321122,321221,312212,322112,322211,
            212123,212321,232121,111323,131123,131321,112313,132113,132311,211313,
            231113,231311,112133,112331,132131,113123,113321,133121,313121,211331,
            231131,213113,213311,213131,311123,311321,331121,312113,312311,332111,
            314111,221411,431111,111224,111422,121124,121421,141122,141221,112214,
            112412,122114,122411,142112,142211,241211,221114,413111,241112,134111,
            111242,121142,121241,114212,124112,124211,411212,421112,421211,212141,
            214121,412121,111143,111341,131141,114113,114311,411113,411311,113141,
            114131,311141,411131,211412,211214,211232,2331112
        ],
        STOP: 106
    });

    encodings.code128a = code128Base.extend({
        name: "Code 128 A",
        states: ["A"]
    });


    encodings.code128b = code128Base.extend({
        name: "Code 128 B",
        states: ["B"]
    });

    encodings.code128c = code128Base.extend({
        name: "Code 128 C",
        states: ["C"]
    });

    encodings.code128 = code128Base.extend({
        name: "Code 128",
        states: ["C", "B", "A", "FNC4"]
    });

    encodings["gs1-128"] = code128Base.extend({
       name: "Code GS1-128",
       states: ["FNC1", "C", "B"]
    });

    var msiBase = Encoding.extend({
        initValue: function(value, width){
            var that = this;
            that.pattern = [];
            that.value = value;
            that.checkSumLength = 0;
            that.width = width;
        },
        setBaseUnit: function(){
            var that = this,
                startStopLength = 7;

            that.baseUnit = that.width /
                    ( 12 * (that.value.length + that.checkSumLength) + that.quietZoneLength + startStopLength);
        },
        addData:  function(){
            var that = this,
                value = that.value;
            that.addPattern(that.START);

            for(var i = 0; i < value.length; i++){
                that.addCharacter(value.charAt(i));
            }

            if(that.options.addCheckSum){
                that.addCheckSum();
            }

            that.addPattern(that.STOP);
            that.setBaseUnit();
        },
        addCharacter: function(character){
            var that = this,
                pattern = that.characterMap[character];
            if(!pattern){
                that.invalidCharacterError(character);
            }
            that.addPattern(pattern);
        },
        addPattern: function(pattern){
            for(var i = 0; i < pattern.length; i++){
                this.pattern.push(parseInt(pattern.charAt(i),10));
            }
        },
        addCheckSum: function(){
            var that = this,
                checkSumFunction = that.checkSums[that.checkSumType],
                checkValues;

            checkValues = checkSumFunction.call(that.checkSums, that.value);

            that.checksum = checkValues.join("");
            for(var i = 0; i < checkValues.length; i++){
                that.checkSumLength++;
                that.addPattern(that.characterMap[checkValues[i]]);
            }
        },
        checkSums: {
            Modulo10: function(value){
                var checkValues = [0, ""],
                odd = value.length % 2,
                idx,
                evenSum,
                oddSum;

                for(idx = 0; idx < value.length; idx++){
                    checkValues[(idx + odd) % 2] += parseInt(value.charAt(idx),10);
                }

                oddSum = checkValues[0];
                evenSum = (checkValues[1] * 2).toString();

                for(idx = 0; idx < evenSum.length; idx++){
                    oddSum += parseInt(evenSum.charAt(idx),10);
                }

                return [(10 - (oddSum % 10)) % 10];
            },
            Modulo11: function(value){
                var weightedSum = 0,
                    mod = 11,
                    length = value.length,
                    weight,
                    checkValue;

                for(var i = 0; i < length; i++){
                    weight = ((length - i) % 6 || 6) + 1;
                    weightedSum +=  weight * value.charAt(i);
                }
                checkValue = (mod - weightedSum % mod) % mod;
                if(checkValue != 10){
                    return [checkValue];
                }
                return [1, 0];
            },
            Modulo11Modulo10: function(value){
                var checkValues = this.Modulo11(value),
                    mod11Value;
                mod11Value = value + checkValues[0];

                return checkValues.concat(this.Modulo10(mod11Value));
            },
            Modulo10Modulo10: function(value){
                var checkValues = this.Modulo10(value),
                    mod10Value;
                mod10Value = value + checkValues[0];

                return checkValues.concat(this.Modulo10(mod10Value));
            }
        },
        characterMap: ["12121212", "12121221","12122112", "12122121", "12211212", "12211221", "12212112", "12212121", "21121212", "21121221"],
        START: "21",
        STOP: "121",
        checkSumType: ""
    });

    encodings.msimod10 = msiBase.extend({
        name: "MSI Modulo10",
        checkSumType: "Modulo10"
    });

    encodings.msimod11 = msiBase.extend({
        name: "MSI Modulo11",
        checkSumType: "Modulo11"
    });

    encodings.msimod1110 = msiBase.extend({
        name: "MSI Modulo11 Modulo10",
        checkSumType: "Modulo11Modulo10"
    });

    encodings.msimod1010 = msiBase.extend({
        name: "MSI Modulo10 Modulo10",
        checkSumType: "Modulo10Modulo10"
    });

    encodings.code11 = Encoding.extend({
        name: "Code 11",
        cCheckSumTotal: 10,
        kCheckSumTotal: 9,
        kCheckSumMinLength: 10,
        checkSumMod: 11,
        DASH_VALUE: 10,
        DASH: "-",
        START: "112211",
        STOP: "11221",
        initValue: function(value, width){
            var that = this;
            that.pattern = [];
            that.value = value;
            that.width = width;
            that.totalUnits = 0;
        },
        addData:  function(){
            var that = this;
            var value = that.value;
            that.addPattern(that.START);

            for(var i = 0; i < value.length; i++){
                that.addCharacter(value.charAt(i));
            }

            if(that.options.addCheckSum){
                that.addCheckSum();
            }

            that.addPattern(that.STOP);
            that.setBaseUnit();
        },
        setBaseUnit: function(){
            var that = this;
            that.baseUnit = that.width / (that.totalUnits + that.quietZoneLength);
        },
        addCheckSum: function(){
            var that = this,
                value = that.value,
                length = value.length,
                cValue;

            cValue = that.getWeightedSum(value, length, that.cCheckSumTotal) % that.checkSumMod;
            that.checksum = cValue + "";
            that.addPattern(that.characterMap[cValue]);

            length++;
            if(length >= that.kCheckSumMinLength){
                var kValue = (cValue + that.getWeightedSum(value, length, that.kCheckSumTotal)) % that.checkSumMod;
                that.checksum += kValue;
                that.addPattern(that.characterMap[kValue]);
            }
        },
        getWeightedSum: function(value, length, total){
            var weightedSum = 0;
            for(var i = 0; i < value.length; i++){
                weightedSum+= this.weightedValue(this.getValue(value.charAt(i)), length, i, total);
            }

            return weightedSum;
        },
        weightedValue: function(value, length, index, total){
            var weight = (length - index) % total || total;
            return weight * value;
        },
        getValue: function(character){
            var that = this;
            if(!isNaN(character)){
                return parseInt(character,10);
            }
            else if(character !== that.DASH){
                that.invalidCharacterError(character);
            }
            return that.DASH_VALUE;
        },
        addCharacter: function(character){
            var that = this,
                value = that.getValue(character),
                pattern = that.characterMap[value];
            that.addPattern(pattern);
        },
        addPattern: function(pattern){
            var value;
            for(var i = 0; i < pattern.length; i++){
                value = parseInt(pattern.charAt(i),10);
                this.pattern.push(value);
                this.totalUnits+=value;
            }
        },
        characterMap: ["111121", "211121", "121121", "221111", "112121", "212111", "122111", "111221", "211211", "211111", "112111"],
        options: {
            addCheckSum: true
        }
    });

    encodings.postnet = Encoding.extend({
        name: "Postnet",
        START: "2",
        VALID_CODE_LENGTHS: [5,9, 11],
        DIGIT_SEPARATOR: "-",
        initValue: function(value, width, height){
            var that = this;
            that.height = height;
            that.width = width;
            that.baseHeight = height /2;
            that.value = value.replace(new RegExp(that.DIGIT_SEPARATOR,"g"), "");
            that.pattern = [];
            that.validate(that.value);
            that.checkSum = 0;
            that.setBaseUnit();
        },
        addData:  function(){
            var that = this,
                value = that.value;
            that.addPattern(that.START);

            for(var i = 0; i < value.length; i++){
                that.addCharacter(value.charAt(i));
            }

            if(that.options.addCheckSum){
                that.addCheckSum();
            }

            that.addPattern(that.START);
            that.pattern.pop();
        },
        addCharacter: function(character){
            var that = this,
                pattern = that.characterMap[character];
            that.checkSum+= parseInt(character,10);
            that.addPattern(pattern);
        },
        addCheckSum: function(){
            var that = this;
            that.checksum = (10 - (that.checkSum % 10)) % 10;
            that.addCharacter(that.checksum);
        },
        setBaseUnit: function(){
            var that=this,
                startStopLength = 3;
            that.baseUnit = that.width / ((that.value.length + 1) * 10 +  startStopLength + that.quietZoneLength);
        },
        validate: function(value){
            var that = this;

            if(!numberRegex.test(value)){
                that.invalidCharacterError(value.match(/[^0-9]/)[0]);
            }
            if(inArray(value.length, that.VALID_CODE_LENGTHS) < 0){
                throw new Error("Invalid value length. Valid lengths for the Postnet symbology are " + that.VALID_CODE_LENGTHS.join(","));
            }
        },
        addPattern: function(pattern){
            var that = this,
                y1;
            for(var i = 0; i < pattern.length; i++){
                y1 = that.height - that.baseHeight * pattern.charAt(i);
                that.pattern.push({width: 1, y1: y1, y2: that.height});
                that.pattern.push(1);
            }
        },
        characterMap: ["22111", "11122", "11212", "11221", "12112", "12121", "12211", "21112", "21121", "21211"]
    });

    encodings.ean13 = Encoding.extend({
        initValue: function(value, width, height){
            if(typeof(value)=="number"){
                value+="";
            }
            if(value.length!=12 || /\D/.test(value)){
                throw new Error('Invalid value provided');
            }
            else if(value.length<12){
                value = '';
            }
            var that = this;
            that.pattern = [];
            that.options.height = height;
            that.baseUnit = width /(95 + that.quietZoneLength);
            that.value = value;
            that.checksum = that.calculateChecksum();
            that.leftKey = value[0];
            that.leftPart = value.substr(1,6);
            that.rightPart = value.substr(7)+that.checksum;
        },
        addData:  function(){
            var that = this;
            that.addPieces(that.characterMap.start);
            that.addSide(that.leftPart,that.leftKey);
            that.addPieces(that.characterMap.middle);
            that.addSide(that.rightPart);
            that.addPieces(that.characterMap.start);
        },
        addSide:function(leftPart,key){
            var that = this;
            for(var i = 0; i < leftPart.length; i++){
                if(key && parseInt(that.keyTable[key].charAt(i),10)){
                    that.addPieces(Array.prototype.slice.call(that.characterMap.digits[leftPart.charAt(i)]).reverse(),true);
                }else{
                    that.addPieces(that.characterMap.digits[leftPart.charAt(i)],true);
                }
            }
        },
        addPieces:function(arrToAdd,limitedHeight){
            var that = this;
            for(var i=0;i<arrToAdd.length;i++){
                if(limitedHeight){
                    that.pattern.push({
                        y1:0,
                        y2:that.options.height*0.95,
                        width:arrToAdd[i]
                    });
                }else{
                    that.pattern.push(arrToAdd[i]);
                }
            }
        },
        calculateChecksum: function (){
            var odd = 0,
                even = 0,
                value = this.value.split("").reverse().join("");
            for(var i = 0;i < value.length;i++){
                if(i%2){
                    even += parseInt(value.charAt(i),10);
                }
                else{
                    odd += parseInt(value.charAt(i),10);
                }
            }
            var checksum = (10 - ((3*odd + even)%10))%10;
            return checksum;
        },
        keyTable:[
            '000000',
            '001011',
            '001101',
            '001110',
            '010011',
            '011001',
            '011100',
            '010101',
            '010110',
            '011010'
        ],
        characterMap: {
            digits:[
                [3,2,1,1],
                [2,2,2,1],
                [2,1,2,2],
                [1,4,1,1],
                [1,1,3,2],
                [1,2,3,1],
                [1,1,1,4],
                [1,3,1,2],
                [1,2,1,3],
                [3,1,1,2]
            ],
            start: [1,1,1],
            middle: [1,1,1,1,1]
        }
    });

    encodings.ean8 = encodings.ean13.extend({
        initValue: function(value, width, height){
            var that = this;
            if(value.length!=7 || /\D/.test(value)){
                throw new Error('Invalid value provided');
            }
            that.value = value;
            that.options.height = height;
            that.checksum = that.calculateChecksum(that.value);
            that.leftPart  = that.value.substr(0,4);
            that.rightPart = that.value.substr(4) + that.checksum;
            that.pattern = [];
            that.baseUnit = width /(67 + that.quietZoneLength);
        }
    });

    var Barcode = Widget.extend({
        init: function (element, options) {
             var that = this;
             Widget.fn.init.call(that, element, options);
             that.element = $(element);
             that.element.addClass("k-barcode");
             that.view = dataviz.ViewFactory.current.create({}, that.options.renderAs);
             that.setOptions(options);
        },
        setOptions: function (options) {
            var that = this;
            that.type = (options.type || that.options.type).toLowerCase();
            if(that.type=="upca"){ //extend instead
                that.type = "ean13";
                options.value = '0' + options.value;
            }
            if(that.type=="upce"){
                that.type = "ean8";
                options.value = '0' + options.value;
            }
            if(!encodings[that.type]){
                throw new Error('Encoding ' + that.type + 'is not supported.');
            }            
            that.encoding = new encodings[that.type]();

            that.options = $.extend(true,that.options, options);
            if(options.value===undefined){
                return;
            }
            that.redraw();
        },

        redraw: function () {
            var that = this,
                view = that.view;

            that._redraw(view);
            view.renderTo(that.element[0]);
        },

        svg: function() {
            if (dataviz.SVGView) {
                var view = new dataviz.SVGView();

                this._redraw(view);

                return view.render();
            } else {
                throw new Error("Unable to create SVGView. Check that kendo.dataviz.svg.js is loaded.");
            }
        },

        imageDataURL: function() {
            if (dataviz.CanvasView) {
                if (dataviz.supportsCanvas()) {
                    var container = document.createElement("div"),
                        view = new dataviz.CanvasView();

                    this._redraw(view);

                    return view.renderTo(container).toDataURL();
                } else {
                    kendo.logToConsole(
                        "Warning: Unable to generate image. The browser does not support Canvas.\n" +
                        "User agent: " + navigator.userAgent);

                    return null;
                }
            } else {
                throw new Error("Unable to create CanvasView. Check that kendo.dataviz.canvas.js is loaded.");
            }
        },

        _redraw: function(view) {
            var that = this,
                options = that.options,
                textOptions = options.text,
                size = that._getSize(),
                border = options.border || {},
                encoding = that.encoding,
                contentBox = Box2D(0, 0, size.width, size.height).unpad(border.width).unpad(options.padding),
                barHeight = contentBox.height(),
                result, textToDisplay;

            that.contentBox = contentBox;
            view.children = [];
            that._renderBackground(view, size);
            var textHeight = dataviz.measureText( contentBox,{ font: options.text.font }).height;

            if (textOptions.visible) {
                barHeight -= textHeight;
            }

            result = encoding.encode(options.value,size.width-(options.padding.left+options.padding.right), barHeight);

            if (textOptions.visible) {
                textToDisplay = options.value;

                if(options.checksum && encoding.checksum!==undefined){
                    textToDisplay += " "+encoding.checksum;
                }
                that._renderTextElement(view, textToDisplay);
            }
            that.barHeight = barHeight;

            view.options.width = size.width;
            view.options.height = size.height;

            that._renderElements(view, result.pattern, result.baseUnit);
        },

        _getSize: function(){
            var that = this,
                element = that.element,
                size = {width:DEFAULT_WIDTH,height:DEFAULT_HEIGHT};

            if(element.width()>0){
                size.width = element.width();
            }
            if(element.height()>0){
                size.height = element.height();
            }
            if(that.options.width){
               size.width = that.options.width;
            }
            if(that.options.height){
               size.height = that.options.height;
            }

            return size;
        },
        value: function(value){
            var that = this;
            if(value===undefined){
                return that.options.value;
            }
            that.options.value = value + '';
            that.redraw();
        },

        _renderElements: function (view, pattern, baseUnit) {
            var that = this,
                position = 0 + that.options.padding.left,
                step,
                item;

            for (var i = 0; i < pattern.length; i++) {

                item = isPlainObject(pattern[i]) ? pattern[i] : {
                        width: pattern[i],
                        y1: 0,
                        y2: that.barHeight
                    };
                step = item.width * baseUnit;
                if(i%2){
                    view.children.push(view.createRect(
                        new Box2D(
                            position,
                            item.y1 + that.contentBox.y1,
                            position + step,
                            item.y2 + that.contentBox.y1
                        ),
                        {
                            fill: that.options.color
                        }
                    ));
                }
                position+= step;
            }
        },

        _renderBackground: function (view, size) {
            var that = this,
                options = that.options,
                border = options.border || {},
                box = Box2D(0,0, size.width, size.height).unpad(border.width / 2),
                rect = view.createRect(box, {
                    fill: options.background,
                    stroke: border.width ? border.color : "",
                    strokeWidth: border.width,
                    dashType: border.dashType
                });

            view.children.push(rect);
        },

        _renderTextElement: function (view, value) {
            var that = this,
                textOptions = that.options.text,
                text = new Text(value, {
                    font: textOptions.font,
                    color: textOptions.color,
                    align: "center",
                    vAlign: "bottom"
                });

            that.text = text;

            text.reflow(that.contentBox);
            text.box.unpad(textOptions.margin);
            view.children.push(view.createText(value, {
                baseline: text.baseline,
                x: text.box.x1,
                y: text.box.y1,
                color: textOptions.color,
                font: textOptions.font
            }));
        },
        options: {
            name: "Barcode",
            renderAs: "canvas",
            value: "",
            type: "code39",
            checksum: false,
            width: 0,
            height: 0,
            color: "black",
            background: "white",
            text: {
                visible: true,
                font: "16px Consolas, Monaco, Sans Mono, monospace, sans-serif",
                color: "black",
                margin: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            },
            border: {
                width: 0,
                dashType: "solid",
                color: "black"
            },
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        }
    });

   dataviz.ui.plugin(Barcode);

   kendo.deepExtend(dataviz, {
        encodings: encodings,
        Encoding: Encoding
   });

})(window.kendo.jQuery);
