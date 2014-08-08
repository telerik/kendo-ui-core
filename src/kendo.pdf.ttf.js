var fs = require("fs");

function hasOwnProperty(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function BinaryStream(data) {
    var offset = 0;
    if (data == null) data = "";

    function eof() {
        return !data.charAt(offset);
    }
    function readByte() {
        return data.charCodeAt(offset++) & 0xFF;
    }
    function writeByte(b) {
        ch = String.fromCharCode(b & 0xFF);
        if (offset < data.length) {
            // overwrite
            data = data.substr(0, offset) + ch + data.substr(offset + 1);
        } else {
            data += ch;
        }
        offset++;
    }
    function readShort() {
        return (readByte() << 8) | readByte();
    }
    function writeShort(w) {
        writeByte(w >>> 8);
        writeByte(w);
    }
    function readShort_() {
        var w = readShort();
        return w >= 0x8000 ? w - 0x10000 : w;
    }
    function writeShort_(w) {
        writeShort(w < 0 ? w + 0x10000 : w);
    }
    function readLong() {
        return (readShort() << 16) | readShort();
    }
    function writeLong(w) {
        writeShort((w >>> 16) & 0xFFFF);
        writeShort(w & 0xFFFF);
    }
    function readLong_() {
        var w = readLong();
        return w >= 0x80000000 ? w - 0x100000000 : w;
    }
    function writeLong_(w) {
        writeLong(w < 0 ? w + 0x100000000 : w);
    }
    function read(len) {
        var ret = [];
        while (len-- > 0)
            ret.push(readByte());
        return ret;
    }
    function write(bytes) {
        if (typeof bytes == "string")
            return writeString(bytes);
        for (var i = 0; i < bytes.length; ++i) {
            writeByte(bytes[i]);
        }
    }
    function readString(len) {
        var ret = "";
        while (len-- > 0) {
            ret += String.fromCharCode(readByte());
        }
        return ret;
    }
    function writeString(str) {
        for (var i = 0; i < str.length; ++i) {
            writeByte(str.charCodeAt(i));
        }
    }
    return {
        eof         : eof,
        readByte    : readByte,
        writeByte   : writeByte,
        readShort   : readShort,
        writeShort  : writeShort,
        readLong    : readLong,
        writeLong   : writeLong,

        // signed numbers.
        readShort_  : readShort_,
        writeShort_ : writeShort_,
        readLong_   : readLong_,
        writeLong_  : writeLong_,

        read        : read,
        write       : write,
        readString  : readString,
        writeString : writeString,

        offset: function(pos) {
            if (pos != null) offset = pos;
            return offset;
        },

        skip: function(nbytes) {
            offset += nbytes;
        },

        get: function() { return data },

        length: function() { return data.length },

        slice: function(start, length) {
            return data.substr(start, length);
        },

        times: function(n, reader) {
            for (var ret = []; n > 0; --n)
                ret.push(reader());
            return ret;
        },

        saveExcursion: function(f) {
            var pos = offset;
            try {
                return f();
            } finally {
                offset = pos;
            }
        }
    };
}

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
        if (!def)
            throw new Error("Table " + name + " not found in directory");
        return this[name] = def.table = new Ctor(this, def);
    },

    encode: function(tables) {
        var tableCount = Object.keys(tables).length;

        // if my understanding is correct, PDFKit messes this up.
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
                if (tag == "head") headOffset = offset;
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
        while (data.length % 4) data += "\x00";
        data = BinaryStream(data);
        var sum = 0;
        while (!data.eof()) sum += data.readLong();
        return sum & 0xFFFFFFFF;
    }
}

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
            Ctor.prototype[i] = methods[i];
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
    encode: function(indexToLocFormat) {
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
        if (format == 0) {
            this.offsets = data.times(this.length / 2, function(){
                return 2 * data.readShort();
            });
        } else {
            this.offsets = data.times(this.length / 4, data.readLong);
        }
    },
    indexOf: function(id) {
        return this.offsets[id];
    },
    lengthOf: function(id) {
        return this.offsets[id + 1] - this.offsets[id];
    },
    encode: function(offsets) {
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
            data: out.get()
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
    encode: function(ids) {
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
    encode: function(glyphIds) {
        var out = new Data();
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
        var n = metrics.length;
        if (id < n)
            return metrics[id];
        return {
            advance: metrics[n - 1].advance,
            lsb: this.leftSideBearings[id - n]
        };
    },
    encode: function(glyphIds) {
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

    SimpleGlyph.prototype.compound = false;
    function SimpleGlyph(data, offset, length) {
        this.encode = function() {
            return data.slice(offset, length);
        };
    }

    var ARG_1_AND_2_ARE_WORDS     = 0x0001
    var WE_HAVE_A_SCALE           = 0x0008
    var MORE_COMPONENTS           = 0x0020
    var WE_HAVE_AN_X_AND_Y_SCALE  = 0x0040
    var WE_HAVE_A_TWO_BY_TWO      = 0x0080
    var WE_HAVE_INSTRUCTIONS      = 0x0100

    CompoundGlyph.prototype.compound = true;
    function CompoundGlyph(data, offset, length) {
        this.raw = data = BinaryStream(data.slice(offset, length));
        var ids = this.glyphIds = [];
        var offsets = this.glyphOffsets = [];
        while (true) {
            var flags = data.readShort();
            offsets.push(data.offset());
            ids.push(data.readShort());

            if (!(flags & MORE_COMPONENTS))
                break;

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

    CompoundGlyph.prototype.encode = function(mapping) {
        var out = this.raw;
        for (var i = 0; i < this.glyphIds.length; ++i) {
            out.offset(this.glyphOffsets[i]);
            out.writeShort(mapping[id]);
        }
        return out.get();
    };

    return deftable({
        parse: function(data) {
            this.cache = {};
        },
        glyphFor: function(id) {
            var cache = this.cache;
            if (hasOwnProperty(cache, id))
                return cache[id];

            var loca = this.file.loca;
            var length = loca.lengthOf(id);

            if (length == 0)
                return cache[id] = null;

            var data = this.rawData;
            var offset = this.offset + loca.indexOf(id);
            data.offset(offset);

            var numberOfContours = data.readShort_();
            var xMin = data.readShort_();
            var yMin = data.readShort_();
            var xMax = data.readShort_();
            var yMax = data.readShort_();

            var glyph = cache[id] = numberOfContours == -1
                ? new CompoundGlyph(data, offset, length)
                : new SimpleGlyph(data, offset, length);

            glyph.numberOfContours = numberOfContours;
            glyph.xMin = xMin;
            glyph.yMin = yMin;
            glyph.xMax = xMax;
            glyph.yMax = yMax;

            return glyph;
        },
        encode: function(glyphs, mapping, old2new) {
            var out = BinaryStream(), offsets = [];
            for (var i = 0; i < mapping.length; ++i) {
                offsets.push(out.offset());
                var id = mapping[i];
                var glyph = glyphs[id];
                if (glyph) {
                    out.write(glyph.encode(old2new));
                }
            }
            offsets.push(out.offset());
            return {
                data: out.get(),
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

    var subsetTag = 100000;

    function nextSubsetTag() {
        var ret = "", n = subsetTag+"";
        for (var i = 0; i < n.length; ++i)
            ret += String.fromCharCode(n.charCodeAt(i) - 48 + 65);
        ++subsetTag;
        return ret;
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
                }
            });
            var strings = this.strings = {};
            for (var i = 0; i < nameRecords.length; ++i) {
                var rec = nameRecords[i];
                data.offset(rec.offset);
                var text = data.readString(rec.length);
                if (!strings[rec.nameID])
                    strings[rec.nameID] = [];
                strings[rec.nameID].push(new NameEntry(text, rec));
            }
            this.postscriptEntry = strings[6][0];
            this.postscriptName = this.postscriptEntry.text.replace(/[^\x20-\x7F]/g, "");
        },

        encode: function() {
            var strings = this.strings;
            var ps = new NameEntry(nextSubsetTag() + "+" + this.postscriptName, {
                platformID         : this.postscriptEntry.platformID,
                platformSpecificID : this.postscriptEntry.platformSpecificID,
                languageID         : this.postscriptEntry.languageID
            });
            strings[6] = [ ps ];
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

            for (var i in strings) {
                if (hasOwnProperty(strings, i)) {
                    var list = strings[i];
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

            return {
                psName: ps.text,
                data: out.get()
            };
        }
    });

})();

var PostTable = (function(){

    var POSTSCRIPT_GLYPHS = ".notdef .null nonmarkingreturn space exclam quotedbl numbersign dollar percent ampersand quotesingle parenleft parenright asterisk plus comma hyphen period slash zero one two three four five six seven eight nine colon semicolon less equal greater question at A B C D E F G H I J K L M N O P Q R S T U V W X Y Z bracketleft backslash bracketright asciicircum underscore grave a b c d e f g h i j k l m n o p q r s t u v w x y z braceleft bar braceright asciitilde Adieresis Aring Ccedilla Eacute Ntilde Odieresis Udieresis aacute agrave acircumflex adieresis atilde aring ccedilla eacute egrave ecircumflex edieresis iacute igrave icircumflex idieresis ntilde oacute ograve ocircumflex odieresis otilde uacute ugrave ucircumflex udieresis dagger degree cent sterling section bullet paragraph germandbls registered copyright trademark acute dieresis notequal AE Oslash infinity plusminus lessequal greaterequal yen mu partialdiff summation product pi integral ordfeminine ordmasculine Omega ae oslash questiondown exclamdown logicalnot radical florin approxequal Delta guillemotleft guillemotright ellipsis nonbreakingspace Agrave Atilde Otilde OE oe endash emdash quotedblleft quotedblright quoteleft quoteright divide lozenge ydieresis Ydieresis fraction currency guilsinglleft guilsinglright fi fl daggerdbl periodcentered quotesinglbase quotedblbase perthousand Acircumflex Ecircumflex Aacute Edieresis Egrave Iacute Icircumflex Idieresis Igrave Oacute Ocircumflex apple Ograve Uacute Ucircumflex Ugrave dotlessi circumflex tilde macron breve dotaccent ring cedilla hungarumlaut ogonek caron Lslash lslash Scaron scaron Zcaron zcaron brokenbar Eth eth Yacute yacute Thorn thorn minus multiply onesuperior twosuperior threesuperior onehalf onequarter threequarters franc Gbreve gbreve Idotaccent Scedilla scedilla Cacute cacute Ccaron ccaron dcroat".split(/\s+/g);

    return deftable({
        parse: function(data) {
            data.offset(this.offset);

            this.format = data.readLong();
            this.italicAngle = data.readLong();
            this.underlinePosition = data.readShort_();
            this.underlineThickness = data.readShort_();
            this.isFixedPitch = data.readLong();
            this.minMemType42 = data.readLong();
            this.maxMemType42 = data.readLong();
            this.minMemType1 = data.readLong();
            this.maxMemType1 = data.readLong();

            switch (this.format) {
              case 0x00010000:
              case 0x00030000:
                break;

              case 0x00020000:
                var numberOfGlyphs = data.readShort();
                this.glyphNameIndex = data.times(numberOfGlyphs, data.readShort);
                this.names = [];
                var limit = this.offset + this.length;
                while (data.offset() < limit) {
                    this.names.push(data.readString(data.readByte()));
                }
                break;

              case 0x00025000:
                var numberOfGlyphs = data.readShort();
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
                if (index < POSTSCRIPT_GLYPHS.length)
                    return POSTSCRIPT_GLYPHS[index];
                return this.names[index - POSTSCRIPT_GLYPHS.length] || ".notdef";

              case 0x00025000:

              case 0x00030000:
                return ".notdef";

              case 0x00040000:
                return this.map[code] || 0xFFFF;
            }
        },
        encode: function(mapping) {
            if (this.format = 0x00030000)
                return this.raw();

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
                    indexes.push(POSTSCRIPT_GLYPHS.length - 1 + strings.length);
                    strings.push(post);
                }
            }

            out.writeShort(mapping.length);

            for (var i = 0; i < indexes.length; ++i) {
                out.writeShort(indexes[i]);
            }

            for (var i = 0; i < strings.length; ++i) {
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
                self.platformID == 0 && self.format == 4
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
                var idDelta = data.times(segCount, data.readShort);
                var idRangeOffset = data.times(segCount, data.readShort);

                var count = (self.length + self.offset - data.offset()) / 2;
                var glyphIds = data.times(count, data.readShort);

                for (var i = 0; i < segCount; ++i) {
                    var end = endCode[i];
                    var start = startCode[i];
                    for (var code = start; code <= end; ++code) {
                        var glyphId;
                        if (idRangeOffset[i] == 0) {
                            glyphId = code + idDelta[i];
                        } else {
                            var index = idRangeOffset[i] / 2 + (code - start) - (segCount - i);
                            glyphId = glyphIds[index] || 0;
                            if (glyphId != 0) glyphId += idDelta[i];
                        }
                        self.codeMap[code] = glyphId & 0xFFFF;
                    }
                }
            }
        });
    }

    return deftable({
        parse: function(data) {
            var offset = this.offset;
            data.offset(offset);

            this.version = data.readShort();
            var tableCount = data.readShort();
            var hasUnicode = false;
            this.tables = data.times(tableCount, function(){
                var entry = new CmapEntry(data, offset);
                if (entry.isUnicode) hasUnicode = true;
                return entry;
            });

            this.hasUnicode = hasUnicode;
        }
    });

})();

///

var data = fs.readFileSync("Ubuntu-C.ttf", { encoding: "binary" });
var str = data.toString({ encoding: "binary" });

var input = BinaryStream(str);
var dir = new Directory(input);
dir.readTable("head", HeadTable);
dir.readTable("loca", LocaTable);
dir.readTable("hhea", HheaTable);
dir.readTable("maxp", MaxpTable);
dir.readTable("hmtx", HmtxTable);
dir.readTable("glyf", GlyfTable);
dir.readTable("name", NameTable);
dir.readTable("post", PostTable);
dir.readTable("cmap", CmapTable);

console.log(dir.cmap);

//console.log(dir.name.encode());

// var enc = dir.encode({
//     test: "foobar",
// });
// fs.writeFileSync("/tmp/x.ttf", enc, { encoding: "binary" });
