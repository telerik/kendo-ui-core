(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "xlsx",
    name: "XLSX export",
    category: "framework",
    advanced: true,
    depends: [ "core" ]
};

(function(kendo, JSZip){

var RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
           '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
               '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>' +
               '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
               '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
            '</Relationships>';

var CORE = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
           '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '+
               'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" ' +
               'xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
                '<dc:creator>{0}</dc:creator>' +
                '<cp:lastModifiedBy>{1}</cp:lastModifiedBy>' +
                '<dcterms:created xsi:type="dcterms:W3CDTF">{2}</dcterms:created>' +
                '<dcterms:modified xsi:type="dcterms:W3CDTF">{3}</dcterms:modified>' +
           '</cp:coreProperties>';

var APP = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
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
                          '<vt:i4>{0}</vt:i4>' +
                      '</vt:variant>' +
                  '</vt:vector>' +
              '</HeadingPairs>' +
              '<TitlesOfParts>' +
                  '<vt:vector size="{0}" baseType="lpstr">' +
                      '<vt:lpstr>Sheet1</vt:lpstr>' +
                  '</vt:vector>' +
              '</TitlesOfParts>' +
              '<LinksUpToDate>false</LinksUpToDate>' +
              '<SharedDoc>false</SharedDoc>' +
              '<HyperlinksChanged>false</HyperlinksChanged>' +
              '<AppVersion>14.0300</AppVersion>' +
          '</Properties>';

var CONTENT_TYPES = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
                    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
                        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />' +
                        '<Default Extension="xml" ContentType="application/xml" />' +
                        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />' +
                        '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />' +
                        '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml" />' +
                        '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml" />' +
                    '</Types>';

var WORKBOOK = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
               '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
                   '<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="9303" />' +
                   '<workbookPr defaultThemeVersion="124226" />' +
                   '<bookViews>' +
                       '<workbookView xWindow="240" yWindow="45" windowWidth="18195" windowHeight="7995" />' +
                   '</bookViews>' +
                   '<sheets>' +
                       '<sheet name="Sheet1" sheetId="1" r:id="rId1" />' +
                   '</sheets>' +
                   '<calcPr calcId="145621" />' +
               '</workbook>';

var WORKSHEET = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
                '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" mc:Ignorable="x14ac">' +
                    '<dimension ref="A1" />' +
                    '<sheetViews>' +
                        '<sheetView tabSelected="1" workbookViewId="0" />' +
                    '</sheetViews>' +
                    '<sheetFormatPr defaultRowHeight="15" x14ac:dyDescent="0.25" />' +
                    '<sheetData />' +
                    '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3" />' +
                '</worksheet>';

var WORKBOOK_RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
                    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
                        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml" />' +
                        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml" />' +
                    '</Relationships>';

function worksheet(options) {

}

kendo.xlsx = function(options) {
    var zip = new JSZip();

    var docProps = zip.folder("docProps");
    docProps.file("core.xml", kendo.format(CORE,
        "Kendo UI",
        "Kendo UI",
        new Date().toISOString(),
        new Date().toISOString()
    ));

    docProps.file("app.xml", kendo.format(APP,
        1
    ));

    var rels = zip.folder("_rels");
    rels.file(".rels", RELS);

    var xl = zip.folder("xl");

    var xlRels = xl.folder("_rels");
    xlRels.file("workbook.xml.rels", WORKBOOK_RELS);

    xl.file("workbook.xml", WORKBOOK);
    var worksheets = xl.folder("worksheets");
    worksheets.file("sheet1.xml", WORKSHEET);

    zip.file("[Content_Types].xml", CONTENT_TYPES);

    return "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + zip.generate({ compression: "DEFLATE" });
};

})(kendo, JSZip);

return kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
