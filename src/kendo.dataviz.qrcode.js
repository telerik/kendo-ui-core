(function(f, define){
    define([ "./kendo.dataviz.core", "./kendo.drawing" ], f);
})(function(){

var __meta__ = {
    id: "dataviz.qrcode",
    name: "QRCode",
    category: "dataviz",
    description: "QRCode widget.",
    depends: [ "dataviz.core", "drawing" ]
};

(function ($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        geom = kendo.geometry,
        draw = kendo.drawing,
        dataviz = kendo.dataviz,
        Widget = kendo.ui.Widget,
        Box2D = dataviz.Box2D,
        terminator = "0000",
        NUMERIC = "numeric",
        ALPHA_NUMERIC = "alphanumeric",
        BYTE = "byte",
        powersOfTwo = {"1": 0},
        powersOfTwoResult = {"0": 1},
        generatorPolynomials = [[1,0],[1,25,0]],
        irregularAlignmentPatternsStartDistance = {15:20,16:20,18:24,19:24,22:20,24:22,26:24,28:20,30:20,31:24,32:28,33:24,36:18,37:22,39:20,40:24},
        versionsCodewordsInformation = [{L:{groups:[[1,19]],totalDataCodewords:19,errorCodewordsPerBlock:7},M:{groups:[[1,16]],totalDataCodewords:16,errorCodewordsPerBlock:10},Q:{groups:[[1,13]],totalDataCodewords:13,errorCodewordsPerBlock:13},H:{groups:[[1,9]],totalDataCodewords:9,errorCodewordsPerBlock:17}},{L:{groups:[[1,34]],totalDataCodewords:34,errorCodewordsPerBlock:10},M:{groups:[[1,28]],totalDataCodewords:28,errorCodewordsPerBlock:16},Q:{groups:[[1,22]],totalDataCodewords:22,errorCodewordsPerBlock:22},H:{groups:[[1,16]],totalDataCodewords:16,errorCodewordsPerBlock:28}},{L:{groups:[[1,55]],totalDataCodewords:55,errorCodewordsPerBlock:15},M:{groups:[[1,44]],totalDataCodewords:44,errorCodewordsPerBlock:26},Q:{groups:[[2,17]],totalDataCodewords:34,errorCodewordsPerBlock:18},H:{groups:[[2,13]],totalDataCodewords:26,errorCodewordsPerBlock:22}},{L:{groups:[[1,80]],totalDataCodewords:80,errorCodewordsPerBlock:20},M:{groups:[[2,32]],totalDataCodewords:64,errorCodewordsPerBlock:18},Q:{groups:[[2,24]],totalDataCodewords:48,errorCodewordsPerBlock:26},H:{groups:[[4,9]],totalDataCodewords:36,errorCodewordsPerBlock:16}},{L:{groups:[[1,108]],totalDataCodewords:108,errorCodewordsPerBlock:26},M:{groups:[[2,43]],totalDataCodewords:86,errorCodewordsPerBlock:24},Q:{groups:[[2,15],[2,16]],totalDataCodewords:62,errorCodewordsPerBlock:18},H:{groups:[[2,11],[2,12]],totalDataCodewords:46,errorCodewordsPerBlock:22}},{L:{groups:[[2,68]],totalDataCodewords:136,errorCodewordsPerBlock:18},M:{groups:[[4,27]],totalDataCodewords:108,errorCodewordsPerBlock:16},Q:{groups:[[4,19]],totalDataCodewords:76,errorCodewordsPerBlock:24},H:{groups:[[4,15]],totalDataCodewords:60,errorCodewordsPerBlock:28}},{L:{groups:[[2,78]],totalDataCodewords:156,errorCodewordsPerBlock:20},M:{groups:[[4,31]],totalDataCodewords:124,errorCodewordsPerBlock:18},Q:{groups:[[2,14],[4,15]],totalDataCodewords:88,errorCodewordsPerBlock:18},H:{groups:[[4,13],[1,14]],totalDataCodewords:66,errorCodewordsPerBlock:26}},{L:{groups:[[2,97]],totalDataCodewords:194,errorCodewordsPerBlock:24},M:{groups:[[2,38],[2,39]],totalDataCodewords:154,errorCodewordsPerBlock:22},Q:{groups:[[4,18],[2,19]],totalDataCodewords:110,errorCodewordsPerBlock:22},H:{groups:[[4,14],[2,15]],totalDataCodewords:86,errorCodewordsPerBlock:26}},{L:{groups:[[2,116]],totalDataCodewords:232,errorCodewordsPerBlock:30},M:{groups:[[3,36],[2,37]],totalDataCodewords:182,errorCodewordsPerBlock:22},Q:{groups:[[4,16],[4,17]],totalDataCodewords:132,errorCodewordsPerBlock:20},H:{groups:[[4,12],[4,13]],totalDataCodewords:100,errorCodewordsPerBlock:24}},{L:{groups:[[2,68],[2,69]],totalDataCodewords:274,errorCodewordsPerBlock:18},M:{groups:[[4,43],[1,44]],totalDataCodewords:216,errorCodewordsPerBlock:26},Q:{groups:[[6,19],[2,20]],totalDataCodewords:154,errorCodewordsPerBlock:24},H:{groups:[[6,15],[2,16]],totalDataCodewords:122,errorCodewordsPerBlock:28}},{L:{groups:[[4,81]],totalDataCodewords:324,errorCodewordsPerBlock:20},M:{groups:[[1,50],[4,51]],totalDataCodewords:254,errorCodewordsPerBlock:30},Q:{groups:[[4,22],[4,23]],totalDataCodewords:180,errorCodewordsPerBlock:28},H:{groups:[[3,12],[8,13]],totalDataCodewords:140,errorCodewordsPerBlock:24}},{L:{groups:[[2,92],[2,93]],totalDataCodewords:370,errorCodewordsPerBlock:24},M:{groups:[[6,36],[2,37]],totalDataCodewords:290,errorCodewordsPerBlock:22},Q:{groups:[[4,20],[6,21]],totalDataCodewords:206,errorCodewordsPerBlock:26},H:{groups:[[7,14],[4,15]],totalDataCodewords:158,errorCodewordsPerBlock:28}},{L:{groups:[[4,107]],totalDataCodewords:428,errorCodewordsPerBlock:26},M:{groups:[[8,37],[1,38]],totalDataCodewords:334,errorCodewordsPerBlock:22},Q:{groups:[[8,20],[4,21]],totalDataCodewords:244,errorCodewordsPerBlock:24},H:{groups:[[12,11],[4,12]],totalDataCodewords:180,errorCodewordsPerBlock:22}},{L:{groups:[[3,115],[1,116]],totalDataCodewords:461,errorCodewordsPerBlock:30},M:{groups:[[4,40],[5,41]],totalDataCodewords:365,errorCodewordsPerBlock:24},Q:{groups:[[11,16],[5,17]],totalDataCodewords:261,errorCodewordsPerBlock:20},H:{groups:[[11,12],[5,13]],totalDataCodewords:197,errorCodewordsPerBlock:24}},{L:{groups:[[5,87],[1,88]],totalDataCodewords:523,errorCodewordsPerBlock:22},M:{groups:[[5,41],[5,42]],totalDataCodewords:415,errorCodewordsPerBlock:24},Q:{groups:[[5,24],[7,25]],totalDataCodewords:295,errorCodewordsPerBlock:30},H:{groups:[[11,12],[7,13]],totalDataCodewords:223,errorCodewordsPerBlock:24}},{L:{groups:[[5,98],[1,99]],totalDataCodewords:589,errorCodewordsPerBlock:24},M:{groups:[[7,45],[3,46]],totalDataCodewords:453,errorCodewordsPerBlock:28},Q:{groups:[[15,19],[2,20]],totalDataCodewords:325,errorCodewordsPerBlock:24},H:{groups:[[3,15],[13,16]],totalDataCodewords:253,errorCodewordsPerBlock:30}},{L:{groups:[[1,107],[5,108]],totalDataCodewords:647,errorCodewordsPerBlock:28},M:{groups:[[10,46],[1,47]],totalDataCodewords:507,errorCodewordsPerBlock:28},Q:{groups:[[1,22],[15,23]],totalDataCodewords:367,errorCodewordsPerBlock:28},H:{groups:[[2,14],[17,15]],totalDataCodewords:283,errorCodewordsPerBlock:28}},{L:{groups:[[5,120],[1,121]],totalDataCodewords:721,errorCodewordsPerBlock:30},M:{groups:[[9,43],[4,44]],totalDataCodewords:563,errorCodewordsPerBlock:26},Q:{groups:[[17,22],[1,23]],totalDataCodewords:397,errorCodewordsPerBlock:28},H:{groups:[[2,14],[19,15]],totalDataCodewords:313,errorCodewordsPerBlock:28}},{L:{groups:[[3,113],[4,114]],totalDataCodewords:795,errorCodewordsPerBlock:28},M:{groups:[[3,44],[11,45]],totalDataCodewords:627,errorCodewordsPerBlock:26},Q:{groups:[[17,21],[4,22]],totalDataCodewords:445,errorCodewordsPerBlock:26},H:{groups:[[9,13],[16,14]],totalDataCodewords:341,errorCodewordsPerBlock:26}},{L:{groups:[[3,107],[5,108]],totalDataCodewords:861,errorCodewordsPerBlock:28},M:{groups:[[3,41],[13,42]],totalDataCodewords:669,errorCodewordsPerBlock:26},Q:{groups:[[15,24],[5,25]],totalDataCodewords:485,errorCodewordsPerBlock:30},H:{groups:[[15,15],[10,16]],totalDataCodewords:385,errorCodewordsPerBlock:28}},{L:{groups:[[4,116],[4,117]],totalDataCodewords:932,errorCodewordsPerBlock:28},M:{groups:[[17,42]],totalDataCodewords:714,errorCodewordsPerBlock:26},Q:{groups:[[17,22],[6,23]],totalDataCodewords:512,errorCodewordsPerBlock:28},H:{groups:[[19,16],[6,17]],totalDataCodewords:406,errorCodewordsPerBlock:30}},{L:{groups:[[2,111],[7,112]],totalDataCodewords:1006,errorCodewordsPerBlock:28},M:{groups:[[17,46]],totalDataCodewords:782,errorCodewordsPerBlock:28},Q:{groups:[[7,24],[16,25]],totalDataCodewords:568,errorCodewordsPerBlock:30},H:{groups:[[34,13]],totalDataCodewords:442,errorCodewordsPerBlock:24}},{L:{groups:[[4,121],[5,122]],totalDataCodewords:1094,errorCodewordsPerBlock:30},M:{groups:[[4,47],[14,48]],totalDataCodewords:860,errorCodewordsPerBlock:28},Q:{groups:[[11,24],[14,25]],totalDataCodewords:614,errorCodewordsPerBlock:30},H:{groups:[[16,15],[14,16]],totalDataCodewords:464,errorCodewordsPerBlock:30}},{L:{groups:[[6,117],[4,118]],totalDataCodewords:1174,errorCodewordsPerBlock:30},M:{groups:[[6,45],[14,46]],totalDataCodewords:914,errorCodewordsPerBlock:28},Q:{groups:[[11,24],[16,25]],totalDataCodewords:664,errorCodewordsPerBlock:30},H:{groups:[[30,16],[2,17]],totalDataCodewords:514,errorCodewordsPerBlock:30}},{L:{groups:[[8,106],[4,107]],totalDataCodewords:1276,errorCodewordsPerBlock:26},M:{groups:[[8,47],[13,48]],totalDataCodewords:1000,errorCodewordsPerBlock:28},Q:{groups:[[7,24],[22,25]],totalDataCodewords:718,errorCodewordsPerBlock:30},H:{groups:[[22,15],[13,16]],totalDataCodewords:538,errorCodewordsPerBlock:30}},{L:{groups:[[10,114],[2,115]],totalDataCodewords:1370,errorCodewordsPerBlock:28},M:{groups:[[19,46],[4,47]],totalDataCodewords:1062,errorCodewordsPerBlock:28},Q:{groups:[[28,22],[6,23]],totalDataCodewords:754,errorCodewordsPerBlock:28},H:{groups:[[33,16],[4,17]],totalDataCodewords:596,errorCodewordsPerBlock:30}},{L:{groups:[[8,122],[4,123]],totalDataCodewords:1468,errorCodewordsPerBlock:30},M:{groups:[[22,45],[3,46]],totalDataCodewords:1128,errorCodewordsPerBlock:28},Q:{groups:[[8,23],[26,24]],totalDataCodewords:808,errorCodewordsPerBlock:30},H:{groups:[[12,15],[28,16]],totalDataCodewords:628,errorCodewordsPerBlock:30}},{L:{groups:[[3,117],[10,118]],totalDataCodewords:1531,errorCodewordsPerBlock:30},M:{groups:[[3,45],[23,46]],totalDataCodewords:1193,errorCodewordsPerBlock:28},Q:{groups:[[4,24],[31,25]],totalDataCodewords:871,errorCodewordsPerBlock:30},H:{groups:[[11,15],[31,16]],totalDataCodewords:661,errorCodewordsPerBlock:30}},{L:{groups:[[7,116],[7,117]],totalDataCodewords:1631,errorCodewordsPerBlock:30},M:{groups:[[21,45],[7,46]],totalDataCodewords:1267,errorCodewordsPerBlock:28},Q:{groups:[[1,23],[37,24]],totalDataCodewords:911,errorCodewordsPerBlock:30},H:{groups:[[19,15],[26,16]],totalDataCodewords:701,errorCodewordsPerBlock:30}},{L:{groups:[[5,115],[10,116]],totalDataCodewords:1735,errorCodewordsPerBlock:30},M:{groups:[[19,47],[10,48]],totalDataCodewords:1373,errorCodewordsPerBlock:28},Q:{groups:[[15,24],[25,25]],totalDataCodewords:985,errorCodewordsPerBlock:30},H:{groups:[[23,15],[25,16]],totalDataCodewords:745,errorCodewordsPerBlock:30}},{L:{groups:[[13,115],[3,116]],totalDataCodewords:1843,errorCodewordsPerBlock:30},M:{groups:[[2,46],[29,47]],totalDataCodewords:1455,errorCodewordsPerBlock:28},Q:{groups:[[42,24],[1,25]],totalDataCodewords:1033,errorCodewordsPerBlock:30},H:{groups:[[23,15],[28,16]],totalDataCodewords:793,errorCodewordsPerBlock:30}},{L:{groups:[[17,115]],totalDataCodewords:1955,errorCodewordsPerBlock:30},M:{groups:[[10,46],[23,47]],totalDataCodewords:1541,errorCodewordsPerBlock:28},Q:{groups:[[10,24],[35,25]],totalDataCodewords:1115,errorCodewordsPerBlock:30},H:{groups:[[19,15],[35,16]],totalDataCodewords:845,errorCodewordsPerBlock:30}},{L:{groups:[[17,115],[1,116]],totalDataCodewords:2071,errorCodewordsPerBlock:30},M:{groups:[[14,46],[21,47]],totalDataCodewords:1631,errorCodewordsPerBlock:28},Q:{groups:[[29,24],[19,25]],totalDataCodewords:1171,errorCodewordsPerBlock:30},H:{groups:[[11,15],[46,16]],totalDataCodewords:901,errorCodewordsPerBlock:30}},{L:{groups:[[13,115],[6,116]],totalDataCodewords:2191,errorCodewordsPerBlock:30},M:{groups:[[14,46],[23,47]],totalDataCodewords:1725,errorCodewordsPerBlock:28},Q:{groups:[[44,24],[7,25]],totalDataCodewords:1231,errorCodewordsPerBlock:30},H:{groups:[[59,16],[1,17]],totalDataCodewords:961,errorCodewordsPerBlock:30}},{L:{groups:[[12,121],[7,122]],totalDataCodewords:2306,errorCodewordsPerBlock:30},M:{groups:[[12,47],[26,48]],totalDataCodewords:1812,errorCodewordsPerBlock:28},Q:{groups:[[39,24],[14,25]],totalDataCodewords:1286,errorCodewordsPerBlock:30},H:{groups:[[22,15],[41,16]],totalDataCodewords:986,errorCodewordsPerBlock:30}},{L:{groups:[[6,121],[14,122]],totalDataCodewords:2434,errorCodewordsPerBlock:30},M:{groups:[[6,47],[34,48]],totalDataCodewords:1914,errorCodewordsPerBlock:28},Q:{groups:[[46,24],[10,25]],totalDataCodewords:1354,errorCodewordsPerBlock:30},H:{groups:[[2,15],[64,16]],totalDataCodewords:1054,errorCodewordsPerBlock:30}},{L:{groups:[[17,122],[4,123]],totalDataCodewords:2566,errorCodewordsPerBlock:30},M:{groups:[[29,46],[14,47]],totalDataCodewords:1992,errorCodewordsPerBlock:28},Q:{groups:[[49,24],[10,25]],totalDataCodewords:1426,errorCodewordsPerBlock:30},H:{groups:[[24,15],[46,16]],totalDataCodewords:1096,errorCodewordsPerBlock:30}},{L:{groups:[[4,122],[18,123]],totalDataCodewords:2702,errorCodewordsPerBlock:30},M:{groups:[[13,46],[32,47]],totalDataCodewords:2102,errorCodewordsPerBlock:28},Q:{groups:[[48,24],[14,25]],totalDataCodewords:1502,errorCodewordsPerBlock:30},H:{groups:[[42,15],[32,16]],totalDataCodewords:1142,errorCodewordsPerBlock:30}},{L:{groups:[[20,117],[4,118]],totalDataCodewords:2812,errorCodewordsPerBlock:30},M:{groups:[[40,47],[7,48]],totalDataCodewords:2216,errorCodewordsPerBlock:28},Q:{groups:[[43,24],[22,25]],totalDataCodewords:1582,errorCodewordsPerBlock:30},H:{groups:[[10,15],[67,16]],totalDataCodewords:1222,errorCodewordsPerBlock:30}},{L:{groups:[[19,118],[6,119]],totalDataCodewords:2956,errorCodewordsPerBlock:30},M:{groups:[[18,47],[31,48]],totalDataCodewords:2334,errorCodewordsPerBlock:28},Q:{groups:[[34,24],[34,25]],totalDataCodewords:1666,errorCodewordsPerBlock:30},H:{groups:[[20,15],[61,16]],totalDataCodewords:1276,errorCodewordsPerBlock:30}}],
        finderPattern = [1,0,1,1,1],
        alignmentPattern = [1,0,1],
        errorCorrectionPatterns = {L: "01", M: "00", Q: "11", H: "10"},
        formatMaskPattern = "101010000010010",
        formatGeneratorPolynomial = "10100110111",
        versionGeneratorPolynomial = "1111100100101",
        paddingCodewords = ["11101100", "00010001"],
        finderPatternValue = 93,
        maskPatternConditions = [
            function(row,column){return (row + column) % 2 === 0;},
            function(row){return row % 2 === 0;},
            function(row,column){return column % 3 === 0;},
            function(row,column){return (row + column) % 3 === 0;},
            function(row,column){return (Math.floor(row/2) + Math.floor(column/3)) % 2 === 0;},
            function(row,column){return ((row * column) % 2) + ((row * column) % 3) === 0;},
            function(row,column){return (((row * column) % 2) + ((row * column) % 3)) % 2 === 0;},
            function(row,column){return (((row + column) % 2) + ((row * column) % 3)) % 2 === 0;}
        ],
        numberRegex = /^\d+/,
        alphaPattern = "A-Z0-9 $%*+./:-",
        alphaExclusiveSet = "A-Z $%*+./:-",
        alphaRegex = new RegExp("^[" + alphaExclusiveSet + "]+"),
        alphaNumericRegex = new RegExp("^[" + alphaPattern+ "]+"),
        byteRegex = new RegExp("^[^" + alphaPattern+ "]+"),
        initMinNumericBeforeAlpha = 8,
        initMinNumericBeforeByte = 5,
        initMinAlphaBeforeByte = 8,
        minNumericBeforeAlpha = 17,
        minNumericBeforeByte = 9,
        minAlphaBeforeByte =  16,
        round = Math.round;

        function toDecimal(value){
            return parseInt(value, 2);
        }

        function toBitsString(value, length){
            var result = Number(value).toString(2);
            if(result.length < length){
                result = new Array(length - result.length + 1).join(0) + result;
            }
            return result;
        }

        function splitInto(str, n){
            var result = [],
                idx = 0;
            while(idx < str.length){
                result.push(str.substring(idx, idx + n));
                idx+= n;
            }
            return result;
        }

        var QRDataMode = kendo.Class.extend({
            getVersionIndex: function(version){
                if(version < 10){
                    return 0;
                }
                else if(version > 26){
                    return 2;
                }

                return 1;
            },
            getBitsCharacterCount: function(version){
                var mode = this;
                return mode.bitsInCharacterCount[mode.getVersionIndex(version || 40)];
            },
            getModeCountString: function(length, version){
                var mode = this;
                return mode.modeIndicator + toBitsString(length, mode.getBitsCharacterCount(version));
            },
            encode: function(){},
            getStringBitsLength: function(){},
            getValue: function(){},
            modeIndicator: "",
            bitsInCharacterCount: []
        });

        var modes = {};
        modes[NUMERIC] = QRDataMode.extend({
            bitsInCharacterCount: [10, 12, 14],
            modeIndicator: "0001",
            getValue: function(character){
                return parseInt(character, 10);
            },
            encode: function(str, version){
                var mode = this,
                    parts = splitInto(str, 3),
                    result = mode.getModeCountString(str.length, version);

                for(var i = 0; i < parts.length - 1; i++){
                    result += toBitsString(parts[i], 10);
                }
                return result + toBitsString(parts[i], 1 + 3 * parts[i].length);
            },
            getStringBitsLength: function(inputLength, version){
                var mod3 = inputLength % 3;
                return 4 + this.getBitsCharacterCount(version) + 10 * Math.floor(inputLength / 3) + 3 * mod3 + (mod3 === 0 ? 0 : 1);
            }
        });

        modes[ALPHA_NUMERIC] = QRDataMode.extend({
            characters: {"0":0,"1": 1,"2": 2,"3": 3,"4": 4,"5": 5,"6": 6,"7": 7,"8": 8,"9": 9,"A": 10,"B": 11,"C": 12,"D": 13,"E": 14,"F": 15,"G": 16,"H": 17,"I": 18,"J": 19,"K": 20,"L": 21,"M": 22,"N": 23,"O": 24,"P": 25,"Q": 26,"R": 27,"S": 28,"T": 29,"U": 30,"V": 31,"W": 32,"X": 33,"Y": 34,"Z": 35," ": 36,"$": 37,"%": 38,"*": 39,"+": 40,"-": 41,".": 42,"/": 43,":": 44},
            bitsInCharacterCount: [9,11,13],
            modeIndicator: "0010",
            getValue: function(character){
                return this.characters[character];
            },
            encode: function(str, version){
                var mode = this,
                    parts = splitInto(str, 2),
                    result = mode.getModeCountString(str.length, version),
                    value;
                for(var i = 0; i < parts.length - 1; i++){
                    value = 45 * mode.getValue(parts[i].charAt(0)) + mode.getValue(parts[i].charAt(1));
                    result += toBitsString(value, 11);
                }
                value = parts[i].length == 2 ?
                    45 * mode.getValue(parts[i].charAt(0)) + mode.getValue(parts[i].charAt(1)) :
                    mode.getValue(parts[i].charAt(0));
                return result + toBitsString(value, 1 + 5 * parts[i].length);
            },
            getStringBitsLength: function(inputLength, version){
                return 4 + this.getBitsCharacterCount(version) + 11 * Math.floor(inputLength / 2) + 6 * (inputLength % 2);
            }
        });

        modes[BYTE] = QRDataMode.extend({
            bitsInCharacterCount: [8,16,16],
            modeIndicator: "0100",
            getValue: function(character){
                var code = character.charCodeAt(0);
                if(code <= 127 || (160 <= code && code <= 255)){
                    return code;
                }
                else{
                    throw new Error("Unsupported character: " + character);
                }
            },
            encode: function(str, version){
                var mode = this,
                    result = mode.getModeCountString(str.length, version);

                for(var i = 0; i < str.length; i++){
                    result += toBitsString(mode.getValue(str.charAt(i)), 8);
                }
                return result;
            },
            getStringBitsLength: function(inputLength, version){
                return 4 + this.getBitsCharacterCount(version) + 8 * inputLength;
            }
        });

        var modeInstances = {};
        for(var mode in modes){
            modeInstances[mode] = new modes[mode]();
        }

        var FreeCellVisitor = function (matrix){
            var that = this,
                row = matrix.length - 1,
                column = matrix.length - 1,
                startColumn = column,
                dir = -1,
                c = 0;
            that.move = function(){
                row += dir * c;
                c^=1;
                column = startColumn - c;
            };
            that.getNextCell = function(){
                while(matrix[row][column] !== undefined){
                    that.move();
                    if(row < 0 || row >= matrix.length){
                        dir = -dir;
                        startColumn-= startColumn != 8 ? 2 : 3;
                        column = startColumn;
                        row = dir < 0 ? matrix.length - 1 : 0;
                    }
                }
                return {row: row, column: column};
            };
            that.getNextRemainderCell = function(){
                that.move();
                if(matrix[row][column] === undefined){
                     return {row: row, column: column};
                }
            };
        };

        function fillFunctionCell(matrices, bit, x, y){
            for(var i = 0; i< matrices.length;i++){
                matrices[i][x][y] = bit;
            }
        }

        function fillDataCell(matrices, bit, x, y){
            for(var i = 0; i < maskPatternConditions.length;i++){
                matrices[i][x][y] = maskPatternConditions[i](x,y) ? bit ^ 1 : parseInt(bit, 10);
            }
        }

        var fillData = function (matrices, blocks){
            var cellVisitor = new FreeCellVisitor(matrices[0]),
                block,
                codewordIdx,
                cell;

            for(var blockIdx = 0; blockIdx < blocks.length;blockIdx++){
                block = blocks[blockIdx];
                codewordIdx = 0;
                while(block.length > 0){
                    for(var i = 0; i< block.length; i++){
                         for(var j = 0; j < 8;j++){
                            cell = cellVisitor.getNextCell();
                            fillDataCell(matrices, block[i][codewordIdx].charAt(j), cell.row, cell.column);
                        }
                    }

                    codewordIdx++;
                    while(block[0] && codewordIdx == block[0].length){
                        block.splice(0,1);
                    }
                }
            }

            while((cell = cellVisitor.getNextRemainderCell())){
                fillDataCell(matrices, 0, cell.row, cell.column);
            }
        };

        var padDataString = function (dataString, totalDataCodewords){
            var dataBitsCount = totalDataCodewords * 8,
                terminatorIndex = 0,
                paddingCodewordIndex = 0;
            while(dataString.length < dataBitsCount && terminatorIndex < terminator.length){
                dataString+=terminator.charAt(terminatorIndex++);
            }

            if(dataString.length % 8 !== 0){
                dataString+= new Array(9 - dataString.length % 8).join("0");
            }

            while(dataString.length < dataBitsCount){
                dataString+= paddingCodewords[paddingCodewordIndex];
                paddingCodewordIndex ^= 1;
            }
            return dataString;
        };

        function generatePowersOfTwo(){
            var result;
            for(var power = 1; power < 255; power++){

                result =  powersOfTwoResult[power - 1] * 2;
                if(result > 255){
                    result = result ^ 285;
                }

                powersOfTwoResult[power] = result;
                powersOfTwo[result] = power;
            }

            result = (powersOfTwoResult[power - 1] * 2) ^ 285;
            powersOfTwoResult[power] =   result;
            powersOfTwoResult[-1] = 0;
        }

        var xorPolynomials = function (x,y){
            var result = [],
                idx = x.length - 2;
            for(var i = idx; i>=0; i--){
                 result[i] = x[i] ^ y[i];
            }

            return result;
        };

        var multiplyPolynomials = function (x, y){
            var result = [];
            for(var i = 0; i < x.length; i++){
                for(var j = 0; j < y.length; j++){
                    if(result[i+j] === undefined){
                         result[i+j] = (x[i] + (y[j] >= 0 ? y[j] : 0)) % 255;
                    }
                    else{
                       result[i+j] = powersOfTwo[powersOfTwoResult[result[i+j]] ^ powersOfTwoResult[(x[i] + y[j]) % 255]];
                    }
                }
            }

            return result;
        };

        function generateGeneratorPolynomials(){
            var maxErrorCorrectionCodeWordsCount = 68;
            for(var idx = 2; idx <= maxErrorCorrectionCodeWordsCount; idx++){
                var firstPolynomial = generatorPolynomials[idx - 1],
                    secondPolynomial = [idx, 0];
                generatorPolynomials[idx] =  multiplyPolynomials(firstPolynomial, secondPolynomial);
            }
        }

        //possibly generate on demand
        generatePowersOfTwo();
        generateGeneratorPolynomials();

        function multiplyByConstant(polynomial, power){
            var result = [],
                idx = polynomial.length - 1;
            do{
                result[idx] = powersOfTwoResult[(polynomial[idx] + power) % 255];
                idx--;
            }while(polynomial[idx] !== undefined);

            return result;
        }

        var generateErrorCodewords = function (data, errorCodewordsCount){
            var generator = generatorPolynomials[errorCodewordsCount - 1],
                result = new Array(errorCodewordsCount).concat(data),
                generatorPolynomial = new Array(result.length - generator.length).concat(generator),
                steps = data.length,
                errorCodewords = [],
                divisor,
                idx;

            for(idx = 0; idx < steps; idx++){
                divisor = multiplyByConstant(generatorPolynomial, powersOfTwo[result[result.length - 1]]);
                generatorPolynomial.splice(0,1);

                result = xorPolynomials(divisor, result);
            }

            for(idx = result.length - 1; idx >= 0;idx--){
                errorCodewords[errorCodewordsCount - 1 - idx] = toBitsString(result[idx], 8);
            }

            return errorCodewords;
        };

        var getBlocks = function (dataStream, versionCodewordsInformation){
            var codewordStart = 0,
                dataBlocks = [],
                errorBlocks = [],
                dataBlock,
                versionGroups = versionCodewordsInformation.groups,
                blockCodewordsCount,
                groupBlocksCount,
                messagePolynomial,
                codeword;

            for(var groupIdx = 0; groupIdx < versionGroups.length; groupIdx++){
                groupBlocksCount = versionGroups[groupIdx][0];
                for(var blockIdx = 0; blockIdx < groupBlocksCount;blockIdx++){
                    blockCodewordsCount = versionGroups[groupIdx][1];
                    dataBlock = [];
                    messagePolynomial = [];
                    for(var codewordIdx = 1; codewordIdx <= blockCodewordsCount; codewordIdx++){
                        codeword = dataStream.substring(codewordStart, codewordStart + 8);
                        dataBlock.push(codeword);
                        messagePolynomial[blockCodewordsCount - codewordIdx] = toDecimal(codeword);
                        codewordStart+=8;
                    }
                    dataBlocks.push(dataBlock);
                    errorBlocks.push(generateErrorCodewords(messagePolynomial,
                        versionCodewordsInformation.errorCodewordsPerBlock));
                }
            }
            return [dataBlocks, errorBlocks];
        };

        var chooseMode = function (str, minNumericBeforeAlpha, minNumericBeforeByte, minAlphaBeforeByte, previousMode){
             var numeric = numberRegex.exec(str),
                numericMatch = numeric ? numeric[0] : "",
                alpha = alphaRegex.exec(str),
                alphaMatch = alpha ? alpha[0] : "",
                alphaNumeric = alphaNumericRegex.exec(str),
                alphaNumericMatch = alphaNumeric ? alphaNumeric[0] : "",
                mode,
                modeString;

             if(numericMatch && (numericMatch.length >= minNumericBeforeAlpha ||
                     str.length == numericMatch.length || (numericMatch.length >= minNumericBeforeByte &&
                     !alphaNumericRegex.test(str.charAt(numericMatch.length))))){
                mode = NUMERIC;
                modeString = numericMatch;
             }
             else if(alphaNumericMatch && (str.length == alphaNumericMatch.length ||
                alphaNumericMatch.length >= minAlphaBeforeByte || previousMode == ALPHA_NUMERIC)){
                mode = ALPHA_NUMERIC;
                modeString =  numericMatch || alphaMatch;
             }
             else {
                mode = BYTE;
                if(alphaNumericMatch){
                    modeString = alphaNumericMatch + byteRegex.exec(str.substring(alphaNumericMatch.length))[0];
                }
                else{
                    modeString = byteRegex.exec(str)[0];
                }
             }

             return {
                mode: mode,
                modeString: modeString
             };
        };

        var getModes = function (str){
            var modes = [],
                previousMode,
                idx = 0;
            modes.push(chooseMode(str, initMinNumericBeforeAlpha, initMinNumericBeforeByte, initMinAlphaBeforeByte, previousMode));
            previousMode = modes[0].mode;
            str = str.substr(modes[0].modeString.length);

            while(str.length > 0){
               var nextMode = chooseMode(str, minNumericBeforeAlpha, minNumericBeforeByte, minAlphaBeforeByte, previousMode);
               if(nextMode.mode != previousMode){
                    previousMode = nextMode.mode;
                    modes.push(nextMode);
                    idx++;
               }
               else{
                    modes[idx].modeString += nextMode.modeString;
               }
               str = str.substr(nextMode.modeString.length);
            }

            return modes;
        };

        var getDataCodewordsCount = function (modes){
            var length = 0,
                mode;
            for(var i = 0; i < modes.length; i++){
                mode = modeInstances[modes[i].mode];
                length+= mode.getStringBitsLength(modes[i].modeString.length);
            }

            return Math.ceil(length / 8);
        };

        var getVersion = function (dataCodewordsCount, errorCorrectionLevel){
            var x = 0,
                y = versionsCodewordsInformation.length - 1,
                version = Math.floor(versionsCodewordsInformation.length / 2);

            do{
                if(dataCodewordsCount < versionsCodewordsInformation[version][errorCorrectionLevel].totalDataCodewords){
                    y = version;
                }
                else{
                    x = version;
                }
                version = x + Math.floor((y - x) / 2);

            }while(y - x > 1);

            if(dataCodewordsCount <= versionsCodewordsInformation[x][errorCorrectionLevel].totalDataCodewords){
                return version + 1;
            }
            return y + 1;
        };

        var getDataString = function (modes, version){
            var dataString = "",
                mode;
            for(var i = 0; i < modes.length; i++){
                mode = modeInstances[modes[i].mode];
                dataString+= mode.encode(modes[i].modeString, version);
            }

            return dataString;
        };

        //fix case all zeros
        var encodeFormatInformation = function (format){
            var formatNumber = toDecimal(format),
                encodedString,
                result = "";
            if(formatNumber === 0){
                return "101010000010010";
            }
            else{
                encodedString = encodeBCH(toDecimal(format), formatGeneratorPolynomial, 15);
            }
            for(var i = 0; i < encodedString.length; i++){
                result += encodedString.charAt(i) ^ formatMaskPattern.charAt(i);
            }

            return result;
        };

        var encodeBCH = function (value, generatorPolynomial, codeLength){
            var generatorNumber = toDecimal(generatorPolynomial),
                polynomialLength = generatorPolynomial.length - 1,
                valueNumber = value << polynomialLength,
                length = codeLength - polynomialLength,
                valueString = toBitsString(value, length),
                result = dividePolynomials(valueNumber, generatorNumber);
            result = valueString + toBitsString(result, polynomialLength);
            return result;
        };

        var dividePolynomials = function (numberX,numberY){
                var yLength = numberY.toString(2).length,
                    xLength = numberX.toString(2).length;
                do{
                    numberX ^= numberY << xLength - yLength;
                    xLength = numberX.toString(2).length;
                }
                while(xLength >= yLength);

                return numberX;
        };

        function getNumberAt(str, idx){
            return parseInt(str.charAt(idx), 10);
        }

        var initMatrices = function (version){
            var matrices = [],
                modules =  17 + 4 * version;
            for(var i = 0; i < maskPatternConditions.length; i++){
                matrices[i] = new Array(modules);
                for(var j = 0; j < modules; j++){
                    matrices[i][j] = new Array(modules);
                }
            }

            return matrices;
        };

        var addFormatInformation =function (matrices, formatString){
            var matrix = matrices[0],
                x,
                y,
                idx = 0,
                length = formatString.length;

            for(x=0, y=8; x <= 8;x++){
                if(x!== 6){
                    fillFunctionCell(matrices, getNumberAt(formatString, length - 1 - idx++), x, y);
                }
            }

            for(x=8, y=7; y>=0;y--){
                if(y!== 6){
                    fillFunctionCell(matrices, getNumberAt(formatString, length - 1 - idx++), x, y);
                }
            }
            idx=0;
            for(y = matrix.length - 1, x = 8; y >= matrix.length - 8;y--){
                fillFunctionCell(matrices,getNumberAt(formatString, length - 1 - idx++), x, y);
            }

            fillFunctionCell(matrices, 1, matrix.length - 8, 8);

            for(x = matrix.length - 7, y = 8; x < matrix.length;x++){
                fillFunctionCell(matrices, getNumberAt(formatString, length - 1 - idx++), x, y);
            }
        };

        var encodeVersionInformation = function (version){
            return encodeBCH(version, versionGeneratorPolynomial, 18);
        };

        var addVersionInformation = function (matrices, dataString){
            var matrix = matrices[0],
                modules = matrix.length,
                x1 = 0,
                y1 = modules - 11,
                x2 = modules - 11,
                y2 = 0,
                quotient,
                mod,
                value;

            for(var idx =0; idx < dataString.length; idx++){
                quotient = Math.floor(idx / 3);
                mod = idx % 3;
                value = getNumberAt(dataString, dataString.length - idx - 1);
                fillFunctionCell(matrices, value, x1 + quotient, y1 + mod);
                fillFunctionCell(matrices, value, x2 + mod, y2 + quotient);
            }
        };

        var addCentricPattern = function (matrices, pattern, x, y){
            var size = pattern.length + 2,
                length = pattern.length + 1,
                value;

            for(var i = 0; i < pattern.length; i++){
                for(var j = i; j < size - i; j++){
                    value = pattern[i];
                    fillFunctionCell(matrices, value, x + j, y + i);
                    fillFunctionCell(matrices, value, x + i, y + j);
                    fillFunctionCell(matrices, value, x + length - j, y + length - i);
                    fillFunctionCell(matrices, value, x + length - i, y + length - j);
                }
            }
        };

        var addFinderSeparator = function (matrices, direction, x, y){
            var nextX = x,
                nextY = y,
                matrix = matrices[0];
            do{
                fillFunctionCell(matrices, 0, nextX, y);
                fillFunctionCell(matrices, 0, x, nextY);
                nextX+= direction[0];
                nextY+= direction[1];
            }
            while(nextX >=0 && nextX < matrix.length);
        };

        var addFinderPatterns = function (matrices){
            var modules = matrices[0].length;
            addCentricPattern(matrices, finderPattern, 0, 0);
            addFinderSeparator(matrices, [-1,-1], 7,7);
            addCentricPattern(matrices, finderPattern, modules - 7, 0);
            addFinderSeparator(matrices, [1,-1], modules - 8, 7);
            addCentricPattern(matrices, finderPattern, 0 , modules - 7);
            addFinderSeparator(matrices, [-1,1],7, modules - 8);
        };

        var addAlignmentPatterns = function (matrices, version){
            if(version < 2) {
                return;
            }

            var matrix = matrices[0],
                modules = matrix.length,
                pointsCount = Math.floor(version / 7),
                points = [6],
                startDistance,
                distance,
                idx = 0;

            if((startDistance = irregularAlignmentPatternsStartDistance[version])){
                distance = (modules - 13 - startDistance) / pointsCount;
            }
            else{
                startDistance = distance = (modules - 13) / (pointsCount + 1);
            }
            points.push(points[idx++] + startDistance);
            while((points[idx] + distance) < modules){
                points.push(points[idx++] + distance);
            }
            for(var i = 0; i < points.length;i++){
                for(var j = 0; j < points.length; j++){
                    if(matrix[points[i]][points[j]] === undefined){
                        addCentricPattern(matrices, alignmentPattern, points[i] - 2, points[j] - 2);
                    }
                }
            }
        };

        var addTimingFunctions = function (matrices){
            var row = 6,
                column = 6,
                value = 1,
                modules = matrices[0].length;
            for(var i = 8; i < modules - 8;i++){
                fillFunctionCell(matrices, value, row, i);
                fillFunctionCell(matrices, value, i, column);
                value ^= 1;
            }
        };

        var scoreMaskMatrixes = function (matrices){
            var scores = [],
                previousBits = [],
                darkModules =  [],
                patterns = [],
                adjacentSameBits = [],
                matrix,
                i,
                row = 0,
                column = 1,
                modules = matrices[0].length;


            for(i = 0; i < matrices.length; i++){
                scores[i] = 0;
                darkModules[i] = 0;
                adjacentSameBits[i] = [0,0];
                patterns[i] = [0, 0];
                previousBits[i] = [];
            }
            for(i = 0; i < modules; i++){
                for(var j = 0; j < modules; j++){
                    for(var k = 0; k < matrices.length; k++){
                        matrix = matrices[k];
                        darkModules[k]+= parseInt(matrix[i][j], 10);
                        if(previousBits[k][row] === matrix[i][j] && i + 1 < modules && j - 1 >= 0 &&
                            matrix[i + 1][j] == previousBits[k][row] && matrix[i + 1][j - 1] == previousBits[k][row]){
                            scores[k]+=3;
                        }
                        scoreFinderPatternOccurance(k, patterns, scores, row, matrix[i][j]);
                        scoreFinderPatternOccurance(k, patterns, scores, column, matrix[j][i]);
                        scoreAdjacentSameBits(k,scores,previousBits,matrix[i][j],adjacentSameBits,row);
                        scoreAdjacentSameBits(k,scores,previousBits,matrix[j][i],adjacentSameBits,column);
                    }
                }
            }
            var total = modules * modules,
                minIdx,
                min = Number.MAX_VALUE;

            for(i = 0; i < scores.length; i++){
                scores[i]+= calculateDarkModulesRatioScore(darkModules[i], total);
                if(scores[i] < min){
                    min = scores[i];
                    minIdx = i;
                }
            }

            return minIdx;
        };

        function scoreFinderPatternOccurance(idx, patterns, scores, rowColumn, bit){
            patterns[idx][rowColumn] = ((patterns[idx][rowColumn] << 1) ^ bit) % 128;
            if(patterns[idx][rowColumn] == finderPatternValue){
                scores[idx] += 40;
            }
        }

        function scoreAdjacentSameBits(idx, scores, previousBits, bit, adjacentBits, rowColumn){
            if(previousBits[idx][rowColumn] == bit){
                adjacentBits[idx][rowColumn]++;
            }
            else{
                previousBits[idx][rowColumn] = bit;
                if(adjacentBits[idx][rowColumn] >= 5){
                    scores[idx]+= 3 + adjacentBits[idx][rowColumn] - 5;
                }
                adjacentBits[idx][rowColumn] = 1;
            }
        }

        function calculateDarkModulesRatioScore(darkModules, total){
            var percent = Math.floor((darkModules / total) * 100),
                mod5 = percent % 5,
                previous = Math.abs(percent - mod5 - 50),
                next = Math.abs(percent +  5 - mod5 - 50),
                score = 10 * Math.min(previous / 5, next / 5);
            return score;
        }

        var EncodingResult = function(dataString, version){
            this.dataString = dataString;
            this.version = version;
        };

        var IsoEncoder = function(){
            this.getEncodingResult = function(inputString, errorCorrectionLevel){
                var modes = getModes(inputString),
                dataCodewordsCount = getDataCodewordsCount(modes),
                version = getVersion(dataCodewordsCount, errorCorrectionLevel),
                dataString = getDataString(modes, version);

                return new EncodingResult(dataString, version);
            };
        };

        var UTF8Encoder = function(){
            this.mode = modeInstances[this.encodingMode];
        };

        UTF8Encoder.fn = UTF8Encoder.prototype = {
            encodingMode: BYTE,
            utfBOM: "111011111011101110111111",
            initialModeCountStringLength: 20,
            getEncodingResult: function(inputString, errorCorrectionLevel){
                var that = this,
                    data = that.encode(inputString),
                    dataCodewordsCount = that.getDataCodewordsCount(data),
                    version = getVersion(dataCodewordsCount, errorCorrectionLevel),
                    dataString = that.mode.getModeCountString(data.length / 8, version) + data;

                return new EncodingResult(dataString, version);
            },
            getDataCodewordsCount: function(data){
                var that = this,
                    dataLength = data.length,
                    dataCodewordsCount = Math.ceil(( that.initialModeCountStringLength + dataLength) / 8);

                return dataCodewordsCount;
            },
            encode: function(str){
                var that = this,
                    result = that.utfBOM;
                for(var i = 0; i < str.length; i++){
                    result += that.encodeCharacter(str.charCodeAt(i));
                }
                return result;
            },
            encodeCharacter: function(code){
                var bytesCount = this.getBytesCount(code),
                    bc = bytesCount - 1,
                    result = "";

                if(bytesCount == 1){
                    result = toBitsString(code, 8);
                }
                else{
                    var significantOnes = 8 - bytesCount;

                    for(var i = 0; i < bc; i++){
                        result = toBitsString(code >> (i * 6) & 63 | 128, 8) + result;
                    }

                    result = ((code >> bc * 6) | ((255 >> significantOnes) << significantOnes)).toString(2) + result;
                }
                return result;
            },
            getBytesCount: function(code){
                var ranges = this.ranges;
                for(var i = 0; i < ranges.length;i++){
                    if(code < ranges[i]){
                        return i + 1;
                    }
                }
            },
            ranges: [128,2048,65536,2097152,67108864]
        };

        var QRCodeDataEncoder = function(encoding){
            if(encoding && encoding.toLowerCase().indexOf("utf_8") >= 0){
                return new UTF8Encoder();
            }
            else{
                return new IsoEncoder();
            }
        };

        var encodeData = function (inputString, errorCorrectionLevel, encoding){
            var encoder = new QRCodeDataEncoder(encoding),
                encodingResult = encoder.getEncodingResult(inputString, errorCorrectionLevel),
                version = encodingResult.version,
                versionInformation = versionsCodewordsInformation[version - 1][errorCorrectionLevel],
                dataString = padDataString(encodingResult.dataString, versionInformation.totalDataCodewords),
                blocks = getBlocks(dataString, versionInformation),
                matrices = initMatrices(version);

            addFinderPatterns(matrices);
            addAlignmentPatterns(matrices, version);
            addTimingFunctions(matrices);

            if(version >= 7){
                addVersionInformation(matrices, toBitsString(0, 18));
            }

            addFormatInformation(matrices, toBitsString(0, 15));
            fillData(matrices, blocks);

            var minIdx = scoreMaskMatrixes(matrices),
                optimalMatrix = matrices[minIdx];

            if(version >= 7){
                addVersionInformation([optimalMatrix], encodeVersionInformation(version));
            }

            var formatString = errorCorrectionPatterns[errorCorrectionLevel] + toBitsString(minIdx, 3);
            addFormatInformation([optimalMatrix], encodeFormatInformation(formatString));

            return optimalMatrix;
        };

        var QRCodeDefaults= {
            DEFAULT_SIZE: 200,
            QUIET_ZONE_LENGTH: 4,
            DEFAULT_ERROR_CORRECTION_LEVEL:"L",
            DEFAULT_BACKGROUND: "#fff",
            DEFAULT_DARK_MODULE_COLOR: "#000",
            MIN_BASE_UNIT_SIZE: 1
        };

        var QRCode = Widget.extend({
            init: function (element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);

                that.element = $(element);
                that.wrapper = that.element;
                that.element.addClass("k-qrcode");
                that.surfaceWrap = $("<div />").css("position", "relative").appendTo(this.element);
                that.surface = draw.Surface.create(that.surfaceWrap, {
                    type: that.options.renderAs
                });
                that.setOptions(options);
            },

            redraw: function(){
                var size = this._getSize();

                this.surfaceWrap.css({
                    width: size,
                    height: size
                });
                this.surface.clear();

                this.createVisual();
                this.surface.draw(this.visual);
            },

            getSize: function() {
                return kendo.dimensions(this.element);
            },

            _resize: function() {
                this.redraw();
            },

            createVisual: function() {
                this.visual = this._render();
            },

            exportVisual: function() {
                return this._render();
            },

            _render: function() {
                var that = this,
                    value = that._value,
                    baseUnit,
                    border = that.options.border || {},
                    padding = that.options.padding || 0,
                    borderWidth = border.width || 0,
                    quietZoneSize,
                    matrix,
                    size,
                    dataSize,
                    contentSize;

                border.width = borderWidth;

                var visual = new draw.Group();

                if (value){
                    matrix = encodeData(value, that.options.errorCorrection, that.options.encoding);
                    size = that._getSize();
                    contentSize = size - 2  * (borderWidth + padding);
                    baseUnit = that._calculateBaseUnit(contentSize, matrix.length);
                    dataSize = matrix.length * baseUnit;
                    quietZoneSize = borderWidth + padding + (contentSize - dataSize) / 2;

                    visual.append(that._renderBackground(size, border));
                    visual.append(that._renderMatrix(matrix, baseUnit, quietZoneSize));
                }

                return visual;
            },

            _getSize: function(){
                var that = this,
                    size;

                if (that.options.size){
                   size = parseInt(that.options.size, 10);
                } else {
                    var element = that.element,
                        min = Math.min(element.width(), element.height());

                    if (min > 0){
                        size = min;
                    } else {
                        size = QRCodeDefaults.DEFAULT_SIZE;
                    }
                }

                return size;
            },

            _calculateBaseUnit: function(size, matrixSize){
                var baseUnit = Math.floor(size/ matrixSize);

                if(baseUnit < QRCodeDefaults.MIN_BASE_UNIT_SIZE){
                    throw new Error("Insufficient size.");
                }

                if(baseUnit * matrixSize >= size &&
                    baseUnit - 1 >= QRCodeDefaults.MIN_BASE_UNIT_SIZE){
                    baseUnit--;
                }

                return baseUnit;
            },

            _renderMatrix: function(matrix, baseUnit, quietZoneSize){
                var path = new draw.MultiPath({
                    fill: {
                        color: this.options.color
                    },
                    stroke: null
                });

                for (var row = 0; row < matrix.length; row++){
                    var y = quietZoneSize + row * baseUnit;
                    var column = 0;

                    while (column < matrix.length){
                        while (matrix[row][column] === 0 && column < matrix.length){
                            column++;
                        }

                        if (column < matrix.length){
                            var x = column;
                            while (matrix[row][column] == 1){
                                column++;
                            }

                            var x1 = round(quietZoneSize + x * baseUnit);
                            var y1 = round(y);
                            var x2 = round(quietZoneSize + column * baseUnit);
                            var y2 = round(y + baseUnit);

                            path.moveTo(x1, y1)
                                .lineTo(x1, y2)
                                .lineTo(x2, y2)
                                .lineTo(x2, y1)
                                .close();
                        }
                    }
                }

                return path;
            },

            _renderBackground: function (size, border) {
                var box = Box2D(0,0, size, size).unpad(border.width / 2);
                return draw.Path.fromRect(box.toRect(), {
                    fill: {
                        color: this.options.background
                    },
                    stroke: {
                        color: border.color,
                        width: border.width
                    }
                });
            },

            setOptions: function (options) {
                var that = this;
                options = options || {};
                that.options = extend(that.options, options);
                if (options.value !== undefined) {
                    that._value = that.options.value + "";
                }
                that.redraw();
            },
            value: function(value){
                var that = this;
                if (value === undefined) {
                    return that._value;
                }
                that._value = value + "";
                that.redraw();
            },
            options: {
                name: "QRCode",
                renderAs: "svg",
                encoding: "ISO_8859_1",
                value: "",
                errorCorrection: QRCodeDefaults.DEFAULT_ERROR_CORRECTION_LEVEL,
                background: QRCodeDefaults.DEFAULT_BACKGROUND,
                color: QRCodeDefaults.DEFAULT_DARK_MODULE_COLOR,
                size: "",
                padding: 0,
                border: {
                    color: "",
                    width: 0
                }
            }
        });

        dataviz.ExportMixin.extend(QRCode.fn);
        dataviz.ui.plugin(QRCode);

      kendo.deepExtend(dataviz, {
            QRCode: QRCode,
            QRCodeDefaults: QRCodeDefaults,
            QRCodeFunctions: {
                FreeCellVisitor: FreeCellVisitor,
                fillData: fillData,
                padDataString: padDataString,
                generateErrorCodewords: generateErrorCodewords,
                xorPolynomials: xorPolynomials,
                getBlocks: getBlocks,
                multiplyPolynomials: multiplyPolynomials,
                chooseMode: chooseMode,
                getModes: getModes,
                getDataCodewordsCount: getDataCodewordsCount,
                getVersion: getVersion,
                getDataString: getDataString,
                encodeFormatInformation: encodeFormatInformation,
                encodeBCH: encodeBCH,
                dividePolynomials: dividePolynomials,
                initMatrices: initMatrices,
                addFormatInformation: addFormatInformation,
                encodeVersionInformation: encodeVersionInformation,
                addVersionInformation: addVersionInformation,
                addCentricPattern: addCentricPattern,
                addFinderSeparator: addFinderSeparator,
                addFinderPatterns: addFinderPatterns,
                addAlignmentPatterns: addAlignmentPatterns,
                addTimingFunctions: addTimingFunctions,
                scoreMaskMatrixes: scoreMaskMatrixes,
                encodeData: encodeData,
                UTF8Encoder: UTF8Encoder
            },
            QRCodeFields: {
                modes: modeInstances,
                powersOfTwo: powersOfTwo,
                powersOfTwoResult: powersOfTwoResult,
                generatorPolynomials: generatorPolynomials
            }
      });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
