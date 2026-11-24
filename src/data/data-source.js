import { CHANGE, ERROR, PROGRESS, REQUESTEND, REQUESTSTART, SYNC, each, extend, isArray, isEmptyObject, isFunction, math, noop, slice, splice, stringify } from "./common.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { Observable } from "../core/base/observable.js";
import { utilsService } from "../core/services/utils.service.js";
import { Query, hasNotFetchedItems, isNumber, normalizeAggregate, normalizeFilter, normalizeGroup, normalizeGroupWithoutCompare, normalizeSort, sortFields, toJSON } from "./query.js";
import { Model } from "./model.js";
import { ObservableArray } from "./observable-array.js";
import { LazyObservableArray } from "./lazy-observable-array.js";
import { ObservableObject } from "./observable-object.js";
import { dataRegistry } from "./registry.js";
import { LocalTransport } from "./transports/local.transport.js";
import { RemoteTransport } from "./transports/remote.transport.js";
import { convertDescriptorsField, convertFilterDescriptorsField, convertHighlightDescriptors } from "./utils/descriptors.js";
import { eachGroupItems, fillLastGroup, flattenGroups, mergeGroups, wrapGroupItems } from "./utils/groups.js";
import { inferSelect, inferTable } from "./utils/infer.js";
import { indexOfModel, indexOfPristineModel, removeModel, replaceWithObservable } from "./utils/ranges.js";
export class DataSource extends Observable {
    static create = function (options) {
        if (isArray(options) || options instanceof ObservableArray) {
            options = {
                data: options
            };
        }
        const dataSource = (options || {});
        let data = dataSource.data;
        const fields = dataSource.fields;
        let table = dataSource.table;
        let select = dataSource.select;
        let idx;
        let length;
        const model = {};
        let field;
        if (!data && fields && !dataSource.transport) {
            if (table) {
                data = inferTable(table, fields);
            }
            else if (select) {
                data = inferSelect(select, fields);
                const firstItem = data[0];
                if (dataSource.group === undefined && firstItem && firstItem.optgroup !== undefined) {
                    dataSource.group = "optgroup";
                }
            }
        }
        if (Model && fields && (!dataSource.schema || !dataSource.schema.model)) {
            for (idx = 0, length = fields.length; idx < length; idx++) {
                field = fields[idx];
                if (field?.type && field.field) {
                    model[field.field] = field;
                }
            }
            if (!isEmptyObject(model)) {
                dataSource.schema = extend(true, dataSource.schema, {
                    model: {
                        fields: model
                    }
                });
            }
        }
        dataSource.data = data;
        select = null;
        dataSource.select = null;
        table = null;
        dataSource.table = null;
        return dataSource instanceof DataSource ? dataSource : new DataSource(dataSource);
    };
    static parent = noop;
    static _syncEnd = noop;
    static _changesCanceled = noop;
    static _modelCanceled = noop;
    constructor(options) {
        super();
        if (this.init === DataSource.prototype.init) {
            this.init(options);
        }
    }
    init(options) {
        const that = this;
        let data;
        if (options) {
            data = options.data;
        }
        options = that.options = extend({}, that.options, options);
        options.schema = options.schema || {};
        options.schema.modelBase = options.schema.modelBase || Model;
        that._map = {};
        that._prefetch = {};
        that._data = [];
        that._pristineData = [];
        that._ranges = [];
        that._view = [];
        that._pristineTotal = 0;
        that._destroyed = [];
        that._pageSize = options.pageSize;
        that._page = options.page || (options.pageSize ? 1 : undefined);
        that._sort = normalizeSort(options.sort);
        that._sortFields = sortFields(options.sort);
        that._filter = normalizeFilter(options.filter);
        that._group = normalizeGroup(options.group);
        that._aggregate = options.aggregate ? normalizeAggregate(options.aggregate) : undefined;
        that._total = options.total || 0;
        that._groupPaging = options.groupPaging;
        if (that._groupPaging) {
            that._groupsState = {};
        }
        that._shouldDetachObservableParents = true;
        super.init();
        that.transport = dataRegistry.createTransport(options, data, that);
        if (isFunction(that.transport.push)) {
            that.transport.push({
                pushCreate: that._pushCreate.bind(that),
                pushUpdate: that._pushUpdate.bind(that),
                pushDestroy: that._pushDestroy.bind(that)
            });
        }
        if (options.offlineStorage != null) {
            if (typeof options.offlineStorage == "string") {
                const key = options.offlineStorage;
                that._storage = {
                    getItem: function () {
                        return JSON.parse(localStorage.getItem(key) || "null");
                    },
                    setItem: function (item) {
                        localStorage.setItem(key, stringify(that.reader.serialize(item)));
                    }
                };
            }
            else {
                that._storage = options.offlineStorage;
            }
        }
        that.reader = dataRegistry.createReader(options.schema.type || "json", options.schema);
        that._detachObservableParents();
        that._data = that._observe(that._data);
        that._online = true;
        that.bind(["push", ERROR, CHANGE, REQUESTSTART, SYNC, REQUESTEND, PROGRESS], options);
    }
    clone() {
        return this;
    }
    online(value) {
        if (value !== undefined) {
            if (this._online != value) {
                this._online = value;
                if (value) {
                    return this.sync();
                }
            }
            return $.Deferred().resolve().promise();
        }
        else {
            return this._online;
        }
    }
    offlineData(state) {
        if (this.options.offlineStorage == null) {
            return null;
        }
        if (state !== undefined) {
            return this._storage?.setItem(state);
        }
        return this._storage?.getItem() || [];
    }
    get(id) {
        let idx;
        let length;
        const data = this._flatData(this._data, this.options.useRanges);
        if (!data) {
            return;
        }
        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].id == id) {
                return data[idx];
            }
        }
    }
    getByUid(id) {
        return this._getByUid(id, this._data);
    }
    indexOf(model) {
        return indexOfModel(this._data, model);
    }
    at(index) {
        return this._data.at(index);
    }
    data(value) {
        let idx;
        const that = this;
        if (value !== undefined) {
            that._detachObservableParents();
            that._data = this._observe(value);
            that._pristineData = value.slice(0);
            that._storeData();
            that._ranges = [];
            that.trigger("reset");
            that._addRange(that._data);
            that._total = that._data.length;
            that._pristineTotal = that._total;
            that._process(that._data);
        }
        else {
            if (that._data) {
                for (idx = 0; idx < that._data.length; idx++) {
                    that._data.at(idx);
                }
            }
            return that._data;
        }
    }
    view(value) {
        if (value === undefined) {
            return this._view;
        }
        else {
            this._view = this._observeView(value);
        }
    }
    flatView() {
        const groups = this.group() || [];
        if (groups.length) {
            return flattenGroups(this._view);
        }
        else {
            return this._view;
        }
    }
    add(model) {
        return this.insert(this._data.length, model);
    }
    insert(index, model) {
        if (!model) {
            model = index;
            index = 0;
        }
        const item = model instanceof Model ? model : this._createNewModel(model);
        if (this._isServerGrouped()) {
            this._data.splice(index, 0, this._wrapInEmptyGroup(item));
        }
        else {
            this._data.splice(index, 0, item);
        }
        this._insertModelInRange(index, item);
        return item;
    }
    pushInsert(index, items) {
        let idx;
        const that = this;
        const rangeSpan = that._getCurrentRangeSpan();
        if (!items) {
            items = index;
            index = 0;
        }
        if (!isArray(items)) {
            items = [items];
        }
        const pushed = [];
        const autoSync = this.options.autoSync;
        this.options.autoSync = false;
        try {
            const values = items;
            for (idx = 0; idx < values.length; idx++) {
                const item = values[idx];
                const result = this.insert(index, item);
                pushed.push(result);
                let pristine = result.toJSON();
                if (this._isServerGrouped()) {
                    pristine = this._wrapInEmptyGroup(pristine);
                }
                this._pristineData.push(pristine);
                if (rangeSpan && rangeSpan.length) {
                    const lastRange = rangeSpan[rangeSpan.length - 1];
                    lastRange?.pristineData.push(pristine);
                }
                index++;
            }
        }
        finally {
            this.options.autoSync = autoSync;
        }
        if (pushed.length) {
            this.trigger("push", {
                type: "create",
                items: pushed
            });
        }
    }
    pushCreate(items) {
        this.pushInsert(this._data.length, items);
    }
    pushUpdate(items) {
        let idx;
        const dataItems = (isArray(items) ? items : [items]);
        const pushed = [];
        for (idx = 0; idx < dataItems.length; idx++) {
            const item = dataItems[idx];
            const model = this._createNewModel(item);
            const target = this.get(model.id);
            if (target) {
                pushed.push(target);
                target.accept(item);
                target.trigger?.(CHANGE);
                this._updatePristineForModel(target, item);
            }
            else {
                this.pushCreate(item);
            }
        }
        if (pushed.length) {
            this.trigger("push", {
                type: "update",
                items: pushed
            });
        }
    }
    pushDestroy(items) {
        const pushed = this._removeItems(items);
        if (pushed.length) {
            this.trigger("push", {
                type: "destroy",
                items: pushed
            });
        }
    }
    pushMove(index, items) {
        const pushed = this._moveItems(index, items);
        if (pushed.length) {
            this.trigger("push", {
                type: "update",
                items: pushed
            });
        }
    }
    remove(model) {
        let result;
        const that = this;
        const hasGroups = that._isServerGrouped();
        if (hasGroups && model.uid && (!model.isNew || !model.isNew())) {
            that._pushInDestroyed(model);
        }
        this._eachItem(that._data, function (items) {
            result = removeModel(items, model);
            if (result && hasGroups) {
                return true;
            }
        });
        this._removeModelFromRanges(model);
        return model;
    }
    destroyed() {
        return this._destroyed;
    }
    created() {
        let idx;
        let length;
        const result = [];
        const data = this._flatData(this._data, this.options.useRanges);
        if (!data) {
            return result;
        }
        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].isNew?.() && !data[idx].notFetched) {
                result.push(data[idx]);
            }
        }
        return result;
    }
    updated() {
        let idx;
        let length;
        const result = [];
        const data = this._flatData(this._data, this.options.useRanges);
        if (!data) {
            return result;
        }
        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].isNew && !data[idx].isNew?.() && data[idx].dirty) {
                result.push(data[idx]);
            }
        }
        return result;
    }
    sync() {
        const that = this;
        let created = [];
        let updated = [];
        let destroyed;
        that._destroyed = that._destroyed.filter(item => !item.hasOwnProperty("_isMoved"));
        destroyed = that._destroyed;
        let promise = $.Deferred().resolve().promise();
        if (that.online()) {
            if (!that.reader.model) {
                return promise;
            }
            created = that.created();
            updated = that.updated();
            let promises = [];
            if (that.options.batch && that.transport.submit) {
                promises = that._sendSubmit(created, updated, destroyed).map(p => p.promise());
            }
            else {
                promises.push.apply(promises, that._send("create", created));
                promises.push.apply(promises, that._send("update", updated));
                promises.push.apply(promises, that._send("destroy", destroyed));
            }
            promise = $.when.apply(null, promises).then(function () {
                let idx;
                let length;
                const changedItems = [];
                for (idx = 0, length = arguments.length; idx < length; idx++) {
                    if (arguments[idx]) {
                        that._accept(arguments[idx]);
                        changedItems.push(...arguments[idx].models);
                    }
                }
                that._storeData(true);
                that._syncEnd();
                that._change({
                    action: "sync",
                    changedItems: changedItems
                });
                that.trigger(SYNC);
                if (that._isServerGroupPaged()) {
                    that.read();
                }
                that.data().map(function (item) {
                    if (item.hasOwnProperty("_isMoved")) {
                        delete item._isMoved;
                    }
                    return item;
                });
            });
        }
        else {
            that._storeData(true);
            that._syncEnd();
            that._change({
                action: "sync"
            });
        }
        return promise;
    }
    cancelChanges(model) {
        const that = this;
        if (model instanceof Model) {
            that._cancelModel(model);
        }
        else {
            that._destroyed = [];
            that._detachObservableParents();
            that._data = that._observe(that._pristineData);
            if (that.options.serverPaging) {
                that._total = that._pristineTotal;
            }
            that._ranges = [];
            that._addRange(that._data, 0);
            that._changesCanceled();
            that._change();
            that._markOfflineUpdatesAsDirty();
            if (that._isServerGrouped()) {
                that.read();
            }
        }
    }
    hasChanges() {
        let idx;
        let length;
        const data = this._flatData(this._data, this.options.useRanges);
        if (this._destroyed.length) {
            return true;
        }
        if (!data) {
            return false;
        }
        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].isNew?.() || data[idx].dirty) {
                return true;
            }
        }
        return false;
    }
    read(data) {
        const that = this;
        const params = that._params(data);
        const deferred = $.Deferred();
        that._queueRequest(params, function () {
            const isPrevented = that.trigger(REQUESTSTART, {
                type: "read"
            });
            if (!isPrevented) {
                that.trigger(PROGRESS);
                that._ranges = [];
                that.trigger("reset");
                if (that.online()) {
                    that.transport.read({
                        data: params,
                        success: function (data) {
                            that._ranges = [];
                            that.success(data, params);
                            deferred.resolve(undefined);
                        },
                        error: function () {
                            const args = slice.call(arguments);
                            that.error.apply(that, args);
                            deferred.reject.apply(deferred, args);
                        }
                    });
                }
                else if (that.options.offlineStorage != null) {
                    that.success(that.offlineData(), params);
                    deferred.resolve(undefined);
                }
            }
            else {
                that._dequeueRequest();
                deferred.resolve(isPrevented);
            }
        });
        return deferred.promise();
    }
    success(data, _params) {
        let j;
        let i;
        const that = this;
        const options = that.options;
        let items;
        let replaceSubset;
        let parsedData;
        that.trigger(REQUESTEND, {
            response: data,
            type: "read"
        });
        if (that.online()) {
            data = that.reader.parse(data);
            if (that._handleCustomErrors(data)) {
                that._dequeueRequest();
                return;
            }
            that._total = that.reader.total(data);
            if (that._isServerGroupPaged()) {
                that._serverGroupsTotal = that._total;
            }
            if ((that._pageSize ?? 0) > that._total) {
                that._pageSize = that._total;
                if (that.options.pageSize && that.options.pageSize > (that._pageSize ?? 0)) {
                    that._pageSize = that.options.pageSize;
                }
            }
            if (that._aggregate && options.serverAggregates) {
                that._aggregateResult = that._readAggregates(data);
            }
            parsedData = that._readData(data);
            that._destroyed = [];
        }
        else {
            parsedData = that._readData(data);
            items = [];
            const itemIds = {};
            const model = that.reader.model;
            const idField = model ? (model.idField || "id") : "id";
            let idx;
            for (idx = 0; idx < this._destroyed.length; idx++) {
                const id = this._destroyed[idx][idField];
                itemIds[String(id)] = id;
            }
            for (idx = 0; idx < parsedData.length; idx++) {
                const item = parsedData[idx];
                const state = item.__state__;
                if (state == "destroy") {
                    if (!itemIds[String(item[idField])]) {
                        this._pushInDestroyed(this._createNewModel(item));
                    }
                }
                else {
                    items.push(item);
                }
            }
            parsedData = items;
            that._total = parsedData.length;
        }
        that._pristineTotal = that._total;
        replaceSubset = that._skip && that._data.length && that._skip < that._data.length;
        if (that.options.endless) {
            if (replaceSubset) {
                that._pristineData.splice(that._skip ?? 0, that._pristineData.length);
            }
            items = parsedData.slice(0);
            for (j = 0; j < items.length; j++) {
                that._pristineData.push(items[j]);
            }
        }
        else {
            if (utilsService.isBlank(parsedData)) {
                parsedData = [];
            }
            that._pristineData = parsedData.slice(0);
        }
        that._detachObservableParents();
        if (that.options.endless) {
            that._data.unbind(CHANGE, that._changeHandler);
            if (that._isServerGrouped() && that._data[that._data.length - 1].value === parsedData[0]?.value) {
                fillLastGroup(that._data[that._data.length - 1], parsedData[0]);
                parsedData.shift();
            }
            const observedData = that._observe(parsedData);
            if (replaceSubset) {
                that._data.splice(that._skip ?? 0, that._data.length);
            }
            for (i = 0; i < observedData.length; i++) {
                that._data.push(observedData[i]);
            }
            that._data.bind(CHANGE, that._changeHandler);
        }
        else {
            that._data = that._observe(parsedData);
        }
        that._markOfflineUpdatesAsDirty();
        that._storeData();
        that._addRange(that._data);
        that._process(that._data);
        that._dequeueRequest();
    }
    error(xhr, status, errorThrown) {
        this._dequeueRequest();
        this.trigger(REQUESTEND, {});
        this.trigger(ERROR, {
            xhr: xhr,
            status: status,
            errorThrown: errorThrown
        });
    }
    query(options) {
        let result;
        options = options || {};
        const remote = this.options.serverSorting || this.options.serverPaging || this.options.serverFiltering || this.options.serverGrouping || this.options.serverAggregates;
        if (remote || ((this._data === undefined || this._data.length === 0) && !this._destroyed.length)) {
            if (this.options.endless) {
                let moreItemsCount = (options.pageSize || 0) - (this.pageSize() || 0);
                if (moreItemsCount > 0) {
                    moreItemsCount = this.pageSize() || 0;
                    options.page = (options.pageSize || 0) / moreItemsCount;
                    options.pageSize = moreItemsCount;
                }
                else {
                    options.page = 1;
                    this.options.endless = false;
                }
            }
            return this.read(this._mergeState(options));
        }
        const isPrevented = this.trigger(REQUESTSTART, {
            type: "read"
        });
        if (!isPrevented) {
            this.trigger(PROGRESS);
            if (options) {
                options.groupPaging = this._groupPaging;
            }
            result = this._queryProcess(this._data, this._mergeState(options));
            this._setFilterTotal(result.total, true);
            this._aggregateResult = this._calculateAggregates(result.dataToAggregate || this._data, options || {});
            this._setView(result, options);
            this.trigger(REQUESTEND, {
                type: "read"
            });
            this.trigger(CHANGE, {
                items: result.data,
                action: options ? options.action : ""
            });
        }
        return $.Deferred().resolve(isPrevented).promise();
    }
    getGroupItems(group, options, parents, callback, groupItemsSkip, page) {
        const that = this;
        let take;
        let filter;
        let data;
        let subgroups;
        if (!group.items) {
            group.items = [];
        }
        take = that.take() || 0;
        filter = this._composeItemsFilter(group, parents);
        data = {
            page: page || 1,
            pageSize: take,
            skip: groupItemsSkip,
            take: take,
            filter: filter,
            aggregate: that._aggregate,
            sort: that._sort
        };
        subgroups = that.findSubgroups(group);
        if (subgroups && subgroups.length) {
            data.group = subgroups;
        }
        data.groupPaging = true;
        that._queueWithTimeout(data, function () {
            if (!that.trigger(REQUESTSTART, {
                type: "read"
            })) {
                that.transport.read({
                    data: data,
                    success: that._groupItemsSuccessHandler(group, options.skip || 0, that.take() || 0, callback, groupItemsSkip),
                    error: function () {
                        const args = slice.call(arguments);
                        that.error.apply(that, args);
                    }
                });
            }
            else {
                that._dequeueRequest();
            }
        }, 100);
    }
    findSubgroups(group) {
        const indexOfCurrentGroup = this._group.map(function (g) {
            return g.field;
        }).indexOf(group.field);
        return this._group.slice(indexOfCurrentGroup + 1, this._group.length);
    }
    fetch(callback) {
        const that = this;
        const fn = function (isPrevented) {
            if (isPrevented !== true && isFunction(callback)) {
                callback.call(that);
            }
        };
        return this._query().done(fn);
    }
    next(options) {
        const that = this;
        let page = that.page();
        const total = that.total();
        options = options || {};
        if (!page || (total && page + 1 > that.totalPages())) {
            return;
        }
        that._skip = that._currentRangeStart = page * (that.take() || 0);
        page += 1;
        options.page = page;
        that._query(options);
        return page;
    }
    prev(options) {
        const that = this;
        let page = that.page();
        options = options || {};
        if (!page || page === 1) {
            return;
        }
        that._skip = that._currentRangeStart = (that._skip || 0) - (that.take() || 0);
        page -= 1;
        options.page = page;
        that._query(options);
        return page;
    }
    page(val) {
        const that = this;
        let skip;
        if (val !== undefined) {
            val = math.max(math.min(math.max(val, 1), that.totalPages()), 1);
            const take = that.take() || 0;
            if (that._isGroupPaged()) {
                val -= 1;
                that.range(val * take, take, undefined, "page");
                return;
            }
            that._query(that._pageableQueryOptions({
                page: val
            }));
            return;
        }
        skip = that.skip();
        return skip !== undefined ? math.round((skip || 0) / (that.take() || 1)) + 1 : undefined;
    }
    pageSize(val) {
        const that = this;
        if (val !== undefined) {
            that._query(that._pageableQueryOptions({
                pageSize: val,
                page: 1
            }));
            return;
        }
        return that.take();
    }
    sort(val) {
        const that = this;
        if (val !== undefined) {
            that.trigger("sort");
            that._query({
                sort: val
            });
            return;
        }
        return that._sort;
    }
    filter(val) {
        const that = this;
        if (val === undefined) {
            return that._filter;
        }
        that.trigger("reset");
        that._query({
            filter: val,
            page: 1
        });
    }
    group(val) {
        const that = this;
        const options = {
            group: val
        };
        if (that._groupPaging) {
            const groups = val;
            if (val !== undefined && (!groups || !groups.length)) {
                that._ranges = [];
            }
            options.page = 1;
        }
        if (val !== undefined) {
            that._query(options);
            return;
        }
        return that._group;
    }
    parseHighlightDescriptors(descriptors, idField = "id") {
        const data = (this._data ? this._flatData(this._data) : []) || [];
        if (!descriptors || !descriptors.length || !data.length) {
            return [];
        }
        const highlightDescriptors = convertHighlightDescriptors(data, descriptors, idField);
        return highlightDescriptors;
    }
    getGroupsFlat(data) {
        let idx;
        let result = [];
        let length;
        for (idx = 0, length = data.length; idx < length; idx++) {
            const group = data[idx];
            if (group.hasSubgroups) {
                result = result.concat(this.getGroupsFlat(group.items));
            }
            result.push(group);
        }
        return result;
    }
    total() {
        return Math.trunc(this._total || 0);
    }
    groupsTotal(includeExpanded) {
        const that = this;
        if (!that._group.length) {
            return that.total();
        }
        if (that._isServerGrouped()) {
            if (that._serverGroupsTotal) {
                return that._serverGroupsTotal;
            }
            that._serverGroupsTotal = that.total();
            return that._serverGroupsTotal;
        }
        return that._calculateGroupsTotal(that._ranges.length ? that._ranges[0].data : [], includeExpanded);
    }
    groupCount(group, includeExpanded, itemsField, ignoreState) {
        const that = this;
        let total = 0;
        const groupsState = that._groupsState || {};
        const groupItems = group[itemsField || "items"] || [];
        if (group.hasSubgroups && groupsState[group.uid || ""]) {
            if ((includeExpanded && !group.excludeHeader) || ignoreState) {
                total += 1;
            }
            groupItems.forEach(function (subgroup) {
                total += that.groupCount(subgroup, includeExpanded, itemsField, ignoreState);
            });
        }
        else {
            if (groupsState[group.uid || ""]) {
                if ((includeExpanded && !group.excludeHeader) || ignoreState) {
                    total++;
                }
                total += groupItems.length;
            }
            else {
                total++;
            }
        }
        return total;
    }
    countGroupRange(range) {
        let i;
        let total = 0;
        const length = range.length;
        for (i = 0; i < length; i++) {
            total += this.groupCount(range[i], true);
        }
        return total;
    }
    aggregate(val) {
        const that = this;
        if (val !== undefined) {
            that._query({
                aggregate: val
            });
            return;
        }
        return that._aggregate;
    }
    aggregates() {
        let result = this._aggregateResult;
        if (isEmptyObject(result)) {
            result = this._emptyAggregates(this.aggregate());
        }
        return result;
    }
    totalPages() {
        const that = this;
        const pageSize = that.pageSize() || that.total();
        const total = that._isGroupPaged() ? that.groupsTotal(true) : that.total();
        return math.ceil((total || 0) / pageSize);
    }
    inRange(skip, take) {
        const that = this;
        const end = math.min(skip + take, that.total());
        if (!that.options.serverPaging && that._data.length > 0) {
            return true;
        }
        return that._findRange(skip, end).length > 0;
    }
    lastRange() {
        const ranges = this._ranges;
        return (ranges[ranges.length - 1] || {
            start: 0,
            end: 0,
            data: []
        });
    }
    firstItemUid() {
        const ranges = this._ranges;
        return ranges.length && ranges[0].data.length && ranges[0].data[0].uid;
    }
    enableRequestsInProgress() {
        this._skipRequestsInProgress = false;
    }
    range(skip, take, callback, action) {
        this._currentRequestTimeStamp = this._timeStamp();
        this._skipRequestsInProgress = true;
        const total = this._isGroupPaged() ? this.groupsTotal(true) : this.total();
        take = take === undefined ? math.max(total - (skip || 0), 0) : take || 0;
        if (action === "expandGroup" || action === "collapseGroup") {
            this._updateOuterRangesLength();
        }
        skip = math.min(skip || 0, total);
        callback = isFunction(callback) ? callback : noop;
        const that = this;
        let pageSkip = math.max(math.floor(skip / take), 0) * take;
        let size = math.min(pageSkip + take, total);
        let data;
        data = that._findRange(skip, math.min(skip + take, total), callback);
        if ((data.length || total === 0) && !that._fetchingGroupItems) {
            that._processRangeData(data, skip, take, that._originalPageSkip || pageSkip, that._originalSize || size, {
                action: action
            });
            that._originalPageSkip = null;
            that._originalSize = null;
            callback();
            return;
        }
        if (that._isGroupPaged()) {
            that._originalPageSkip = pageSkip;
            that._originalSize = size;
            pageSkip = math.max(math.floor(that._adjustPageSkip(skip, take) / take), 0) * take;
            size = math.min(pageSkip + take, total);
        }
        if (take !== undefined && !that._fetchingGroupItems) {
            if ((that._isGroupPaged() && !that._groupRangeExists(pageSkip, take)) || !that._rangeExists(pageSkip, size)) {
                that.prefetch(pageSkip, take, function () {
                    if (skip > pageSkip && size < that.total() && !that._rangeExists(size, math.min(size + take, that.total()))) {
                        that.prefetch(size, take, function () {
                            that.range(skip, take, callback);
                        });
                    }
                    else {
                        that.range(skip, take, callback);
                    }
                });
            }
            else if (pageSkip < skip) {
                that.prefetch(size, take, function () {
                    that.range(skip, take, callback);
                });
            }
        }
    }
    skip() {
        const that = this;
        if (that._skip === undefined) {
            return that._page !== undefined ? (that._page - 1) * (that.take() || 1) : undefined;
        }
        return that._skip;
    }
    currentRangeStart() {
        return this._currentRangeStart || 0;
    }
    take() {
        return this._take || this._pageSize;
    }
    prefetch(skip, take, callback) {
        const that = this;
        const size = math.min(skip + take, that.total());
        const options = {
            take: take,
            skip: skip,
            page: skip / take + 1,
            pageSize: take,
            sort: that._sort,
            filter: that._filter,
            group: that._group,
            aggregate: that._aggregate
        };
        if (that._isGroupPaged() && !that._isServerGrouped() && that._groupRangeExists(skip, size)) {
            if (callback) {
                callback();
            }
            return;
        }
        if ((that._isServerGroupPaged() && !that._groupRangeExists(skip, size)) || !that._rangeExists(skip, size)) {
            that._queueWithTimeout(options, function () {
                if (!that.trigger(REQUESTSTART, {
                    type: "read"
                })) {
                    if (that._omitPrefetch) {
                        that.trigger(PROGRESS);
                    }
                    that.transport.read({
                        data: that._params(options),
                        success: that._prefetchSuccessHandler(skip, size, callback),
                        error: function () {
                            const args = slice.call(arguments);
                            that.error.apply(that, args);
                        }
                    });
                }
                else {
                    that._dequeueRequest();
                }
            }, 100);
        }
        else if (callback) {
            callback();
        }
    }
    isLocalTransport() {
        return this.transport instanceof LocalTransport;
    }
    isRemoteTransport() {
        return this.transport instanceof RemoteTransport;
    }
    _isGrouped() {
        const group = this.group() || [];
        return Boolean(group.length);
    }
    _isServerGrouped() {
        const group = this.group() || [];
        return Boolean(this.options.serverGrouping && group.length);
    }
    _isServerGroupPaged() {
        return this._isServerGrouped() && this._groupPaging;
    }
    _isGroupPaged() {
        const group = this._group || [];
        return Boolean(this._groupPaging && group.length);
    }
    _pushCreate(result) {
        this._push(result, "pushCreate");
    }
    _pushUpdate(result) {
        this._push(result, "pushUpdate");
    }
    _pushDestroy(result) {
        this._push(result, "pushDestroy");
    }
    _push(result, operation) {
        let data = this._readData(result);
        if (!data) {
            data = result;
        }
        this[operation](data);
    }
    _flatData(data, skip) {
        let idx;
        if (data) {
            if (this._isServerGrouped()) {
                return flattenGroups(data);
            }
            if (!skip) {
                for (idx = 0; idx < data.length; idx++) {
                    data.at(idx);
                }
            }
        }
        return data;
    }
    _getByUid(id, dataItems) {
        let idx;
        let length;
        const data = this._flatData(dataItems, this.options.useRanges);
        if (!data) {
            return;
        }
        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].uid == id) {
                return data[idx];
            }
        }
    }
    _observeView(data) {
        const that = this;
        replaceWithObservable(data, that._data, that._ranges, (that.reader.model || ObservableObject), Boolean(that._isServerGrouped()));
        const view = new LazyObservableArray(data, that.reader.model);
        view.parent = function () {
            return that.parent();
        };
        return view;
    }
    _createNewModel(model) {
        if (this.reader.model) {
            return new this.reader.model(model);
        }
        if (model instanceof ObservableObject) {
            return model;
        }
        return new ObservableObject(model);
    }
    _removeItems(itemsToRemove, removePristine) {
        let idx;
        const items = (isArray(itemsToRemove) ? itemsToRemove : [itemsToRemove]);
        const shouldRemovePristine = typeof removePristine !== "undefined" ? removePristine : true;
        const destroyed = [];
        const autoSync = this.options.autoSync;
        this.options.autoSync = false;
        try {
            for (idx = 0; idx < items.length; idx++) {
                const item = items[idx];
                const model = this._createNewModel(item);
                let found = false;
                const index = idx;
                this._eachItem(this._data, function (collectionItems) {
                    const collection = collectionItems;
                    let idx;
                    if (index !== items.length - 1) {
                        collection.omitChangeEvent = true;
                        collection.omitCache = collection.omitCache || [];
                    }
                    else {
                        collection.omitChangeEvent = false;
                    }
                    for (idx = 0; idx < collection.length; idx++) {
                        const item = collection.at(idx);
                        if (item.id === model.id) {
                            if (collection.omitChangeEvent) {
                                collection.omitCache?.push(item);
                            }
                            destroyed.push(item);
                            collection.splice(idx, 1);
                            found = true;
                            break;
                        }
                    }
                });
                if (found && shouldRemovePristine) {
                    this._removePristineForModel(model);
                    this._destroyed.pop();
                }
            }
        }
        finally {
            this.options.autoSync = autoSync;
        }
        return destroyed;
    }
    _moveItems(index, items) {
        let i;
        const itemsToMove = (isArray(items) ? items : [items]);
        const moved = [];
        const autoSync = this.options.autoSync;
        this.options.autoSync = false;
        try {
            for (i = 0; i < itemsToMove.length; i++) {
                const item = itemsToMove[i];
                this._eachItem(this._data, function (dataItems) {
                    const collection = dataItems;
                    let idx;
                    for (idx = 0; idx < collection.length; idx++) {
                        const dataItem = collection.at(idx);
                        if (dataItem.uid === item.uid) {
                            moved.push(dataItem);
                            collection.splice(index >= idx ? --index : index, 0, collection.splice(idx, 1)[0]);
                            index++;
                            break;
                        }
                    }
                });
            }
        }
        finally {
            this.options.autoSync = autoSync;
        }
        return moved;
    }
    _markOfflineUpdatesAsDirty() {
        const that = this;
        if (that.options.offlineStorage != null) {
            that._eachItem(that._data, function (items) {
                const collection = items;
                let idx;
                for (idx = 0; idx < collection.length; idx++) {
                    const item = collection.at(idx);
                    if (item.__state__ == "update" || item.__state__ == "create") {
                        item.dirty = true;
                    }
                }
            });
        }
    }
    _accept(result) {
        const that = this;
        const models = result.models;
        let response = result.response;
        let idx = 0;
        const serverGroup = that._isServerGrouped();
        const pristine = that._pristineData;
        const type = result.type;
        let length;
        let responseData;
        that.trigger(REQUESTEND, {
            response: response,
            type: type
        });
        if (response && !isEmptyObject(response)) {
            response = that.reader.parse(response);
            if (that._handleCustomErrors(response)) {
                return;
            }
            response = that.reader.data(response);
            if (!isArray(response)) {
                response = [response];
            }
        }
        else {
            response = $.map(models, function (model) {
                return model.toJSON();
            });
        }
        responseData = response;
        if (type === "destroy") {
            that._destroyed = [];
        }
        for (idx = 0, length = models.length; idx < length; idx++) {
            if (type !== "destroy") {
                models[idx].accept(responseData[idx]);
                if (type === "create") {
                    pristine.push(serverGroup ? that._wrapInEmptyGroup(models[idx].toJSON()) : responseData[idx]);
                }
                else if (type === "update") {
                    that._updatePristineForModel(models[idx], responseData[idx]);
                }
            }
            else {
                that._removePristineForModel(models[idx]);
            }
        }
    }
    _updatePristineForModel(model, values) {
        this._executeOnPristineForModel(model, function (index, items) {
            utilsService.deepExtend(items[index], values);
        });
    }
    _executeOnPristineForModel(model, callback) {
        this._eachPristineItem(function (items) {
            const index = indexOfPristineModel(items, model);
            if (index > -1) {
                callback(index, items);
                return true;
            }
        });
    }
    _removePristineForModel(model) {
        this._executeOnPristineForModel(model, function (index, items) {
            items.splice(index, 1);
        });
    }
    _readData(data) {
        let read = !this._isServerGrouped() ? this.reader.data : this.reader.groups;
        return read.call(this.reader, data);
    }
    _eachPristineItem(callback) {
        const that = this;
        const options = that.options;
        const rangeSpan = that._getCurrentRangeSpan();
        that._eachItem(that._pristineData, callback);
        if (options.serverPaging && options.useRanges) {
            each(rangeSpan, function (_index, range) {
                that._eachItem(range.pristineData, callback);
            });
        }
    }
    _eachItem(data, callback) {
        if (data && data.length) {
            if (this._isServerGrouped()) {
                eachGroupItems(data, callback);
            }
            else {
                callback(data);
            }
        }
    }
    _pristineForModel(model) {
        let pristine;
        let idx;
        const callback = function (items) {
            idx = indexOfPristineModel(items, model);
            if (idx > -1) {
                pristine = items[idx];
                return true;
            }
        };
        this._eachPristineItem(callback);
        return pristine;
    }
    _cancelModel(model) {
        const that = this;
        const pristine = this._pristineForModel(model);
        this._eachItem(this._data, function (items) {
            const collection = items;
            const idx = indexOfModel(collection, model);
            if (idx >= 0) {
                if (pristine && (!model.isNew || !model.isNew() || pristine.__state__)) {
                    collection[idx].accept(pristine);
                    if (pristine.__state__ == "update") {
                        collection[idx].dirty = true;
                    }
                }
                else {
                    that._modelCanceled(model);
                    collection.splice(idx, 1);
                    that._removeModelFromRanges(model);
                }
            }
        });
    }
    _submit(promises, data) {
        const that = this;
        that.trigger(REQUESTSTART, {
            type: "submit"
        });
        that.trigger(PROGRESS);
        that.transport.submit?.({
            data: data,
            success: function (response, type) {
                const promise = $.grep(promises, function (x) {
                    return x.type == type;
                })[0];
                if (promise) {
                    promise.resolve({
                        response: response,
                        models: promise.models,
                        type: type
                    });
                }
            },
            error: function (response, status, error) {
                let idx;
                for (idx = 0; idx < promises.length; idx++) {
                    promises[idx].reject(response);
                }
                that.error(response, status, error);
            }
        });
    }
    _sendSubmit(created, updated, destroyed) {
        const that = this;
        const promises = [];
        if (that.options.batch) {
            if (created.length) {
                promises.push($.Deferred(function (deferred) {
                    const d = deferred;
                    d.type = "create";
                    d.models = created;
                }));
            }
            if (updated.length) {
                promises.push($.Deferred(function (deferred) {
                    const d = deferred;
                    d.type = "update";
                    d.models = updated;
                }));
            }
            if (destroyed.length) {
                promises.push($.Deferred(function (deferred) {
                    const d = deferred;
                    d.type = "destroy";
                    d.models = destroyed;
                }));
            }
            that._submit(promises, {
                created: that.reader.serialize(toJSON(created)),
                updated: that.reader.serialize(toJSON(updated)),
                destroyed: that.reader.serialize(toJSON(destroyed))
            });
        }
        return promises;
    }
    _promise(data, models, type) {
        const that = this;
        return $.Deferred(function (deferred) {
            that.trigger(REQUESTSTART, {
                type: type
            });
            that.trigger(PROGRESS);
            const transportMethod = that.transport[type];
            transportMethod.call(that.transport, {
                data: data,
                success: function (response) {
                    deferred.resolve({
                        response: response,
                        models: models,
                        type: type
                    });
                },
                error: function (response, status, error) {
                    deferred.reject(response);
                    that.error(response, status, error);
                }
            });
        }).promise();
    }
    _send(method, data) {
        const that = this;
        let idx;
        let length;
        const promises = [];
        const converted = that.reader.serialize(toJSON(data));
        if (that.options.batch) {
            if (data.length) {
                promises.push(that._promise({
                    models: converted
                }, data, method));
            }
        }
        else {
            for (idx = 0, length = data.length; idx < length; idx++) {
                promises.push(that._promise({
                    ...converted[idx]
                }, [data[idx]], method));
            }
        }
        return promises;
    }
    _readAggregates(data) {
        return this.reader.aggregates(data);
    }
    _detachObservableParents() {
        let idx;
        if (this._data && this._shouldDetachObservableParents) {
            for (idx = 0; idx < this._data.length; idx++) {
                if (this._data[idx].parent) {
                    this._data[idx].parent = noop;
                }
            }
        }
    }
    _storeData(updatePristine) {
        let state;
        let idx;
        let item;
        const serverGrouping = this._isServerGrouped();
        const model = this.reader.model;
        function items(data) {
            let idx;
            const state = [];
            for (idx = 0; idx < data.length; idx++) {
                const dataItem = data.at(idx);
                const item = typeof dataItem.toJSON === "function" ? dataItem.toJSON() : dataItem;
                if (serverGrouping && dataItem.items) {
                    item.items = items(dataItem.items);
                }
                else {
                    item.uid = dataItem.uid;
                    if (model) {
                        if (dataItem.isNew?.()) {
                            item.__state__ = "create";
                        }
                        else if (dataItem.dirty) {
                            item.__state__ = "update";
                        }
                    }
                }
                state.push(item);
            }
            return state;
        }
        if (this.options.offlineStorage != null) {
            state = items(this._data);
            const destroyed = [];
            for (idx = 0; idx < this._destroyed.length; idx++) {
                item = this._destroyed[idx].toJSON();
                item.__state__ = "destroy";
                destroyed.push(item);
            }
            this.offlineData(state.concat(destroyed));
            if (updatePristine) {
                const wrapDataAccessBase = this.reader.reader ? this.reader.reader._wrapDataAccessBase : this.reader._wrapDataAccessBase;
                if (wrapDataAccessBase) {
                    this._pristineData = wrapDataAccessBase(state);
                }
            }
        }
    }
    _addRange(data, skip) {
        const that = this;
        const start = typeof skip !== "undefined" ? skip : that._skip || 0;
        let end;
        const range = {
            start: 0,
            end: 0,
            data: data,
            pristineData: data.toJSON(),
            timestamp: that._timeStamp()
        };
        if (this._isGroupPaged()) {
            end = start + data.length;
            range.outerStart = start;
            range.outerEnd = end;
        }
        else {
            end = start + ((that._flatData(data, true) || []).length);
        }
        range.start = start;
        range.end = end;
        that._ranges.push(range);
        that._sortRanges();
        if (that._isGroupPaged()) {
            if (!that._groupsFlat) {
                that._groupsFlat = [];
            }
            that._appendToGroupsFlat(range.data);
            that._updateOuterRangesLength();
        }
    }
    _appendToGroupsFlat(data) {
        let i;
        const length = data.length;
        for (i = 0; i < length; i++) {
            this._groupsFlat?.push(data[i]);
        }
    }
    _getGroupByUid(uid) {
        let i;
        const length = this._groupsFlat?.length || 0;
        let group;
        for (i = 0; i < length; i++) {
            group = this._groupsFlat?.[i];
            if (group?.uid === uid) {
                return group;
            }
        }
    }
    _sortRanges() {
        this._ranges.sort(function (x, y) {
            return x.start - y.start;
        });
    }
    _params(data) {
        const that = this;
        const options = extend({
            take: that.take(),
            skip: that.skip(),
            page: that.page(),
            pageSize: that.pageSize(),
            sort: that._sort,
            filter: that._filter,
            group: that._group,
            aggregate: that._aggregate,
            groupPaging: !!that._groupPaging,
            isExcelExportRequest: that.options.isExcelExportRequest
        }, data);
        if (!that.options.serverPaging) {
            delete options.take;
            delete options.skip;
            delete options.page;
            delete options.pageSize;
        }
        if (!that.options.serverGrouping) {
            delete options.group;
        }
        else if (that.reader.model && options.group) {
            options.group = convertDescriptorsField(options.group, that.reader.model);
        }
        if (!that.options.serverFiltering) {
            delete options.filter;
        }
        else if (that.reader.model && options.filter) {
            options.filter = convertFilterDescriptorsField(options.filter, that.reader.model);
        }
        if (!that.options.serverSorting) {
            delete options.sort;
        }
        else if (that.reader.model && options.sort) {
            options.sort = convertDescriptorsField(options.sort, that.reader.model);
        }
        if (!that.options.serverAggregates) {
            delete options.aggregate;
        }
        else if (that.reader.model && options.aggregate) {
            options.aggregate = convertDescriptorsField(options.aggregate, that.reader.model);
        }
        if (!that.options.groupPaging || !(that.options.serverPaging && that.options.serverGrouping)) {
            delete options.groupPaging;
        }
        if (!that.options.isExcelExportRequest) {
            delete options.isExcelExportRequest;
        }
        return options;
    }
    _queueRequest(options, callback) {
        const that = this;
        if (!that._requestInProgress) {
            that._requestInProgress = true;
            that._pending = undefined;
            callback();
        }
        else {
            that._pending = {
                callback: callback.bind(that),
                options: options
            };
        }
    }
    _dequeueRequest() {
        const that = this;
        that._requestInProgress = false;
        if (that._pending) {
            that._queueRequest(that._pending.options, that._pending.callback);
        }
    }
    _handleCustomErrors(response) {
        if (this.reader.errors) {
            const errors = this.reader.errors(response);
            if (errors) {
                this.trigger(ERROR, {
                    xhr: null,
                    status: "customerror",
                    errorThrown: "custom error",
                    errors: errors
                });
                return true;
            }
        }
        return false;
    }
    _shouldWrap(data) {
        const model = this.reader.model;
        if (model && data.length) {
            return !(data[0] instanceof model);
        }
        return false;
    }
    _observe(data) {
        const that = this;
        const model = that.reader.model;
        that._shouldDetachObservableParents = true;
        if (data instanceof ObservableArray) {
            that._shouldDetachObservableParents = false;
            if (that._shouldWrap(data)) {
                data.type = that.reader.model;
                data.wrapAll(data, data);
            }
        }
        else {
            const arrayType = that.pageSize() && !that.options.serverPaging ? LazyObservableArray : ObservableArray;
            data = new arrayType(data, that.reader.model);
            data.parent = function () {
                return that.parent();
            };
        }
        if (that._isServerGrouped()) {
            wrapGroupItems(data, model);
        }
        if (that._changeHandler && that._data && that._data instanceof ObservableArray && !(that.options.useRanges && that.options.serverPaging)) {
            that._data.unbind(CHANGE, that._changeHandler);
        }
        else {
            that._changeHandler = that._change.bind(that);
        }
        return data.bind(CHANGE, that._changeHandler);
    }
    _updateTotalForAction(action, items) {
        const that = this;
        let total = Math.trunc(that._total || 0);
        if (!isNumber(that._total)) {
            total = Math.trunc(that._pristineTotal || 0);
        }
        if (action === "add") {
            total += items.length;
        }
        else if (action === "remove") {
            total -= items.length;
        }
        else if (action !== "itemchange" && action !== "sync" && !that.options.serverPaging) {
            total = that._pristineTotal;
        }
        else if (action === "sync") {
            total = that._pristineTotal = Math.trunc(that._total || 0);
        }
        that._total = total;
    }
    _operationsForUpdatedFields() {
        const that = this;
        const updatedFields = that._updatedFields || [];
        const operations = {};
        let found = false;
        let stringified;
        operations.sort = that._sort;
        operations.filter = that._filter;
        operations.group = that._group;
        operations.aggregate = that._aggregate;
        stringified = stringify(operations);
        found = updatedFields.some(u => stringified.indexOf(`"field":"${u}"`) > -1);
        return !found;
    }
    _pushInDestroyed(model) {
        const isPushed = this._destroyed.find(function (item) {
            return item.uid === model.uid;
        });
        if (!isPushed) {
            this._destroyed.push(model);
        }
    }
    _change(e) {
        let handler;
        let that = this;
        let idx;
        let items;
        let length;
        let action = e ? e.action : "";
        const eventItems = e?.items || [];
        if (action === "remove") {
            for (idx = 0, length = eventItems.length; idx < length; idx++) {
                const item = eventItems[idx];
                if (!item.isNew || !item.isNew()) {
                    that._pushInDestroyed(item);
                }
            }
        }
        if (e) {
            items = eventItems;
            e.partialUpdate = that._operationsForUpdatedFields() && !that._preventPartialUpdate;
            if (e.action === "itemchange" && items.some(i => i.dirtyFields)) {
                let item = eventItems[0];
                let keys = Object.keys(item.dirtyFields || {});
                let result = keys;
                for (const key of keys) {
                    if (item[key] instanceof Object) {
                        let stringifiedKey = JSON.stringify(item[key]);
                        if (stringifiedKey) {
                            let cleanObject = JSON.parse(stringifiedKey);
                            let cleanObjectKeys = Object.keys(cleanObject).map(k => key + "." + k);
                            result.push(...cleanObjectKeys);
                        }
                    }
                }
                that._updatedFields = result;
            }
        }
        if (that.options.autoSync && (action === "add" || action === "remove" || action === "itemchange")) {
            if (action === "add") {
                that._preventPartialUpdate = true;
            }
            handler = function (args) {
                if (args.action === "sync") {
                    that._preventPartialUpdate = false;
                    that.unbind("change", handler);
                    that._updateTotalForAction(action || "", eventItems);
                }
            };
            that.first("change", handler);
            that.sync();
        }
        else {
            that._updateTotalForAction(action || "", eventItems);
            that._process(that._data, e);
        }
    }
    _calculateAggregates(data, options) {
        options = options || {};
        let query = new Query(data);
        const aggregates = options.aggregate;
        const filter = options.filter;
        if (filter) {
            query = query.filter(filter);
        }
        return query.aggregate(aggregates);
    }
    _process(data, e) {
        const that = this;
        const options = {};
        let result;
        if (that.options.serverPaging !== true) {
            options.skip = that._skip;
            options.take = that._take || that._pageSize;
            if (options.skip === undefined && that._page !== undefined && that._pageSize !== undefined) {
                options.skip = (that._page - 1) * that._pageSize;
            }
            if (that.options.useRanges) {
                options.skip = that.currentRangeStart();
            }
        }
        if (that.options.serverSorting !== true) {
            options.sort = that._sort;
        }
        if (that.options.serverFiltering !== true) {
            options.filter = that._filter;
        }
        if (that.options.serverGrouping !== true) {
            options.group = that._group;
        }
        if (that.options.serverAggregates !== true) {
            options.aggregate = that._aggregate;
        }
        if (that.options.serverGrouping) {
            that._clearEmptyGroups(data);
        }
        options.groupPaging = that._groupPaging;
        if (that._isGroupPaged() && e && (e.action === "page" || e.action === "expandGroup" || e.action === "collapseGroup")) {
            result = that._queryProcess(data, {
                aggregate: that._aggregate
            });
        }
        else {
            result = that._queryProcess(data, options);
        }
        if (that._filter && e && e.action === "add") {
            const model = e.items?.[0];
            let resultData = result.data;
            if (that._isGrouped() && !this._isServerGrouped()) {
                resultData = flattenGroups(resultData);
            }
            const modelIsInView = resultData.find(function (item) {
                return item.uid === model.uid;
            });
            if (!modelIsInView && (model.index !== undefined || model.id === null)) {
                result.data.splice(model.index ?? 0, 0, that._isGrouped() ? that._wrapInEmptyGroup(model) : model);
                result.total = (result.total || 0) + 1;
            }
        }
        if (that.options.serverAggregates !== true) {
            // for performance reasons, calculate aggregates for part of the data only after query process
            // this is necessary in the TreeList when paging
            that._aggregateResult = that._calculateAggregates(result.dataToAggregate || data, options);
        }
        that._setView(result, options, e);
        that._setFilterTotal(result.total, false);
        e = e || {};
        e.items = e.items || that._view;
        that.trigger(CHANGE, e);
    }
    _setView(result, options, e) {
        const that = this;
        if (that._isGroupPaged() && !that._isServerGrouped()) {
            if (e && (e.action === "page" || e.action === "expandGroup" || e.action === "collapseGroup")) {
                that.view(result.data);
                that._updateOuterRangesLength();
            }
            else {
                that._ranges = [];
                const query = new Query(result.data);
                that._addRange(that._observe(result.data));
                if ((options.skip || 0) + (options.take || 0) > result.data.length) {
                    options.skip = Math.max(0, result.data.length - (options.take || 0));
                }
                that.view(query.range(options.skip || 0, options.take || 0).toArray());
            }
        }
        else {
            that.view(result.data);
        }
    }
    _clearEmptyGroups(data) {
        let idx;
        for (idx = data.length - 1; idx >= 0; idx--) {
            const group = data[idx];
            if (group.hasSubgroups) {
                this._clearEmptyGroups(group.items);
            }
            if (group.items && !group.items.length && !group.itemCount && group.parent) {
                splice.apply(group.parent(), [idx, 1]);
            }
        }
    }
    _queryProcess(data, options) {
        const queryData = data;
        if (this.options.inPlaceSort) {
            return Query.process(queryData, options, this.options.inPlaceSort);
        }
        else {
            return Query.process(queryData, options);
        }
    }
    _mergeState(options) {
        const that = this;
        if (options !== undefined) {
            that._pageSize = options.pageSize;
            that._page = options.page;
            that._sort = options.sort;
            that._filter = options.filter;
            that._group = options.group;
            that._aggregate = options.aggregate;
            that._skip = that._currentRangeStart = options.skip;
            that._take = options.take;
            if (that._skip === undefined) {
                that._skip = that._currentRangeStart = that.skip();
                options.skip = that.skip();
            }
            if (that._take === undefined && that._pageSize !== undefined) {
                that._take = that._pageSize;
                options.take = that._take;
            }
            if (that.options.virtual) {
                options.virtual = that.options.virtual;
                if (options.sort && that.options.serverPaging && !that._isGroupPaged() &&
                    (options.skip || 0) + (options.take || 0) > (that.total() || 0)) {
                    options.skip = math.max(0, (that.total() || 0) - (options.take || 0));
                    that._skip = that._currentRangeStart = options.skip;
                }
            }
            if (options.sort) {
                that._sort = options.sort = normalizeSort(options.sort);
                that._sortFields = sortFields(options.sort);
            }
            if (options.filter) {
                that._filter = options.filter = that.options.accentFoldingFiltering && !$.isEmptyObject(options.filter) ? $.extend({}, normalizeFilter(options.filter), {
                    accentFoldingFiltering: that.options.accentFoldingFiltering
                }) : normalizeFilter(options.filter);
            }
            if (options.group) {
                that._group = options.group = normalizeGroup(options.group);
            }
            if (options.aggregate) {
                that._aggregate = options.aggregate = normalizeAggregate(options.aggregate);
            }
        }
        return options || {};
    }
    _hasExpandedSubGroups(group) {
        let i;
        let result = false;
        const length = group.items ? group.items.length : 0;
        const groupsState = this._groupsState || {};
        if (!group.hasSubgroups) {
            return false;
        }
        for (i = 0; i < length; i++) {
            if (groupsState[group.items[i].uid || ""]) {
                result = true;
                break;
            }
        }
        return result;
    }
    _findGroupedRange(data, result, options, parents, callback) {
        let i;
        let j;
        const that = this;
        const length = data.length;
        let group;
        let current;
        let itemsLength;
        let groupCount;
        let itemsToSkip;
        const groupsState = that._groupsState || {};
        for (i = 0; i < length; i++) {
            group = data[i];
            if ((options.taken || 0) >= (options.take || 0)) {
                break;
            }
            if (!that._getGroupByUid(group.uid)) {
                that._groupsFlat?.push(group);
            }
            if (groupsState[group.uid || ""]) {
                if (that._isServerGroupPaged()) {
                    if (that._fetchGroupItems(group, options, parents, callback)) {
                        that._fetchingGroupItems = true;
                        return;
                    }
                    groupCount = ((group.subgroupCount || group.itemCount) || 0) + 1;
                    itemsToSkip = (options.skip || 0) - (options.skipped || 0);
                    if (!that._hasExpandedSubGroups(group) && itemsToSkip > groupCount) {
                        options.skipped = (options.skipped || 0) + groupCount;
                        continue;
                    }
                }
                if (options.includeParents && (options.skipped || 0) < (options.skip || 0)) {
                    options.skipped = (options.skipped || 0) + 1;
                    group.excludeHeader = true;
                }
                else if (options.includeParents) {
                    options.taken = (options.taken || 0) + 1;
                    group.excludeHeader = false;
                }
                if (group.hasSubgroups && group.items && group.items.length) {
                    group.currentItems = [];
                    if (!parents) {
                        parents = [];
                    }
                    parents.push(group);
                    that._findGroupedRange(group.items, group.currentItems, options, parents, callback);
                    parents.pop();
                    if (group.currentItems.length || (options.taken || 0) > 0) {
                        result.push(group);
                    }
                    else {
                        group.excludeHeader = false;
                    }
                }
                else {
                    current = [];
                    itemsLength = group.items.length;
                    for (j = 0; j < itemsLength; j++) {
                        if ((options.skipped || 0) < (options.skip || 0)) {
                            options.skipped = (options.skipped || 0) + 1;
                            continue;
                        }
                        if ((options.taken || 0) >= (options.take || 0)) {
                            break;
                        }
                        current.push(group.items[j]);
                        options.taken = (options.taken || 0) + 1;
                    }
                    if (current.length || (options.taken || 0) > 0) {
                        group.currentItems = current;
                        result.push(group);
                    }
                    else {
                        group.excludeHeader = false;
                    }
                }
            }
            else {
                if ((options.skipped || 0) < (options.skip || 0)) {
                    options.skipped = (options.skipped || 0) + 1;
                    continue;
                }
                result.push(group);
                options.taken = (options.taken || 0) + 1;
            }
        }
    }
    _expandedSubGroupItemsCount(group, end, includeCurrentItems) {
        let i;
        const that = this;
        let result = 0;
        let subGroup;
        const endSpecified = typeof end === "number";
        let length = endSpecified ? end : (group.subgroupCount || 0);
        let temp;
        if (!group.hasSubgroups) {
            return result;
        }
        for (i = 0; i < length; i++) {
            subGroup = group.items[i];
            if (!subGroup) {
                break;
            }
            if (subGroup.hasSubgroups && (that._groupsState || {})[group.uid || ""]) {
                temp = that._expandedSubGroupItemsCount(subGroup, length, true);
                result += temp;
                if (endSpecified) {
                    length -= temp;
                }
            }
            else if (!subGroup.hasSubgroups && (that._groupsState || {})[subGroup.uid || ""]) {
                temp = subGroup.items ? subGroup.items.length : 0;
                result += temp;
                if (endSpecified) {
                    length -= temp;
                }
            }
            if (includeCurrentItems) {
                result += 1;
                if (endSpecified) {
                    length -= 1;
                }
            }
            if (endSpecified && result > length) {
                return result;
            }
        }
        return result;
    }
    _fetchGroupItems(group, options, parents, callback) {
        let that = this;
        let groupItemsSkip;
        let firstItem;
        let lastItem;
        let groupItemCount = (group.hasSubgroups ? group.subgroupCount : group.itemCount) || 0;
        let take = options.take || 0;
        let skipped = options.skipped || 0;
        let pageSize = that.take() || 0;
        let expandedSubGroupItemsCount;
        if (options.includeParents) {
            if (skipped < (options.skip || 0)) {
                skipped += 1;
            }
            else {
                take -= 1;
            }
        }
        if (!group.items || (group.items && !group.items.length)) {
            that.getGroupItems(group, options, parents, callback, 0);
            return true;
        }
        else {
            expandedSubGroupItemsCount = this._expandedSubGroupItemsCount(group, (options.skip || 0) - skipped);
            groupItemsSkip = Math.max((options.skip || 0) - (skipped + expandedSubGroupItemsCount), 0);
            if (groupItemsSkip >= groupItemCount) {
                return false;
            }
            let lastItemIndex = Math.min(groupItemsSkip + take, groupItemCount - 1);
            firstItem = group.items[groupItemsSkip];
            lastItem = group.items[lastItemIndex];
            if (firstItem.notFetched) {
                that.getGroupItems(group, options, parents, callback, groupItemsSkip, math.round((groupItemsSkip + pageSize) / pageSize));
                return true;
            }
            if (lastItem.notFetched) {
                that.getGroupItems(group, options, parents, callback, math.max(math.floor((groupItemsSkip + pageSize) / pageSize), 0) * pageSize, math.round((groupItemsSkip + pageSize) / pageSize));
                return true;
            }
            if (!firstItem.notFetched && !lastItem.notFetched && hasNotFetchedItems(group.items, groupItemsSkip, lastItemIndex)) {
                that.getGroupItems(group, options, parents, callback, groupItemsSkip, lastItemIndex);
                return true;
            }
        }
    }
    _queueWithTimeout(options, callback, delay) {
        let that = this;
        clearTimeout(that._timeout);
        that._timeout = setTimeout(function () {
            that._queueRequest(options, callback);
        }, delay);
    }
    _groupItemsSuccessHandler(group, skip, take, callback, groupItemsSkip) {
        const that = this;
        const timestamp = that._timeStamp();
        callback = isFunction(callback) ? callback : noop;
        const totalField = that.options.schema && that.options.schema.total ? that.options.schema.total : "Total";
        return function (data) {
            let temp;
            const model = Model.define((that.options.schema?.model || {}));
            let totalCount = 0;
            let i;
            that._dequeueRequest();
            that.trigger(REQUESTEND, {
                response: data,
                type: "read"
            });
            if (typeof totalField === "function") {
                totalCount = totalField(data);
            }
            else {
                totalCount = data[totalField] || 0;
            }
            data = that.reader.parse(data);
            if (group.hasSubgroups) {
                temp = that.reader.groups(data);
                group.subgroupCount = totalCount;
            }
            else {
                temp = that.reader.data(data);
                temp = temp.map(function (item) {
                    return new model(item);
                });
            }
            group.items.omitChangeEvent = true;
            for (i = 0; i < totalCount; i++) {
                if (i >= (groupItemsSkip || 0) && i < (groupItemsSkip || 0) + take) {
                    group.items.splice(i, 1, temp[i - (groupItemsSkip || 0)]);
                }
                else {
                    if (!group.items[i]) {
                        group.items.splice(i, 0, {
                            notFetched: true
                        });
                    }
                }
            }
            group.items.omitChangeEvent = false;
            that._updateRangePristineData(group);
            that._fetchingGroupItems = false;
            if (!group.countAdded) {
                that._serverGroupsTotal = (that._serverGroupsTotal || 0) + totalCount;
                group.countAdded = true;
            }
            that.range(skip, take, callback, "expandGroup");
            if (timestamp >= that._currentRequestTimeStamp || !that._skipRequestsInProgress) {
                that.trigger(CHANGE, {});
            }
        };
    }
    _composeItemsFilter(group, parents) {
        let i;
        let filter = {
            logic: "and",
            filters: []
        };
        if (this.filter()) {
            filter.filters.push(this.filter());
        }
        filter = extend(true, {}, filter);
        filter.filters.push({
            field: group.field,
            operator: "eq",
            value: group.value
        });
        if (parents) {
            for (i = 0; i < parents.length; i++) {
                filter.filters.push({
                    field: parents[i].field,
                    operator: "eq",
                    value: parents[i].value
                });
            }
        }
        return filter;
    }
    _updateRangePristineData(group) {
        let i;
        let j;
        const that = this;
        const ranges = that._ranges;
        const rangesLength = ranges.length;
        let temp;
        let currentGroup;
        let range;
        let dataLength;
        let indexes;
        let currIdx;
        for (i = 0; i < rangesLength; i++) {
            range = ranges[i];
            dataLength = range.data.length;
            indexes = [];
            temp = null;
            for (j = 0; j < dataLength; j++) {
                currentGroup = range.data[j];
                indexes.push(j);
                if (currentGroup.uid === group.uid || (currentGroup.hasSubgroups && currentGroup.items.length && that._containsSubGroup(currentGroup, group, indexes))) {
                    break;
                }
                indexes.pop();
            }
            if (indexes.length) {
                temp = ranges[i].pristineData;
                while (indexes.length > 1) {
                    currIdx = indexes.splice(0, 1)[0];
                    temp = temp[currIdx].items;
                }
                temp[indexes[0]] = that._cloneGroup(group);
                break;
            }
        }
    }
    _containsSubGroup(group, subgroup, indexes) {
        let i;
        const that = this;
        const length = group.items.length;
        let currentSubGroup;
        if (group.hasSubgroups && length) {
            for (i = 0; i < length; i++) {
                currentSubGroup = group.items[i];
                indexes.push(i);
                if (currentSubGroup.uid === subgroup.uid || (currentSubGroup.hasSubgroups && currentSubGroup.items.length && that._containsSubGroup(currentSubGroup, subgroup, indexes))) {
                    return true;
                }
                indexes.pop();
            }
        }
    }
    _cloneGroup(group) {
        const that = this;
        const groupData = (typeof group.toJSON == "function" ? group.toJSON() : group);
        if (groupData.items && groupData.items.length) {
            groupData.items = groupData.items.map(function (item) {
                return item ? that._cloneGroup(item) : item;
            });
        }
        return groupData;
    }
    _setFilterTotal(filterTotal, setDefaultValue) {
        const that = this;
        if (!that.options.serverFiltering) {
            if (filterTotal !== undefined) {
                that._total = filterTotal;
            }
            else if (setDefaultValue) {
                that._total = that._data.length;
            }
        }
    }
    _query(options) {
        const that = this;
        return that.query(extend({}, {
            page: that.page(),
            pageSize: that.pageSize(),
            sort: that.sort(),
            filter: that.filter(),
            group: that.group(),
            aggregate: that.aggregate()
        }, options));
    }
    _calculateGroupsTotal(groups, includeExpanded, itemsField, ignoreState) {
        let i;
        const that = this;
        itemsField = itemsField || "items";
        let total;
        let length;
        if (that._group.length && groups) {
            total = 0;
            length = groups.length;
            for (i = 0; i < length; i++) {
                total += that.groupCount(groups[i], includeExpanded, itemsField, ignoreState);
            }
            that._groupsTotal = total;
            return total;
        }
        that._groupsTotal = that._data.length;
        return that._groupsTotal;
    }
    _emptyAggregates(aggregates) {
        let idx;
        const result = {};
        if (!isEmptyObject(aggregates)) {
            const aggregate = {};
            const aggregateItems = (isArray(aggregates) ? aggregates : [aggregates]);
            for (idx = 0; idx < aggregateItems.length; idx++) {
                aggregate[aggregateItems[idx].aggregate] = 0;
                result[aggregateItems[idx].field] = aggregate;
            }
        }
        return result;
    }
    _pageableQueryOptions(options) {
        return options;
    }
    _wrapInEmptyGroup(model) {
        const groups = this.group() || [];
        let parent;
        let group;
        let idx;
        let length;
        for (idx = groups.length - 1, length = 0; idx >= length; idx--) {
            group = groups[idx];
            parent = {
                value: typeof model.get === "function" ? model.get(group.field) : model[group.field],
                field: group.field,
                items: (parent ? [parent] : [model]),
                hasSubgroups: !!parent,
                aggregates: this._emptyAggregates(group.aggregates)
            };
        }
        return parent;
    }
    _timeStamp() {
        return new Date().getTime();
    }
    _findRange(start, end, callback) {
        const that = this;
        const ranges = that._ranges;
        let range;
        let data = [];
        let skipIdx;
        let takeIdx;
        let startIndex;
        let endIndex;
        let rangeData;
        let rangeEnd;
        let processed;
        const options = that.options;
        const remote = options.serverSorting || options.serverPaging || options.serverFiltering || options.serverGrouping || options.serverAggregates;
        let flatData;
        let count;
        let length;
        const groupMapOptions = {
            take: end - start,
            skip: start,
            skipped: 0,
            taken: 0,
            includeParents: true
        };
        let prevRangeEnd;
        const isGroupPaged = that._isGroupPaged();
        const startField = isGroupPaged ? "outerStart" : "start";
        const endField = isGroupPaged ? "outerEnd" : "end";
        let currentDataLength;
        for (skipIdx = 0, length = ranges.length; skipIdx < length; skipIdx++) {
            range = ranges[skipIdx];
            if (isGroupPaged) {
                if ((range.outerStart ?? 0) >= end) {
                    return [];
                }
                if (start > (range.outerEnd ?? 0)) {
                    groupMapOptions.skipped = (groupMapOptions.skipped || 0) + ((range.outerEnd ?? 0) - (prevRangeEnd || 0));
                    prevRangeEnd = range.outerEnd ?? 0;
                    continue;
                }
                if (typeof prevRangeEnd !== "undefined" && prevRangeEnd != (range.outerStart ?? 0)) {
                    groupMapOptions.skipped = (groupMapOptions.skipped || 0) + ((range.outerStart ?? 0) - prevRangeEnd);
                }
                if ((groupMapOptions.skipped || 0) > (groupMapOptions.skip || 0)) {
                    return [];
                }
                if (typeof prevRangeEnd === "undefined" && start > 0 && range.start > 0) {
                    groupMapOptions.skipped = range.outerStart ?? 0;
                }
                takeIdx = skipIdx;
                while (true) {
                    this._findGroupedRange(range.data, data, groupMapOptions, null, callback);
                    currentDataLength = that._calculateGroupsTotal(data, true, "currentItems");
                    if (currentDataLength >= (groupMapOptions.take || 0)) {
                        return data;
                    }
                    if (that._fetchingGroupItems) {
                        return [];
                    }
                    takeIdx++;
                    if (ranges[takeIdx] && (ranges[takeIdx].outerStart ?? 0) === (range.outerEnd ?? 0)) {
                        range = ranges[takeIdx];
                    }
                    else {
                        break;
                    }
                }
            }
            else if (start >= (range[startField] ?? 0) && start <= (range[endField] ?? 0)) {
                count = 0;
                for (takeIdx = skipIdx; takeIdx < length; takeIdx++) {
                    range = ranges[takeIdx];
                    flatData = that._flatData(range.data, true) || [];
                    if (flatData.length && start + count >= range.start) {
                        rangeData = range.data;
                        rangeEnd = range.end;
                        if (!remote) {
                            if (options.inPlaceSort) {
                                processed = that._queryProcess(range.data, {
                                    filter: that.filter()
                                });
                            }
                            else {
                                const sort = [
                                    ...normalizeGroupWithoutCompare(that.group() || []),
                                    ...(normalizeSort((that.sort() || [])) || [])
                                ];
                                processed = that._queryProcess(range.data, {
                                    sort: sort,
                                    filter: that.filter()
                                });
                            }
                            flatData = rangeData = processed.data;
                            if (processed.total !== undefined) {
                                rangeEnd = processed.total;
                            }
                        }
                        startIndex = 0;
                        if (start + count > range.start) {
                            startIndex = start + count - range.start;
                        }
                        endIndex = flatData.length;
                        if (rangeEnd > end) {
                            endIndex = endIndex - (rangeEnd - end);
                        }
                        count += endIndex - startIndex;
                        data = that._mergeGroups(data, rangeData, startIndex, endIndex);
                        if (end <= range.end && count == end - start) {
                            return data;
                        }
                    }
                }
                break;
            }
            prevRangeEnd = range.outerEnd;
        }
        return [];
    }
    _getRangesMismatch(pageSkip) {
        const that = this;
        const ranges = that._ranges;
        let mismatch = 0;
        let i = 0;
        while (true) {
            const range = ranges[i];
            if (!range || (range.outerStart ?? 0) > pageSkip) {
                break;
            }
            if ((range.outerEnd ?? 0) != range.end) {
                mismatch = (range.outerEnd ?? 0) - range.end;
            }
            i++;
        }
        return mismatch;
    }
    _mergeGroups(data, range, skip, take) {
        if (this._isServerGrouped()) {
            const temp = range.toJSON();
            let prevGroup;
            if (data.length) {
                prevGroup = data[data.length - 1];
            }
            const groupedPrev = prevGroup;
            const groupedTemp = temp;
            mergeGroups(groupedPrev, groupedTemp, skip, take);
            return data.concat(temp);
        }
        return data.concat(range.slice(skip, take));
    }
    _processRangeData(data, skip, take, pageSkip, size, eventData) {
        const that = this;
        that._pending = undefined;
        that._skip = skip > (that.skip() || 0) && !that._omitPrefetch ? math.min(size, (that.totalPages() - 1) * (that.take() || 0)) : pageSkip;
        if (that.options.virtual && that._omitPrefetch && !that._isGroupPaged() &&
            skip > (that.skip() || 0) && skip + take >= (that.total() || 0)) {
            that._skip = math.min(size, (that.totalPages() - 1) * (that.take() || 0));
        }
        that._currentRangeStart = skip;
        that._take = take;
        const paging = that.options.serverPaging;
        const sorting = that.options.serverSorting;
        const filtering = that.options.serverFiltering;
        const aggregates = that.options.serverAggregates;
        try {
            that.options.serverPaging = true;
            if (!that._isServerGrouped() && !(that.group() || []).length) {
                that.options.serverSorting = true;
            }
            that.options.serverFiltering = true;
            that.options.serverPaging = true;
            that.options.serverAggregates = true;
            if (paging) {
                that._detachObservableParents();
                that._data = data = that._observe(data);
            }
            that._process(data, eventData);
        }
        finally {
            that.options.serverPaging = paging;
            that.options.serverSorting = sorting;
            that.options.serverFiltering = filtering;
            that.options.serverAggregates = aggregates;
        }
    }
    _prefetchSuccessHandler(skip, size, callback, force) {
        const that = this;
        const timestamp = that._timeStamp();
        return function (data) {
            let found = false;
            let range = {
                start: skip,
                end: size,
                data: [],
                pristineData: [],
                timestamp: that._timeStamp()
            };
            let idx;
            let length;
            let temp;
            that._dequeueRequest();
            that.trigger(REQUESTEND, {
                response: data,
                type: "read"
            });
            data = that.reader.parse(data);
            temp = that._readData(data);
            if (temp.length) {
                for (idx = 0, length = that._ranges.length; idx < length; idx++) {
                    if (that._ranges[idx].start === skip) {
                        found = true;
                        range = that._ranges[idx];
                        if (!that._isGroupPaged()) {
                            range.pristineData = temp;
                            range.data = that._observe(temp);
                            range.end = range.start + (that._flatData(range.data, true) || []).length;
                            that._sortRanges();
                        }
                        break;
                    }
                }
                if (!found) {
                    that._addRange(that._observe(temp), skip);
                }
            }
            that._total = that.reader.total(data);
            if (force || timestamp >= that._currentRequestTimeStamp || !that._skipRequestsInProgress) {
                if (callback && temp.length) {
                    callback();
                }
                else {
                    that.trigger(CHANGE, {});
                }
            }
        };
    }
    _multiplePrefetch(skip, take, callback) {
        const that = this;
        const size = math.min(skip + take, that.total());
        const options = {
            take: take,
            skip: skip,
            page: skip / take + 1,
            pageSize: take,
            sort: that._sort,
            filter: that._filter,
            group: that._group,
            aggregate: that._aggregate
        };
        if (!that._rangeExists(skip, size)) {
            if (!that.trigger(REQUESTSTART, {
                type: "read"
            })) {
                that.transport.read({
                    data: that._params(options),
                    success: that._prefetchSuccessHandler(skip, size, callback, true),
                    error: function (response, status, error) {
                        that.error(response, status, error);
                    }
                });
            }
        }
        else if (callback) {
            callback();
        }
    }
    _adjustPageSkip(start, take) {
        const that = this;
        const prevRange = that._getPrevRange(start);
        let result;
        const total = that.total();
        let mismatch;
        if (prevRange) {
            mismatch = that._getRangesMismatch(start);
            if (!mismatch) {
                return start;
            }
            start -= mismatch;
        }
        result = math.max(math.floor(start / take), 0) * take;
        if (result > total) {
            while (true) {
                result -= take;
                if (result < total) {
                    break;
                }
            }
        }
        return result;
    }
    _getNextRange(end) {
        const that = this;
        const ranges = that._ranges;
        let idx;
        let length;
        for (idx = 0, length = ranges.length; idx < length; idx++) {
            if (ranges[idx].start <= end && ranges[idx].end >= end) {
                return ranges[idx];
            }
        }
    }
    _getPrevRange(start) {
        const that = this;
        const ranges = that._ranges;
        let idx;
        let range;
        const length = ranges.length;
        for (idx = length - 1; idx >= 0; idx--) {
            if ((ranges[idx].outerStart ?? ranges[idx].start) <= start) {
                range = ranges[idx];
                break;
            }
        }
        return range;
    }
    _rangeExists(start, end) {
        const that = this;
        const ranges = that._ranges;
        let idx;
        let length;
        for (idx = 0, length = ranges.length; idx < length; idx++) {
            if (ranges[idx].start <= start && ranges[idx].end >= end) {
                return true;
            }
        }
        return false;
    }
    _groupRangeExists(start, end) {
        const that = this;
        const ranges = that._ranges;
        let idx;
        let length;
        let availableItemsCount = 0;
        const total = that.groupsTotal(true);
        if (end > total && !that._isServerGrouped()) {
            end = total;
        }
        for (idx = 0, length = ranges.length; idx < length; idx++) {
            const range = ranges[idx];
            if ((range.outerStart ?? 0) <= start && (range.outerEnd ?? 0) >= start) {
                availableItemsCount += (range.outerEnd ?? 0) - start;
            }
            else if ((range.outerStart ?? 0) <= end && (range.outerEnd ?? 0) >= end) {
                availableItemsCount += end - (range.outerStart ?? 0);
            }
        }
        return availableItemsCount >= end - start;
    }
    _getCurrentRangeSpan() {
        const that = this;
        const ranges = that._ranges;
        const start = that.currentRangeStart();
        const end = start + (that.take() || 0);
        const rangeSpan = [];
        let range;
        let idx;
        const length = ranges.length;
        for (idx = 0; idx < length; idx++) {
            range = ranges[idx];
            if ((range.start <= start && range.end >= start) || (range.start >= start && range.start <= end)) {
                rangeSpan.push(range);
            }
        }
        return rangeSpan;
    }
    _removeModelFromRanges(model) {
        let idx;
        let length;
        const that = this;
        let range;
        for (idx = 0, length = this._ranges.length; idx < length; idx++) {
            range = this._ranges[idx];
            that._removeModelFromRange(range, model);
        }
        that._updateRangesLength();
    }
    _removeModelFromRange(range, model) {
        this._eachItem(range.data, function (data) {
            let idx;
            if (!data) {
                return;
            }
            for (idx = 0; idx < data.length; idx++) {
                const dataItem = data[idx];
                if (dataItem.uid && dataItem.uid == model.uid) {
                    [].splice.call(data, idx, 1);
                    break;
                }
            }
        });
    }
    _insertModelInRange(index, model) {
        const that = this;
        const ranges = that._ranges || [];
        const rangesLength = ranges.length;
        let range;
        let i;
        for (i = 0; i < rangesLength; i++) {
            range = ranges[i];
            if (range.start <= index && range.end >= index) {
                if (!that._getByUid(model.uid, range.data)) {
                    if (that._isServerGrouped()) {
                        range.data.splice(index, 0, that._wrapInEmptyGroup(model));
                    }
                    else {
                        range.data.splice(index, 0, model);
                    }
                }
                break;
            }
        }
        that._updateRangesLength();
    }
    _updateRangesLength() {
        const that = this;
        const ranges = that._ranges || [];
        const rangesLength = ranges.length;
        let mismatchFound = false;
        let mismatchLength = 0;
        let lengthDifference = 0;
        let rangeLength;
        let range;
        let i;
        for (i = 0; i < rangesLength; i++) {
            range = ranges[i];
            rangeLength = that._isGroupPaged() ? range.data.length : (that._flatData(range.data, true) || []).length;
            lengthDifference = rangeLength - math.abs(range.end - range.start);
            if (!mismatchFound && lengthDifference !== 0) {
                mismatchFound = true;
                mismatchLength = lengthDifference;
                range.end += mismatchLength;
                continue;
            }
            if (mismatchFound) {
                range.start += mismatchLength;
                range.end += mismatchLength;
            }
        }
    }
    _updateOuterRangesLength() {
        const that = this;
        const ranges = that._ranges || [];
        const rangesLength = ranges.length;
        let mismatchLength = 0;
        let range;
        let i;
        let prevRange;
        let rangeLength;
        for (i = 0; i < rangesLength; i++) {
            range = ranges[i];
            rangeLength = that._isGroupPaged() ? that._calculateGroupsTotal(range.data, true, "items", true) : (that._flatData(range.data, true) || []).length;
            if (prevRange) {
                if (prevRange.end != range.start) {
                    mismatchLength = range.start - prevRange.end;
                }
                range.outerStart = (prevRange.outerEnd ?? 0) + mismatchLength;
                mismatchLength = 0;
            }
            else {
                range.outerStart = range.start;
            }
            range.outerEnd = (range.outerStart ?? 0) + rangeLength;
            prevRange = range;
        }
    }
}
DataSource.prototype.options = $.extend(true, {}, Observable.prototype.options, {
    data: null,
    schema: {},
    offlineStorage: null,
    serverSorting: false,
    serverPaging: false,
    serverFiltering: false,
    serverGrouping: false,
    serverAggregates: false,
    batch: false,
    inPlaceSort: false
});
DataSource.prototype.parent = DataSource.parent;
DataSource.prototype._syncEnd = DataSource._syncEnd;
DataSource.prototype._changesCanceled = DataSource._changesCanceled;
DataSource.prototype._modelCanceled = DataSource._modelCanceled;
DataSource.applyEnumerablePrototype();
DataSource.applyPrototypeMembers();
