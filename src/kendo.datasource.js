(function($, window, undefined) {
    var extend = $.extend,
        kendo = window.kendo;

    function idMap(data, id) {
        var idx, length, map = {};

        if (id) {
            for (idx = 0, length = data.length; idx < length; idx++) {
                map[id(data[idx])] = idx;
            }
        }

        return map;
    }

    function DataSource(options) {
        var that = extend(this, this.defaults, {
                idMap: {},
                modified: {},
                reader: options.reader,
                schema: options.schema,
                dialect: options.dialect
            }),
            id = that.schema.id,
            transport = options.transport;

        if (options.data) {
            that.transport = {
                read: function(callback) {
                    callback(options.data);
                }
            };
        } else {
            that.transport = transport || {
                read: function(ajaxOptions) {
                    ajaxOptions.data = that.dialect.read(
                        extend(transport.read.data, ajaxOptions.data)
                    );

                    $.ajax(extend({ dataType: "json" }, transport.read, ajaxOptions));
                }
            }
        }

        if (id) {
            that.find = function(id) {
                return that.data[that.idMap[id]];
            };
            that.id = function(record) {
                return record[id];
            };
        } else {
            that.find = that.at;
        }
    }

    extend(DataSource.prototype, new kendo.core.Observable, {
        defaults: {
            reader: {
                data: function(data) {
                    return data;
                }
            },

            schema: {
                id: "id"
            },

            dialect: {
                read: function(data) {
                    return data;
                }
            }
        },
        read: function(dataToSend) {
            var that = this;

            that.transport.read( {
                data: dataToSend,
                success: function(result) {
                    that.data = that.reader.data(result);

                    that.idMap = idMap(that.data, that.id);

                    that.trigger("read", that.data);
                }
            });
        },

        update: function(id, values) {
            var that = this,
                modified = that.modified[id],
                record = that.find(id);

            if (record && !$.isEmptyObject(values)) {
                if(!modified) {
                    that.modified[id] = modified = {
                        original: extend(true, {}, record),
                        changes: {}
                    };
                }
                extend(modified.changes, values);
                extend(record, values);

                that.trigger("update", { record: record });
            }
        },

        changes: function(id) {
            var that = this,
            result = [];

            if (id === undefined) {
                for (id in that.modified) {
                    result.push(that.changes(id));
                }

                return result;
            } else if (id in that.modified) {
                return that.modified[id].changes;
            }
        },

        hasChanges: function(id) {
            if (id === undefined) {
                return !$.isEmptyObject(this.modified);
            }

            return id in this.modified;
        },

        guid: function() {
            var id = "", i, random;

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;

                if (i == 8 || i == 12 || i == 16 || i == 20) {
                    id += "-";
                }
                id += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
            }

            return id;
        },

        create: function(index, values) {
            var that = this,
                data = that.data,
                record = {
                    id: that.guid()
                };

            if (typeof index !== "number") {
                values = index;
                index = undefined;
            }

            $.extend(record, values);

            index = index !== undefined ? index : data.length;

            data.splice(index, 0, record);

            that.idMap = idMap(data, that.id);
            that.modified[record.id] = {};
            that.trigger("create", { record: record, index: index });
            return record;
        },

        at: function(index) {
            return this.data[index];
        },

        destroy: function(id) {
            var that = this,
                record = that.find(id);

            if (record) {
                that.data.splice(that.idMap[id], 1);
                that.idMap = idMap(that.data, that.reader.id);
                that.modified[id] = {};

                that.trigger("destroy", { record: record });
            }
        }
    });

    kendo.data = kendo.data || {};

    extend(kendo.data, {
        DataSource: DataSource
    });
})(jQuery, window);
