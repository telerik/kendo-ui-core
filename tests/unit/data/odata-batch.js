import '@progress/kendo-ui/src/kendo.data.js';
import '@progress/kendo-ui/src/kendo.data.odata.js';

let odataTransport = kendo.data.transports["odata-v4"];

function makeMockTransport() {
    return {
        options: {
            batch: { url: "http://example.com/$batch", type: "POST" },
            update: { url: "http://example.com/update", type: "PATCH" },
            create: { url: "http://example.com/create", type: "POST" },
            destroy: { url: "http://example.com/destroy", type: "DELETE" }
        }
    };
}

let batchSuccessResponse = [
    "--changesetresponse_aabb1122",
    "Content-Type: application/http",
    "Content-Transfer-Encoding: binary",
    "",
    "HTTP/1.1 200 OK",
    "Content-Type: application/json",
    "",
    '{"id":1,"Name":"Test"}',
    "--changesetresponse_aabb1122--"
].join("\r\n");

describe("OData batch operations", function() {
    let ajaxSpy;

    afterEach(function() {
        if (ajaxSpy) {
            ajaxSpy.mockRestore();
            ajaxSpy = null;
        }
    });

    it("submit does nothing when all collections are empty", function() {
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(kendo.jQuery.noop);
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [], destroyed: [], created: [] },
            success: $.noop,
            error: $.noop
        });
        assert.equal(ajaxSpy.mock.calls.length, 0);
    });

    it("submit calls $.ajax for updated collection", function() {
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(kendo.jQuery.noop);
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [{ id: 1, Name: "Foo" }], destroyed: [], created: [] },
            success: $.noop,
            error: $.noop
        });
        assert.equal(ajaxSpy.mock.calls.length, 1);
    });

    it("submit calls $.ajax with batch URL", function() {
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(kendo.jQuery.noop);
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [{ id: 1, Name: "Foo" }], destroyed: [], created: [] },
            success: $.noop,
            error: $.noop
        });
        assert.equal(ajaxSpy.mock.calls[0][0].url, "http://example.com/$batch");
    });

    it("submit sends multipart/mixed content type", function() {
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(kendo.jQuery.noop);
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [{ id: 1, Name: "Foo" }], destroyed: [], created: [] },
            success: $.noop,
            error: $.noop
        });
        let contentType = ajaxSpy.mock.calls[0][0].headers["Content-Type"];
        assert.isOk(contentType.indexOf("multipart/mixed") === 0);
    });

    it("submit request body contains update URL for updated collection", function() {
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(kendo.jQuery.noop);
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [{ id: 1, Name: "Foo" }], destroyed: [], created: [] },
            success: $.noop,
            error: $.noop
        });
        assert.isOk(ajaxSpy.mock.calls[0][0].data.indexOf("http://example.com/update") >= 0);
    });

    it("submit request body contains create URL for created collection", function() {
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(kendo.jQuery.noop);
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [], destroyed: [], created: [{ Name: "New" }] },
            success: $.noop,
            error: $.noop
        });
        assert.isOk(ajaxSpy.mock.calls[0][0].data.indexOf("http://example.com/create") >= 0);
    });

    it("submit request body contains destroy URL for destroyed collection", function() {
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(kendo.jQuery.noop);
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [], destroyed: [{ id: 2 }], created: [] },
            success: $.noop,
            error: $.noop
        });
        assert.isOk(ajaxSpy.mock.calls[0][0].data.indexOf("http://example.com/destroy") >= 0);
    });

    it("submit batch body starts with boundary marker", function() {
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(kendo.jQuery.noop);
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [{ id: 1 }], destroyed: [], created: [] },
            success: $.noop,
            error: $.noop
        });
        assert.isOk(ajaxSpy.mock.calls[0][0].data.indexOf("--sf_batch_") >= 0);
    });

    it("submit batch body includes sf_changeset_ boundary", function() {
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(kendo.jQuery.noop);
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [{ id: 1 }], destroyed: [], created: [] },
            success: $.noop,
            error: $.noop
        });
        assert.isOk(ajaxSpy.mock.calls[0][0].data.indexOf("sf_changeset_") >= 0);
    });

    it("submit success handler calls e.success with update results", function() {
        let successArgs = [];
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(function(options) {
            options.success(batchSuccessResponse);
        });
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [{ id: 1, Name: "Test" }], destroyed: [], created: [] },
            success: function(data, type) { successArgs.push({ data, type }); },
            error: $.noop
        });
        assert.equal(successArgs.length, 1);
        assert.equal(successArgs[0].type, "update");
    });

    it("submit success handler for destroyed passes empty array", function() {
        let successArgs = [];
        let destroyResponse = [
            "--changesetresponse_cc3344",
            "Content-Type: application/http",
            "",
            "HTTP/1.1 204 No Content",
            "",
            "--changesetresponse_cc3344--"
        ].join("\r\n");
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(function(options) {
            options.success(destroyResponse);
        });
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [], destroyed: [{ id: 2 }], created: [] },
            success: function(data, type) { successArgs.push({ data, type }); },
            error: $.noop
        });
        assert.equal(successArgs.length, 1);
        assert.equal(successArgs[0].type, "destroy");
        assert.deepEqual(successArgs[0].data, []);
    });

    it("submit error handler is called on $.ajax error", function() {
        let errorCalled = false;
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(function(options) {
            options.error({ status: 500 }, "error", "Internal Server Error");
        });
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [{ id: 1 }], destroyed: [], created: [] },
            success: $.noop,
            error: function() { errorCalled = true; }
        });
        assert.isTrue(errorCalled);
    });

    it("submit handles function-based batch URL", function() {
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(kendo.jQuery.noop);
        let transport = {
            options: {
                batch: { url: function() { return "http://example.com/dynamic-batch"; }, type: "POST" },
                update: { url: "http://example.com/update", type: "PATCH" },
                create: { url: "http://example.com/create", type: "POST" },
                destroy: { url: "http://example.com/destroy", type: "DELETE" }
            }
        };
        odataTransport.submit.call(transport, {
            data: { updated: [{ id: 1 }], destroyed: [], created: [] },
            success: $.noop,
            error: $.noop
        });
        assert.equal(ajaxSpy.mock.calls[0][0].url, "http://example.com/dynamic-batch");
    });

    it("submit handles function-based update URL", function() {
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(kendo.jQuery.noop);
        let transport = {
            options: {
                batch: { url: "http://example.com/$batch", type: "POST" },
                update: { url: function(item) { return "http://example.com/items/" + item.id; }, type: "PATCH" },
                create: { url: "http://example.com/create", type: "POST" },
                destroy: { url: "http://example.com/destroy", type: "DELETE" }
            }
        };
        odataTransport.submit.call(transport, {
            data: { updated: [{ id: 5 }], destroyed: [], created: [] },
            success: $.noop,
            error: $.noop
        });
        assert.isOk(ajaxSpy.mock.calls[0][0].data.indexOf("http://example.com/items/5") >= 0);
    });

    it("submit processes all three collections when all are non-empty", function() {
        let successArgs = [];
        let multiResponse = [
            "--changesetresponse_rr1122",
            "Content-Type: application/http",
            "",
            "HTTP/1.1 200 OK",
            "Content-Type: application/json",
            "",
            '{"id":1}',
            "--changesetresponse_rr1122--",
            "--changesetresponse_ss2233",
            "Content-Type: application/http",
            "",
            "HTTP/1.1 204 No Content",
            "",
            "--changesetresponse_ss2233--",
            "--changesetresponse_tt3344",
            "Content-Type: application/http",
            "",
            "HTTP/1.1 201 Created",
            "Content-Type: application/json",
            "",
            '{"id":99}',
            "--changesetresponse_tt3344--"
        ].join("\r\n");
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(function(options) {
            options.success(multiResponse);
        });
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: {
                updated: [{ id: 1 }],
                destroyed: [{ id: 2 }],
                created: [{ Name: "New" }]
            },
            success: function(data, type) { successArgs.push(type); },
            error: $.noop
        });
        assert.isTrue(successArgs.indexOf("update") >= 0);
        assert.isTrue(successArgs.indexOf("destroy") >= 0);
        assert.isTrue(successArgs.indexOf("create") >= 0);
    });

    it("submit marks collection as failed when response has non-2xx status", function() {
        let successArgs = [];
        let errorCalled = false;
        let failResponse = [
            "--changesetresponse_fail01",
            "Content-Type: application/http",
            "Content-Transfer-Encoding: binary",
            "",
            "HTTP/1.1 400 Bad Request",
            "",
            "--changesetresponse_fail01--"
        ].join("\r\n");
        ajaxSpy = vi.spyOn(kendo.jQuery, "ajax").mockImplementation(function(options) {
            options.success(failResponse);
        });
        let transport = makeMockTransport();
        odataTransport.submit.call(transport, {
            data: { updated: [{ id: 1 }], destroyed: [], created: [] },
            success: function(data, type) { successArgs.push({ data, type }); },
            error: function() { errorCalled = true; }
        });
        assert.isTrue(errorCalled || successArgs.length === 0 || (successArgs[0] && successArgs[0].passed === false));
    });
});

describe("OData schema", function() {
    it("odata schema data returns d.results when present", function() {
        let result = kendo.data.schemas.odata.data({ d: { results: [{ id: 1 }] } });
        assert.deepEqual(result, [{ id: 1 }]);
    });

    it("odata schema data returns array with d when results absent", function() {
        let obj = { name: "x" };
        let result = kendo.data.schemas.odata.data({ d: obj });
        assert.deepEqual(result, [obj]);
    });
});
