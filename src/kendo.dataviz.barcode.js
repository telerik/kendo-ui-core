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
        inArray = $.inArray,
		isPlainObject = $.isPlainObject,
        dataviz = kendo.dataviz,
        Widget = kendo.ui.Widget,
        Box2D = dataviz.Box2D,
        Text = dataviz.Text,
        BAR = 1,
        SPACE = 0,
        DEFAULT_QUIETZONE_LENGTH = 10,
        numberRegex = /^\d+$/,
        alphanumericRegex = /^[a-z0-9]+$/i,
        InvalidCharacterErrorTemplate = "The '{0}' character is not valid for encoding {1}";
		
    function getNext(value, index, count){
        return value.substring(index, index + count);
    }

    var Encoding  = kendo.Class.extend({
        varyByHeight: false,
        init: function (options) {
            this.setOptions(options);
        },
        setOptions: function(options){
            this.options = extend({}, this.options, options);
        },
        encode: function (value, width, height) {
            this.initValue(value, width, height);
            if(this.options.addQuietZone){
                this.addQuietZone();
            }
            this.addData();
            if(this.options.addQuietZone){
                this.addQuietZone();
            }

            return {
                baseUnit: this.baseUnit,
                pattern: this.pattern,
                varyByHeight: this.varyByHeight
            };
        },
        options: {
            quietZoneLength: DEFAULT_QUIETZONE_LENGTH,
            addQuietZone: true,
            addCheckSum: true
        },
        initValue: function (value, width, height) {
        },
        addQuietZone: function () {
            this.pattern.push(this.options.quietZoneLength || DEFAULT_QUIETZONE_LENGTH);
        },
        addData: function () {
        },
        invalidCharacterError: function(character){
            throw new Error(kendo.format(InvalidCharacterErrorTemplate, character, this.options.name));
        }
    });

    var encodings = {};

    var code39Base = Encoding.extend({
        minBaseUnitLength: 0.7,
        addData: function(){
            var value  = this.value;

            this.addStart();

            for(var idx = 0; idx < value.length; idx++){
                this.addCharacter(value.charAt(idx));
            }

            if(this.options.addCheckSum){
                this.pushCheckSum();
            }

            this.addStop();
            this.prepareValues();
        },
        addCharacter: function(character){
            var charData = this.characterMap[character];
            if(!charData){
                this.invalidCharacterError(character);
            }
            this.addBase(charData);
        },
        _findCharacterByValue: function (value) {
            for (var character in this.characterMap) {
                if (this.characterMap[character].value === value) {
                    return character;
                }
            }
        },
        addBase: function(character){

        },
        options: {
            addCheckSum: false
        }
    });

    var code39ExtendedBase = {
        addCharacter: function(character){
            if(this.characterMap[character]){
                this.addBase(this.characterMap[character]);
            }
            else if(character.charCodeAt(0) > 127){
                this.invalidCharacterError(character);
            }
            else{
                this.addExtended(character.charCodeAt(0));
            }
        },
        addExtended: function(code){
            var patterns;
            for(var i = 0; i < this.extendedMappings.length; i++){
                if(patterns = this.extendedMappings[i].call(this, code)){
                    for(var j = 0; j < patterns.length; j++){
                        this.addBase(patterns[j]);
                    }
                    this.dataLength+= patterns.length - 1;
                    return;
                }
            }
        },
        extendedMappings: [
            function(code){
                if(97 <= code && code <= 122){
                    return [this.characterMap[this.shiftCharacters[0]], this.characterMap[String.fromCharCode(code - 32)]]
                }
            },
            function(code){
                if(33 <= code && code <= 58){
                    return [this.characterMap[this.shiftCharacters[1]], this.characterMap[String.fromCharCode(code + 32)]]
                }
            },
            function(code){
                if(1 <= code && code <= 26){
                    return [this.characterMap[this.shiftCharacters[2]], this.characterMap[String.fromCharCode(code + 64)]]
                }
            },
            function(code){
                var result,
                    dataCharacterCode,
                    codes;
                if(!this.specialAsciiCodes[code]){
                    dataCharacter =  Math.floor(code / 32) * 6 + (code - 27) % 32 + 64;
                    result = [this.characterMap[this.shiftCharacters[3]], this.characterMap[String.fromCharCode(dataCharacter)]];
                }
                else{
                    result = [];
                    for(var i = 0; i < this.specialAsciiCodes[code].length; i++){
                        result.push(this.characterMap[this.shiftCharacters[3]]);
                        result.push(this.characterMap[this.specialAsciiCodes[code][i]]);
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
        checkSumMod: 43,
        minRatio: 2.5,
        maxRatio: 3,
        gapWidth: 1,
        initValue: function (value, width, height) {
            this.width = width;
            this.height = height;
            this.ratio = this.options.ratio || this.maxRatio;
            this.quietZoneLength = this.options.quietZoneLength;
            this.value = value;
            this.checkSum = 0;
            this.dataLength = value.length;
            this.pattern = [];
            this.patternString = "";
        },
        prepareValues: function(){
            var minHeight = Math.max(0.15 * this.width, 24);
            if (this.height < minHeight) {
                throw new Error("Insufficient Height");
            }
            this.setBaseUnit();
            while(this.baseUnit < this.minBaseUnitLength && this.ratio > this.minRatio){
                this.ratio = this.ratio - 0.1;
                this.setBaseUnit();
            }

            if(this.baseUnit < this.minBaseUnitLength){
                throw new Error("Insufficient Width");
            }

            this.pattern = this.pattern.concat(this.patternString.replace(/ratio/g, this.ratio).split(""));
        },        
        setBaseUnit: function(){
            var characterLength = 3 * (this.ratio + 2),
                checkSumLength = this.options.addCheckSum ? 1 : 0,
                quietZoneLength = this.options.addQuietZone ? this.options.quietZoneLength : 0;

            this.baseUnit =  this.width /
                    ( 2 * quietZoneLength + characterLength * (this.dataLength + 2 + checkSumLength) + this.gapWidth * (this.dataLength + checkSumLength + 1));
        },
        addStart: function () {
             this.addPattern(this.characterMap.START.pattern);
             this.addCharacterGap();
        },
        addBase: function(character){
            this.addPattern(character.pattern);
            this.checkSum+= character.value;
            this.addCharacterGap();
        },
        pushCheckSum: function(){
            var character = this._findCharacterByValue(this._getCheckValue());

            this.addBase(this.characterMap[character]);
        },
        _getCheckValue: function(){
            return this.checkSum % this.checkSumMod;
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
            this.patternString+=this.gapWidth;
        },
        patternMappings: {
            "b": "1",
            "w": "1",
            "B": "ratio",
            "W": "ratio"
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
        }
    });

    encodings.code39extended = encodings.code39.extend(code39ExtendedBase).extend({
        pushCheckSum: function(){
            var value = this._getCheckValue();
            if(this.shiftValuesAsciiCodes[value]){
                this.addExtended(this.shiftValuesAsciiCodes[value]);
            }
            else{
                this.addBase(this.characterMap[this._findCharacterByValue(value)]);
            }
        },
        characterMap: {
            SHIFT0: {"pattern":"bWbwbWbWb","value":41},
            SHIFT1: {"pattern":"bWbWbwbWb","value":40},
            SHIFT2: {"pattern":"bWbWbWbwb","value":39},
            SHIFT3: {"pattern":"bwbWbWbWb","value":42}
        }
    });

    // TODO: Use mixin instead of subclass
    // $.extend(encoding.code39extended.fn, code39ExtendedMixin);
    encodings.code93 = code39Base.extend({
        cCheckSumTotal: 20,
        kCheckSumTotal: 15,
        checkSumMod: 47,
        initValue: function(value, width, height){
            this.value = value;
            this.width = width;
            this.height = height;
            this.pattern = [];
            this.values = [];
            this.dataLength = value.length;
        },
        prepareValues: function(){
            var minHeight = Math.max(0.15 * this.width, 24);
            if (this.height < minHeight) {
                throw new Error("Insufficient Height");
            }

            this.setBaseUnit();

            if(this.baseUnit < this.minBaseUnitLength){
                throw new Error("Insufficient Width");
            }
        },
        setBaseUnit: function(){
            var checkSumLength = this.options.addCheckSum ? 2 : 0,
                quietZoneLength = this.options.addQuietZone ? this.options.quietZoneLength : 0;
            this.baseUnit = this.width / (9 * (this.dataLength + 2 + checkSumLength) + 2 * quietZoneLength + 1);
        },
        addStart: function(){
            var pattern = this.characterMap["START"].pattern;
            this.addPattern(pattern);
        },
        addStop: function(){
            this.addStart();
            this.pattern.push(this.characterMap.TERMINATION_BAR);
        },
        addBase: function(charData){
            this.addPattern(charData.pattern);
            this.values.push(charData.value);
        },
        pushCheckSum: function(){
            var checkValues = this._getCheckValues(),
                charData;
            for(var i = 0; i < checkValues.length; i++){
                charData = this.characterMap[this._findCharacterByValue(checkValues[i])];
                this.addPattern(charData.pattern);
            }
        },
        _getCheckValues: function(){
            var values = this.values.reverse(),
                wightedSum = 0,
                cValue,
                kValue;
            //!!!avoid reverse. get backwards
            for(var i = 0; i < values.length; i++){
                wightedSum += this.weightedValue(values[i], i + 1, this.cCheckSumTotal);
            }
            cValue = wightedSum % this.checkSumMod;

            values.splice(0, 0, cValue);
            wightedSum = 0;
            for(var i = 0; i < values.length; i++){
                wightedSum += this.weightedValue(values[i], i + 1, this.kCheckSumTotal);
            }

            kValue = wightedSum % this.checkSumMod;
            return [cValue, kValue];
        },
        weightedValue: function(value, index, total){
            return (index % total || total) * value;
        },
        addPattern: function(pattern){
            var symbol,
                value;

            for(var i = 0; i < pattern.length; i++){                
                value = parseInt(pattern.charAt(i));
                this.pattern.push(value);
            }
        },
        options: {
            addCheckSum: true,
            addQuietZone : true
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

    encodings.code93extended = encodings.code93.extend(code39ExtendedBase).extend({
        pushCheckSum: function(){
            var checkValues = this._getCheckValues(),
                value;

            for(var i = 0; i < checkValues.length; i++){
                value = checkValues[i];
                if(this.shiftValuesAsciiCodes[value]){
                    this.addExtended(this.shiftValuesAsciiCodes[value]);
                }
                else{
                    this.addPattern(this.characterMap[this._findCharacterByValue(value)].pattern);
                }
            }
        }
    });

    var state128 = kendo.Class.extend({
        init: function(encoding, states){
            this.encoding = encoding;
        },
        addStart: function(){

        },
        is: function (value, index){

        },
        move: function (encodingState){

        },
        pushState: function(encodingState){

        }
    });

    //Investigate the options to move to C if it is in the states and there are 4 or more consecutive digits
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
                
            if(states.indexOf("C") >= 0){
                var numberMatch = value.match(/\d{4,}/g);
                if(numberMatch){
                    maxLength = value.indexOf(numberMatch[0]);
                }
            }
            
            while( (code = encodingState.value.charCodeAt(encodingState.index)) >= 0 && that.isCode(code) && encodingState.index < maxLength){
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
                return encodingState.state == this.key;
            }
        },
        _shiftState: function(encodingState){
            var that = this;
            if(encodingState.previousState == that.shiftKey &&
                that.encoding[that.shiftKey].is(encodingState.value, encodingState.index + 1)){
                that.encoding.addPattern(that.SHIFT);
                return true;
            }
        },
        _moveState: function(encodingState){
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
        move: function (encodingState){
            this.encoding.addPattern(this.MOVE);
        },
        pushState: function(encodingState){
            var code;
            while(( code = getNext(encodingState.value, encodingState.index, 2))
                && numberRegex.test(code))
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


    //inherit 128 base instead if it is not needed for states A, B
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
        addStart: function(encodingState){
            this.encoding[this.startState].addStart();
        },
        is: function(value, index){
            return inArray(this.key, this.states) >= 0;
        },
        pushState: function(encodingState){
            var encoding = this.encoding,
                value = encodingState.value.replace(/\s/g, ""),
                regexSeparators = new RegExp("[" +  this.startAI + this.endAI + "]", "g"),
                index = encodingState.index,
                subState= {
                    state: this.startState
                },
                current,
                nextStart,
                separatorLength,
                codeLength;
            encoding.addPattern(this.START);

            while(true){
                subState.index = 0;

                separatorLength = value.charAt(index) === this.startAI ? 2 : 0;
                current = separatorLength > 0 ? this.getBySeparator(value, index) : this.getByLength(value, index);
                if(current.ai.length){
                    nextStart = index + separatorLength + current.id.length + current.ai.length;
                }
                else{
                    nextStart = value.indexOf(this.startAI, index + 1);
                    if(nextStart < 0){
                        if(index + current.ai.max + current.id.length + separatorLength < value.length){
                            throw new Error("Separators are required after variable length identifiers");
                        }
                        nextStart = value.length;
                    }
                }
                subState.value = value.substring(index, nextStart).replace(regexSeparators, "");
                this.validate(current, subState.value);

                if(subState.state != this.startState){
                    encoding[this.startState].move(subState);
                    subState.state = this.startState;
                }

                encoding.pushData(subState, this.dependentStates);

                if(nextStart >= value.length){
                    break;
                }

                index = nextStart;
                if(!current.ai.length){
                    encoding.addPattern(this.START);
                }
            }
            encodingState.index = encodingState.value.length;
        },
        validate: function(current, value){
            var code = value.substr(current.id.length),
                ai = current.ai;
            if(!ai.type && !numberRegex.test(code)){
                throw new Error("AI " + current.id+ " is numeric only but contains non numeric character(s).");
            }

            if(ai.type == "alphanumeric" && !alphanumericRegex.test(code)){
                 throw new Error("AI " + current.id+ " is alphanumeric only but contains non alphanumeric character(s).");
            }

            if(ai.length && ai.length !== code.length){
                 throw new Error("AI " + current.id + " must be " + ai.length + " characters long.");
            }

            if(ai.min && ai.min > code.length){
                 throw new Error("AI " + current.id + " must be at least " + ai.min + " characters long.");
            }

            if(ai.max && ai.max < code.length){
                 throw new Error("AI " + current.id + " must be at most " + ai.max + " characters long.");
            }
        },
        getByLength: function(value, index){
            var idx = 2,
                id,
                ai;
            for(var i = 2; i <= 4; i++){
                id = getNext(value, index, i);
                ai = this.getAI(id) || this.getAI(id.substring(0, id.length - 1));
                if(ai){
                    return {
                        id: id,
                        ai: ai
                    };
                }
            }
            this.unsupportedAIError(id);
        },
        unsupportedAIError: function(id){
            throw new Error(kendo.format("'{0}' is not a supported Application Identifier"),id);
        },
        getBySeparator: function(value, index){
            var start = value.indexOf(this.startAI, index),
                end = value.indexOf(this.endAI, start),
                id = value.substring(start + 1,end),
                ai = this.getAI(id) || this.getAI(id.substr(id.length - 1));
            if(!ai){
                this.unsupportedAIError(id);
            }

            return {
                ai: ai,
                id: id
            }
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

    // TO DO: validate and add tests
    var code128Base = Encoding.extend({
        init: function (options) {
            Encoding.fn.init.call(this, options);
            this._initStates();
        },
        _initStates: function(){
            for(var i = 0; i < this.states.length; i++){
                this[this.states[i]]  = new states128[this.states[i]](this, this.states);
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
            var encodingState = {
                    value: this.value,
                    index: 0,
                    state: ""
                };
            if(this.value.length == 0){
                return;
            }

            encodingState.state =
                encodingState.previousState = this.getNextState(encodingState, this.states);

            this.addStart(encodingState);

            this.pushData(encodingState, this.states);

            this.addCheckSum();
            this.addStop();
            this.setBaseUnit();
        },
        pushData: function(encodingState, states){
            while(true){
                this[encodingState.state].pushState(encodingState);
                if(encodingState.index >= encodingState.value.length){
                    break;
                }
                encodingState.previousState = encodingState.state;
                encodingState.state  = this.getNextState(encodingState, states);
                this[encodingState.state].move(encodingState);
            }
        },
        addStart: function(encodingState){
            this[encodingState.state].addStart(encodingState);
            this.position = 1;
        },
        addCheckSum: function(){
            var checkValue = this.checkSum % 103;
            this.addPattern(checkValue);
        },
        addStop: function(){
            this.addPattern(this.STOP);
        },
        setBaseUnit: function(){
            var quietZoneLength = this.options.addQuietZone ? this.options.quietZoneLength : 0;
            this.baseUnit = this.width / (this.totalUnits + 2 * quietZoneLength);
        },
        addPattern: function(code){
            var pattern = this.characterMap[code].toString(),
                symbol,
                value;

            for(var i = 0; i < pattern.length; i++){
                value = parseInt(pattern.charAt(i));
                this.pattern.push(value);
                this.totalUnits += value;
            }
            this.checkSum += code * this.position++;
        },
        getNextState: function(encodingState, states){
            for(var i = 0; i < states.length; i++){
                if(this[states[i]].is(encodingState.value, encodingState.index)){
                    return states[i];
                }
            }
            throw new Error("Invalid character for encoding 128");
        },
        characterMap: [
            212222,222122,222221,121223,121322,131222,122213,122312,132212,221213,221312,231212,112232,122132,122231,113222,123122,123221,223211,221132,221231,213212,223112,312131,311222,321122,321221,312212,322112,322211,212123,212321,232121,111323,131123,131321,112313,132113,132311,211313,231113,231311,112133,112331,132131,113123,113321,133121,313121,211331,231131,213113,213311,213131,311123,311321,331121,312113,312311,332111,314111,221411,431111,111224,111422,121124,121421,141122,141221,112214,112412,122114,122411,142112,142211,241211,221114,413111,241112,134111,111242,121142,121241,114212,124112,124211,411212,421112,421211,212141,214121,412121,111143,111341,131141,114113,114311,411113,411311,113141,114131,311141,411131,211412,211214,211232,2331112
        ],
        STOP: 106,
        options: {
        }
    });

    encodings.code128a = code128Base.extend({
        states: ["A"]
    });


    encodings.code128b = code128Base.extend({
        states: ["B"]
    });

    encodings.code128c = code128Base.extend({
        states: ["C"]
    });

    encodings.code128 = code128Base.extend({
        states: ["C", "B", "A", "FNC4"]
    });

    encodings["gs1-128"] = code128Base.extend({
       states: ["FNC1", "C", "B"]
    });

    var msiBase = Encoding.extend({
        initValue: function(value, width, height){
            this.pattern = [];
            this.value = value;
            this.checkSumLength = 0;
            this.width = width;
        },
        setBaseUnit: function(){
            var quietZoneLength = this.options.addQuietZone ? 2 * this.options.quietZoneLength : 0,
                startStopLength = 7;

            this.baseUnit = this.width /
                    ( 12 * (this.value.length + this.checkSumLength) + quietZoneLength + startStopLength);
        },
        addData:  function(){
            var value = this.value;
            this.addPattern(this.START);

            for(var i = 0; i < value.length; i++){
                this.addCharacter(value.charAt(i));
            }

            if(this.options.addCheckSum){
                this.addCheckSum();
            }

            this.addPattern(this.STOP);
            this.setBaseUnit();
        },
        addCharacter: function(character){
            var pattern = this.characterMap[character];
            if(!pattern){
                this.invalidCharacterError(character);
            }
            this.addPattern(pattern);
        },
        addPattern: function(pattern){
            for(var i = 0; i < pattern.length; i++){
                this.pattern.push(parseInt(pattern.charAt(i)));
            }
        },
        addCheckSum: function(){
            var checkSumFunction = this.checkSums[this.checkSumType],
                checkValues;
            
            checkValues = checkSumFunction.call(this.checkSums, this.value);
            for(var i = 0; i < checkValues.length; i++){
                this.checkSumLength++;
                this.addPattern(this.characterMap[checkValues[i]]);
            }
        },
        checkSums: {
            Modulo10: function(value){
                var checkValues = [0, ""],
                evenSum,
                oddSum,
                odd = value.length % 2;

                for(var i = 0; i < value.length; i++){
                    checkValues[(i + odd) % 2] += parseInt(value.charAt(i));
                }

                oddSum = checkValues[0];
                evenSum = (checkValues[1] * 2).toString();

                for(var i = 0; i < evenSum.length; i++){
                    oddSum += parseInt(evenSum.charAt(i));
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
                var checkValue = (mod - weightedSum % mod) % mod;
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
    
    encodings.msimodulo10 = msiBase.extend({
        checkSumType: "Modulo10"
    });
    
    encodings.msimodulo11 = msiBase.extend({
        checkSumType: "Modulo11"
    });
    
    encodings.msimodulo11modulo10 = msiBase.extend({
        checkSumType: "Modulo11Modulo10"
    });
    
    encodings.msimodulo10modulo10 = msiBase.extend({
        checkSumType: "Modulo10Modulo10"
    });
    
    encodings.code11 = Encoding.extend({
        cCheckSumTotal: 10,
        kCheckSumTotal: 9,
        kCheckSumMinLength: 10,
        checkSumMod: 11,
        DASH_VALUE: 10,
        DASH: "-",
        START: "112211",
        STOP: "11221",
        initValue: function(value, width, height){
            this.pattern = [];
            this.value = value;
            this.width = width;
            this.totalUnits = 0;
        },
        addData:  function(){
            var value = this.value;
            this.addPattern(this.START);

            for(var i = 0; i < value.length; i++){
                this.addCharacter(value.charAt(i));
            }

            if(this.options.addCheckSum){
                this.addCheckSum();
            }

            this.addPattern(this.STOP);
            this.setBaseUnit();
        },
        setBaseUnit: function(){
            var quietZoneLength = this.options.addQuietZone ? 2 * this.options.quietZoneLength : 0;
            this.baseUnit = this.width / (this.totalUnits + quietZoneLength);
        },
        addCheckSum: function(){
            var value = this.value,
                length = value.length,
                cValue;

            cValue = this.getWeightedSum(value, length, this.cCheckSumTotal) % this.checkSumMod;
            this.addPattern(this.characterMap[cValue]);

            length++;
            if(length >= this.kCheckSumMinLength){
                var kValue = (cValue + this.getWeightedSum(value, length, this.kCheckSumTotal)) % this.checkSumMod;
                this.addPattern(this.characterMap[kValue]);
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
            if(!isNaN(character)){
                return parseInt(character);
            }
            else if(character !== this.DASH){
                this.invalidCharacterError(character);
            }
            return this.DASH_VALUE;
        },
        addCharacter: function(character){
            var value = this.getValue(character),
                pattern = this.characterMap[value];
            this.addPattern(pattern);
        },
        addPattern: function(pattern){
            var symbol,
                value;
            for(var i = 0; i < pattern.length; i++){
                value = parseInt(pattern.charAt(i));
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
        varyByHeight: true,
        START: "2",
        VALID_CODE_LENGTHS: [5,9, 11],
        DIGIT_SEPARATOR: "-",
        initValue: function(value, width, height){
            this.height = height;
            this.width = width;
            this.baseHeight = height /2;
            this.value = value.replace(new RegExp(this.DIGIT_SEPARATOR,"g"), "");
            this.pattern = [];
            this.validate(this.value);
            this.checkSum = 0;
            this.setBaseUnit();
        },
        addData:  function(){
            var value = this.value;
            this.addPattern(this.START);

            for(var i = 0; i < value.length; i++){
                this.addCharacter(value.charAt(i));
            }

            if(this.options.addCheckSum){
                this.addCheckSum();
            }

            this.addPattern(this.START);
            this.pattern.pop();
        },
        addCharacter: function(character){
            var pattern = this.characterMap[character];
            this.checkSum+= parseInt(character);
            this.addPattern(pattern);
        },
        addCheckSum: function(){
            var checkValue = (10 - (this.checkSum % 10)) % 10;
            this.addCharacter(checkValue);
        },
        setBaseUnit: function(){
            var quietZoneLength = this.options.addQuietZone ? 2 * this.options.quietZoneLength : 0,
                startStopLength = 3;
            this.baseUnit = this.width / ((this.value.length + 1) * 10 +  startStopLength + quietZoneLength);
        },
        validate: function(value){
            if(inArray(value.length, this.VALID_CODE_LENGTHS) < 0){
                throw new Error("Invalid value length.");
            }

            if(!numberRegex.test(value)){
                this.invalidCharacterError(value.match(/[^0-9]/)[0]);
            }
        },
        addPattern: function(pattern){
            var y1;
            for(var i = 0; i < pattern.length; i++){
                y1 = this.height - this.baseHeight * pattern.charAt(i);
                this.pattern.push({width: 1, y1: y1, y2: this.height});
                this.pattern.push(1);
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
			var that = this;
            that.pattern = [];
			that.options.height = height;
            that.baseUnit = width /(95 + 2 * this.options.quietZoneLength);
            that.value = value;			
			that.checksum = that.calculateChecksum();
			that.leftKey = value[0];
			that.leftPart = value.substr(1,6);
			that.rightPart = value.substr(7)+that.checksum;
        },
        addData:  function(){
            var that = this;
            that.addPieces(that.characterMap["start"]);
            that.addSide(that.leftPart,that.leftKey);
            that.addPieces(that.characterMap["middle"]);
            that.addSide(that.rightPart);
            that.addPieces(that.characterMap["start"]);
        },
        addSide:function(leftPart,key){
			var that = this;
            for(var i = 0; i < leftPart.length; i++){
				if(key && parseInt(this.keyTable[key][i])){
					that.addPieces(Array.prototype.slice.call(this.characterMap['digits'][leftPart[i]]).reverse(),true);
				}else{
					that.addPieces(this.characterMap['digits'][leftPart[i]],true);
				}          
            }
        },
		addPieces:function(arrToAdd,limitedHeight){
			for(var i=0;i<arrToAdd.length;i++){
				if(limitedHeight){
					this.pattern.push({
						y1:0,
						y2:this.options.height*0.95,
						width:arrToAdd[i]
					});
				}else{
					this.pattern.push(arrToAdd[i]);
				}
			}			
		},
        calculateChecksum: function (){
            var odd = 0,
                even = 0,
                value = this.value.split("").reverse().join("");
            for(var i = 0;i < value.length;i++){
                if(i%2){
                    even += parseInt(value[i]);
                }
                else{
                    odd += parseInt(value[i]);
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
        ]
        ,
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
            that.baseUnit = width /(67 + 2 * that.options.quietZoneLength);            
        }
    });

    var Barcode = Widget.extend({
        init: function (element, options) {
			 var that = this;           
             
             Widget.fn.init.call(that, element, options);
             that.element = element;
             var defaultView = dataviz.ui.defaultView();
             that.view = new defaultView();
             that.setOptions(options);
        },
        setOptions: function (options) {
			var that = this;
            that.type = (options.type || that.options.type).toLowerCase();
            that.encoding = new encodings[that.type]();
            that.options = $.extend(that.options, options);
            that.value(that.options.value);
        },
        redraw: function () {
            var that = this,
                showText = that.options.text.visible,
                textSize = dataviz.measureText(that.value, {font: that.options.text.font}),
                barHeight =  showText? that.options.height - textSize.height : that.options.height,
				result = that.encoding.encode(that.value,
                    that.options.width, barHeight);                
            that.textSize = textSize;
            that.barHeight = barHeight;
            that.view.children = [];
            that.view.options.width = that.options.width;
            that.view.options.height = that.options.height;
            that.addBackground();

            that.addElements(result.pattern, result.baseUnit);

            if (showText) {
               that.addText(that.value);
            }
            that.view.renderTo(that.element);
        },        
        value: function(value){
            this.value = value + "";
            this.redraw();
        },
        addElements: function (pattern, baseUnit) {
            var that = this,
				position = 0,
                step,
                item;

            for (var i = 0; i < pattern.length; i++) {
				item = isPlainObject(pattern[i]) ? pattern[i] : {
						width: pattern[i],
						y1:0,
						y2: that.barHeight
					}; 
                step = item.width * baseUnit;
                if(i%2){				                     
                     that.view.children.push(that.view.createRect(new Box2D(position, item.y1, position + step, item.y2),
                        { fill: that.options.color}));
                }

                position+= step;
            }
        },
        addBackground: function () {
              this.view.children.push(this.view.createRect(new Box2D(0,0, this.options.width, this.options.height),
                { fill: this.options.background }));
        },
        addText: function (value) {
            var that = this,
				font = that.options.text.font,
                text = new Text(value, {
                    font: font,
                    color: that.options.color,
                    align: "center",
                    vAlign: "bottom"
                });
                
            text.reflow(new Box2D(0, 0, that.options.width, that.options.height));

            that.view.children.push(that.view.createText(value, {
                baseline: text.baseline,
                x: text.box.x1,
                y: text.box.y1,
                color: that.options.text.color,
                font: font
            }));
        },
        options: {
            name: "Barcode",         
            // TODO: Throw error on validation
            value: "",
            type: "code39",
            // TODO: Implement
            //checksum: true|false
            // --
            // TODO: Move defaults to constants
            width: 300,
            height: 100,
            // TODO: Rename to color
            color: "black",
            background: "white",
            text: {
                visible: true,
                // style variant weight size/line-height family
                font: "16px sans-serif",
                color: "black",
                // TODO: Implement
                margin: {
                    top: 2,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            },
            // TODO: Implement
            padding: {
                top: 2,
                bottom: 2
                // Encoding-specific defaults
                // right, left
            },
            border: {
                width: 0,
                dashType: "solid",
                color: "black"
            }
        }
    });

   dataviz.ui.plugin(Barcode);

   kendo.deepExtend(dataviz, {
        encodings: encodings,
        Encoding: Encoding
   });

})(window.kendo.jQuery);
