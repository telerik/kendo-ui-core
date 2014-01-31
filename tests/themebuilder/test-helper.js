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

    doc.open();
    doc.write(
        "<!doctype html>" +
        "<html>" +
        "<head><meta charset='utf-8' />" +
        "<script src='" + jQueryUrl + "'></script>"
    );

    $("script[src*=kendo]").each(function(_, script) {
        doc.write("<script src='" + script.src + "'></script>");
    });

    doc.write("<script src='/base/themebuilder/scripts/themebuilder.js'></script>");
    doc.write("</head><body></body></html>");
    doc.close();
}

function sandboxed_test(name, testMethod) {
    var oldTimeout = QUnit.config.testTimeout;
    QUnit.config.testTimeout = 3000;

    asyncTest(name, function() {
        withSandbox(function(wnd, doc) {
            start();
            testMethod.call(this, wnd, doc, wnd.$);
        });
    });

    QUnit.config.testTimeout = oldTimeout;
}

