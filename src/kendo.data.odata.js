import { dataRegistry } from "./data/registry.js";
import { odataSchema, odataTransport, odataV4Schema, odataV4Transport } from "./data/odata.js";

export const __meta__ = {
    id: "data.odata",
    name: "OData",
    category: "framework",
    depends: ["core"],
    hidden: true
};

const kendo = window.kendo || (window.kendo = {});

dataRegistry.register({
    schemas: {
        odata: odataSchema,
        "odata-v4": odataV4Schema
    },
    transports: {
        odata: odataTransport,
        "odata-v4": odataV4Transport
    }
});

export default kendo;
