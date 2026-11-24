import { each, extend, isArray, isPlainObject } from "./common.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { propertyAccessService } from "../core/services/property-access.service.js";
import { Class } from "../core/base/class.js";
import { utilsService } from "../core/services/utils.service.js";
import { Model } from "./model.js";
const map = $.map;
const getter = propertyAccessService.getter.bind(propertyAccessService);
function isXmlModelConstructor(value) {
    return typeof value === "function" && "define" in value;
}
function isXmlModelFieldDefinition(value) {
    return isPlainObject(value);
}
export class XmlDataReader extends Class {
    constructor(options) {
        super();
        if (this.init === XmlDataReader.prototype.init) {
            this.init(options);
        }
    }
    init(options = {}) {
        const that = this;
        let total = options.total;
        let model = options.model;
        const parse = options.parse;
        let errors = options.errors;
        const serialize = options.serialize;
        let data = options.data;
        if (model) {
            if (isPlainObject(model)) {
                const base = (options.modelBase || Model);
                const modelSchema = model;
                if (modelSchema.fields) {
                    each(modelSchema.fields, function (field, value) {
                        if (isXmlModelFieldDefinition(value) && value.field) {
                            if (!utilsService.isFunction(value.field)) {
                                value = extend(value, {
                                    field: that.getter(value.field)
                                });
                            }
                        }
                        else {
                            value = {
                                field: that.getter(String(value))
                            };
                        }
                        modelSchema.fields[field] = value;
                    });
                }
                const id = modelSchema.id;
                if (id) {
                    const idField = {};
                    idField[that.xpathToMember(id, true)] = {
                        field: that.getter(id)
                    };
                    modelSchema.fields = extend(idField, modelSchema.fields);
                    modelSchema.id = that.xpathToMember(id);
                }
                model = base.define(modelSchema);
            }
            if (isXmlModelConstructor(model)) {
                that.model = model;
            }
        }
        if (total) {
            if (typeof total == "string") {
                const totalGetter = that.getter(total);
                that.total = function (data) {
                    return parseInt(String(totalGetter(data)), 10);
                };
            }
            else if (typeof total == "function") {
                that.total = total;
            }
        }
        if (errors) {
            if (typeof errors == "string") {
                const errorsGetter = that.getter(errors);
                that.errors = function (data) {
                    return errorsGetter(data) || null;
                };
            }
            else if (typeof errors == "function") {
                that.errors = errors;
            }
        }
        if (data) {
            if (typeof data == "string") {
                const dataPath = that.xpathToMember(data);
                that.data = function (value) {
                    let result = that.evaluate(value, dataPath);
                    let modelInstance;
                    result = isArray(result) ? result : [result];
                    if (that.model && that.model.fields) {
                        modelInstance = new that.model();
                        return map(result, function (value) {
                            if (value) {
                                const record = {};
                                const fields = that.model.fields;
                                let field;
                                for (field in fields) {
                                    const fieldDefinition = fields[field];
                                    if (fieldDefinition) {
                                        record[field] = modelInstance._parse(field, fieldDefinition.field(value));
                                    }
                                }
                                return record;
                            }
                        });
                    }
                    return result;
                };
            }
            else if (typeof data == "function") {
                that.data = data;
            }
        }
        if (typeof parse == "function") {
            const xmlParse = that.parse;
            that.parse = function (data) {
                const xml = parse.call(that, data);
                return xmlParse.call(that, xml);
            };
        }
        if (typeof serialize == "function") {
            that.serialize = serialize;
        }
    }
    total(result) {
        const data = this.data(result);
        return isArray(data) ? data.length : 0;
    }
    errors(data) {
        return data?.errors || null;
    }
    serialize(data) {
        return data;
    }
    parseDOM(element) {
        const result = {};
        let parsedNode;
        let node;
        let nodeType;
        let nodeName;
        let member;
        let attribute;
        const attributes = element.attributes;
        const attributeCount = attributes.length;
        let idx;
        for (idx = 0; idx < attributeCount; idx++) {
            attribute = attributes[idx];
            result["@" + attribute.nodeName] = attribute.nodeValue;
        }
        for (node = element.firstChild; node; node = node.nextSibling) {
            nodeType = node.nodeType;
            if (nodeType === 3 || nodeType === 4) {
                result["#text"] = node.nodeValue;
            }
            else if (nodeType === 1) {
                parsedNode = this.parseDOM(node);
                nodeName = node.nodeName;
                member = result[nodeName];
                if (isArray(member)) {
                    member.push(parsedNode);
                }
                else if (member !== undefined) {
                    member = [member, parsedNode];
                }
                else {
                    member = parsedNode;
                }
                result[nodeName] = member;
            }
        }
        return result;
    }
    evaluate(value, expression) {
        const members = expression.split(".");
        let member;
        let result;
        let length;
        let intermediateResult;
        let idx;
        while ((member = members.shift())) {
            value = value[member];
            if (isArray(value)) {
                result = [];
                expression = members.join(".");
                for (idx = 0, length = value.length; idx < length; idx++) {
                    intermediateResult = this.evaluate(value[idx], expression);
                    intermediateResult = isArray(intermediateResult) ? intermediateResult : [intermediateResult];
                    result.push.apply(result, intermediateResult);
                }
                return result;
            }
        }
        return value;
    }
    parse(xml) {
        let documentElement;
        let tree;
        const result = {};
        documentElement = typeof xml === "string" ? $.parseXML(xml).documentElement : xml.documentElement;
        tree = this.parseDOM(documentElement);
        result[documentElement.nodeName] = tree;
        return result;
    }
    xpathToMember(member, raw) {
        if (!member) {
            return "";
        }
        member = member.replace(/^\//, "").replace(/\//g, ".");
        if (member.indexOf("@") >= 0) {
            return member.replace(/\.?(@.*)/, raw ? "$1" : '["$1"]');
        }
        if (member.indexOf("text()") >= 0) {
            return member.replace(/(\.?text\(\))/, raw ? "#text" : '["#text"]');
        }
        return member;
    }
    getter(member) {
        return getter(this.xpathToMember(member), true);
    }
}
XmlDataReader.applyEnumerablePrototype();
XmlDataReader.applyPrototypeMembers();
