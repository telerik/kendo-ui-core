(function() {
    var url = "foo";
    var splitter;
    var create = SplitterHelpers.create;

    module("splitter load on demand", {
        setup: function() {
            $.mockjaxSettings.responseTime = 0;
            $.mockjaxSettings.contentType = "text/html";
            $.mockjax({ url: url, responseText: "foobar" });
        },
        teardown: function() {
            QUnit.fixture.closest("body").find(".k-splitter").each(function(idx, element){
                $(element).data("kendoSplitter").destroy();
            });
            $.mockjax.clear();
            $(document).off();
        }
    });

    test("ajaxRequest loads custom urls", 1, function() {
        var customUrl = 'customUrl';

        splitter = create();

        $(document).on("ajaxSend", function(e, request, settings) {
            e.preventDefault();
            equal(settings.url, customUrl);
        });

        $.mockjax({ url: customUrl, responseText: "foobar" });

        splitter.object.ajaxRequest(".k-pane:first", customUrl);

    });

    asyncTest("ajaxRequest places loaded data in target pane", 1, function() {
        splitter = create();

        $(document).on("ajaxComplete", function(e, request, settings) {
            if (settings.url === url) {
                start();
                equal(splitter.dom.find(".k-pane:first")[0].innerHTML, "foobar");
            }
        });

        splitter.object.ajaxRequest(".k-pane:first", url);
    });

    test("loads content for loadable panes when initializing", 1, function() {
        $(document).on("ajaxSend", function(e, request, settings) {
            e.preventDefault();
            requestedUrl = settings.url;
            equal(requestedUrl, url);
        });

        splitter = create({
            panes: [ {}, { contentUrl: url } ]
        });
    });

    test("ajaxRequest places loading icon in pane", 2, function() {
        splitter = create();

        $(document).on("ajaxSend", function(e, request, settings) {
            request.abort();
            var loading = splitter.dom.find(".k-pane-loading.k-loading");
            equal(loading.length, 1);
            ok(loading.parent().is(".k-pane:first"));
        });

        splitter.object.ajaxRequest(".k-pane:first", url);
    });

    test("ajaxRequest sends data to server", 1, function() {
        var data = { id: 1 };

        splitter = create();

        $.mockjax.clear();
        $.mockjax(function(settings) {
            deepEqual(settings.data, data);
            return {};
        });

        splitter.object.ajaxRequest(".k-pane:first", url, data);
    });
})();
