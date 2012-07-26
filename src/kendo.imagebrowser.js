;(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        isPlainObject = $.isPlainObject,
        proxy = $.proxy,
        extend = $.extend,
        NS = ".kendoImageBrowser",
        BREADCRUBMSNS = ".kendoBreadcrumbs",
        NAMEFIELD = "name",
        SIZEFIELD = "size",
        TYPEFIELD = "type",
        DEFAULTSORTORDER = { field: TYPEFIELD, dir: "asc" },
        ARRANGEBYTMPL = '<li data-#=ns#value="#=value#" class="k-item">#=text#</li>',
        TOOLBARTMPL = '<div class="k-widget k-toolbar k-floatwrap">' +
                            '<div class="k-toolbar-wrap">' +
                            '<div class="k-widget k-upload"><div class="k-button k-button-icontext k-button-bare k-upload-button">' +
                                '<span class="k-icon k-add"></span>#=uploadFile#<input type="file" name="file" /></div></div>' +
                                '<button type="button" class="k-button k-button-icon k-button-bare"><span class="k-icon k-addfolder"></span></button>' +
                                '<button type="button" class="k-button k-button-icon k-button-bare k-state-disabled"><span class="k-icon k-delete"></span></button>&nbsp;' +
                            '</div>' +
                            '<div class="k-tiles-arrange">#=orderBy#: <a href="\\#" class="k-link"><span>#=orderByName#</span><span class="k-icon k-arrow-down"></span></a>' +
                            '</div>' +
                        '</div>';

    extend(true, kendo.data, {
        schemas: {
            "imagebrowser": {
                data: function(data) {
                    return data.items || [];
                },
                model: {
                    fields: {
                        name: "name",
                        size: "size",
                        type: "type"
                    }
                }
            }
        }
    });

    extend(true, kendo.data, {
        transports: {
            "imagebrowser": kendo.data.RemoteTransport.extend({
                init: function(options) {
                    kendo.data.RemoteTransport.fn.init.call(this, $.extend(true, {}, this.options, options));
                },
                read: function(options) {
                    if ($.isFunction(this.options.read)) {
                        this.options.read.call(this, options);
                    } else {
                        kendo.data.RemoteTransport.fn.read.call(this, options);
                    }
                }
            })
        }
    });

    var offsetTop;
    if ($.browser.msie && parseFloat($.browser.version) < 8) {
        offsetTop = function (element) {
            return element.offsetTop;
        };
    } else {
        offsetTop = function (element) {
            return element.offsetTop - $(element).height();
        };
    }

    function fieldName(fields, name) {
        var descriptor = fields[name];

        if (isPlainObject(descriptor)) {
            return descriptor.field || name;
        }
        return descriptor;
    }

    var ImageBrowser = Widget.extend({
        init: function(element, options) {
            var that = this;

            options = options || {};

            Widget.fn.init.call(that, element, options);

            that.element.addClass("k-image-browser");

            that._dataSource();

            that.refresh();

            that.dataSource.fetch();
        },

        options: {
            name: "ImageBrowser",
            messages: {
                uploadFile: "Upload",
                orderBy: "Arrange by",
                orderByName: "Name",
                orderBySize: "Size"
            },
            transport: {},
            path: "/"
        },

        events: [],

        destroy: function() {
            Widget.fn.destroy.call(this);
        },

        _toolbar: function() {
            var that = this,
                template = kendo.template(TOOLBARTMPL),
                messages = that.options.messages,
                link,
                popup,
                arrangeBy = [{ text: messages.orderByName, value: "name", ns: kendo.ns }, { text: messages.orderBySize, value: "size", ns: kendo.ns }];

            that.toolbar = $(template(messages))
                .appendTo(that.element)
                .find(".k-upload")
                .kendoUpload({
                    multiple: false
                }).end();

            link = that.toolbar.find(".k-tiles-arrange a");

            that.arrangeByPopup = popup = $("<ul>" + kendo.render(kendo.template(ARRANGEBYTMPL), arrangeBy) + "</ul>")
                .kendoPopup({
                    anchor: link
                })
                .on("click" + NS, "li", function() {
                    var item = $(this),
                        field = item.attr(kendo.attr("value"));

                    that.toolbar.find(".k-tiles-arrange a span:first").html(item.text());
                    popup.close();

                    that.orderBy(field);

                }).data("kendoPopup");

            link.on("click" + NS, function(e) {
                e.preventDefault();
                popup.toggle();
            });
        },

        orderBy: function(field) {
            this.dataSource.sort([
                DEFAULTSORTORDER,
                { field: this._getFieldName(field), dir: "asc" }
            ]);
        },

        _content: function() {
            var that = this;

            that.list = $('<ul class="k-reset k-floats k-tiles" />')
                .appendTo(that.element);

            that.listView = new kendo.ui.ListView(that.list, {
                dataSource: that.dataSource,
                template: that._itemTmpl(),
                autoBind: false,
                dataBound: function() {
                    that._tiles = this.items().filter("[" + kendo.attr("type") + "=f]");
                    that._scroll();
                }
            });
        },

        _dataSource: function() {
            var that = this,
                options = that.options,
                transport = options.transport,
                sortOrder = extend({}, DEFAULTSORTORDER),
                dataSource = {
                    type: "imagebrowser",
                    sort: sortOrder
                };

            if (isPlainObject(transport)) {
                dataSource.transport = transport;
            }

            if (isPlainObject(options.schema)) {
                dataSource.schema = options.schema;
                if (isPlainObject(options.schema.model) && options.schema.model.fields) {
                    sortOrder.field = fieldName(options.schema.model.fields, TYPEFIELD);
                }
            }
            that.dataSource = kendo.data.DataSource.create(dataSource);
        },

        _navigation: function() {
            $('<div class="k-floatwrap"><input/></div>')
                .appendTo(this.element)
                .find("input")
                .kendoBreadcrumbs({
                    value: this.options.path
                });
        },

        refresh: function() {
            var that = this;
            that._navigation();
            that._toolbar();
            that._content();
        },

        _loadImage: function(li) {
            var that = this,
                element = $(li),
                dataItem = that.dataSource.getByUid(element.attr(kendo.attr("uid"))),
                name = dataItem.get(that._getFieldName(NAMEFIELD)),
                img = $("<img />", {
                    alt: name
                })
                .hide()
                .on("load" + NS, function() {
                    $(this).prev().remove().end().addClass("k-image").fadeIn();
                });

            element.find(".k-loading").after(img);

            // IE8 will trigger the load event immediately when the src is assign
            // if the image is loaded from the cache
            img.attr("src", that.options.transport.thumbnailUrl + "?path=" + that.path() + encodeURIComponent(name));

            li.loaded = true;
        },

        _scroll: function(e) {
            var that = this;

            clearTimeout(that._timeout);

            that._timeout = setTimeout(proxy(function() {
                var height = that.element.outerHeight(),
                    viewTop = that.element.scrollTop(),
                    viewBottom = viewTop + height;

                that._tiles.each(function() {
                    var top = offsetTop(this),
                        bottom = top + this.offsetHeight;

                    if ((top >= viewTop && top < viewBottom) || (bottom >= viewTop && bottom < viewBottom)) {
                        that._loadImage(this);
                    }

                    if (top > viewBottom) {
                        return false;
                    }
                });

                that._tiles = that._tiles.filter(function() {
                    return !this.loaded;
                });

            }, this), 250);
        },

        _itemTmpl: function() {
            var that = this,
                html = '<li class="k-tile" ' + kendo.attr("uid") + '="#=uid#" ';

            html += kendo.attr("type") + '="#=' + that._getFieldName(TYPEFIELD) + '#">';
            html += '#if(' + that._getFieldName(TYPEFIELD) + ' == "d") { #';
            html += '<div class="k-thumb"><span class="k-icon k-folder"></span></div>';
            html += "#}else{#";
            html += '<div class="k-thumb"><span class="k-icon k-loading"></span></div>';
            html += "#}#";
            html += '<strong>#=' + that._getFieldName(NAMEFIELD) + '#</strong>';
            html += '#if(' + that._getFieldName(TYPEFIELD) + ' == "f") { # <span class="k-filesize">#=' + that._getFieldName(SIZEFIELD) + '#</span> #}#';
            html += '</li>';

            return html;
        },

        _getFieldName: function(name) {
            return fieldName(this.dataSource.reader.model.fields, name);
        },

        path: function() {
            var p = "/";
            return p === this.options.path ? "" : p;
        }
    });

    var Breadcrumbs = Widget.extend({
        init: function(element, options) {
            var that = this;

            options = options || {};

            Widget.fn.init.call(that, element, options);

            that._wrapper();

            that.wrapper
                .on("focus" + BREADCRUBMSNS, "input", proxy(that._focus, that))
                .on("blur" + BREADCRUBMSNS, "input", proxy(that._blur, that))
                .on("keydown" + BREADCRUBMSNS, "input", proxy(that._keydown, that))
                .on("click" + BREADCRUBMSNS, "a", proxy(that._click, that));

            that.value(that.options.value);
        },

        options: {
            name: "Breadcrumbs"
        },

        events: [ "change" ],

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.wrapper
                .off("focus" + BREADCRUBMSNS, "input")
                .off("keydown" + BREADCRUBMSNS, "input")
                .off("blur" + BREADCRUBMSNS, "input")
                .off("click" + BREADCRUBMSNS, "a");
        },

        _update: function(val) {
            val = (val || "").charAt(0) === "/" ? val : ("/" + (val || ""));

            if (val !== this.value()) {
                this.value(val);
                this.trigger("change");
            }
        },

        _click: function(e) {
            e.preventDefault();
            this._update(this._path($(e.target).prevAll("a").andSelf()));
        },

        _focus: function() {
            var that = this,
                element = that.element;

            that.overlay.hide();
            that.element.val(that.value());

            setTimeout(function() {
               element.select();
            });
        },

        _blur: function() {
            var that = this,
                element = that.element,
                val = element.val().replace(/\/{2,}/g, "/");

            that.overlay.show();
            element.val("");
            that._update(val);
        },

        _keydown: function(e) {
            if (e.keyCode === 13) {
                this._blur();
            }
        },

        _wrapper: function() {
            var element = this.element,
                wrapper = element.parents(".k-breadcrumbs"),
                overlay;

            element[0].style.width = "";
            element.addClass("k-input");

            if (!wrapper.length) {
                wrapper = element.wrap($('<div class="k-widget k-breadcrumbs k-header k-state-default"/>')).parent();
            }

            overlay = wrapper.find(".k-breadcrumbs-wrap");
            if (!overlay.length) {
                overlay = $('<div class="k-breadcrumbs-wrap"/>').appendTo(wrapper);
            }
            this.wrapper = wrapper;
            this.overlay = overlay;
        },

        refresh: function() {
            var html = "",
                value = this.value(),
                segments,
                segment,
                idx,
                length;

            if (value === undefined || !value.match(/^\//)) {
                value = "/" + (value || "");
            }

            segments = value.split("/");

            for (idx = 0, length = segments.length; idx < length; idx++) {
                segment = segments[idx];
                if (segment) {
                    html += '<a class="k-link" href="#">' + segments[idx] + '</a>';
                    html += '<span class="k=icon k-arrow-next">&gt;</span>';
                }
            }
            this.overlay.empty().append($(html));
        },

        value: function(val) {
            if (val !== undefined) {
                this._value = val.replace(/\/{2,}/g, "/");
                this.refresh();
                return;
            }
            return this._value;
        },

        _path: function(trail) {
            return "/" + $.map(trail, function(b) {
                return $(b).text();
            }).join("/");
        }
    });

    kendo.ui.plugin(ImageBrowser);
    kendo.ui.plugin(Breadcrumbs);
})(jQuery);
