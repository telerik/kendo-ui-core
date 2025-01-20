import { SplitterHelpers } from "../../helpers/splitter-utils.js";
import { asyncTest } from "../../helpers/async-utils.js";

let url = "foo";
let splitter;
let create = SplitterHelpers.create;

describe("splitter load on demand", function() {
    beforeEach(function() {
        $.mockjaxSettings.responseTime = 0;
        $.mockjaxSettings.contentType = "text/html";
        $.mockjax({ url: url, responseText: "foobar" });
    });
    afterEach(function() {
        Mocha.fixture.closest("body").find(".k-splitter").each(function(idx, element) {
            $(element).data("kendoSplitter").destroy();
        });
        $.mockjax.clear();
        $(document).off();
    });

    it("ajaxRequest loads custom urls", function() {
        let customUrl = 'customUrl';

        splitter = create();

        $(document).on("ajaxSend", function(e, request, settings) {
            e.preventDefault();
            assert.equal(settings.url, customUrl);
        });

        $.mockjax({ url: customUrl, responseText: "foobar" });

        splitter.object.ajaxRequest(".k-pane:first", customUrl);

    });

    asyncTest("ajaxRequest places loaded data in target pane", function(done) {
        splitter = create();

        $(document).on("ajaxComplete", function(e, request, settings) {
            if (settings.url === url) {
                done(() => assert.equal(splitter.dom.find(".k-pane:first")[0].innerHTML, "foobar"));
            }
        });

        splitter.object.ajaxRequest(".k-pane:first", url);
    });

    it("loads content for loadable panes when initializing", function() {
        $(document).on("ajaxSend", function(e, request, settings) {
            e.preventDefault();
            let requestedUrl = settings.url;
            assert.equal(requestedUrl, url);
        });

        splitter = create({
            panes: [{}, { contentUrl: url }]
        });
    });

    it("ajaxRequest places loading icon in pane", function() {
        splitter = create();

        $(document).on("ajaxSend", function(e, request, settings) {
            request.abort();
            let loading = splitter.dom.find(".k-pane-loading.k-i-loading");
            assert.equal(loading.length, 1);
            assert.isOk(loading.parent().is(".k-pane:first"));
        });

        splitter.object.ajaxRequest(".k-pane:first", url);
    });

    it("ajaxRequest sends data to server", function() {
        let data = { id: 1 };

        splitter = create();

        $.mockjax.clear();
        $.mockjax(function(settings) {
            assert.deepEqual(settings.data, data);
            return {};
        });

        splitter.object.ajaxRequest(".k-pane:first", url, data);
    });
});
