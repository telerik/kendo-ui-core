(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        List = ui.List,
        CHANGE = "change",
        SELECTED = "t-state-selected",
        DISABLED = "t-state-disabled";

    var DropDownList = List.extend({
        init: function(element, options) {
            var that = this;

            options = $.isArray(options) ? { dataSource: options } : options;

            List.fn.init.call(that, element, options);

            that._word = "";

            that._wrapper();

            that._span();

            that._popup(that.wrapper);

            that._dataAccessors();

            that._dataSource();

            that.bind([CHANGE], that.options);

            if (that.element.prop("disabled")) {
                that.options.enable = false;
            }

            that.enable(that.options.enable);

            if (that.options.autoBind) {
                that.showBusy();
                that.dataSource.query();
            }
        },

        options: {
            enable: true,
            index: 0,
            autoBind: true,
            delay: 500,
            dataTextField: "text",
            dataValueField: "value",
            height: 200
        },

        enable: function(enable) {
            var that = this,
                wrapper = that.wrapper,
                element = that.element,
                ATTRIBUTE = "disabled";

            if (enable === false) {
                wrapper.addClass(DISABLED).unbind();
                element.attr(ATTRIBUTE, ATTRIBUTE);
            } else {
                element.removeAttr(ATTRIBUTE, ATTRIBUTE);
                wrapper
                    .removeClass(DISABLED)
                    .bind({
                        keydown: $.proxy(that._keydown, that),
                        keypress: function(e) {
                            setTimeout(function() {
                                that._word += String.fromCharCode(e.keyCode || e.charCode);
                                that._search();
                            });
                        },
                        click: function() {
                            if(!that.ul[0].firstChild) {
                                that.showBusy();
                                that.dataSource.read();
                            }
                        },
                        blur: function() {
                            that._bluring = setTimeout(function() {
                                that._blur();
                            }, 100);
                        }
                    });
            }
        },

        close: function() {
            this.popup.close();
        },

        open: function() {
            var that = this,
                current = that._current;

            if (!that.ul[0].firstChild) {
                that.showBusy();
                that.options.autoBind = false;
                that.dataSource.query();
            } else {
                that.popup.open();
                if (current) {
                    that._scroll(current[0]);
                }
            }
        },

        refresh: function() {
            var that = this,
                ul = that.ul,
                options = that.options,
                height = options.height,
                data = that.dataSource.view();

            ul[0].innerHTML = kendo.render(that.template, data);
            ul.height(data.length * 20 > height ? height : "auto");

            that._rebuildSelect(data);

            that.select(that.options.index);

            that.previous = that.value();

            if (!that.options.autoBind) {
                that[data.length ? "open" : "close"]();
            }

            that.hideBusy();
        },

        search: function(word) {
            if(word){
                var that = this;
                that.select(function(dataItem) {
                    var text = that._text(dataItem);
                    if (text !== undefined) {
                        return (text + "").toLowerCase().indexOf(word.toLowerCase()) === 0;
                    }
                });
            }
        },

        select: function(li) {
            var that = this,
                idx,
                length,
                text,
                value,
                current = that._current,
                data = that.dataSource.view(),
                children = that.ul[0].childNodes;

            if (current) {
                current.removeClass(SELECTED);
            }

            if (typeof li === "function") {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    if (li(data[idx])) {
                        li = idx;
                        break;
                    }
                }
            }

            if (typeof li === "number") {
                li = $(children[li]);
            }

            if (li[0] && !li.hasClass(SELECTED)) {
                idx = $.inArray(li[0], children);

                if (idx === -1) {
                    return;
                }

                data = data[idx];
                text = that._text(data);
                value = that._value(data);

                that.text(text);
                that.element[0].value = value != undefined ? value : text;
                that.current(li.addClass(SELECTED));
            }
        },

        text: function (text) {
            var span = this.span;

            if (text !== undefined) {
                span.text(text);
            } else {
                return span.text();
            }
        },

        value: function(value) {
            var that = this,
                element = that.element;

            if (value !== undefined) {
                var data = that.dataSource.view(),
                    index;

                if (data[0]) {
                    index = $.map(data, function(dataItem, idx) {
                        var val = that._value(dataItem);
                            val = val || val === 0 ? val : that._text(dataItem);

                        if (val == value) {
                            return idx;
                        }
                    });
                    that.select(index[0] || 0);
                    that.previous = element.val();
                }
            } else {
                return element.val();
            }
        },

        _accept: function(li) {
            var that = this;

            that.select(li);
            that._blur();

            if (that.wrapper[0] !== document.activeElement) {
                that.wrapper.focus();
            }
        },

        _keydown: function(e) {
            var prevent,
                that = this,
                key = e.keyCode,
                current = that._current,
                keys = kendo.keys;

            if (e.altKey) {
                if (key === keys.DOWN) {
                    that.open();
                } else if (key === keys.UP) {
                    that.close();
                }
            } else if (key === keys.DOWN) {
                that._move(current.next());

                prevent = true;
            } else if (key === keys.UP) {
                that._move(current.prev());

                prevent = true;
            } else if (key === keys.HOME) {
                that._move(that.ul.children().first());

                prevent = true;
            } else if (key === keys.END) {
                that._move(that.ul.children().last());

                prevent = true;
            } else if (key === keys.ENTER || key === keys.TAB) {
                that._accept(current);
            } else if (key === keys.ESC) {
                that.close();
            }

            if (prevent) {
                e.preventDefault();
            }
        },

        _search: function() {
            var that = this;
            clearTimeout(that._typing);

            that._typing = setTimeout(function() {
                that._word = "";
            }, that.options.delay);

            that.search(that._word);
        },

        _span: function() {
            var that = this,
                wrapper = that.wrapper,
                SELECTOR = ".t-input",
                span;

            span = wrapper.find(SELECTOR);

            if (!span[0]) {
                wrapper.append('<div class="t-dropdown-wrap t-state-default"><span class="t-input">&nbsp;</span><span class="t-select"><span class="t-icon t-arrow-down">select</span></span></div>')
                       .append(that.element);

                span = wrapper.find(SELECTOR);
            }
            that.span = span;

            that.arrow = wrapper.find(".t-icon");
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                DOMelement = element[0],
                TABINDEX = "tabIndex",
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("div.t-widget")) {
                wrapper = element.wrap("<div />").parent();
            }

            if (!wrapper.attr(TABINDEX)) {
                wrapper.attr(TABINDEX, 0);
            }

            wrapper[0].style.cssText = DOMelement.style.cssText;
            element.hide();

            that.wrapper = wrapper
                              .addClass("t-widget t-dropdown t-header")
                              .addClass(DOMelement.className);
        }
    });

    $.extend(DropDownList.fn, ui.Select);

    ui.plugin("DropDownList", DropDownList);
})(jQuery);
