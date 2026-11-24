import { CHANGE, ERROR, ITEMLOAD, ITEMSLOADED, extend, isFunction, slice } from "./common.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { propertyAccessService } from "../core/services/property-access.service.js";
import { DataSource } from "./data-source.js";
import { Model } from "./model.js";
import { Query, normalizeFilter } from "./query.js";
import { inferList } from "./utils/infer.js";
const dataSourceFn = DataSource.fn;
const modelFn = Model.fn;
export const Node = Model.define({
    idField: "id",
    init: function (value) {
        const that = this;
        let hasChildren = that.hasChildren || (value && value.hasChildren);
        let childrenField = "items";
        let childrenOptions = {
            schema: {
                data: childrenField,
                model: {
                    hasChildren: hasChildren,
                    id: that.idField,
                    fields: that.fields
                }
            }
        };
        modelFn.init.call(that, value);
        if (typeof that.children === "string") {
            childrenField = that.children;
        }
        childrenOptions = {
            schema: {
                data: childrenField,
                model: {
                    hasChildren: hasChildren,
                    id: that.idField,
                    fields: that.fields
                }
            }
        };
        if (typeof that.children !== "string") {
            extend(childrenOptions, that.children);
        }
        childrenOptions.data = value;
        if (!hasChildren) {
            hasChildren = childrenOptions.schema.data;
        }
        if (typeof hasChildren === "string") {
            hasChildren = propertyAccessService.getter(hasChildren);
        }
        if (isFunction(hasChildren)) {
            const hasChildrenObject = hasChildren.call(that, that);
            if (hasChildrenObject && hasChildrenObject.length === 0) {
                that.hasChildren = false;
            }
            else {
                that.hasChildren = !!hasChildrenObject;
            }
        }
        that._childrenOptions = childrenOptions;
        if (that.hasChildren) {
            that._initChildren?.();
        }
        that._loaded = !!(value && value._loaded);
    },
    _initChildren: function () {
        const that = this;
        let children;
        let transport;
        let parameterMap;
        if (!(that.children instanceof HierarchicalDataSource)) {
            children = new HierarchicalDataSource(that._childrenOptions);
            that.children = children;
            transport = children.transport;
            parameterMap = transport.parameterMap;
            transport.parameterMap = function (data, type) {
                data[that.idField || "id"] = that.id;
                if (parameterMap) {
                    data = parameterMap.call(that, data, type);
                }
                return data;
            };
            children.parent = function () {
                return that;
            };
            children.bind(CHANGE, function (e) {
                e.node = e.node || that;
                that.trigger(CHANGE, e);
            });
            children.bind(ERROR, function (e) {
                const collection = that.parent();
                if (collection) {
                    e.node = e.node || that;
                    collection.trigger(ERROR, e);
                }
            });
            children.bind(ITEMSLOADED, function (e) {
                const collection = that.parent();
                if (collection) {
                    collection.trigger(ITEMSLOADED, e);
                }
            });
            that._updateChildrenField();
        }
    },
    append: function (model) {
        this._initChildren?.();
        this.loaded(true);
        this.children.add(model);
    },
    hasChildren: false,
    level: function () {
        let parentNode = this.parentNode();
        let level = 0;
        while (parentNode && parentNode.parentNode) {
            level++;
            parentNode = parentNode.parentNode ? parentNode.parentNode() : null;
        }
        return level;
    },
    _updateChildrenField: function () {
        const fieldName = this._childrenOptions.schema.data;
        this[fieldName || "items"] = this.children.data();
    },
    _childrenLoaded: function () {
        this._loaded = true;
        this._loading = false;
        this._loadingPromise = null;
        this._updateChildrenField();
    },
    load: function () {
        const options = {};
        let method = "_query";
        let children;
        let promise;
        if (this.loading()) {
            return this._loadingPromise || $.Deferred().resolve().promise();
        }
        if (this.hasChildren) {
            this._initChildren?.();
            children = this.children;
            options[this.idField || "id"] = this.id;
            if (!this._loaded) {
                children._data = undefined;
                method = "read";
                this.loading(true);
            }
            children.one(CHANGE, (this._childrenLoaded.bind(this)));
            if (this._matchFilter) {
                options.filter = {
                    field: "_matchFilter",
                    operator: "eq",
                    value: true
                };
            }
            promise = children[method](options);
            if (!this._loaded) {
                this._loadingPromise = promise;
                this.trigger(ITEMLOAD, {
                    promise: promise,
                    node: this
                });
            }
        }
        else {
            this.loaded(true);
        }
        return promise || $.Deferred().resolve().promise();
    },
    parentNode: function () {
        const array = this.parent();
        return array ? array.parent() : null;
    },
    loaded: function (value) {
        if (value !== undefined) {
            this._loaded = value;
            this.loading(false);
        }
        else {
            return this._loaded;
        }
    },
    loading: function (value) {
        if (value !== undefined) {
            this._loading = value;
        }
        else {
            return this._loading || false;
        }
    },
    shouldSerialize: function (field) {
        return modelFn.shouldSerialize.call(this, field) && field !== "children" && field !== "_loaded" && field !== "hasChildren" && field !== "_childrenOptions";
    }
});
export function dataMethod(name) {
    return function (...args) {
        const data = this._data;
        const result = dataSourceFn[name].apply(this, slice.call(args));
        if (this._data != data) {
            this._attachBubbleHandlers();
        }
        return result;
    };
}
export class HierarchicalDataSource extends DataSource {
    static create = function (options) {
        options = options && options.push ? {
            data: options
        } : options;
        const dataSource = (options || {});
        let data = dataSource.data;
        const fields = dataSource.fields;
        const list = dataSource.list;
        if (data && data._dataSource) {
            return data._dataSource;
        }
        if (!data && fields && !dataSource.transport) {
            if (list) {
                data = inferList(list, fields);
            }
        }
        dataSource.data = data;
        return dataSource instanceof HierarchicalDataSource ? dataSource : new HierarchicalDataSource(dataSource);
    };
    static success = dataMethod("success");
    static data = dataMethod("data");
    constructor(options) {
        super();
        if (this.init === HierarchicalDataSource.prototype.init) {
            this.init(options);
        }
    }
    init(options) {
        const dataSourceOptions = (options || {});
        const node = Node.define({
            children: dataSourceOptions
        });
        if (dataSourceOptions.filter && !dataSourceOptions.serverFiltering) {
            this._hierarchicalFilter = dataSourceOptions.filter;
            delete dataSourceOptions.filter;
        }
        super.init(extend(true, {}, {
            schema: {
                modelBase: node,
                model: node
            }
        }, dataSourceOptions));
        this._attachBubbleHandlers();
    }
    loading() {
        if (this._data) {
            return this._data.loading() || this._childrenLoading();
        }
        return false;
    }
    read(data) {
        const result = super.read(data);
        if (this._hierarchicalFilter) {
            if (this._data && this._data.length > 0) {
                this.filter(this._hierarchicalFilter);
            }
            else {
                this.options.filter = this._hierarchicalFilter || undefined;
                this._filter = normalizeFilter(this.options.filter);
                this._hierarchicalFilter = null;
            }
        }
        return result;
    }
    remove(node) {
        const hierarchicalNode = node;
        const parentNode = hierarchicalNode.parentNode();
        let dataSource = this;
        let result;
        if (parentNode && parentNode._initChildren) {
            dataSource = parentNode.children;
        }
        result = dataSourceFn.remove.call(dataSource, hierarchicalNode);
        if (parentNode && !(dataSource.data() || []).length) {
            parentNode.hasChildren = false;
        }
        return result;
    }
    insert(index, model) {
        const parentNode = this.parent();
        if (parentNode && parentNode._initChildren) {
            parentNode.hasChildren = true;
            parentNode._initChildren();
        }
        return super.insert(index, model);
    }
    filter(val) {
        if (val === undefined) {
            return this._filter;
        }
        if (!this.options.serverFiltering && this._markHierarchicalQuery(val)) {
            val = Array.isArray(val) ? [{
                    logic: "or",
                    filters: [...val, {
                            field: "_matchFilter",
                            operator: "equals",
                            value: true
                        }]
                }] : {
                logic: "or",
                filters: [val, {
                        field: "_matchFilter",
                        operator: "equals",
                        value: true
                    }]
            };
        }
        this.trigger("reset");
        this._query({
            filter: val,
            page: 1
        });
    }
    get(id) {
        return this._find("get", id);
    }
    getByUid(uid) {
        return this._find("getByUid", uid);
    }
    _attachBubbleHandlers() {
        const that = this;
        that._data.bind(ERROR, function (e) {
            that.trigger(ERROR, e);
        });
        that._data.bind(ITEMSLOADED, function (e) {
            that.trigger(ITEMSLOADED, e);
        });
    }
    _childrenLoading() {
        let isLoading = false;
        this._data.forEach(function (node) {
            const current = node;
            if (current.hasChildren && current.children instanceof HierarchicalDataSource && current.children.loading()) {
                isLoading = true;
            }
        });
        return isLoading;
    }
    _markHierarchicalQuery(expressions) {
        let compiled;
        const accentFoldingFiltering = this.options.accentFoldingFiltering;
        expressions = accentFoldingFiltering ? $.extend({}, normalizeFilter(expressions), {
            accentFoldingFiltering: accentFoldingFiltering
        }) : normalizeFilter(expressions);
        if (!expressions || !expressions.filters?.length) {
            this._updateHierarchicalFilter(function () {
                return true;
            });
            return false;
        }
        compiled = Query.filterExpr(expressions, {
            noEval: true
        });
        this._updateHierarchicalFilter(compiled);
        return true;
    }
    _updateHierarchicalFilter(filter) {
        let idx;
        let current;
        const data = this._data;
        let result = false;
        for (idx = 0; idx < data.length; idx++) {
            current = data[idx];
            if (current.hasChildren) {
                current._matchFilter = current.children._updateHierarchicalFilter(filter);
                if (!current._matchFilter) {
                    current._matchFilter = filter(current);
                }
            }
            else {
                current._matchFilter = filter(current);
            }
            if (current._matchFilter) {
                result = true;
            }
        }
        return result;
    }
    _find(method, value) {
        let idx;
        let length;
        let node;
        let children;
        let data = this._data;
        if (!data) {
            return;
        }
        node = dataSourceFn[method].call(this, value);
        if (node) {
            return node;
        }
        data = this._flatData(this._data);
        for (idx = 0, length = data.length; idx < length; idx++) {
            children = data[idx].children;
            if (!(children instanceof HierarchicalDataSource)) {
                continue;
            }
            node = children[method](value);
            if (node) {
                return node;
            }
        }
    }
}
HierarchicalDataSource.prototype.success = HierarchicalDataSource.success;
HierarchicalDataSource.prototype.data = HierarchicalDataSource.data;
HierarchicalDataSource.applyEnumerablePrototype();
HierarchicalDataSource.applyPrototypeMembers();
