;(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        isPlainObject = $.isPlainObject,
        proxy = $.proxy,
        extend = $.extend,
        NS = ".kendoImageBrowser",
        ARRANGEBYTMPL = '<li data-#=ns#-value="#=value#" class="k-item">#=text#</li>',
        TOOLBARTMPL = '<div class="k-widget k-toolbar k-floatwrap">' +
                            '<div class="k-toolbar-wrap">' +
                            '<div class="k-widget k-upload"><div class="k-button k-button-icontext k-button-bare k-upload-button">' +
                                '<span class="k-icon k-add"></span>#=uploadFile#<input type="file" name="file" /></div></div>' +
                                '<button type="button" class="k-button k-button-icon k-button-bare"><span class="k-icon k-addfolder"></span></button>' +
                                '<button type="button" class="k-button k-button-icon k-button-bare k-state-disabled"><span class="k-icon k-delete"></span></button>&nbsp;' +
                            '</div>' +
                            '<div class="k-tiles-arrange">#=orderBy#: <a href="\\#" class="k-link"><span>#=orderByName#</span><span class="k-icon k-arrow-down"></span></a>' +
                            '</div>' +
                        '</div>',
        ITEMTMPL = '<li class="k-tile" data#=kendo.ns#-uid="#=uid#" data#=kendo.ns#-type="#=type#">' +
                        '<div class="k-thumb">' +
                            '<span class="k-icon k-loading"></span>' +
                        '</div>' +
                        '<strong>#=name#</strong>' +
                        '#if(type == "f") { #' +
                        '<span class="k-filesize">#=size#</span>' +
                        '#}#' +
                    '</li>';

    extend(true, kendo.data, {
        schemas: {
            "imagebrowser": {
                data: function(data) {
                    return data.items || [];
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

    if ($.browser.msie && parseFloat($.browser.version) < 8) {
        var offsetTop = function (element) {
            return element.offsetTop;
        }
    } else {
        var offsetTop = function (element) {
            return element.offsetTop - $(element).height();
        }
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
            }
        },

        events: [],

        destroy: function() {

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
                    that.toolbar.find(".k-tiles-arrange a span:first").html($(this).text());
                    popup.close();
                }).data("kendoPopup");

            link.on("click" + NS, function(e) {
                e.preventDefault();
                popup.toggle();
            });
        },

        _content: function() {
            var that = this;

            that.list = $('<ul class="k-reset k-floats k-tiles" />')
                .appendTo(that.element);

            that.listView = new kendo.ui.ListView(that.list, {
                dataSource: that.dataSource,
                template: ITEMTMPL,
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
                dataSource = { type: "imagebrowser" },
                transport = options.transport;

            if (isPlainObject(transport)) {
                dataSource.transport = transport;
            }

            that.dataSource = kendo.data.DataSource.create(dataSource);
        },

        refresh: function() {
            var that = this;

            that._toolbar();
            that._content();
        },

        _loadImage: function(li) {
            var that = this,
                element = $(li),
                dataItem = that.dataSource.getByUid(element.attr(kendo.attr("uid"))),
                name = dataItem.get("name"),
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
            img.attr("src", that.options.thumbnailUrl + "?path=" + that.path + encodeURIComponent(name));

            li.loaded = true;
        },

        _scroll: function(e) {
            var that = this;

            clearTimeout(that._timeout);

            that._timeout = setTimeout(proxy(function() {
                var height = that.element.outerHeight(),
                    viewTop = that.element.scrollTop(),
                    viewBottom = viewTop + height,
                    dataSource = that.dataSource;

                that._tiles.each(function() {
                    var top = offsetTop(this);
                    var bottom = top + this.offsetHeight;

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
        }
    });

    kendo.ui.plugin(ImageBrowser);
})(jQuery);
