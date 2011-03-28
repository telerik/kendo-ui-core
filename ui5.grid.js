function getter(member) {
    if (member) {
        return $.isFunction(member) ?
            member :
            new Function("d", "return d" +
                (member.charAt(0) === "[" ? member : "." + member) +
                ";");
    }

    return function(data) {
        return data;
    };
}

function DataReader(options) {
    this.read = getter(options.data);
    this.id = getter(options.id);
}

function Grid(element, options) {
    var that = this,
        configuration = $.extend(options.dataSource, {
            change: function(dataView) {
                that.bindTo(dataView);
            }
        });

    that.element = element;
    that.table = $(element);
    that.tbody = that.table.find(">tbody");

    that.dataSource = options.dataSource.type === "remote" ?
        new RemoteDataSource(configuration) :
        new DataSource(configuration);

    that.refresh();
}

Grid.prototype = {
    sort: function(options) {
        this.dataSource.sort(options);
    },

    bindTo: function(dataView) {
       var count, idx, html = "";

       for (idx = 0, count = dataView.length; idx < count; idx++) {
           var dataItem = dataView[idx];
           html += "<tr ";
           html += "data-id='" + this.dataSource.id(dataItem);
           html += "'>";
           for (var member in dataItem) {
                html += "<td>";
                html += dataItem[member];
                html += "</td>";
           }
           html += "</tr>";
       }
       this.tbody.html(html);
    },
    refresh: function() {
        this.dataSource.refresh();
    }
}

var dialects = {
    mvc: {
        read: function(options) {
            var data = {},
                sort = options.sort;
            if (sort) {
                data.orderBy = sort.field + '-' + sort.direction;
            }

            return {
                data: data
            };
        }
    },
    odata: {
        read: function(options) {
            var data = {
                    "$format": "json"
                },
                sort = options.sort;

            if (sort) {
                data["$orderby"] = sort.field + ' ' + sort.direction;
            }

            return {
                data: data,
                type: "GET",
                dataType: "jsonp",
                contentType: "application/json; charset=utf-8",
                jsonp: "$callback"
            };
        }
    }
}

function RemoteDataSource(options) {
    this.change = options.change;
    this.transport = new RemoteTransport(options.transport);
    this.reader = options.reader.type !== "xml" ? new DataReader(options.reader) :
        new XmlDataReader(options.reader);
    this.dialect = dialects[options.dialect];
}

RemoteDataSource.prototype = {
    refresh: function() {
        this.select();
    },

    sort: function(options) {
       this._sort = options;
       this.select();
    },

    select: function() {
        var that = this;

        that.transport.read($.extend(that.dialect.read({ sort: that._sort }), {
            success: function(data) {
                that.change(that.reader.read(data));
            }
        }));
    }
}

function DataSource(options) {
    this.transport = options.transport.read === undefined ?
        new DirectTransport(options.data) :
        new RemoteTransport(options.transport);

    this.reader = options.reader.type !== "xml" ? new DataReader(options.reader) :
        new XmlDataReader(options.reader);
    this.change = options.change;
}

DataSource.prototype = {
    find: function(id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.id(this.data[i]) == id) {
                return this.data[i];
            }
        }
    },
    id: function(record) {
        return this.reader.id(record);
    },
    refresh: function() {
        var that = this;
        that.data = null;

        that.when(function(data) {
           that.change(data);
        });
    },

    when: function(callback) {
        var that = this;
        if (that.data) {
            callback(that.data);
        } else {
            that.transport.read({
                success: function(data) {
                    that.data = that.reader.read(data)
                    callback(that.data);
                }
            });
        }
    },

    sort: function(options) {
       this.selector = getter(options.field);
       this.select();
    },

    select: function() {
        var that = this,
            selector = that.selector;

        that.when(function(data) {
            data = data.slice(0);
            data.sort(function(a, b) {
                return selector(a) - selector(b);
            });

            that.change(data);
        });
    }
}

function DirectTransport(data) {
    this.data = data;
}

DirectTransport.prototype = {
    read: function(options) {
        options.success(this.data);
    }
}

