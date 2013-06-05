document.write('\
    <script src="../../src/kendo.core.js"></script>\
    <script src="../../src/kendo.fx.js"></script>\
    <script src="../../src/kendo.userevents.js"></script>\
    <script src="../../src/kendo.draganddrop.js"></script>\
    <script src="../../src/kendo.data.js"></script>\
    <script src="../../src/kendo.binder.js"></script>\
    <script src="../../src/kendo.popup.js"></script>\
    <script src="../../src/kendo.list.js"></script>\
    <script src="../../src/kendo.combobox.js"></script>\
    <script src="../../src/kendo.dropdownlist.js"></script>\
    <script src="../../src/kendo.window.js"></script>\
    <script src="../../src/kendo.colorpicker.js"></script>\
    <script src="../qunit/qunit/qunit.js"></script>\
    <script src="test-helper.js"></script>\
    <link rel="stylesheet" href="../qunit/qunit/qunit.css" />\
    <link rel="stylesheet/less" href="../../styles/web/kendo.common.less">\
    <link rel="stylesheet/less" href="../../styles/web/kendo.default.less">\
    <script src="../../demos/mvc/content/shared/js/less.js"></script>\
');
(function(){
    var scripts = document.getElementsByTagName("script");
    var path = "";

    for (var idx = 0; idx < scripts.length; idx++) {
        if (scripts[idx].src.indexOf("test-scripts.js") >= 0) {
            path = scripts[idx].src.replace("test-scripts.js", "");
            break;
        }
    }

    function writeScript(url) {
        document.write('<script src="' + url + '"></script>');
    }

    if (/debugscripts/.test(top.location.search)) {
        writeScript('../../src/editor/main.js');
        writeScript('../../src/editor/dom.js');
        writeScript('../../src/editor/serializer.js');
        writeScript('../../src/editor/range.js');
        writeScript('../../src/editor/system.js');
        writeScript('../../src/editor/inlineformat.js');
        writeScript('../../src/editor/formatblock.js');
        writeScript('../../src/editor/linebreak.js');
        writeScript('../../src/editor/lists.js');
        writeScript('../../src/editor/link.js');
        writeScript('../../src/editor/image.js');
        writeScript('../../src/editor/components.js');
        writeScript('../../src/editor/indent.js');
        writeScript('../../src/editor/viewhtml.js');
        writeScript('../../src/editor/pendingformats.js');
        writeScript('../../src/editor/tables.js');
    } else {
        writeScript('../../src/kendo.editor.js');
    }
})();
