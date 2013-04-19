kendo_module({  
    id: "barcode",
    name: "Barcode",
    category: "dataviz",
    description: "Barcode widget.",
    depends: ["dataviz-core", "dataviz-svg"]
});


(function ($, undefined) {
    var kendo = window.kendo,
        dataviz = kendo.dataviz,
        Widget = kendo.ui.Widget,
        Box2D = dataviz.Box2D,
        Text = dataviz.Text,
        BAR = 1,
        SPACE = 0,
        DEFAULT_QUIETZONE_LENGTH = 10;

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
        addData: function () {
    
        }
    }); 

    var encodings = {};

    // TO DO: validate value characters
    encodings.code39 =  Encoding.extend({
        initValue: function (value, width, height) {
            this.baseUnit = this.getBaseUnit(value, width, height);
            this.quietZoneLength = this.options.quietZoneLength;
            var minHeight = Math.max(0.15 * width, 24);
            if (height < minHeight) {
                throw new Error("The specified height is not sufficient");
            }
            this.value = value;
            this.pattern = [];
        },
        addStart: function () {
             var character =  this.characterMap["start"];
             this.addPattern(character.pattern);
             this.addCharacterGap();  
        },        
        addData: function () {
            var character;

            this.addStart();

            for(var i = 0; i < this.value.length; i++){
                character = this.characterMap[this.value.charAt(i)];
                this.addPattern(character.pattern);
                this.addCharacterGap();    
            }

            if (this.options.addCheckSum) {
                this.addCheckSum();
            }

            this.addStop();
        },
        addCheckSum: function () {
                var sum = 0,
                    mod43;
                for (var i = 0; i < this.value.length; i++) {
                    sum+= this.characterMap[this.value.charAt(i)].value;
                }

                mod43 = sum % 43;
                character = this.findCharacterByValue(mod43);
                this.addPattern(character.pattern);
                this.addCharacterGap();              
        },
        addStop: function () {
            var character =  this.characterMap["start"];
            this.addPattern(character.pattern);
        }, 
        getBaseUnit: function (value, width, height) {
            var ratio = this.options.minRatio,
                length = value.length,
                baseUnit; 
               
            while ((baseUnit = this.calculateBaseUnit(length, width, ratio)) < 0.72 &&  
                ratio <= this.options.maxRatio) {
                ratio += 0.1;
            }
            
            if (ratio > this.options.maxRatio) {
                throw new Error("The width is not big enough for the value");
            }

            this.ratio = ratio;
            return baseUnit;
        },
        calculateBaseUnit:function(length, width, ratio){
            var checkLength = this.options.addCheckSum ? 1 : 0;
            return width / ((length + 2 + checkLength) * (ratio + 2) * 3 + length + 1 + 2 * DEFAULT_QUIETZONE_LENGTH);
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
        findCharacterByValue: function (value) {
            for (var character in this.characterMap) {
                if (this.characterMap[character].value === value) {
                    return this.characterMap[character];
                }
            }
        },
        addCharacterGap: function () {
            this.pattern.push([0, 1]);
        },
        characterMap: {
            K: { pattern: "BwbwbwbWB", value: 20 },             
            R: { pattern: "BwbwbwBWb", value: 27 },             
            U: { pattern: "BWbwbwbwB", value: 30 },    
            Y: { pattern: "BWbwBwbwb", value: 34},         
            start: { pattern: "bWbwBwBwb"}
        },
        options: {
            ratio: 3,
            minRatio: 2,
            maxRatio: 3.4,
            addCheckSum: false            
        }
    });

    encodings.code128 = Encoding.extend({
        init: function (options) {
            this.options = $.extend(this.options, options);         
        },            
        initValue: function (value, width, height) {
            this.type = "B",
                code = value.charCodeAt(0);
            if (code < 32) {
                this.type = "A";
            }          
            else if(value.length > 3 && parseInt(value.substr(0,4))){
                this.type = "C";
            }  
            else if(code > 127 && code < 256 && code - 128 < 32){
                this.type = "A";
            }           
        },
        addPattern: function (value, index) {
            var code = value.charCodeAt(index),
                mapCode;
            if (code < 32) {
                mapCode = code + 64;
            }
            else if(32 <= code && code < 128){
                mapCode = code + 32;
            }
            else if(type == "C"){
                var number = parseInt(char);
                mapCode = code + 32;
            }
            else if(code > 127 &&  code< 256){
                mapCode = code - 128;
            }                        
        },
        addCheckSum: function () {
            
        },
        addData: function () {
           
        },
        addStop: function () {
            
        },
        characterMap: {
            //ascii
            75: {pattern: "112331", value: 43},//K
            82: {pattern: "231131", value: 50}, //R
            85: {pattern: "213131", value: 53}, //U
            //literal
            startA: { pattern: "211412", value: 103},
            startB: { pattern: "211214", value: 104},
            startC: { pattern: "211232", value: 105}
        },       
        options: {
            
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
				
			this.addPattern("start");
			for(var i = 0; i < firstPart.length; i++){
				this.addPattern(firstPart.charAt(i), 0);
			}
			this.addPattern("middle");
			 for(var i = 0; i < secondPart.length; i++){
				 this.addPattern(secondPart[i], 1);
			 }
			this.addPattern("start");
		},

		addPattern: function(character, fromTable){
			
			var arrToAdd = fromTable !== undefined ? 
				this.characterMap.characters[fromTable][character]: 
				this.characterMap[character];
				
			for(var i=0;i<arrToAdd.length;i++){
				this.pattern.push(arrToAdd[i]);
			}	
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
})(window.kendo.jQuery);

               