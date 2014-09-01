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

var CORE = kendo.template('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
                          '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '+
                              'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" ' +
                              'xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
                               '<dc:creator>${creator}</dc:creator>' +
                               '<cp:lastModifiedBy>${lastModifiedBy}</cp:lastModifiedBy>' +
                               '<dcterms:created xsi:type="dcterms:W3CDTF">${created}</dcterms:created>' +
                               '<dcterms:modified xsi:type="dcterms:W3CDTF">${modified}</dcterms:modified>' +
                          '</cp:coreProperties>');

var APP = kendo.template('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
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

var CONTENT_TYPES = kendo.template('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
                                   '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
                                       '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />' +
                                       '<Default Extension="xml" ContentType="application/xml" />' +
                                       '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />' +
                                       '<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>' +
                                       '# for (var idx = 1; idx <= count; idx++) { #' +
                                       '<Override PartName="/xl/worksheets/sheet${idx}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />' +
                                       '# } #' +
                                       '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml" />' +
                                       '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml" />' +
                                   '</Types>');

var WORKBOOK = kendo.template('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
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

var WORKSHEET = kendo.template('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
                               '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" mc:Ignorable="x14ac">' +
                                   '<dimension ref="A1" />' +
                                   '<sheetViews>' +
                                       '<sheetView tabSelected="1" workbookViewId="0" />' +
                                   '</sheetViews>' +
                                   '<sheetFormatPr defaultRowHeight="15" x14ac:dyDescent="0.25" />' +
                                   '<sheetData>' +
                                   '# for (var ri = 0; ri < data.length; ri++) { #' +
                                       '# var row = data[ri]; #' +
                                       '<row r="r${ri + 1}">' +
                                       '# for (var ci = 0; ci < row.data.length; ci++) { #' +
                                           '# var cell = row.data[ci];#' +
                                           '<c r="${String.fromCharCode(65 + ci)}${ri+1}" t="${cell.type}">' +
                                               '<v>${cell.value}</v>' +
                                           '</c>' +
                                       '# } #' +
                                       '</row>' +
                                   '# } #' +
                                   '</sheetData>' +
                                   '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3" />' +
                               '</worksheet>');

var WORKBOOK_RELS = kendo.template('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
                                   '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
                                   '# for (var idx = 1; idx <= count; idx++) { #' +
                                       '<Relationship Id="rId${idx}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${idx}.xml" />' +
                                   '# } #' +
                                       '<Relationship Id="rId${count+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml" />' +
                                       '<Relationship Id="rId${count+2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml" />' +
                                   '</Relationships>');

var SHARED_STRINGS = kendo.template('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
                                    '<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${count}" uniqueCount="${uniqueCount}">' +
                                    '# for (var index in indexes) { #' +
                                        '<si><t>${index}</t></si>' +
                                    '# } #' +
                                    '</sst>');

var Worksheet = kendo.Class.extend({
    init: function(options, sharedStrings) {
        this.options = options;
        this._sharedStrings = sharedStrings;
    },
    toXML: function() {
        return WORKSHEET({
            data: $.map(this.options.data || [], $.proxy(this._row, this))
        });
    },
    _row: function(data) {
        return {
            data: $.map(data, $.proxy(this._cell, this))
        };
    },
    _lookupString: function(value) {
        var index = this._sharedStrings.indexes[value];

        if (index !== undefined) {
            value = index;
        } else {
            value = this._sharedStrings.indexes[value] = this._sharedStrings.uniqueCount;
            this._sharedStrings.uniqueCount ++;
        }

        this._sharedStrings.count ++;

        return value;
    },
    _cell: function(data) {
        var value = data.value;

        if (typeof value === "string") {
            value = this._lookupString(value);
        }

        return {
            value: value,
            type: "s"
        };
    }
});

var Workbook = kendo.Class.extend({
    init: function(options) {
        this.options = options || {};
        this._sharedStrings = {
            indexes: {},
            count: 0,
            uniqueCount: 0
        };
        this._sheets = [];

        $.map(this.options.sheets || [], $.proxy(this.addSheet, this));
    },
    addSheet: function(options) {
        this._sheets.push(new Worksheet(options, this._sharedStrings));
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

        xl.file("sharedStrings.xml", SHARED_STRINGS(this._sharedStrings));

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
