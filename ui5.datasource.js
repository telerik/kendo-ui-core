(function($, undefined) {
    $.ui5 = $.ui5 || {};

    var extend = $.extend;

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
        var that = this;

        extend(that, that.defaults, {
            idMap:  {},
            modified: {},
            reader: options.reader,
            schema: options.schema,
            dialect: options.dialect
        });

        if (options.data) {
            that.transport = {
                read: function(callback) {
                    callback(options.data);
                }
            };
        } else {
            that.transport = {
                read: function(params) {
                    params.data = that.dialect.read($.extend(options.transport.read.data, 
                        params.data));

                    $.ajax($.extend({ dataType: "json" }, options.transport.read, params));
                }
            }
        }

        if (that.schema.id) {
            that.find = function(id) {
                return that.data[that.idMap[id]];
            };
            that.id = function(record) {
                return record[options.schema.id];
            };
        } else {
            that.find = that.at;
        }
    }

    extend(DataSource.prototype, new $.ui5.Observable, {
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
                read: function(options) {
                    return options;
                }
            }
        },
        read: function(params) {
            var that = this;

            that.transport.read( {
                data: params,
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

                that.trigger("update", { id: id, record: record });
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

        discard: function(id) {
            var that = this;

            if (id === undefined) {
                for (id in that.modified) {
                    that.discard(id);
                }
            } else if (id in that.idMap && id in that.modified) {
                that.data[that.idMap[id]] = that.modified[id].original;
                delete that.modified[id];
            }
        },

        hasChanges: function(id) {
            if (id === undefined) {
                return !$.isEmptyObject(this.modified);
            }

            return id in this.modified;
        },

        newid: function() {
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
                    id: that.newid()
                };

            if (typeof index !== "number" && index !== undefined) {
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

                that.trigger("destroy", { id: id, record: record });
            }
        }
    });

    extend($.ui5, {
        DataSource: DataSource
    });
})(jQuery);
