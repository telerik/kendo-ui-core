(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        isFunction = $.isFunction;

    extend(true, kendo.data, {
        schemas: {
            "imagebrowser-aspnetmvc": {
                data: function(data) {
                    return data || [];
                },
                model: {
                    id: "Name",
                    fields: {
                        name: "Name",
                        size: "Size",
                        type: { field: "EntryType", parse: function(value) {  return value == 0 ? "f" : "d" } }
                    }
                }
            }
        }
    });

    extend(true, kendo.data, {
        transports: {
            "imagebrowser-aspnetmvc": kendo.data.RemoteTransport.extend({
                init: function(options) {
                    kendo.data.RemoteTransport.fn.init.call(this, $.extend(true, {}, this.options, options));
                },
                _call: function(type, options) {
                    options.data = $.extend({}, options.data, { path: this.options.path() });

                    if (isFunction(this.options[type])) {
                        this.options[type].call(this, options);
                    } else {
                        kendo.data.RemoteTransport.fn[type].call(this, options);
                    }
                },
                read: function(options) {
                    this._call("read", options);
                },
                create: function(options) {
                    this._call("create", options);
                },
                destroy: function(options) {
                    this._call("destroy", options);
                },
                update: function() {
                    //updates are handled by the upload
                },
                options: {
                    read: {
                        type: "POST"
                    },
                    update: {
                        type: "POST"
                    },
                    create: {
                        type: "POST"
                    },
                    destroy: {
                        type: "POST"
                    },
                    parameterMap: function(options, type) {
                        if (type != "read") {
                            options.EntryType = options.EntryType === "f" ? 0 : 1;
                        }
                        return options;
                    }
                }
            })
        }
    });


})(jQuery);
