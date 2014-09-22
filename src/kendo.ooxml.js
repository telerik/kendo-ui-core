(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "ooxml",
    name: "XLSX export",
    category: "framework",
    advanced: true,
    depends: [ "core" ]
};

(function(kendo){

var RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
           '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
               '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>' +
               '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
               '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
            '</Relationships>';

var CORE = kendo.template(
'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
'<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '+
  'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" ' +
  'xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
   '<dc:creator>${creator}</dc:creator>' +
   '<cp:lastModifiedBy>${lastModifiedBy}</cp:lastModifiedBy>' +
   '<dcterms:created xsi:type="dcterms:W3CDTF">${created}</dcterms:created>' +
   '<dcterms:modified xsi:type="dcterms:W3CDTF">${modified}</dcterms:modified>' +
'</cp:coreProperties>');

var APP = kendo.template(
'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
'<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">' +
  '<Application>Microsoft Excel</Application>' +
  '<DocSecurity>0</DocSecurity>' +
  '<ScaleCrop>false</ScaleCrop>' +
  '<HeadingPairs>' +
      '<vt:vector size="2" baseType="variant">' +
          '<vt:variant>' +
              '<vt:lpstr>Worksheets</vt:lpstr>' +
          '</vt:variant>' +
          '<vt:variant>' +
              '<vt:i4>${sheets.length}</vt:i4>' +
          '</vt:variant>' +
      '</vt:vector>' +
  '</HeadingPairs>' +
  '<TitlesOfParts>' +
      '<vt:vector size="${sheets.length}" baseType="lpstr">' +
      '# for (var idx = 0; idx < sheets.length; idx++) { #' +
          '# if (sheets[idx].options.title) { #' +
          '<vt:lpstr>${sheets[idx].options.title}</vt:lpstr>' +
          '# } else { #' +
          '<vt:lpstr>Sheet${idx+1}</vt:lpstr>' +
          '# } #' +
      '# } #' +
      '</vt:vector>' +
  '</TitlesOfParts>' +
  '<LinksUpToDate>false</LinksUpToDate>' +
  '<SharedDoc>false</SharedDoc>' +
  '<HyperlinksChanged>false</HyperlinksChanged>' +
  '<AppVersion>14.0300</AppVersion>' +
'</Properties>');

var CONTENT_TYPES = kendo.template(
'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
   '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />' +
   '<Default Extension="xml" ContentType="application/xml" />' +
   '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />' +
   '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
   '<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>' +
   '# for (var idx = 1; idx <= count; idx++) { #' +
   '<Override PartName="/xl/worksheets/sheet${idx}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />' +
   '# } #' +
   '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml" />' +
   '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml" />' +
'</Types>');

var WORKBOOK = kendo.template(
'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
  '<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="9303" />' +
  '<workbookPr defaultThemeVersion="124226" />' +
  '<bookViews>' +
      '<workbookView xWindow="240" yWindow="45" windowWidth="18195" windowHeight="7995" />' +
  '</bookViews>' +
  '<sheets>' +
  '# for (var idx = 0; idx < sheets.length; idx++) { #' +
      '# if (sheets[idx].options.title) { #' +
      '<sheet name="${sheets[idx].options.title}" sheetId="${idx+1}" r:id="rId${idx+1}" />' +
      '# } else { #' +
      '<sheet name="Sheet${idx+1}" sheetId="${idx+1}" r:id="rId${idx+1}" />' +
      '# } #' +
  '# } #' +
  '</sheets>' +
  '<calcPr calcId="145621" />' +
'</workbook>');

var WORKSHEET = kendo.template(
'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" mc:Ignorable="x14ac">' +
   '<dimension ref="A1" />' +
   '<sheetViews>' +
       '<sheetView tabSelected="1" workbookViewId="0">' +
       '# if (freezePane) { #' +
       '<pane state="frozen"' +
       '# if (freezePane.colSplit) { #' +
       ' xSplit="${freezePane.colSplit}"' +
       '# } #' +
       '# if (freezePane.rowSplit) { #' +
       ' ySplit="${freezePane.rowSplit}"' +
       '# } #' +
       ' topLeftCell="${String.fromCharCode(65 + freezePane.colSplit)}${freezePane.rowSplit+1}"'+
       '/>' +
       '# } #' +
       '</sheetView>' +
   '</sheetViews>' +
   '<sheetFormatPr defaultRowHeight="15" x14ac:dyDescent="0.25" />' +
   '# if (columns) { #' +
   '<cols>' +
   '# for (var ci = 0; ci < columns.length; ci++) { #' +
       '# var column = columns[ci]; #' +
       '<col min="${ci+1}" max="${ci+1}"' +
       '# if (column.width) { #' +
       ' customWidth="1" width="${(((column.width)/7)*100+0.5)/100}" ' +
       '# } #' +
       '/>' +
   '# } #' +
   '</cols>' +
   '# } #' +
   '<sheetData>' +
   '# for (var ri = 0; ri < data.length; ri++) { #' +
       '# var row = data[ri]; #' +
       '<row r="r${ri + 1}">' +
       '# for (var ci = 0; ci < row.data.length; ci++) { #' +
           '# var cell = row.data[ci];#' +
           '<c r="${cell.ref}" # if (cell.style) { # s="${cell.style}" # } # # if (cell.type) { # t="${cell.type}"# } #>' +
           '# if (cell.value != null) { #' +
               '<v>${cell.value}</v>' +
           '# } #' +
           '</c>' +
       '# } #' +
       '</row>' +
   '# } #' +
   '</sheetData>' +
   '# if (mergeCells.length) { #' +
   '<mergeCells count="${mergeCells.length}">' +
       '# for (var ci = 0; ci < mergeCells.length; ci++) { #' +
       '<mergeCell ref="${mergeCells[ci]}"/>' +
       '# } #' +
   '</mergeCells>' +
   '# } #' +
   '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3" />' +
'</worksheet>');

var WORKBOOK_RELS = kendo.template(
'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
'# for (var idx = 1; idx <= count; idx++) { #' +
   '<Relationship Id="rId${idx}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${idx}.xml" />' +
'# } #' +
   '<Relationship Id="rId${count+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml" />' +
   '<Relationship Id="rId${count+2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml" />' +
'</Relationships>');

var SHARED_STRINGS = kendo.template(
'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
'<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${count}" uniqueCount="${uniqueCount}">' +
'# for (var index in indexes) { #' +
    '<si><t>${index}</t></si>' +
'# } #' +
'</sst>');

var STYLES = kendo.template(
'<?xml version="1.0" encoding="UTF-8"?>' +
'<styleSheet' +
   ' xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"' +
   ' xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"'+
   ' mc:Ignorable="x14ac"'+
   ' xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">' +
   '<numFmts count="${formats.length}">' +
   '# for (var fi = 0; fi < formats.length; fi++) { #' +
       '# var format = formats[fi]; #' +
       '<numFmt formatCode="${format.format}" numFmtId="${165+fi}" />' +
   '# } #' +
   '</numFmts>' +
   '<fonts count="${fonts.length+1}" x14ac:knownFonts="1">' +
      '<font>' +
         '<sz val="11" />' +
         '<color theme="1" />' +
         '<name val="Calibri" />' +
         '<family val="2" />' +
         '<scheme val="minor" />' +
      '</font>' +
   '# for (var fi = 0; fi < fonts.length; fi++) { #' +
       '# var font = fonts[fi]; #' +
      '<font>' +
         '# if (font.bold) { #' +
            '<b/>' +
         '# } #' +
         '# if (font.italic) { #' +
            '<i/>' +
         '# } #' +
         '# if (font.underline) { #' +
            '<u/>' +
         '# } #' +
         '# if (font.color) { #' +
         '<color rgb="${font.color}" />' +
         '# } else { #' +
         '<color theme="1" />' +
         '# } #' +
         '# if (font.fontSize) { #' +
         '<sz val="${font.fontSize}" />' +
         '# } else { #' +
         '<sz val="11" />' +
         '# } #' +
         '# if (font.fontName) { #' +
         '<name val="${font.fontName}" />' +
         '# } else { #' +
         '<name val="Calibri" />' +
         '<scheme val="minor" />' +
         '# } #' +
         '<family val="2" />' +
      '</font>' +
   '# } #' +
   '</fonts>' +
    '<fills count="${fills.length+1}">' +
        '<fill><patternFill patternType="none"/></fill>' +
        '<fill><patternFill patternType="gray125"/></fill>' +
    '# for (var fi = 0; fi < fills.length; fi++) { #' +
       '# var fill = fills[fi]; #' +
       '# if (fill.background) { #' +
        '<fill>' +
            '<patternFill patternType="solid">' +
                '<fgColor rgb="${fill.background}"/>' +
            '</patternFill>' +
        '</fill>' +
       '# } #' +
    '# } #' +
    '</fills>' +
    '<borders count="1">' +
        '<border><left/><right/><top/><bottom/><diagonal/></border>' +
    '</borders>' +
   '<cellXfs count="${styles.length+1}">' +
       '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
   '# for (var si = 0; si < styles.length; si++) { #' +
       '# var style = styles[si]; #' +
       '<xf xfid="0"' +
       '# if (style.fontId) { #' +
          ' fontId="${style.fontId}" applyFont="1"' +
       '# } #' +
       '# if (style.fillId) { #' +
          ' fillId="${style.fillId}" applyFill="1"' +
       '# } #' +
       '# if (style.numFmtId) { #' +
          ' numFmtId="${style.numFmtId}" applyNumberFormat="1"' +
       '# } #' +
       '></xf>' +
   '# } #' +
   '</cellXfs>' +
   '<dxfs count="0" />' +
   '<tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleMedium9" />' +
'</styleSheet>');

function ref(rowIndex, colIndex) {
    return String.fromCharCode(65 + colIndex) + (rowIndex + 1);
}

var Worksheet = kendo.Class.extend({
    init: function(options, sharedStrings, styles) {
        this.options = options;
        this._strings = sharedStrings;
        this._styles = styles;
        this._mergeCells = [];
    },
    toXML: function() {
        var data = this.options.data || [];

        return WORKSHEET({
            freezePane: this.options.freezePane,
            columns: this.options.columns,
            data: $.map(data, $.proxy(this._row, this, data)),
            mergeCells: this._mergeCells,
        });
    },
    _row: function(rows, cells, rowIndex) {
        this._cellIndex = 0;

        return {
            data: $.map(cells, $.proxy(this._cell, this, rows, rowIndex))
        };
    },
    _lookupString: function(value) {
        var index = this._strings.indexes[value];

        if (index !== undefined) {
            value = index;
        } else {
            value = this._strings.indexes[value] = this._strings.uniqueCount;
            this._strings.uniqueCount ++;
        }

        this._strings.count ++;

        return value;
    },
    _lookupStyle: function(style) {
        var json = kendo.stringify(style);

        if (json == "{}") {
            return 0;
        }

        var index = $.inArray(json, this._styles);

        if (index < 0) {
            index = this._styles.push(json) - 1;
        }

        // There is one default style
        return index + 1;
    },
    _cell: function(rows, rowIndex, data) {
        var value = data.value;

        var style = {
            bold: data.bold,
            color: data.color,
            background: data.background,
            italic: data.italic,
            underline: data.underline,
            fontName: data.fontName,
            fontSize: data.fontSize,
            format: data.format
        };

        var type = typeof value;

        if (type === "string") {
            value = this._lookupString(value);
            type = "s";
        } else if (type === "number") {
            type = "n";
        } else if (type === "boolean") {
            type = "b";
            value = +value;
        } else if (value != null && value.toISOString) {
            type = "d";
            value = kendo.timezone.remove(value, "Etc/UTC").toISOString();
            if (!style.format) {
                style.format = "mm-dd-yy";
            }
        } else {
            type = null;
            value = "";
        }

        style = this._lookupStyle(style);

        var cell = {
            value: value,
            type: type,
            style: style,
            ref: ref(rowIndex, this._cellIndex)
        };

        var colSpan = data.colSpan || 1;
        var rowSpan = data.rowSpan || 1;

        if (colSpan > 1 || rowSpan > 1) {
            var cells = [cell];

            for (var ci = 1; ci < colSpan; ci++) {
                this._cellIndex++;

                cells[ci] = { ref: ref(rowIndex, this._cellIndex) };
            }

            for (var ri = 1; ri < rowSpan; ri++) {
                if (rows[rowIndex + ri]) {
                    rows[rowIndex + ri].splice(this._cellIndex, 0, {});
                }
            }

            this._mergeCells.push(cell.ref + ":" + ref(rowIndex + rowSpan - 1, this._cellIndex));

            cell = cells;
        }

        this._cellIndex ++;

        return cell;
    }
});

var defaultFormats = {
    "General": 0,
    "0": 1,
    "0.00": 2,
    "#,##0": 3,
    "#,##0.00": 4,
    "0%": 9,
    "0.00%": 10,
    "0.00E+00": 11,
    "# ?/?": 12,
    "# ??/??": 13,
    "mm-dd-yy": 14,
    "d-mmm-yy": 15,
    "d-mmm": 16,
    "mmm-yy": 17,
    "h:mm AM/PM": 18,
    "h:mm:ss AM/PM": 19,
    "h:mm": 20,
    "h:mm:ss": 21,
    "m/d/yy h:mm": 22,
    "#,##0 ;(#,##0)": 37,
    "#,##0 ;[Red](#,##0)": 38,
    "#,##0.00;(#,##0.00)": 39,
    "#,##0.00;[Red](#,##0.00)": 40,
    '_("$"* #,##0.00_);_("$"* \(#,##0.00\);_("$"* "-"??_);_(@_)': 44,
    "mm:ss": 45,
    "[h]:mm:ss": 46,
    "mmss.0": 47,
    "##0.0E+0": 48,
    "@": 49,
    "[$-404]e/m/d": 27,
    "m/d/yy": 30,
    "[$-404]e/m/d": 36,
    "[$-404]e/m/d": 50,
    "[$-404]e/m/d": 57,
    "t0": 59,
    "t0.00": 60,
    "t#,##0": 61,
    "t#,##0.00": 62,
    "t0%": 67,
    "t0.00%": 68,
    "t# ?/?": 69,
    "t# ??/??": 70
};

function convertColor(color) {
    if (color.length < 6) {
        color = color.replace(/(\w)/g, function($0, $1) {
            return $1 + $1;
        });
    }

    color = color.substring(1).toUpperCase();

    if (color.length < 8) {
        color = "FF" + color;
    }

    return color;
}

var Workbook = kendo.Class.extend({
    init: function(options) {
        this.options = options || {};
        this._strings = {
            indexes: {},
            count: 0,
            uniqueCount: 0
        };
        this._sheets = [];
        this._styles = [];

        $.map(this.options.sheets || [], $.proxy(this.addSheet, this));
    },
    addSheet: function(options) {
        this._sheets.push(new Worksheet(options, this._strings, this._styles));
    },
    toDataURL: function() {
        var zip = new JSZip();

        var docProps = zip.folder("docProps");

        docProps.file("core.xml", CORE({
            creator: "Kendo UI",
            lastModifiedBy: "Kendo UI",
            created: new Date().toISOString(),
            modified: new Date().toISOString()
        }));

        var sheetCount = this._sheets.length;

        docProps.file("app.xml", APP({ sheets: this._sheets }));

        var rels = zip.folder("_rels");
        rels.file(".rels", RELS);

        var xl = zip.folder("xl");

        var xlRels = xl.folder("_rels");
        xlRels.file("workbook.xml.rels", WORKBOOK_RELS({ count: sheetCount }));

        xl.file("workbook.xml", WORKBOOK({ sheets: this._sheets }));

        var worksheets = xl.folder("worksheets");

        for (var idx = 0; idx < sheetCount; idx++) {
            worksheets.file(kendo.format("sheet{0}.xml", idx+1), this._sheets[idx].toXML());
        }

        var styles = $.map(this._styles, $.parseJSON);

        var hasFont = function(style) {
            return style.underline || style.bold || style.italic || style.color || style.fontName || style.fontSize;
        }

        var fonts = $.map(styles, function(style) {
            if (style.color) {
                style.color = convertColor(style.color);
            }

            if (hasFont(style)) {
                return style;
            }
        });

        var formats = $.map(styles, function(style) {
            if (style.format && defaultFormats[style.format] === undefined) {
                return style;
            }
        });

       var fills = $.map(styles, function(style) {
            if (style.background) {
                style.background = convertColor(style.background)
                return style;
            }
        });

        xl.file("styles.xml", STYLES({
           fonts: fonts,
           fills: fills,
           formats: formats,
           styles: $.map(styles, function(style) {
              var result = {};

              if (hasFont(style)) {
                  result.fontId = $.inArray(style, fonts) + 1;
              }

              if (style.background) {
                  result.fillId = $.inArray(style, fills) + 2;
              }

              if (style.format) {
                  if (defaultFormats[style.format] !== undefined) {
                      result.numFmtId = defaultFormats[style.format];
                  } else {
                      result.numFmtId = 165 + $.inArray(style, formats);
                  }
              }

              return result;
           })
        }));

        xl.file("sharedStrings.xml", SHARED_STRINGS(this._strings));

        zip.file("[Content_Types].xml", CONTENT_TYPES( { count: sheetCount }));

        return "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + zip.generate({ compression: "DEFLATE" });
    }
});

kendo.ooxml = {
    Workbook: Workbook,
    Worksheet: Worksheet
};

})(kendo);

return kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
