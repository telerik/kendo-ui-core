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

var THEME = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
            '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">' +
                '<a:themeElements>' +
                    '<a:clrScheme name="Office">' +
                        '<a:dk1>' +
                            '<a:sysClr val="windowText" lastClr="000000" />' +
                        '</a:dk1>' +
                        '<a:lt1>' +
                            '<a:sysClr val="window" lastClr="FFFFFF" />' +
                        '</a:lt1>' +
                        '<a:dk2>' +
                            '<a:srgbClr val="1F497D" />' +
                        '</a:dk2>' +
                        '<a:lt2>' +
                            '<a:srgbClr val="EEECE1" />' +
                        '</a:lt2>' +
                        '<a:accent1>' +
                            '<a:srgbClr val="4F81BD" />' +
                        '</a:accent1>' +
                        '<a:accent2>' +
                            '<a:srgbClr val="C0504D" />' +
                        '</a:accent2>' +
                        '<a:accent3>' +
                            '<a:srgbClr val="9BBB59" />' +
                        '</a:accent3>' +
                        '<a:accent4>' +
                            '<a:srgbClr val="8064A2" />' +
                        '</a:accent4>' +
                        '<a:accent5>' +
                            '<a:srgbClr val="4BACC6" />' +
                        '</a:accent5>' +
                        '<a:accent6>' +
                            '<a:srgbClr val="F79646" />' +
                        '</a:accent6>' +
                        '<a:hlink>' +
                            '<a:srgbClr val="0000FF" />' +
                        '</a:hlink>' +
                        '<a:folHlink>' +
                            '<a:srgbClr val="800080" />' +
                        '</a:folHlink>' +
                    '</a:clrScheme>' +
                    '<a:fontScheme name="Office">' +
                        '<a:majorFont>' +
                            '<a:latin typeface="Cambria" />' +
                            '<a:ea typeface="" />' +
                            '<a:cs typeface="" />' +
                            '<a:font script="Jpan" typeface="MS P????" />' +
                            '<a:font script="Hang" typeface="?? ??" />' +
                            '<a:font script="Hans" typeface="??" />' +
                            '<a:font script="Hant" typeface="????" />' +
                            '<a:font script="Arab" typeface="Times New Roman" />' +
                            '<a:font script="Hebr" typeface="Times New Roman" />' +
                            '<a:font script="Thai" typeface="Tahoma" />' +
                            '<a:font script="Ethi" typeface="Nyala" />' +
                            '<a:font script="Beng" typeface="Vrinda" />' +
                            '<a:font script="Gujr" typeface="Shruti" />' +
                            '<a:font script="Khmr" typeface="MoolBoran" />' +
                            '<a:font script="Knda" typeface="Tunga" />' +
                            '<a:font script="Guru" typeface="Raavi" />' +
                            '<a:font script="Cans" typeface="Euphemia" />' +
                            '<a:font script="Cher" typeface="Plantagenet Cherokee" />' +
                            '<a:font script="Yiii" typeface="Microsoft Yi Baiti" />' +
                            '<a:font script="Tibt" typeface="Microsoft Himalaya" />' +
                            '<a:font script="Thaa" typeface="MV Boli" />' +
                            '<a:font script="Deva" typeface="Mangal" />' +
                            '<a:font script="Telu" typeface="Gautami" />' +
                            '<a:font script="Taml" typeface="Latha" />' +
                            '<a:font script="Syrc" typeface="Estrangelo Edessa" />' +
                            '<a:font script="Orya" typeface="Kalinga" />' +
                            '<a:font script="Mlym" typeface="Kartika" />' +
                            '<a:font script="Laoo" typeface="DokChampa" />' +
                            '<a:font script="Sinh" typeface="Iskoola Pota" />' +
                            '<a:font script="Mong" typeface="Mongolian Baiti" />' +
                            '<a:font script="Viet" typeface="Times New Roman" />' +
                            '<a:font script="Uigh" typeface="Microsoft Uighur" />' +
                            '<a:font script="Geor" typeface="Sylfaen" />' +
                        '</a:majorFont>' +
                        '<a:minorFont>' +
                            '<a:latin typeface="Calibri" />' +
                            '<a:ea typeface="" />' +
                            '<a:cs typeface="" />' +
                            '<a:font script="Jpan" typeface="MS P????" />' +
                            '<a:font script="Hang" typeface="?? ??" />' +
                            '<a:font script="Hans" typeface="??" />' +
                            '<a:font script="Hant" typeface="????" />' +
                            '<a:font script="Arab" typeface="Arial" />' +
                            '<a:font script="Hebr" typeface="Arial" />' +
                            '<a:font script="Thai" typeface="Tahoma" />' +
                            '<a:font script="Ethi" typeface="Nyala" />' +
                            '<a:font script="Beng" typeface="Vrinda" />' +
                            '<a:font script="Gujr" typeface="Shruti" />' +
                            '<a:font script="Khmr" typeface="DaunPenh" />' +
                            '<a:font script="Knda" typeface="Tunga" />' +
                            '<a:font script="Guru" typeface="Raavi" />' +
                            '<a:font script="Cans" typeface="Euphemia" />' +
                            '<a:font script="Cher" typeface="Plantagenet Cherokee" />' +
                            '<a:font script="Yiii" typeface="Microsoft Yi Baiti" />' +
                            '<a:font script="Tibt" typeface="Microsoft Himalaya" />' +
                            '<a:font script="Thaa" typeface="MV Boli" />' +
                            '<a:font script="Deva" typeface="Mangal" />' +
                            '<a:font script="Telu" typeface="Gautami" />' +
                            '<a:font script="Taml" typeface="Latha" />' +
                            '<a:font script="Syrc" typeface="Estrangelo Edessa" />' +
                            '<a:font script="Orya" typeface="Kalinga" />' +
                            '<a:font script="Mlym" typeface="Kartika" />' +
                            '<a:font script="Laoo" typeface="DokChampa" />' +
                            '<a:font script="Sinh" typeface="Iskoola Pota" />' +
                            '<a:font script="Mong" typeface="Mongolian Baiti" />' +
                            '<a:font script="Viet" typeface="Arial" />' +
                            '<a:font script="Uigh" typeface="Microsoft Uighur" />' +
                            '<a:font script="Geor" typeface="Sylfaen" />' +
                        '</a:minorFont>' +
                    '</a:fontScheme>' +
                    '<a:fmtScheme name="Office">' +
                        '<a:fillStyleLst>' +
                            '<a:solidFill>' +
                                '<a:schemeClr val="phClr" />' +
                            '</a:solidFill>' +
                            '<a:gradFill rotWithShape="1">' +
                                '<a:gsLst>' +
                                    '<a:gs pos="0">' +
                                        '<a:schemeClr val="phClr">' +
                                            '<a:tint val="50000" />' +
                                            '<a:satMod val="300000" />' +
                                        '</a:schemeClr>' +
                                    '</a:gs>' +
                                    '<a:gs pos="35000">' +
                                        '<a:schemeClr val="phClr">' +
                                            '<a:tint val="37000" />' +
                                            '<a:satMod val="300000" />' +
                                        '</a:schemeClr>' +
                                    '</a:gs>' +
                                    '<a:gs pos="100000">' +
                                        '<a:schemeClr val="phClr">' +
                                            '<a:tint val="15000" />' +
                                            '<a:satMod val="350000" />' +
                                        '</a:schemeClr>' +
                                    '</a:gs>' +
                                '</a:gsLst>' +
                                '<a:lin ang="16200000" scaled="1" />' +
                            '</a:gradFill>' +
                            '<a:gradFill rotWithShape="1">' +
                                '<a:gsLst>' +
                                    '<a:gs pos="0">' +
                                        '<a:schemeClr val="phClr">' +
                                            '<a:shade val="51000" />' +
                                            '<a:satMod val="130000" />' +
                                        '</a:schemeClr>' +
                                    '</a:gs>' +
                                    '<a:gs pos="80000">' +
                                        '<a:schemeClr val="phClr">' +
                                            '<a:shade val="93000" />' +
                                            '<a:satMod val="130000" />' +
                                        '</a:schemeClr>' +
                                    '</a:gs>' +
                                    '<a:gs pos="100000">' +
                                        '<a:schemeClr val="phClr">' +
                                            '<a:shade val="94000" />' +
                                            '<a:satMod val="135000" />' +
                                        '</a:schemeClr>' +
                                    '</a:gs>' +
                                '</a:gsLst>' +
                                '<a:lin ang="16200000" scaled="0" />' +
                            '</a:gradFill>' +
                        '</a:fillStyleLst>' +
                        '<a:lnStyleLst>' +
                            '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr">' +
                                '<a:solidFill>' +
                                    '<a:schemeClr val="phClr">' +
                                        '<a:shade val="95000" />' +
                                        '<a:satMod val="105000" />' +
                                    '</a:schemeClr>' +
                                '</a:solidFill>' +
                                '<a:prstDash val="solid" />' +
                            '</a:ln>' +
                            '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr">' +
                                '<a:solidFill>' +
                                    '<a:schemeClr val="phClr" />' +
                                '</a:solidFill>' +
                                '<a:prstDash val="solid" />' +
                            '</a:ln>' +
                            '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr">' +
                                '<a:solidFill>' +
                                    '<a:schemeClr val="phClr" />' +
                                '</a:solidFill>' +
                                '<a:prstDash val="solid" />' +
                            '</a:ln>' +
                        '</a:lnStyleLst>' +
                        '<a:effectStyleLst>' +
                            '<a:effectStyle>' +
                                '<a:effectLst>' +
                                    '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0">' +
                                        '<a:srgbClr val="000000">' +
                                            '<a:alpha val="38000" />' +
                                        '</a:srgbClr>' +
                                    '</a:outerShdw>' +
                                '</a:effectLst>' +
                            '</a:effectStyle>' +
                            '<a:effectStyle>' +
                                '<a:effectLst>' +
                                    '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0">' +
                                        '<a:srgbClr val="000000">' +
                                            '<a:alpha val="35000" />' +
                                        '</a:srgbClr>' +
                                    '</a:outerShdw>' +
                                '</a:effectLst>' +
                            '</a:effectStyle>' +
                            '<a:effectStyle>' +
                                '<a:effectLst>' +
                                    '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0">' +
                                        '<a:srgbClr val="000000">' +
                                            '<a:alpha val="35000" />' +
                                        '</a:srgbClr>' +
                                    '</a:outerShdw>' +
                                '</a:effectLst>' +
                                '<a:scene3d>' +
                                    '<a:camera prst="orthographicFront">' +
                                        '<a:rot lat="0" lon="0" rev="0" />' +
                                    '</a:camera>' +
                                    '<a:lightRig rig="threePt" dir="t">' +
                                        '<a:rot lat="0" lon="0" rev="1200000" />' +
                                    '</a:lightRig>' +
                                '</a:scene3d>' +
                                '<a:sp3d>' +
                                    '<a:bevelT w="63500" h="25400" />' +
                                '</a:sp3d>' +
                            '</a:effectStyle>' +
                        '</a:effectStyleLst>' +
                        '<a:bgFillStyleLst>' +
                            '<a:solidFill>' +
                                '<a:schemeClr val="phClr" />' +
                            '</a:solidFill>' +
                            '<a:gradFill rotWithShape="1">' +
                                '<a:gsLst>' +
                                    '<a:gs pos="0">' +
                                        '<a:schemeClr val="phClr">' +
                                            '<a:tint val="40000" />' +
                                            '<a:satMod val="350000" />' +
                                        '</a:schemeClr>' +
                                    '</a:gs>' +
                                    '<a:gs pos="40000">' +
                                        '<a:schemeClr val="phClr">' +
                                            '<a:tint val="45000" />' +
                                            '<a:shade val="99000" />' +
                                            '<a:satMod val="350000" />' +
                                        '</a:schemeClr>' +
                                    '</a:gs>' +
                                    '<a:gs pos="100000">' +
                                        '<a:schemeClr val="phClr">' +
                                            '<a:shade val="20000" />' +
                                            '<a:satMod val="255000" />' +
                                        '</a:schemeClr>' +
                                    '</a:gs>' +
                                '</a:gsLst>' +
                                '<a:path path="circle">' +
                                    '<a:fillToRect l="50000" t="-80000" r="50000" b="180000" />' +
                                '</a:path>' +
                            '</a:gradFill>' +
                            '<a:gradFill rotWithShape="1">' +
                                '<a:gsLst>' +
                                    '<a:gs pos="0">' +
                                        '<a:schemeClr val="phClr">' +
                                            '<a:tint val="80000" />' +
                                            '<a:satMod val="300000" />' +
                                        '</a:schemeClr>' +
                                    '</a:gs>' +
                                    '<a:gs pos="100000">' +
                                        '<a:schemeClr val="phClr">' +
                                            '<a:shade val="30000" />' +
                                            '<a:satMod val="200000" />' +
                                        '</a:schemeClr>' +
                                    '</a:gs>' +
                                '</a:gsLst>' +
                                '<a:path path="circle">' +
                                    '<a:fillToRect l="50000" t="50000" r="50000" b="50000" />' +
                                '</a:path>' +
                            '</a:gradFill>' +
                        '</a:bgFillStyleLst>' +
                    '</a:fmtScheme>' +
                '</a:themeElements>' +
                '<a:objectDefaults />' +
                '<a:extraClrSchemeLst />' +
            '</a:theme>';

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
                        '<Override PartName="/xl/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml" />' +
                        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />' +
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
                        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml" />' +
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
    var theme = xl.folder("theme");
    theme.file("theme1.xml", THEME);

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
