import { dataRegistry } from "./data/registry.js";
import { XmlDataReader } from "./data/xml-data-reader.js";

export const __meta__ = {
    id: "data.xml",
    name: "XML",
    category: "framework",
    depends: ["core"],
    hidden: true
};

const kendo = window.kendo || (window.kendo = {});
const data = kendo.data || (kendo.data = {});

dataRegistry.register({
    readers: {
        xml: XmlDataReader
    }
});

data.XmlDataReader = XmlDataReader;

export default kendo;
