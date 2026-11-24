import "./kendo.core.js";
import "./kendo.data.odata.js";
import "./kendo.data.xml.js";
import { $ } from "./core/services/kendo-jquery.service.js";
import { Cache } from "./data/cache.js";
import { Comparer } from "./data/comparer.js";
import { DataReader } from "./data/data-reader.js";
import { DataSource } from "./data/data-source.js";
import { HierarchicalDataSource, Node } from "./data/hierarchical-data-source.js";
import { LazyObservableArray } from "./data/lazy-observable-array.js";
import { Model } from "./data/model.js";
import { ObservableArray } from "./data/observable-array.js";
import { ObservableObject } from "./data/observable-object.js";
import { Query } from "./data/query.js";
import { RemoteTransport } from "./data/transports/remote.transport.js";
import { LocalTransport } from "./data/transports/local.transport.js";
import { AISmartPasteTransport } from "./data/transports/ai-smart-paste.transport.js";
import { AiTransport } from "./data/transports/ai.transport.js";
import { dataRegistry } from "./data/registry.js";

export const __meta__ = {
    id: "data",
    name: "Data source",
    category: "framework",
    description: "Powerful component for using local and remote data.Fully supports CRUD, Sorting, Paging, Filtering, Grouping, and Aggregates.",
    depends: ["core"],
    features: [{
        id: "data-odata",
        name: "OData",
        description: "Support for accessing Open Data Protocol (OData) services.",
        depends: ["data.odata"]
    }, {
        id: "data-signalr",
        name: "SignalR",
        description: "Support for binding to SignalR hubs.",
        depends: ["data.signalr"]
    }, {
        id: "data-XML",
        name: "XML",
        description: "Support for binding to XML.",
        depends: ["data.xml"]
    }]
};

const kendo = window.kendo || (window.kendo = {});
const data = kendo.data || (kendo.data = {});

dataRegistry.setReaders(data.readers);
dataRegistry.setSchemas(data.schemas);
dataRegistry.setTransports(data.transports);

Object.defineProperty(data, "readers", {
    get() {
        return dataRegistry.readers;
    },
    set(value) {
        dataRegistry.setReaders(value);
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(data, "schemas", {
    get() {
        return dataRegistry.schemas;
    },
    set(value) {
        dataRegistry.setSchemas(value);
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(data, "transports", {
    get() {
        return dataRegistry.transports;
    },
    set(value) {
        dataRegistry.setTransports(value);
    },
    enumerable: true,
    configurable: true
});

$.extend(data, {
    readers: {
        json: DataReader
    },
    Query,
    DataSource,
    HierarchicalDataSource,
    Node,
    Comparer,
    ObservableObject,
    ObservableArray,
    LazyObservableArray,
    LocalTransport,
    RemoteTransport,
    AISmartPasteTransport,
    AiTransport,
    Cache,
    DataReader,
    Model
});

export * from "./data/index.js";

export default kendo;
