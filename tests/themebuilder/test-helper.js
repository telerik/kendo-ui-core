/*jshint scripturl: true */
function withSandbox(callback) {
    var wnd, doc;
    var iframe = $("<iframe />")[0];

    $(iframe)
        .appendTo(QUnit.fixture)
        .prop("src", 'javascript:""');

    wnd = iframe.contentWindow || iframe;
    doc = wnd.document || iframe.contentDocument;

    $(iframe).one("load", function() {
        callback(wnd, doc);
    });

    var jQueryUrl = $("script[src*=jquery]").attr("src");

    console.log(jQueryUrl);

    doc.open();
    doc.write(
        "<!doctype html>" +
        "<html>" +
        "<head><meta charset='utf-8' />" +
        "<script src='" + jQueryUrl + "'></script>" +
        "<script src='/base/src/kendo.core.js'></script>" +
        "<script src='/base/src/kendo.userevents.js'></script>" +
        "<script src='/base/src/kendo.draganddrop.js'></script>" +
        "<script src='/base/src/kendo.window.js'></script>" +
        "<script src='/base/src/kendo.panelbar.js'></script>" +
        "<script src='/base/src/kendo.data.js'></script>" +
        "<script src='/base/src/kendo.popup.js'></script>" +
        "<script src='/base/src/kendo.list.js'></script>" +
        "<script src='/base/src/kendo.numerictextbox.js'></script>" +
        "<script src='/base/src/kendo.combobox.js'></script>" +
        "<script src='/base/src/kendo.dataviz.core.js'></script>" +
        "<script src='/base/src/kendo.dataviz.themes.js'></script>" +
        "<script src='/base/themebuilder/scripts/themebuilder.js'></script>" +
        "</head><body></body></html>"
    );

    doc.close();
}

function sandboxed_test(name, testMethod) {
    asyncTest(name, function() {
        withSandbox(function(wnd, doc) {
            start();
            testMethod.call(this, wnd, doc, wnd.$);
        });
    });
}