function RemoteTransport(options) {
    this.options = options;
}

RemoteTransport.prototype = {
    read: function(options) {
        var defaults = typeof this.options.read === "string" ?
            { type: "POST", url: this.options.read } : 
            this.options.read;

        $.ajax($.extend(defaults, options));
    }
}

function parseDOM(element) {
    var result = {},
        parsedNode,
        node,
        nodeType,
        nodeName,
        member,
        attribute,
        attributes = element.attributes,
        attributeCount = attributes.length,
        idx;

    for (idx = 0; idx < attributeCount; idx++) {
       attribute = attributes[idx];
       result["@" + attribute.nodeName] = attribute.nodeValue;
    }

    for (node = element.firstChild; node; node = node.nextSibling) {
        nodeType = node.nodeType;

        if (nodeType === 3) {
            // text nodes are stored as #text field
            result["#text"] = node.nodeValue;
        } else if (nodeType === 1) { 
            // elements are stored as fields
            parsedNode = parseDOM(node);

            nodeName = node.nodeName;

            member = result[nodeName];

            if ($.isArray(member)) {
                // elements of same nodeName are stored as array
                member.push(parsedNode);
            } else if (member !== undefined) {
                member = [member, parsedNode];
            } else {
                member = parsedNode;
            }

            result[nodeName] = member;
        }
    }
    return result;
}

function evaluate(value, expression) {
    var members = expression.split("."),
        member,
        result,
        length,
        intermediateResult,
        idx;

    while (member = members.shift()) {
        value = value[member];

        if ($.isArray(value)) {
            result = [];
            expression = members.join(".");

            for (idx = 0, length = value.length; idx < length; idx++) {
                intermediateResult = evaluate(value[idx], expression);

                intermediateResult = $.isArray(intermediateResult) ? intermediateResult : [intermediateResult];

                result.push.apply(result, intermediateResult);
            }

            return result;
        }
    }

    return value;
}

function XmlDataReader(options) {
    var total = options.total,
        id = options.id,
        data = options.data,
        fields = options.fields;

    if (total) {
        total = getter(this.xpathToMember(total));
        this.total = function(data) {
            return parseInt(total(data));
        };
    }

    if (fields) {
        var createBody = "var r={};", field;

        for (field in fields) {
            createBody += 'r["' + field + '"]=a["' + fields[field] + '"];';
        }

        createBody += "return r;";

        this.create = new Function("a", createBody);
    }

    if (data) {
        data = this.xpathToMember(data);
        this.data = function(value) {
            var result = [], raw, idx, rawCount;

            raw = evaluate(value, data);

            for (idx = 0, rawCount = raw.length; idx < rawCount; idx++) {
                result.push(this.create(raw[idx]));
            }

            return result;
        };
    }

    if (id) {
        id = getter(this.xpathToMember(id));
        this.id = function(value) {
            return id(value);
        };
    }
}

XmlDataReader.prototype = {
    create: function(data) {
        return data;
    },

    id: function() {
    },

    total: function() {
    },

    read: function(xml) {
        return this.data(this.parse(xml));
    },

    parse: function(xml) {
        var documentElement,
            tree,
            result = {};

        documentElement = $.parseXML(xml).documentElement;

        tree = parseDOM(documentElement);

        result[documentElement.nodeName] = tree;

        return result;
    },

    xpathToMember: function(member) {
        if (!member) {
            return "";
        }

        member = member.replace(/^\//, "") // remove the first "/"
                       .replace(/\//g, "."); // replace all "/" with "."

        if (member.indexOf("@") >= 0) {
            // replace @attribute with '["@attribute"]'
            return member.replace(/\.?(@.*)/, '["$1"]');
        }

        if (member.indexOf("text()") >= 0) {
            // replace ".text()" with '["#text"]'
            return member.replace(/(\.?text\(\))/, '["#text"]');
        }

        return member;
    }
}

$.fn.tGrid = function(options) {
    $(this).each(function() {
        $(this).data("tGrid",
                new Grid(this, options));
    });

    return this;
}
