(function(f, define){
    define([ "./core" ], f);
})(function(){

(function(global){

/*****************************************************************************\
 *
 * The code in this file, although written from scratch, is influenced by the
 * TrueType parser/encoder in PDFKit -- http://pdfkit.org/ (a CoffeeScript
 * library for producing PDF files).
 *
 * PDFKit is (c) Devon Govett 2014 and released under the MIT License.
 *
\*****************************************************************************/

"use strict";

// WARNING: removing the following jshint declaration and turning
// == into === to make JSHint happy will break functionality.
/* jshint eqnull:true */
/* jshint loopfunc:true */
/* jshint newcap:false */

function hasOwnProperty(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function sortedKeys(obj) {
    return Object.keys(obj).sort(function(a, b){ return a - b; }).map(parseFloat);
}

var PDF = global.kendo.pdf;
var BinaryStream = PDF.BinaryStream;

///

function Directory(data) {
    this.raw = data;
    this.scalerType = data.readLong();
    this.tableCount = data.readShort();
    this.searchRange = data.readShort();
    this.entrySelector = data.readShort();
    this.rangeShift = data.readShort();

    var tables = this.tables = {};
    for (var i = 0; i < this.tableCount; ++i) {
        var entry = {
            tag      : data.readString(4),
            checksum : data.readLong(),
            offset   : data.readLong(),
            length   : data.readLong()
        };
        tables[entry.tag] = entry;
    }
}

Directory.prototype = {

    readTable: function(name, Ctor) {
        var def = this.tables[name];
        if (!def) {
            throw new Error("Table " + name + " not found in directory");
        }
        return (this[name] = def.table = new Ctor(this, def));
    },

    render: function(tables) {
        var tableCount = Object.keys(tables).length;

        var maxpow2 = Math.pow(2, Math.floor(Math.log(tableCount) / Math.LN2));
        var searchRange = maxpow2 * 16;
        var entrySelector = Math.floor(Math.log(maxpow2) / Math.LN2);
        var rangeShift = tableCount * 16 - searchRange;

        var out = BinaryStream();
        out.writeLong(this.scalerType);
        out.writeShort(tableCount);
        out.writeShort(searchRange);
        out.writeShort(entrySelector);
        out.writeShort(rangeShift);

        var directoryLength = tableCount * 16;
        var offset = out.offset() + directoryLength;
        var headOffset = null;
        var tableData = BinaryStream();

        for (var tag in tables) {
            if (hasOwnProperty(tables, tag)) {
                var table = tables[tag];

                out.writeString(tag);
                out.writeLong(this.checksum(table));
                out.writeLong(offset);
                out.writeLong(table.length);

                tableData.write(table);
                if (tag == "head") {
                    headOffset = offset;
                }
                offset += table.length;

                while (offset % 4) {
                    tableData.writeByte(0);
                    offset++;
                }
            }
        }

        out.write(tableData.get());
        var sum = this.checksum(out.get());
        var adjustment = 0xB1B0AFBA - sum;

        out.offset(headOffset + 8);
        out.writeLong(adjustment);
        return out.get();
    },

    checksum: function(data) {
        data = BinaryStream(data);
        var sum = 0;
        while (!data.eof()) {
            sum += data.readLong();
        }
        return sum & 0xFFFFFFFF;
    }
};

function deftable(methods) {
    function Ctor(file, def) {
        this.definition = def;
        this.length = def.length;
        this.offset = def.offset;
        this.file = file;
        this.rawData = file.raw;
        this.parse(file.raw);
    }
    Ctor.prototype.raw = function() {
        return this.rawData.slice(this.offset, this.length);
    };
    for (var i in methods) {
        if (hasOwnProperty(methods, i)) {
            Ctor[i] = Ctor.prototype[i] = methods[i];
        }
    }
    return Ctor;
}

var HeadTable = deftable({
    parse: function(data) {
        data.offset(this.offset);
        this.version             = data.readLong();
        this.revision            = data.readLong();
        this.checkSumAdjustment  = data.readLong();
        this.magicNumber         = data.readLong();
        this.flags               = data.readShort();
        this.unitsPerEm          = data.readShort();
        this.created             = data.read(8);
        this.modified            = data.read(8);

        this.xMin = data.readShort_();
        this.yMin = data.readShort_();
        this.xMax = data.readShort_();
        this.yMax = data.readShort_();

        this.macStyle           = data.readShort();
        this.lowestRecPPEM      = data.readShort();
        this.fontDirectionHint  = data.readShort_();
        this.indexToLocFormat   = data.readShort_();
        this.glyphDataFormat    = data.readShort_();
    },
    render: function(indexToLocFormat) {
        var out = BinaryStream();
        out.writeLong(this.version);
        out.writeLong(this.revision);
        out.writeLong(0);       // checksum adjustment; shall be computed later
        out.writeLong(this.magicNumber);
        out.writeShort(this.flags);
        out.writeShort(this.unitsPerEm);
        out.write(this.created);
        out.write(this.modified);
        out.writeShort_(this.xMin);
        out.writeShort_(this.yMin);
        out.writeShort_(this.xMax);
        out.writeShort_(this.yMax);
        out.writeShort(this.macStyle);
        out.writeShort(this.lowestRecPPEM);
        out.writeShort_(this.fontDirectionHint);
        out.writeShort_(indexToLocFormat); // this will depend on the `loca` table
        out.writeShort_(this.glyphDataFormat);
        return out.get();
    }
});

var LocaTable = deftable({
    parse: function(data) {
        data.offset(this.offset);
        var format = this.file.head.indexToLocFormat;
        if (format === 0) {
            this.offsets = data.times(this.length / 2, function(){
                return 2 * data.readShort();
            });
        } else {
            this.offsets = data.times(this.length / 4, data.readLong);
        }
    },
    offsetOf: function(id) {
        return this.offsets[id];
    },
    lengthOf: function(id) {
        return this.offsets[id + 1] - this.offsets[id];
    },
    render: function(offsets) {
        var out = BinaryStream();
        var needsLongFormat = offsets[offsets.length - 1] > 0xFFFF;
        for (var i = 0; i < offsets.length; ++i) {
            if (needsLongFormat) {
                out.writeLong(offsets[i]);
            } else {
                out.writeShort(offsets[i] / 2);
            }
        }
        return {
            format: needsLongFormat ? 1 : 0,
            table: out.get()
        };
    }
});

var HheaTable = deftable({
    parse: function(data) {
        data.offset(this.offset);

        this.version              = data.readLong();
        this.ascent               = data.readShort_();
        this.descent              = data.readShort_();
        this.lineGap              = data.readShort_();
        this.advanceWidthMax      = data.readShort();
        this.minLeftSideBearing   = data.readShort_();
        this.minRightSideBearing  = data.readShort_();
        this.xMaxExtent           = data.readShort_();
        this.caretSlopeRise       = data.readShort_();
        this.caretSlopeRun        = data.readShort_();
        this.caretOffset          = data.readShort_();

        data.skip(4 * 2);       // reserved

        this.metricDataFormat     = data.readShort_();
        this.numOfLongHorMetrics  = data.readShort();
    },
    render: function(ids) {
        var out = BinaryStream();
        out.writeLong(this.version);
        out.writeShort_(this.ascent);
        out.writeShort_(this.descent);
        out.writeShort_(this.lineGap);
        out.writeShort(this.advanceWidthMax);
        out.writeShort_(this.minLeftSideBearing);
        out.writeShort_(this.minRightSideBearing);
        out.writeShort_(this.xMaxExtent);
        out.writeShort_(this.caretSlopeRise);
        out.writeShort_(this.caretSlopeRun);
        out.writeShort_(this.caretOffset);

        out.write([ 0, 0, 0, 0, 0, 0, 0, 0 ]); // reserved bytes

        out.writeShort_(this.metricDataFormat);
        out.writeShort(ids.length);
        return out.get();
    }
});

var MaxpTable = deftable({
    parse: function(data) {
        data.offset(this.offset);
        this.version = data.readLong();
        this.numGlyphs = data.readShort();
        this.maxPoints = data.readShort();
        this.maxContours = data.readShort();
        this.maxComponentPoints = data.readShort();
        this.maxComponentContours = data.readShort();
        this.maxZones = data.readShort();
        this.maxTwilightPoints = data.readShort();
        this.maxStorage = data.readShort();
        this.maxFunctionDefs = data.readShort();
        this.maxInstructionDefs = data.readShort();
        this.maxStackElements = data.readShort();
        this.maxSizeOfInstructions = data.readShort();
        this.maxComponentElements = data.readShort();
        this.maxComponentDepth = data.readShort();
    },
    render: function(glyphIds) {
        var out = BinaryStream();
        out.writeLong(this.version);
        out.writeShort(glyphIds.length);
        out.writeShort(this.maxPoints);
        out.writeShort(this.maxContours);
        out.writeShort(this.maxComponentPoints);
        out.writeShort(this.maxComponentContours);
        out.writeShort(this.maxZones);
        out.writeShort(this.maxTwilightPoints);
        out.writeShort(this.maxStorage);
        out.writeShort(this.maxFunctionDefs);
        out.writeShort(this.maxInstructionDefs);
        out.writeShort(this.maxStackElements);
        out.writeShort(this.maxSizeOfInstructions);
        out.writeShort(this.maxComponentElements);
        out.writeShort(this.maxComponentDepth);
        return out.get();
    }
});

var HmtxTable = deftable({
    parse: function(data) {
        data.offset(this.offset);
        var dir = this.file, hhea = dir.hhea;
        this.metrics = data.times(hhea.numOfLongHorMetrics, function(){
            return {
                advance: data.readShort(),
                lsb: data.readShort_()
            };
        });
        var lsbCount = dir.maxp.numGlyphs - dir.hhea.numOfLongHorMetrics;
        this.leftSideBearings = data.times(lsbCount, data.readShort_);
    },
    forGlyph: function(id) {
        var metrics = this.metrics;
        var n = metrics.length;
        if (id < n) {
            return metrics[id];
        }
        return {
            advance: metrics[n - 1].advance,
            lsb: this.leftSideBearings[id - n]
        };
    },
    render: function(glyphIds) {
        var out = BinaryStream();
        for (var i = 0; i < glyphIds.length; ++i) {
            var m = this.forGlyph(glyphIds[i]);
            out.writeShort(m.advance);
            out.writeShort_(m.lsb);
        }
        return out.get();
    }
});

var GlyfTable = (function(){

    function SimpleGlyph(raw) {
        this.raw = raw;
    }
    SimpleGlyph.prototype = {
        compound: false,
        render: function() {
            return this.raw.get();
        }
    };

    var ARG_1_AND_2_ARE_WORDS     = 0x0001;
    var WE_HAVE_A_SCALE           = 0x0008;
    var MORE_COMPONENTS           = 0x0020;
    var WE_HAVE_AN_X_AND_Y_SCALE  = 0x0040;
    var WE_HAVE_A_TWO_BY_TWO      = 0x0080;
    var WE_HAVE_INSTRUCTIONS      = 0x0100;

    function CompoundGlyph(data) {
        this.raw = data;
        var ids = this.glyphIds = [];
        var offsets = this.idOffsets = [];
        while (true) {
            var flags = data.readShort();
            offsets.push(data.offset());
            ids.push(data.readShort());

            if (!(flags & MORE_COMPONENTS)) {
                break;
            }

            data.skip(flags & ARG_1_AND_2_ARE_WORDS ? 4 : 2);

            if (flags & WE_HAVE_A_TWO_BY_TWO) {
                data.skip(8);
            } else if (flags & WE_HAVE_AN_X_AND_Y_SCALE) {
                data.skip(4);
            } else if (flags & WE_HAVE_A_SCALE) {
                data.skip(2);
            }
        }
    }

    CompoundGlyph.prototype = {
        compound: true,
        render: function(old2new) {
            var out = BinaryStream(this.raw.get());
            for (var i = 0; i < this.glyphIds.length; ++i) {
                var id = this.glyphIds[i];
                out.offset(this.idOffsets[i]);
                out.writeShort(old2new[id]);
            }
            return out.get();
        }
    };

    return deftable({
        parse: function(data) {
            this.cache = {};
        },
        glyphFor: function(id) {
            var cache = this.cache;
            if (hasOwnProperty(cache, id)) {
                return cache[id];
            }

            var loca = this.file.loca;
            var length = loca.lengthOf(id);

            if (length === 0) {
                return (cache[id] = null);
            }

            var data = this.rawData;
            var offset = this.offset + loca.offsetOf(id);
            var raw = BinaryStream(data.slice(offset, length));

            var numberOfContours = raw.readShort_();
            var xMin = raw.readShort_();
            var yMin = raw.readShort_();
            var xMax = raw.readShort_();
            var yMax = raw.readShort_();

            var glyph = cache[id] = numberOfContours == -1 ? new CompoundGlyph(raw) : new SimpleGlyph(raw);

            glyph.numberOfContours = numberOfContours;
            glyph.xMin = xMin;
            glyph.yMin = yMin;
            glyph.xMax = xMax;
            glyph.yMax = yMax;

            return glyph;
        },
        render: function(glyphs, oldIds, old2new) {
            var out = BinaryStream(), offsets = [];
            for (var i = 0; i < oldIds.length; ++i) {
                var id = oldIds[i];
                var glyph = glyphs[id];
                offsets.push(out.offset());
                if (glyph) {
                    out.write(glyph.render(old2new));
                }
            }
            offsets.push(out.offset());
            return {
                table: out.get(),
                offsets: offsets
            };
        }
    });

}());

var NameTable = (function(){

    function NameEntry(text, entry) {
        this.text = text;
        this.length = text.length;
        this.platformID = entry.platformID;
        this.platformSpecificID = entry.platformSpecificID;
        this.languageID = entry.languageID;
        this.nameID = entry.nameID;
    }

    return deftable({
        parse: function(data) {
            data.offset(this.offset);
            var format = data.readShort();
            var count = data.readShort();
            var stringOffset = this.offset + data.readShort();
            var nameRecords = data.times(count, function(){
                return {
                    platformID         : data.readShort(),
                    platformSpecificID : data.readShort(),
                    languageID         : data.readShort(),
                    nameID             : data.readShort(),
                    length             : data.readShort(),
                    offset             : data.readShort() + stringOffset
                };
            });
            var strings = this.strings = {};
            for (var i = 0; i < nameRecords.length; ++i) {
                var rec = nameRecords[i];
                data.offset(rec.offset);
                var text = data.readString(rec.length);
                if (!strings[rec.nameID]) {
                    strings[rec.nameID] = [];
                }
                strings[rec.nameID].push(new NameEntry(text, rec));
            }
            this.postscriptEntry = strings[6][0];
            this.postscriptName = this.postscriptEntry.text.replace(/[^\x20-\x7F]/g, "");
        },

        render: function(psName) {
            var strings = this.strings;
            var strCount = 0;
            for (var i in strings) {
                if (hasOwnProperty(strings, i)) {
                    strCount += strings[i].length;
                }
            }
            var out = BinaryStream();
            var strTable = BinaryStream();

            out.writeShort(0);  // format
            out.writeShort(strCount);
            out.writeShort(6 + 12 * strCount); // stringOffset

            for (i in strings) {
                if (hasOwnProperty(strings, i)) {
                    var list = i == 6 ? [
                        new NameEntry(psName, this.postscriptEntry)
                    ] : strings[i];
                    for (var j = 0; j < list.length; ++j) {
                        var str = list[j];
                        out.writeShort(str.platformID);
                        out.writeShort(str.platformSpecificID);
                        out.writeShort(str.languageID);
                        out.writeShort(str.nameID);
                        out.writeShort(str.length);
                        out.writeShort(strTable.offset());

                        strTable.writeString(str.text);
                    }
                }
            }

            out.write(strTable.get());

            return out.get();
        }
    });

})();

var PostTable = (function(){

    var POSTSCRIPT_GLYPHS = ".notdef .null nonmarkingreturn space exclam quotedbl numbersign dollar percent ampersand quotesingle parenleft parenright asterisk plus comma hyphen period slash zero one two three four five six seven eight nine colon semicolon less equal greater question at A B C D E F G H I J K L M N O P Q R S T U V W X Y Z bracketleft backslash bracketright asciicircum underscore grave a b c d e f g h i j k l m n o p q r s t u v w x y z braceleft bar braceright asciitilde Adieresis Aring Ccedilla Eacute Ntilde Odieresis Udieresis aacute agrave acircumflex adieresis atilde aring ccedilla eacute egrave ecircumflex edieresis iacute igrave icircumflex idieresis ntilde oacute ograve ocircumflex odieresis otilde uacute ugrave ucircumflex udieresis dagger degree cent sterling section bullet paragraph germandbls registered copyright trademark acute dieresis notequal AE Oslash infinity plusminus lessequal greaterequal yen mu partialdiff summation product pi integral ordfeminine ordmasculine Omega ae oslash questiondown exclamdown logicalnot radical florin approxequal Delta guillemotleft guillemotright ellipsis nonbreakingspace Agrave Atilde Otilde OE oe endash emdash quotedblleft quotedblright quoteleft quoteright divide lozenge ydieresis Ydieresis fraction currency guilsinglleft guilsinglright fi fl daggerdbl periodcentered quotesinglbase quotedblbase perthousand Acircumflex Ecircumflex Aacute Edieresis Egrave Iacute Icircumflex Idieresis Igrave Oacute Ocircumflex apple Ograve Uacute Ucircumflex Ugrave dotlessi circumflex tilde macron breve dotaccent ring cedilla hungarumlaut ogonek caron Lslash lslash Scaron scaron Zcaron zcaron brokenbar Eth eth Yacute yacute Thorn thorn minus multiply onesuperior twosuperior threesuperior onehalf onequarter threequarters franc Gbreve gbreve Idotaccent Scedilla scedilla Cacute cacute Ccaron ccaron dcroat".split(/\s+/g);

    return deftable({
        parse: function(data) {
            data.offset(this.offset);

            this.format = data.readLong();
            this.italicAngle = data.readFixed_();
            this.underlinePosition = data.readShort_();
            this.underlineThickness = data.readShort_();
            this.isFixedPitch = data.readLong();
            this.minMemType42 = data.readLong();
            this.maxMemType42 = data.readLong();
            this.minMemType1 = data.readLong();
            this.maxMemType1 = data.readLong();

            var numberOfGlyphs;

            switch (this.format) {
              case 0x00010000:
              case 0x00030000:
                break;

              case 0x00020000:
                numberOfGlyphs = data.readShort();
                this.glyphNameIndex = data.times(numberOfGlyphs, data.readShort);
                this.names = [];
                var limit = this.offset + this.length;
                while (data.offset() < limit) {
                    this.names.push(data.readString(data.readByte()));
                }
                break;

              case 0x00025000:
                numberOfGlyphs = data.readShort();
                this.offsets = data.read(numberOfGlyphs);
                break;

              case 0x00040000:
                this.map = data.times(this.file.maxp.numGlyphs, data.readShort);
                break;
            }
        },
        glyphFor: function(code) {
            switch (this.format) {
              case 0x00010000:
                return POSTSCRIPT_GLYPHS[code] || ".notdef";

              case 0x00020000:
                var index = this.glyphNameIndex[code];
                if (index < POSTSCRIPT_GLYPHS.length) {
                    return POSTSCRIPT_GLYPHS[index];
                }
                return this.names[index - POSTSCRIPT_GLYPHS.length] || ".notdef";

              case 0x00025000:

              case 0x00030000:
                return ".notdef";

              case 0x00040000:
                return this.map[code] || 0xFFFF;
            }
        },
        render: function(mapping) {
            if (this.format == 0x00030000) {
                return this.raw();
            }

            // keep original header, but set format to 2.0
            var out = BinaryStream(this.rawData.slice(this.offset, 32));
            out.writeLong(0x00020000);
            out.offset(32);

            var indexes = [];
            var strings = [];

            for (var i = 0; i < mapping.length; ++i) {
                var id = mapping[i];
                var post = this.glyphFor(id);
                var index = POSTSCRIPT_GLYPHS.indexOf(post);
                if (index >= 0) {
                    indexes.push(index);
                } else {
                    indexes.push(POSTSCRIPT_GLYPHS.length + strings.length);
                    strings.push(post);
                }
            }

            out.writeShort(mapping.length);

            for (i = 0; i < indexes.length; ++i) {
                out.writeShort(indexes[i]);
            }

            for (i = 0; i < strings.length; ++i) {
                out.writeByte(strings[i].length);
                out.writeString(strings[i]);
            }

            return out.get();
        }
    });
})();

var CmapTable = (function(){

    function CmapEntry(data, offset) {
        var self = this;
        self.platformID = data.readShort();
        self.platformSpecificID = data.readShort();
        self.offset = offset + data.readLong();

        data.saveExcursion(function(){
            data.offset(self.offset);
            self.format = data.readShort();
            self.length = data.readShort();
            self.language = data.readShort();

            self.isUnicode = (
                self.platformID == 3 && self.platformSpecificID == 1 && self.format == 4
            ) || (
                self.platformID === 0 && self.format == 4
            );

            self.codeMap = {};
            switch (self.format) {
              case 0:
                for (var i = 0; i < 256; ++i) {
                    self.codeMap[i] = data.readByte();
                }
                break;

              case 4:
                var segCount = data.readShort() / 2;

                data.skip(6);       // searchRange, entrySelector, rangeShift
                var endCode = data.times(segCount, data.readShort);
                data.skip(2);       // reserved pad
                var startCode = data.times(segCount, data.readShort);
                var idDelta = data.times(segCount, data.readShort_);
                var idRangeOffset = data.times(segCount, data.readShort);

                var count = (self.length + self.offset - data.offset()) / 2;
                var glyphIds = data.times(count, data.readShort);

                for (i = 0; i < segCount; ++i) {
                    var start = startCode[i], end = endCode[i];
                    for (var code = start; code <= end; ++code) {
                        var glyphId;
                        if (idRangeOffset[i] === 0) {
                            glyphId = code + idDelta[i];
                        } else {
                            ///
                            // When non-zero, idRangeOffset contains for each segment the byte offset of the Glyph ID
                            // into the glyphIds table, from the *current* `i` cell of idRangeOffset.  In other words,
                            // this offset spans from the first into the second array.  This works, because the arrays
                            // are consecutive in the TTF file:
                            //
                            //     [ ...idRangeOffset... ][ ...glyphIds... ]
                            //       ...... 48 ......       .... ID ....
                            //              ^----- 48 bytes -----^
                            //
                            // (but I can't stop wondering why is it not just a plain index, possibly incremented by 1
                            // so that we can have that special `zero` value.)
                            //
                            // The elements of idRangeOffset are even numbers, because both arrays contain 16-bit words,
                            // yet the offset is in bytes.  That is why we divide it by 2.  Then we subtract the
                            // remaining segments (segCount-i), and add the code-start offset, to which we need to add
                            // the corresponding delta to get the actual glyph ID.
                            ///
                            var index = idRangeOffset[i] / 2 - (segCount - i) + (code - start);
                            glyphId = glyphIds[index] || 0;
                            if (glyphId !== 0) {
                                glyphId += idDelta[i];
                            }
                        }
                        self.codeMap[code] = glyphId & 0xFFFF;
                    }
                }
            }
        });
    }

    function renderCharmap(ncid2ogid, ogid2ngid) {
        var codes = sortedKeys(ncid2ogid);
        var startCodes = [];
        var endCodes = [];
        var last = null;
        var diff = null;

        function new_gid(charcode) {
            return ogid2ngid[ncid2ogid[charcode]];
        }

        for (var i = 0; i < codes.length; ++i) {
            var code = codes[i];
            var gid = new_gid(code);
            var delta = gid - code;
            if (last == null || delta !== diff) {
                if (last) {
                    endCodes.push(last);
                }
                startCodes.push(code);
                diff = delta;
            }
            last = code;
        }

        if (last) {
            endCodes.push(last);
        }
        endCodes.push(0xFFFF);
        startCodes.push(0xFFFF);

        var segCount = startCodes.length;
        var segCountX2 = segCount * 2;
        var searchRange = 2 * Math.pow(2, Math.floor(Math.log(segCount) / Math.LN2));
        var entrySelector = Math.log(searchRange / 2) / Math.LN2;
        var rangeShift = segCountX2 - searchRange;

        var deltas = [];
        var rangeOffsets = [];
        var glyphIds = [];

        for (i = 0; i < segCount; ++i) {
            var startCode = startCodes[i];
            var endCode = endCodes[i];
            if (startCode == 0xFFFF) {
                deltas.push(0);
                rangeOffsets.push(0);
                break;
            }
            var startGlyph = new_gid(startCode);
            if (startCode - startGlyph >= 0x8000) {
                deltas.push(0);
                rangeOffsets.push(2 * (glyphIds.length + segCount - i));
                for (var j = startCode; j <= endCode; ++j) {
                    glyphIds.push(new_gid(j));
                }
            } else {
                deltas.push(startGlyph - startCode);
                rangeOffsets.push(0);
            }
        }

        var out = BinaryStream();

        out.writeShort(3);      // platformID
        out.writeShort(1);      // platformSpecificID
        out.writeLong(12);      // offset
        out.writeShort(4);      // format
        out.writeShort(16 + segCount * 8 + glyphIds.length * 2); // length
        out.writeShort(0);      // language
        out.writeShort(segCountX2);
        out.writeShort(searchRange);
        out.writeShort(entrySelector);
        out.writeShort(rangeShift);

        endCodes.forEach(out.writeShort);
        out.writeShort(0);      // reserved pad
        startCodes.forEach(out.writeShort);
        deltas.forEach(out.writeShort_);
        rangeOffsets.forEach(out.writeShort);
        glyphIds.forEach(out.writeShort);

        return out.get();
    }

    return deftable({
        parse: function(data) {
            var self = this;
            var offset = self.offset;
            data.offset(offset);

            self.version = data.readShort();
            var tableCount = data.readShort();
            self.unicodeEntry = null;
            self.tables = data.times(tableCount, function(){
                var entry = new CmapEntry(data, offset);
                if (entry.isUnicode) {
                    self.unicodeEntry = entry;
                }
                return entry;
            });
        },
        render: function(ncid2ogid, ogid2ngid) {
            var out = BinaryStream();
            out.writeShort(0);  // version
            out.writeShort(1);  // tableCount
            out.write(renderCharmap(ncid2ogid, ogid2ngid));
            return out.get();
        },
        getUnicodeEntry: function() {
            if (!this.unicodeEntry) {
                throw new Error("Font doesn't have an Unicode encoding");
            }
            return this.unicodeEntry;
        }
    });

})();

var OS2Table = deftable({
    parse: function(data) {
        data.offset(this.offset);
        this.version = data.readShort();
        this.averageCharWidth = data.readShort_();
        this.weightClass = data.readShort();
        this.widthClass = data.readShort();
        this.type = data.readShort();
        this.ySubscriptXSize = data.readShort_();
        this.ySubscriptYSize = data.readShort_();
        this.ySubscriptXOffset = data.readShort_();
        this.ySubscriptYOffset = data.readShort_();
        this.ySuperscriptXSize = data.readShort_();
        this.ySuperscriptYSize = data.readShort_();
        this.ySuperscriptXOffset = data.readShort_();
        this.ySuperscriptYOffset = data.readShort_();
        this.yStrikeoutSize = data.readShort_();
        this.yStrikeoutPosition = data.readShort_();
        this.familyClass = data.readShort_();

        this.panose = data.times(10, data.readByte);
        this.charRange = data.times(4, data.readLong);

        this.vendorID = data.readString(4);
        this.selection = data.readShort();
        this.firstCharIndex = data.readShort();
        this.lastCharIndex = data.readShort();

        if (this.version > 0) {
            this.ascent = data.readShort_();
            this.descent = data.readShort_();
            this.lineGap = data.readShort_();
            this.winAscent = data.readShort();
            this.winDescent = data.readShort();
            this.codePageRange = data.times(2, data.readLong);

            if (this.version > 1) {
                this.xHeight = data.readShort();
                this.capHeight = data.readShort();
                this.defaultChar = data.readShort();
                this.breakChar = data.readShort();
                this.maxContext = data.readShort();
            }
        }
    },
    render: function() {
        return this.raw();
    }
});

var subsetTag = 100000;

function nextSubsetTag() {
    var ret = "", n = subsetTag+"";
    for (var i = 0; i < n.length; ++i) {
        ret += String.fromCharCode(n.charCodeAt(i) - 48 + 65);
    }
    ++subsetTag;
    return ret;
}

function Subfont(font) {
    this.font = font;
    this.subset = {};
    this.unicodes = {};
    this.ogid2ngid = { 0: 0 };
    this.ngid2ogid = { 0: 0 };
    this.ncid2ogid = {};
    this.next = this.firstChar = 1;
    this.nextGid = 1;
    this.psName = nextSubsetTag() + "+" + this.font.psName;
}

Subfont.prototype = {
    use: function(ch) {
        var code;
        if (typeof ch == "string") {
            var ret = "";
            for (var i = 0; i < ch.length; ++i) {
                code = this.use(ch.charCodeAt(i));
                ret += String.fromCharCode(code);
            }
            return ret;
        }
        code = this.unicodes[ch];
        if (!code) {
            code = this.next++;
            this.subset[code] = ch;
            this.unicodes[ch] = code;

            // generate new GID (glyph ID) and maintain newGID ->
            // oldGID and back mappings
            var old_gid = this.font.cmap.getUnicodeEntry().codeMap[ch];
            if (old_gid) {
                this.ncid2ogid[code] = old_gid;
                if (this.ogid2ngid[old_gid] == null) {
                    var new_gid = this.nextGid++;
                    this.ogid2ngid[old_gid] = new_gid;
                    this.ngid2ogid[new_gid] = old_gid;
                }
            }
        }
        return code;
    },
    encodeText: function(text) {
        return this.use(text);
    },
    glyphIds: function() {
        return sortedKeys(this.ogid2ngid);
    },
    glyphsFor: function(glyphIds, result) {
        if (!result) {
            result = {};
        }
        for (var i = 0; i < glyphIds.length; ++i) {
            var id = glyphIds[i];
            if (!result[id]) {
                var glyph = result[id] = this.font.glyf.glyphFor(id);
                if (glyph && glyph.compound) {
                    this.glyphsFor(glyph.glyphIds, result);
                }
            }
        }
        return result;
    },
    render: function() {
        var glyphs = this.glyphsFor(this.glyphIds());

        // add missing sub-glyphs
        for (var old_gid in glyphs) {
            if (hasOwnProperty(glyphs, old_gid)) {
                old_gid = parseInt(old_gid, 10);
                if (this.ogid2ngid[old_gid] == null) {
                    var new_gid = this.nextGid++;
                    this.ogid2ngid[old_gid] = new_gid;
                    this.ngid2ogid[new_gid] = old_gid;
                }
            }
        }

        // must obtain old_gid_ids in an order matching sorted
        // new_gid_ids
        var new_gid_ids = sortedKeys(this.ngid2ogid);
        var old_gid_ids = new_gid_ids.map(function(id){
            return this.ngid2ogid[id];
        }, this);

        var font = this.font;
        var glyf = font.glyf.render(glyphs, old_gid_ids, this.ogid2ngid);
        var loca = font.loca.render(glyf.offsets);

        this.lastChar = this.next - 1;

        var tables = {
            "cmap" : CmapTable.render(this.ncid2ogid, this.ogid2ngid),
            "glyf" : glyf.table,
            "loca" : loca.table,
            "hmtx" : font.hmtx.render(old_gid_ids),
            "hhea" : font.hhea.render(old_gid_ids),
            "maxp" : font.maxp.render(old_gid_ids),
            "post" : font.post.render(old_gid_ids),
            "name" : font.name.render(this.psName),
            "head" : font.head.render(loca.format),
            "OS/2" : font.os2.render()
        };

        return this.font.directory.render(tables);
    },
    cidToGidMap: function() {
        var out = BinaryStream(), len = 0;
        for (var cid = this.firstChar; cid < this.next; ++cid) {
            while (len < cid) {
                out.writeShort(0);
                len++;
            }
            var old_gid = this.ncid2ogid[cid];
            if (old_gid) {
                var new_gid = this.ogid2ngid[old_gid];
                out.writeShort(new_gid);
            } else {
                out.writeShort(0);
            }
            len++;
        }
        return out.get();
    }
};

function TTFFont(rawData, name) {
    var self = this;
    var data = self.contents = BinaryStream(rawData);
    if (data.readString(4) == "ttcf") {
        if (!name) {
            throw new Error("Must specify a name for TTC files");
        }
        var version = data.readLong();
        var numFonts = data.readLong();
        for (var i = 0; i < numFonts; ++i) {
            var offset = data.readLong();
            data.saveExcursion(function(){
                data.offset(offset);
                self.parse();
            });
            if (self.psName == name) {
                return;
            }
        }
        throw new Error("Font " + name + " not found in collection");
    } else {
        data.offset(0);
        self.parse();
    }
}

TTFFont.prototype = {
    parse: function() {
        var dir = this.directory = new Directory(this.contents);

        this.head = dir.readTable("head", HeadTable);
        this.loca = dir.readTable("loca", LocaTable);
        this.hhea = dir.readTable("hhea", HheaTable);
        this.maxp = dir.readTable("maxp", MaxpTable);
        this.hmtx = dir.readTable("hmtx", HmtxTable);
        this.glyf = dir.readTable("glyf", GlyfTable);
        this.name = dir.readTable("name", NameTable);
        this.post = dir.readTable("post", PostTable);
        this.cmap = dir.readTable("cmap", CmapTable);
        this.os2  = dir.readTable("OS/2", OS2Table);

        this.psName = this.name.postscriptName;
        this.ascent = this.os2.ascent || this.hhea.ascent;
        this.descent = this.os2.descent || this.hhea.descent;
        this.lineGap = this.os2.lineGap || this.hhea.lineGap;
        this.scale = 1000 / this.head.unitsPerEm;
    },
    widthOfGlyph: function(glyph) {
        return this.hmtx.forGlyph(glyph).advance * this.scale;
    },
    makeSubset: function() {
        return new Subfont(this);
    }
};

PDF.TTFFont = TTFFont;

})(this);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
