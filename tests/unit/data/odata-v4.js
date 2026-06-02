import '@progress/kendo-ui/src/kendo.data.js';
import '@progress/kendo-ui/src/kendo.data.odata.js';

let DataSource = kendo.data.DataSource;
let odataV4Transport = kendo.data.transports["odata-v4"];
let odataV4Schema = kendo.data.schemas["odata-v4"];
let parameterMap = odataV4Transport.parameterMap;

describe("OData v4", function() {
    it("datasource with type odata-v4 creates remote transport with parameterMap", function() {
        let dataSource = new DataSource({
            type: "odata-v4",
            transport: {
                read: "foo"
            }
        });

        assert.isOk(dataSource.transport.parameterMap === odataV4Transport.parameterMap);
    });

    it("datasource with type odata-v4 sets json dataType for read", function() {
        let dataSource = new DataSource({
            type: "odata-v4",
            transport: {
                read: "foo"
            }
        });

        assert.equal(dataSource.transport.options.read.dataType, "json");
    });

    it("datasource with type odata-v4 sets cache:true for read", function() {
        let dataSource = new DataSource({
            type: "odata-v4",
            transport: {
                read: "foo"
            }
        });

        assert.equal(dataSource.transport.options.read.cache, true);
    });

    it("odata-v4 parameterMap adds $count for read type", function() {
        let result = parameterMap({}, "read");
        assert.equal(result.$count, true);
    });

    it("odata-v4 parameterMap removes $inlinecount for read type", function() {
        let result = parameterMap({}, "read");
        assert.isOk(!result.hasOwnProperty("$inlinecount"), "$inlinecount should not be present");
    });

    it("odata-v4 parameterMap uses contains instead of substringof for contains filter", function() {
        let result = parameterMap({ filter: { filters: [{ field: "Name", operator: "contains", value: "bar" }] } }, "read");
        assert.equal(result.$filter, "contains(Name,'bar')");
    });

    it("odata-v4 parameterMap removes quotes from GUID filter values", function() {
        let guid = "12345678-1234-1234-1234-123456789012";
        let result = parameterMap({ filter: { filters: [{ field: "ID", operator: "eq", value: guid }] } }, "read");
        assert.equal(result.$filter, "ID eq " + guid);
    });

    it("odata-v4 parameterMap preserves quotes for non-GUID string filters", function() {
        let result = parameterMap({ filter: { filters: [{ field: "Name", operator: "eq", value: "foo" }] } }, "read");
        assert.equal(result.$filter, "Name eq 'foo'");
    });

    it("odata-v4 parameterMap adds $skip when skip is specified", function() {
        let result = parameterMap({ skip: 5 }, "read");
        assert.equal(result.$skip, 5);
    });

    it("odata-v4 parameterMap adds $top when take is specified", function() {
        let result = parameterMap({ take: 10 }, "read");
        assert.equal(result.$top, 10);
    });

    it("odata-v4 parameterMap adds $orderby when sort is specified", function() {
        let result = parameterMap({ sort: [{ field: "Name", dir: "asc" }] }, "read");
        assert.equal(result.$orderby, "Name");
    });

    it("odata-v4 parameterMap stringifies model for update type", function() {
        let result = parameterMap({ foo: "bar" }, "update");
        assert.equal(result, kendo.stringify({ foo: "bar" }));
    });

    it("odata-v4 parameterMap stringifies model for create type", function() {
        let result = parameterMap({ foo: "bar" }, "create");
        assert.equal(result, kendo.stringify({ foo: "bar" }));
    });

    it("odata-v4 parameterMap returns undefined for destroy type", function() {
        let result = parameterMap({ foo: "bar" }, "destroy");
        assert.isNotOk(result);
    });

    it("odata-v4 schema total reads @odata.count property", function() {
        let data = { "@odata.count": 42, value: [{ id: 1 }] };
        assert.equal(odataV4Schema.total(data), 42);
    });

    it("odata-v4 schema data returns value array from object", function() {
        let data = { "@odata.count": 2, value: [{ id: 1 }, { id: 2 }] };
        let result = odataV4Schema.data(data);
        assert.equal(result.length, 2);
        assert.equal(result[0].id, 1);
    });

    it("odata-v4 schema data returns array when input is an array", function() {
        let data = [{ id: 1 }, { id: 2 }];
        let result = odataV4Schema.data(data);
        assert.equal(result.length, 2);
    });

    it("odata-v4 schema data strips @odata metadata from array items", function() {
        let data = [{ "@odata.etag": "W/\"123\"", id: 1 }];
        let result = odataV4Schema.data(data);
        assert.isOk(!result[0].hasOwnProperty("@odata.etag"));
        assert.equal(result[0].id, 1);
    });

    it("odata-v4 schema data strips @odata metadata from single object", function() {
        let data = { "@odata.context": "http://example.com/$metadata", id: 1 };
        let result = odataV4Schema.data(data);
        assert.equal(result.length, 1);
        assert.isOk(!result[0].hasOwnProperty("@odata.context"));
        assert.equal(result[0].id, 1);
    });

    it("odata-v4 schema data wraps single object in array when no value property", function() {
        let data = { id: 1, name: "foo" };
        let result = odataV4Schema.data(data);
        assert.equal(result.length, 1);
        assert.equal(result[0].id, 1);
    });

    it("odata-v4 schema type is json", function() {
        assert.equal(odataV4Schema.type, "json");
    });

    it("odata-v4 parameterMap doesnotcontain operator uses indexof eq -1", function() {
        let result = parameterMap({ filter: { filters: [{ field: "Name", operator: "doesnotcontain", value: "bar" }] } }, "read");
        assert.include(result.$filter, "indexof");
        assert.include(result.$filter, "-1");
    });
});
