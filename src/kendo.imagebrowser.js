;(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        isPlainObject = $.isPlainObject,
        proxy = $.proxy,
        extend = $.extend,
        placeholderSupported = kendo.support.placeholder,
        trimSlashesRegExp = /(^\/|\/$)/g,
        CHANGE = "change",
        ERROR = "error",
        NS = ".kendoImageBrowser",
        BREADCRUBMSNS = ".kendoBreadcrumbs",
        SEARCHBOXNS = ".kendoSearchBox",
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

    function concatPaths(path, name) {
        if(path === undefined || !path.match(/\/$/)) {
            path = (path || "") + "/";
        }
        return path + encodeURIComponent(name);
    }

    function sizeFormatter(value) {
        if(!value) {
            return "";
        }

        var suffix = " bytes";

        if (value >= 1073741824) {
            suffix = " GB";
            value /= 1073741824;
        } else if (value >= 1048576) {
            suffix = " MB";
            value /= 1048576;
        } else  if (value >= 1024) {
            suffix = " KB";
            value /= 1024;
        }

        return Math.round(value * 100) / 100 + suffix;
    }

    var ImageBrowser = Widget.extend({
        init: function(element, options) {
            var that = this;

            options = options || {};

            Widget.fn.init.call(that, element, options);

            that.element.addClass("k-image-browser");

            that._dataSource();

            that.refresh();

            that.path(that.options.path);
        },

        options: {
            name: "ImageBrowser",
            messages: {
                uploadFile: "Upload",
                orderBy: "Arrange by",
                orderByName: "Name",
                orderBySize: "Size",
                directoryNotFound: "A directory with this name was not found."
            },
            transport: {},
            path: "/"
        },

        events: [ERROR, CHANGE],

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.dataSource
                .unbind(ERROR, this._errorHandler);
        },

        value: function() {
            var selected = this._selectedItem();

            if (selected && selected.get(this._getFieldName(TYPEFIELD)) === "f") {
                return concatPaths(this.path(), selected.get(this._getFieldName(NAMEFIELD)));
            }
        },

        _selectedItem: function() {
            var listView = this.listView,
                selected = listView.select();

            if (selected.length) {
                return this.dataSource.getByUid(selected.attr(kendo.attr("uid")));
            }
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

        search: function(name) {
            this.dataSource.filter({
                field: this._getFieldName(NAMEFIELD),
                operator: "contains",
                value: name
            });
        },

        _content: function() {
            var that = this;

            that.list = $('<ul class="k-reset k-floats k-tiles" />')
                .appendTo(that.element);

            that.listView = new kendo.ui.ListView(that.list, {
                dataSource: that.dataSource,
                template: that._itemTmpl(),
                selectable: true,
                autoBind: false,
                dataBound: function() {
                    that._tiles = this.items().filter("[" + kendo.attr("type") + "=f]");
                    that._scroll();
                },
                change: proxy(that._listViewChange, that)
            });
        },

        _listViewChange: function() {
            var selected = this._selectedItem();
            if (selected && selected.get(this._getFieldName(TYPEFIELD)) === "f") {
                this.trigger(CHANGE);
            }
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
            if (that.dataSource && that._errorHandler) {
                that.dataSource.unbind(ERROR, that._errorHandler);
            } else {
                that._errorHandler = proxy(that._error, that);
            }
            that.dataSource = kendo.data.DataSource.create(dataSource)
                .bind(ERROR, that._errorHandler);
        },

        _navigation: function() {
            var that = this,
                navigation = $('<div class="k-floatwrap"><input/><input/></div>')
                    .appendTo(this.element);

            that.breadcrumbs = navigation.find("input:first")
                    .kendoBreadcrumbs({
                        value: that.options.path,
                        change: function() {
                            that.path(this.value());
                        }
                    }).data("kendoBreadcrumbs");

            that.searchBox = navigation.parent().find("input:last")
                    .kendoSearchBox({
                        change: function() {
                            that.search(this.value());
                        }
                    }).data("kendoSearchBox");
        },

        _error: function(e) {
            var that = this,
                status;

            if (!that.trigger(ERROR, e)) {
                status = e.xhr.status;

                if (e.status == 'error') {
                    if (status == '404') {
                        that._showMessage(that.options.messages.directoryNotFound);
                    } else if (status != '0') {
                        that._showMessage('Error! The requested URL returned ' + status + ' - ' + e.xhr.statusText);
                    }
                } else if (status == 'timeout') {
                    that._showMessage('Error! Server timeout.');
                }
            }
        },

        _showMessage: function(message) {
            window.alert(message);
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

            html += kendo.attr("type") + '="${' + that._getFieldName(TYPEFIELD) + '}">';
            html += '#if(' + that._getFieldName(TYPEFIELD) + ' == "d") { #';
            html += '<div class="k-thumb"><span class="k-icon k-folder"></span></div>';
            html += "#}else{#";
            html += '<div class="k-thumb"><span class="k-icon k-loading"></span></div>';
            html += "#}#";
            html += '<strong>${' + that._getFieldName(NAMEFIELD) + '}</strong>';
            html += '#if(' + that._getFieldName(TYPEFIELD) + ' == "f") { # <span class="k-filesize">${this.sizeFormatter(' + that._getFieldName(SIZEFIELD) + ')}</span> #}#';
            html += '</li>';

            return proxy(kendo.template(html), { sizeFormatter: sizeFormatter } );
        },

        _getFieldName: function(name) {
            return fieldName(this.dataSource.reader.model.fields, name);
        },

        path: function(value) {
            var that = this,
                path = that._path || "";

            if (value !== undefined) {
                that._path = value.replace(trimSlashesRegExp, "") + "/";
                that.dataSource.read({ path: that._path });
                return;
            }

            if (path) {
                path = path.replace(trimSlashesRegExp, "");
            }

            return path === "/" || path === "" ? "" : (path + "/");
        }
    });

    var SearchBox = Widget.extend({
        init: function(element, options) {
            var that = this;

            options = options || {};

            Widget.fn.init.call(that, element, options);

            if (placeholderSupported) {
                that.element.attr("placeholder", that.options.label);
            }

            that._wrapper();

            that.element
                .on("keydown" + SEARCHBOXNS, proxy(that._keydown, that))
                .on("change" + SEARCHBOXNS, proxy(that._updateValue, that));

            that.wrapper
                .on("click" + SEARCHBOXNS, "a", proxy(that._updateValue, that));

            if (!placeholderSupported) {
                that.element.on("focus" + SEARCHBOXNS, proxy(that._focus, that))
                    .on("blur" + SEARCHBOXNS, proxy(that._blur, that));
            }
        },

        options: {
            name: "SearchBox",
            label: "Search",
            value: ""
        },

        events: [ CHANGE ],

        destroy: function() {
            var that = this;

            that.wrapper
                .add(that.element)
                .add(that.label)
                .off(SEARCHBOXNS);

            Widget.fn.destroy.call(that);
        },

        _keydown: function(e) {
            if (e.keyCode === 13) {
                this._updateValue();
            }
        },

        _updateValue: function() {
            var that = this,
                value = that.element.val();

            if (value !== that.value()) {
                that.value(value);

                that.trigger(CHANGE);
            }
        },

        _blur: function() {
            this._updateValue();
            this._toggleLabel();
        },

        _toggleLabel: function() {
            if (!placeholderSupported) {
                this.label.toggle(!this.element.val());
            }
        },

        _focus: function() {
            this.label.hide();
        },

        _wrapper: function() {
            var element = this.element,
                wrapper = element.parents(".k-search-wrap");

            element[0].style.width = "";
            element.addClass("k-input");

            if (!wrapper.length) {
                wrapper = element.wrap($('<div class="k-widget k-search-wrap k-textbox"/>')).parent();
                if (!placeholderSupported) {
                    $('<label style="display:block">' + this.options.label + '</label>').insertBefore(element);
                }
                $('<a href="#" class="k-icon k-search"/>').appendTo(wrapper);
            }

            this.wrapper = wrapper;
            this.label = wrapper.find(">label");
        },

        value: function(value) {
            var that = this;

            if (value !== undefined) {
                that.options.value = value;
                that.element.val(value);
                that._toggleLabel();
                return;
            }
            return that.options.value;
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
            name: "Breadcrumbs",
            gap: 50
        },

        events: [ CHANGE ],

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.wrapper
                .add(that.wrapper.find("input"))
                .add(that.wrapper.find("a"))
                .off(BREADCRUBMSNS);
        },

        _update: function(val) {
            val = (val || "").charAt(0) === "/" ? val : ("/" + (val || ""));

            if (val !== this.value()) {
                this.value(val);
                this.trigger(CHANGE);
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
            if (this.overlay.is(":visible")) {
                return;
            }

            var that = this,
                element = that.element,
                val = element.val().replace(/\/{2,}/g, "/");

            that.overlay.show();
            element.val("");
            that._update(val);
        },

        _keydown: function(e) {
            var that = this;
            if (e.keyCode === 13) {
                that._blur();

                setTimeout(function() {
                    that.overlay.find("a:first").focus();
                });
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

            this._adjustSectionWidth();
        },

        _adjustSectionWidth: function() {
            var that = this,
                wrapper = that.wrapper,
                width = wrapper.width() - that.options.gap,
                links = that.overlay.find("a"),
                a;

            links.each(function(index) {
                a = $(this);

                if (a.parent().width() > width) {
                    if (index == links.length - 1) {
                        a.width(width);
                    } else {
                        a.prev().andSelf().hide();
                    }
                }
            });
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
    kendo.ui.plugin(SearchBox);
})(jQuery);
