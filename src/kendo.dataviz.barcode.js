kendo_module({  
    id: "dataviz.barcode",
    name: "Barcode",
    category: "dataviz",
    description: "Barcode widget.",
    depends: ["dataviz.core", "dataviz.svg"]
});


(function ($, undefined) {
    var kendo = window.kendo,
        dataviz = kendo.dataviz,
        Widget = kendo.ui.Widget,
        Box2D = dataviz.Box2D,
        Text = dataviz.Text,
        BAR = 1,
        SPACE = 0,
        DEFAULT_QUIETZONE_LENGTH = 10,
		numberRegex = /^\d+$/;

    var Encoding  = kendo.Class.extend({
        init: function (options) {
            this.options = $.extend(this.options, options);         
        },       
        encode: function (value, width, height) {
            this.initValue(value, width, height);            
            this.addQuietZone();            
            this.addData();            
            this.addQuietZone(); 
			
            return {
                baseUnit: this.baseUnit,
                pattern: this.pattern
            };
        },  
		options: {
			quietZoneLength: 10
		},		
        initValue: function (value, width, height) {
           
        },
        addQuietZone: function () { 
            this.pattern.push([0, this.options.quietZoneLength || DEFAULT_QUIETZONE_LENGTH]);
        },
		addArrayToPattern:function(arr){
			for(var i=0;i<arr.length;i++){
				this.pattern.push(arr[i]);
			}	
		},
        addData: function () {
    
        }
    }); 

    var encodings = {};

	var code39Base = Encoding.extend({
		addData: function(){
			var value  = this.value;
		
			this.addStart();
			
			for(var idx = 0; idx < value.length; idx++){
				this.addCharacter(value, idx);
			}		
			
			if(this.options.addCheckSum){
				this.pushCheckSum();
			} 
			
			this.addStop();
			this.setBaseUnit();
			this.validate();
		},
		_findCharacterByValue: function (value) {
            for (var character in this.characterMap) {
                if (this.characterMap[character].value === value) {
                    return this.characterMap[character];
                }
            }
        },
		addBase: function(character){
			
		},
		options: {
			addCheckSum: false,
			showCheckSum: false,
			addQuietZone: true
		}
	});
	
	var code39ExtendedBase = {
		addCharacter: function(value, index){
			var code = value.charAt(index);
			if(this.characterMap[code]){
				this.addBase(this.characterMap[code]);
			}
			else if(code > 127){
				throw new Error("Invalid Character");
			}
			else{			
				var patterns;
				for(var i = 0; i < this.extendedMappings.length; i++){
					if(patterns = this.extendedMappings[i].call(this, code.charCodeAt(0))){
						for(var j = 0; j < patterns.length; j++){							
							this.addBase(patterns[j]);		
						}
						this.dataLength+= patterns.length - 1;
						break;
					}
				}				
			}
		},
		extendedMappings: [
			function(code){
				if(97 <= code && code <= 122){
					return [this.characterMap[this.shift0], this.characterMap[String.fromCharCode(code - 32)]]
				}
			},
			function(code){
				if(33 <= code && code <= 58){
					return [this.characterMap[this.shift1], this.characterMap[String.fromCharCode(code + 32)]]
				}
			},	
			function(code){
				if(1 <= code && code <= 26){
					return [this.characterMap[this.shift2], this.characterMap[String.fromCharCode(code + 64)]]
				}
			},		
			function(code){
				var result,
					dataCharacterCode,
					codes;
				if(!this.specialAsciiCodes[code]){
					dataCharacter =  Math.floor(code / 32) * 6 + (code - 27) % 32 + 64;
					result = [this.characterMap[this.shift3], this.characterMap[String.fromCharCode(dataCharacter)]];
				}
				else{
					result = [];
					for(var i = 0; i < this.specialAsciiCodes[code].length; i++){
						result.push(this.characterMap[this.shift3]);
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
		}
	};
	
	//try adjust ratio?
    encodings.code39 =  code39Base.extend({
		checkSumMod: 43,
		minBaseUnitLength: 0.7,
		minRatio: 2.5,
		maxRatio: 3.4,		
        initValue: function (value, width, height) {
            this.width = width;
			this.height = this.height;
			this.ratio = this.options.ratio;
            this.quietZoneLength = this.options.quietZoneLength;         
            this.value = value;
			this.checkSum = 0;
			this.dataLength = value.length;
            this.pattern = [];
        },
		validate: function(){
		    var minHeight = Math.max(0.15 * this.width, 24);
            if (this.height < minHeight) {
                throw new Error("Insufficient height");				
            }
			
			if(this.baseUnit < this.minBaseUnitLength){				
				throw new Error("Insufficient width");				
			}
		},
		setBaseUnit: function(){
			var checkSumLength = this.options.addCheckSum ? 2 : 0,
				quietZoneLength = this.options.addQuietZone ? this.options.quietZoneLength : 0;
			
			this.baseUnit =  this.width / 
				((this.dataLength + 2 + checkSumLength) * (this.ratio + 2) * 3 + this.dataLength + 1 + 2 * quietZoneLength);
		},
        addStart: function () {
             var character =  this.characterMap.START;
             this.addPattern(character.pattern);
             this.addCharacterGap();  
        },    
		addCharacter: function(value, index){
			var character = this.characterMap[value.charAt(index)];			
			this.addBase(character);
		},
		addBase: function(character){
			this.addPattern(character.pattern);
			this.checkSum+= character.value;
			this.addCharacterGap();
		},
		pushCheckSum: function(){
			var checkValue = this.checkSum % this.checkSumMod,
				character = this._findCharacterByValue(checkValue);
	
			this.addPattern(character.pattern);
			this.addCharacterGap();
		},
        addStop: function () {
            var character =  this.characterMap.START;
            this.addPattern(character.pattern);
        }, 
        addPattern: function (pattern) {                
            for (var i = 0; i < pattern.length; i++) {
                if (pattern[i] == "b") {
                    this.pattern.push([BAR, 1]);
                }
                else if(pattern[i] == "B"){
                    this.pattern.push([BAR, this.ratio]);
                }
                else if(pattern[i] == "w"){
                    this.pattern.push([SPACE, 1]);
                }
                else if(pattern[i] == "W"){
                    this.pattern.push([SPACE, this.ratio]);
                }  
            }
        },
        addCharacterGap: function () {
            this.pattern.push([SPACE, 1]);
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
            ratio: 2.5
        }
    });
	
	encodings.code39extended = encodings.code39.extend(code39ExtendedBase).extend({
		shift0: "+",
		shift1: "/",
		shift2: "$",
		shift3: "%"	
	});
	
	//TO DO: validate
    encodings.code93 = code39Base.extend({
		cCheckSumTotal: 20,
		kCheckSumTotal: 15,
		checkSumMod: 47,
		initValue: function(value, width, height){
			this.value = value;
			this.width = width;
			this.height = height;
			this.pattern = [];
			this.cCheckSum = 0;
			this.kCheckSum = 0;
			this.dataLength = value.length;
			this.dataIndex = 0;			
		}, 
		validate: function(){
			
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
			this.addPattern([1,1]);
		},
		addCharacter: function(value, index){
			var character = value.charAt(index),
				charData = this.characterMap[character];
			this.addBase(charData)
		},
		addBase: function(charData){
			this.addPattern(charData.pattern);
			this.addCheckSums(charData.value, this.dataIndex++);
		},
		addCheckSums: function(characterValue, index){						
			this.cCheckSum += this.weightedValue(characterValue, this.dataLength, index, this.cCheckSumTotal);					
			this.kCheckSum += this.weightedValue(characterValue, this.dataLength + 1, index, this.kCheckSumTotal);
		},
		pushCheckSum: function(){
			var cValue = this.cCheckSum % this.checkSumMod,
				cCharacter = this._findCharacterByValue(cValue),
				kValue = (this.kCheckSum  + cValue) % this.checkSumMod,
				kCharacter = this._findCharacterByValue(kValue);	
			this.addPattern(cCharacter.pattern);
			this.addPattern(kCharacter.pattern);			
		},
		addPattern: function(pattern){
			var symbol,
				value;
			
			for(var i = 0; i < pattern.length; i++){		
				symbol = i % 2 == 0 ? BAR : SPACE;
				value = parseInt(pattern[i]);
				this.pattern.push([symbol, value]);
			}
		},
		weightedValue: function(value, length, index, total){
			var weightedValue = (length - index) % total;
			return (weightedValue || total) * value;
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
			"START": {"pattern":"111141"}
		}
	});
	
	encodings.code93extended = encodings.code93.extend(code39ExtendedBase).extend({	
		shift0: "SHIFT0",
		shift1: "SHIFT1",
		shift2: "SHIFT2",
		shift3: "SHIFT3",		
		characterMap: {
			SHIFT0:{"pattern":"122211","value":46},
			SHIFT1:{"pattern":"311121","value":45},		
			SHIFT2:{"pattern":"121221","value":43},
			SHIFT3:{"pattern":"312111","value":44}				
		}
	});
	
	function getNext(value, index, count){
		return value.substring(index, index + count);
	}
	
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
		
	var state128AB = state128.extend({
		addStart: function(){
			this.encoding.addPattern(this.START);
		},
		is: function (value, index){
			var code = value.charCodeAt(index);
			return this.isCode(code);
		},	
		move: function(encodingState){
			var idx = 0;
			while(!this._moves[idx].call(this, encodingState) && idx < this._moves.length){
				idx++;
			}
		},
		pushState: function(encodingState){
			var code;	
			while( (code = encodingState.value.charCodeAt(encodingState.index)) >= 0 && this.isCode(code)){
				this.encoding.addPattern(this.getValue(code));
				encodingState.index++;					
			}
		},	
		_initMoves: function(states){
			this._moves = [];
			
			for(var i = 0; i < states.length; i++){
				if(states[i].indexOf("FNC") >= 0){
					this._moves.push(this._moveFNC);
					break;
				}
			}	
			if(states.indexOf(this.shiftKey)){
				this._moves.push(this._shiftState);	
			}			
			this._moves.push(this._moveState);
		},
		_moveFNC: function(encodingState){
			if(encodingState.fnc){
				encodingState.fnc = false;
				return encodingState.state == this.key;
			}
		},
		_shiftState: function(encodingState){
			if(encodingState.previousState == this.shiftKey && 
				this.encoding[this.shiftKey].is(encodingState.value, encodingState.index + 1)){
				this.encoding.addPattern(this.SHIFT);
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
		init: function(encoding, states){
			this.encoding = encoding;
			this._initMoves(states);
		},		
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
		init: function(encoding, states){
			this.encoding = encoding;
			this._initMoves(states);
		},		
		isCode: function(code){
			return 32 <= code && code < 128;
		},
		getValue: function(code){
			return code - 32;
		},
		MOVE: 100,
		START: 104,
	});
	
	states128.C = state128.extend({
		key: "C",
		addStart: function(){
			this.encoding.addPattern(this.START);
		},
		is: function (value, index){
			var next4 = getNext(value, index, 4);
			return index + 4 <= value.length && numberRegex.test(next4);
		},
		move: function (encodingState){
			if(encodingState.fnc){
				encodingState.fnc = false;
				if(encodingState.state == this.key){
					return;
				}
			}
			this.encoding.addPattern(this.MOVE);
		},
		pushState: function(encodingState){
			var code;
			while(( code = getNext(encodingState.value, encodingState.index, 2)) 
				&& numberRegex.test(code))
			{				
				this.encoding.addPattern(parseInt(code));
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
			var subState = this._initSubState(encodingState),
				encoding = this.encoding,
				length = subState.value.length;
			encodingState.index += length;	

			if(length < 3){	
				var code;
				for(; subState.index < length; subState.index++){	
					code = subState.value.charCodeAt(subState.index);
					subState.state = this._getSubState(code);				
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
				this._pushStart(subState);			
				encoding.pushData(subState, this.subStates);				
				if(encodingState.index < encodingState.value.length){
					this._pushStart(subState);
				}
			}	
					
			encodingState.fnc = true;
			encodingState.state = subState.state;
		},
		_pushStart: function(subState){
			this.encoding.addPattern(this.encoding[subState.state].MOVE);
			this.encoding.addPattern(this.encoding[subState.state].MOVE);
		},
		_initSubState: function(encodingState){
			var subState = {
					value: this._getAll(encodingState.value, encodingState.index),
					index: 0								
				};
			subState.state = this._getSubState(subState.value.charCodeAt(0));	
			subState.previousState = encodingState.previousState == this.key ? 
				subState.state : encodingState.previousState;
			return subState;
		},
		_initSubStates: function(states){
			this.subStates = [];
			for(var i = 0; i < states.length; i++){
				if(this.dependentStates.indexOf(states[i]) >= 0){
					this.subStates.push(states[i]);
				}					
			}				
		},	
		_getSubState: function(code){
			for(var i = 0; i < this.subStates.length; i++){
				if(this.encoding[this.subStates[i]].isCode(code)){				
					return this.subStates[i];
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
		addStart: function(encodingState){
			this.encoding[this.startState].addStart();
		},
		is: function(value, index){
			return this.states.indexOf(this.key) >= 0;
		},		
		pushState: function(encodingState){
			var encoding = this.encoding,
                value = encodingState.value,
                index = encodingState.index,
                current = this.getNextAI(value, index),
                end,
				subState;         
                
            while(index >=0 && index < value.length){
                end = current.length ? current.length : value.indexOf(startAI, index + current.min);
                
                subState = {
                    value: getNext(value, index, index + end).replace(/[)(]/g,"")
                };
            }
			for(var i = 0; i < value.length;i++){
				encoding.addPattern(this.START);
				subState = {
					value: value[i],
					index: 0,
					state: "C"
				};
				encoding.pushData(subState, this.states);                                    
				encodingState.index+= isArray ? 1 : subState.value.length
			}		
		},
        getNextAI: function(value, index){
            var start = value.indexOf(startAI, index),
                end = value.indexOf(endAI, start),
                id = value.substring(start + 1,end);
            if(!this.AI[id] && !this.AI[id.substr(id.length - 1)]){
                throw new Error("Unsupported Application Identifier");
            }
            
            return this.AI[id];
        },
		AI: {
			"00": { length: 18, type: "numeric"},
            "00": { length: 18, type: "numeric"},
            "329": {length: 6 },
            "12": {length: 6},
            "421": { min: 4, max: 12, type: "alphanumeric"}            
		},
		START: 102
	});
	// TO DO: add support for Application identifiers
	//validate
    encodings.code128 = Encoding.extend({
        init: function (options) {
            this.options = $.extend(this.options, options);   
			this._initStates();
        },  
		_initStates: function(){
			this.states = this.options.states;
				
			if(!$.isArray(this.states)){
				this.states = [this.states];
			}
			debugger;
			for(var i = 0; i < this.states.length; i++){
				if(states128[this.states[i]].prototype.dependentStates){
					var dependentState,
						dependentStates = states128[this.states[i]].prototype.dependentStates;
					for(var j = 0; j < dependentStates.length; j++){
						dependentState = dependentStates[j];
						if(this.states.indexOf(dependentState) < 0){
							this.states.push(dependentState);
						}
					}
				}
			}
			
			for(var i = 0; i < this.states.length; i++){				
				if(!this[this.states[i]]){
					this[this.states[i]]  = new states128[this.states[i]](this, this.states);					
				}
			}
		},
        initValue: function (value, width, height) {
           this.pattern = [];
		   this.value = value;
		   this.width = width;
		   this.height = height;
		   this.checkSum = 0;
		   this.totalUnits = 0;
		   this.index = 0;
		   this.position = 1;
		   this.printText = this.value;		   
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
			var code = this.checkSum % 103;
			this.addPattern(code);
		},
		addStop: function(){
			this.addPattern(this.STOP);
		},
		setBaseUnit: function(){
			this.baseUnit = this.width / (this.totalUnits + 2 * this.options.quietZoneLength);
		},
		addPattern: function(code){	
			var pattern = this.characterMap[code].toString(),
				symbol,
				value;
			
			for(var i = 0; i < pattern.length; i++){		
				symbol = i % 2 == 0 ? BAR : SPACE;
				value = parseInt(pattern[i]);
				this.pattern.push([symbol, value]);
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
			states: ["C", "B", "A", "FNC4","FNC1"]
        }    
    });	
	
	encodings.ean8 = Encoding.extend({
		initValue: function(value, width, height){
			this.pattern = [];
			this.baseUnit = width /(67 + 2 * this.options.quietZoneLength);
			this.value = value;
		},
		addData:  function(){
			var checksum = this.calculateChecksum(this.value),
				firstPart  = this.value.substr(0,4),
				secondPart = this.value.substr(4) + checksum;
				
			this.addPiece("start");
			for(var i = 0; i < firstPart.length; i++){
				this.addPiece(firstPart.charAt(i), 0);
			}
			this.addPiece("middle");
			 for(var i = 0; i < secondPart.length; i++){
				 this.addPiece(secondPart[i], 1);
			 }
			this.addPiece("start");
		},

		addPiece: function(character, fromTable){
			
			var arrToAdd = fromTable !== undefined ? 
				this.characterMap.characters[fromTable][character]: 
				this.characterMap[character];
				
			this.addArrayToPattern(arrToAdd);
		},
		calculateChecksum: function (){			
			var odd = 0,
				even = 0,
				value = this.value;
			
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
		characterMap: {
			characters: [
				[
					[[SPACE,3],[BAR, 2],[SPACE,1], [BAR, 1]],
					[[SPACE,2],[BAR, 2],[SPACE,2], [BAR, 1]],
					[[SPACE,2],[BAR, 1],[SPACE,2], [BAR, 2]],
					[[SPACE,1],[BAR, 4],[SPACE,1], [BAR, 1]],
					[[SPACE,1],[BAR, 1],[SPACE,3], [BAR, 2]],
					[[SPACE,1],[BAR, 2],[SPACE,3], [BAR, 1]],
					[[SPACE,1],[BAR, 1],[SPACE,1], [BAR, 4]],
					[[SPACE,1],[BAR, 3],[SPACE,1], [BAR, 2]],
					[[SPACE,1],[BAR, 2],[SPACE,1], [BAR, 3]],
					[[SPACE,3],[BAR, 1],[SPACE,1], [BAR, 2]]
				],
				[	
					[[BAR,3],[SPACE, 2],[BAR,1], [SPACE, 1]],
					[[BAR,2],[SPACE, 2],[BAR,2], [SPACE, 1]],
					[[BAR,2],[SPACE, 1],[BAR,2], [SPACE, 2]],
					[[BAR,1],[SPACE, 4],[BAR,1], [SPACE, 1]],
					[[BAR,1],[SPACE, 1],[BAR,3], [SPACE, 2]],
					[[BAR,1],[SPACE, 2],[BAR,3], [SPACE, 1]],
					[[BAR,1],[SPACE, 1],[BAR,1], [SPACE, 4]],
					[[BAR,1],[SPACE, 3],[BAR,1], [SPACE, 2]],
					[[BAR,1],[SPACE, 2],[BAR,1], [SPACE, 3]],
					[[BAR,3],[SPACE, 1],[BAR,1], [SPACE, 2]]
				]
			],
			start: [[BAR,1],[SPACE, 1], [BAR, 1]],
			middle: [[SPACE,1],[BAR, 1], [SPACE, 1],[BAR, 1],[SPACE, 1]]
		}
	});
	
	encodings.ean13 = Encoding.extend({
		initValue: function(value, width, height){
			this.pattern = [];
			this.baseUnit = width /(95 + 2 * this.options.quietZoneLength);
			this.value = value;
		},
		addData:  function(){			
			var checksum = this.calculateChecksum(),
				leftKey = this.value[0],
				leftPart = this.value.substr(1,6),
				rightPart = this.value.substr(7)+checksum;			
			
			this.addArrayToPattern(this.characterMap["start"]);
			this.addLeftSide(leftPart,leftKey);
			this.addArrayToPattern(this.characterMap["middle"]);
			this.addRightSide(rightPart);
			this.addArrayToPattern(this.characterMap["start"]);
			
		},
		addLeftSide:function(leftPart,key){
			for(var i = 0; i < leftPart.length; i++){
				this.addArrayToPattern(this.getLeftPattern(leftPart[i],this.keyTable[key][i]));					
			}
		},
		getLeftPattern:function(character,side){
			return this.characterMap['leftTable'][side][character];
		},
		addRightSide:function(rightPart){
			for(var i = 0; i < rightPart.length; i++){
				this.addArrayToPattern(this.characterMap['rightTable'][rightPart[i]]);					
			}
		},
		calculateChecksum: function (){		
			var odd = 0,
				even = 0,
				value = this.value;
			
			for(var i = value.length-1;i >= 0;i--){
				if(i%2){ 
					odd += parseInt(value[i]);
				}
				else{
					even += parseInt(value[i]);
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
			leftTable:[
				[
					[[SPACE,3],[BAR,2],[SPACE,1],[BAR,1]],
					[[SPACE,2],[BAR,2],[SPACE,2],[BAR,1]],
					[[SPACE,2],[BAR,1],[SPACE,2],[BAR,2]],
					[[SPACE,1],[BAR,4],[SPACE,1],[BAR,1]],
					[[SPACE,1],[BAR,1],[SPACE,3],[BAR,2]],
					[[SPACE,1],[BAR,2],[SPACE,3],[BAR,1]],
					[[SPACE,1],[BAR,1],[SPACE,1],[BAR,4]],
					[[SPACE,1],[BAR,3],[SPACE,1],[BAR,2]],
					[[SPACE,1],[BAR,2],[SPACE,1],[BAR,3]],
					[[SPACE,3],[BAR,1],[SPACE,1],[BAR,2]]
				]
				,
				[
					[[SPACE,1],[BAR,1],[SPACE,2],[BAR,3]],
					[[SPACE,1],[BAR,2],[SPACE,2],[BAR,2]],
					[[SPACE,2],[BAR,2],[SPACE,1],[BAR,2]],
					[[SPACE,1],[BAR,1],[SPACE,4],[BAR,1]],
					[[SPACE,2],[BAR,3],[SPACE,1],[BAR,1]],
					[[SPACE,1],[BAR,3],[SPACE,1],[BAR,1]],
					[[SPACE,4],[BAR,1],[SPACE,1],[BAR,1]],
					[[SPACE,2],[BAR,1],[SPACE,3],[BAR,1]],
					[[SPACE,3],[BAR,1],[SPACE,2],[BAR,1]],
					[[SPACE,2],[BAR,1],[SPACE,1],[BAR,3]]
				]
			],
			rightTable:[
				[[BAR,3],[SPACE,2],[BAR,1],[SPACE,1]],
				[[BAR,2],[SPACE,2],[BAR,2],[SPACE,1]],
				[[BAR,2],[SPACE,1],[BAR,2],[SPACE,2]],
				[[BAR,1],[SPACE,4],[BAR,1],[SPACE,1]],
				[[BAR,1],[SPACE,1],[BAR,3],[SPACE,2]],
				[[BAR,1],[SPACE,2],[BAR,3],[SPACE,1]],
				[[BAR,1],[SPACE,1],[BAR,1],[SPACE,4]],
				[[BAR,1],[SPACE,3],[BAR,1],[SPACE,2]],
				[[BAR,1],[SPACE,2],[BAR,1],[SPACE,3]],
				[[BAR,3],[SPACE,1],[BAR,1],[SPACE,2]],
			],
			start: [[BAR,1],[SPACE, 1], [BAR, 1]],
			middle: [[SPACE,1],[BAR, 1], [SPACE, 1],[BAR, 1],[SPACE, 1]]
		}		
	});
	
    var Barcode = Widget.extend({
        init: function (element, options) {                                     
             Widget.fn.init.call(this, element, options);
             this.element = element;            
             this.view = new (dataviz.ui.defaultView())(); 
             this.setOptions(options);                                
        },
        setOptions: function (options) { 		
            if (!this.enocoding || ( options.encoding.name && this.options.encoding.name !== 
                options.encoding.name.toLowerCase())){
                this.encoding = new encodings[this.options.encoding.name.toLowerCase()](options.encoding);
            }
            this.options = $.extend(this.options, options);           
            this.value(this.options.value);
        },
        redraw: function () {
            var result = this.encoding.encode(this.value, 
                this.options.width, this.options.height);
            this.view.children = [];
            this.view.options.width = this.options.width;
            this.view.options.height = this.options.height + this.options.fontSize;
            this.addBackground();
            
            this.addElements(result.pattern, result.baseUnit);
            if (this.options.showText) {
               this.addText(this.value);
            }
            this.view.renderTo(this.element);
        },
        value: function(value){            
            this.value = value;
            this.redraw();            
        },
        addElements: function (pattern, baseUnit) {
            var step,
                position = 0;
            for (var i = 0; i < pattern.length; i++) {                               
             
                step = pattern[i][1] * baseUnit;       
                if(pattern[i][0] === BAR){
                     this.view.children.push(this.view.createRect(new Box2D(position, 0, position + step, this.options.height), 
                        { fill: this.options.lineColor}));  
                }

                position+= step;                
            }
        },
        addBackground: function () {
              this.view.children.push(this.view.createRect(new Box2D(0,0, this.options.width, this.options.height),
                { fill: this.options.backColor}));
        },
        addText: function (value) { 
            var font = this.options.fontSize + "px " + this.options.fontFamily,
                text = new Text(value, {
                    font: font, 
                    color: this.options.color,
                    align: "center",
                    vAlign: "bottom"
                });               
            text.reflow(new Box2D(0, 0, this.options.width, this.options.height + this.options.fontSize));
            this.view.children.push(this.view.createText(value, {
                baseline: text.baseline, 
                x: text.box.x1, 
                y: text.box.y1, 
                color: this.options.color,
                font: font
            }));
        },
        options: {
            name: "Barcode",
            value: "",
            encoding: {
                name: "code39"
            },
            width: 300,
            height: 100,
            lineColor: "black",
            backColor: "white",
            color: "black",
            showText: true,
            fontSize: 16,
            fontFamily: "sans-serif"                    
        }
    });

   dataviz.ui.plugin(Barcode);
   
   kendo.deepExtend(dataviz, {
        encodings: encodings,
        Encoding: Encoding
   });
})(window.kendo.jQuery);             