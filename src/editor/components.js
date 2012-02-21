(function($, undefined) {

/* select box */

kendo.ui.selectbox = function (element, options) {
    var selectedValue;
    var $element = $(element).attr("tabIndex", 0);
    var $text = $element.find('.k-input');

    var dropDown = this.dropDown = new $t.dropDown({
        effects: $t.fx.slide.defaults(),
        onItemCreate: options.onItemCreate,
        onClick: function (e) {
            select(options.data[$(e.item).index()].Value);
            options.onChange({ value: selectedValue })
        }
    });

    function fill() {
        if (!dropDown.$items)
            dropDown.dataBind(options.data);
    }

    function text(value) {
        $text.html(value ? value : '&nbsp;');
    }

    function select(item) {
        fill();
        var index = -1;

        for (var i = 0, len = options.data.length; i < len; i++) {
            if (options.data[i].Value == item) {
                index = i;
                break;
            }
        }

        if (index != -1) {

            dropDown.$items
                    .removeClass('k-state-selected')
                    .eq(index).addClass('k-state-selected');

            text($(dropDown.$items[index]).text());
            selectedValue = options.data[index].Value;
        }
    }

    this.value = function (value) {
        if (value == undefined)
            return selectedValue;

        select(value);

        if (selectedValue != value)
            text(options.title || value);       
    }

    this.close = function () {
        dropDown.close();
    }

    text(options.title || $text.text());

    $element.click(function (e) {
        fill();
        if (dropDown.isOpened())
            dropDown.close();
        else
            dropDown.open({
                offset: $element.offset(),
                outerHeight: $element.outerHeight(),
                outerWidth: $element.outerWidth(),
                zIndex: $t.getElementZIndex($element[0])
            });
    })
    .find('*')
    .attr('unselectable', 'on')
    .end()
    .keydown(function(e) {
        var key = e.keyCode, selected, prev, next;

        if (key === 40) {
            if (!dropDown.isOpened()) {
                $element.click();
            } else {
                selected = dropDown.$items.filter(".k-state-selected");
                if (!selected[0]) {
                    next = dropDown.$items.first();
                } else {
                    next = selected.next();
                }
                if (next[0]) {
                    selected.removeClass("k-state-selected");
                    next.addClass("k-state-selected");
                }
            }
            e.preventDefault();
        } else if (key === 38) {
            if (dropDown.isOpened()) {
                selected = dropDown.$items.filter(".k-state-selected");
                prev = selected.prev();
                if (prev[0]) {
                    selected.removeClass("k-state-selected");
                    prev.addClass("k-state-selected");
                }
            }
            e.preventDefault();
        } else if (key == 13) {
            selected = dropDown.$items.filter(".k-state-selected");
            if (selected[0]) {
                selected.click();
            }
            e.preventDefault();
        } else if (e.keyCode == 9 || e.keyCode == 39 || e.keyCode == 37) {
            dropDown.close();
        }
    });

    if ($.browser.msie) {
        $element.focus(function() {
            $element.css("outline", "1px dotted #000");
        })
        .blur(function() {
            $element.css("outline", "");
        });
    }

    dropDown.$element.css('direction', $element.closest('.k-rtl').length > 0 ? 'rtl' : '');

    $(document.documentElement).bind('mousedown', $.proxy(function (e) {
        var $dropDown = dropDown.$element;
        var isDropDown = $dropDown && $dropDown.parent().length > 0;

        if (isDropDown && !$.contains(element, e.target) && !$.contains($dropDown.parent()[0], e.target)) {
            dropDown.close();
        }

    }, this));
}

$.fn.tSelectBox = function (options) {
    return $t.create(this, {
        name: 'tSelectBox',
        init: function (element, options) {
            return new $t.selectbox(element, options)
        },
        options: options
    });
};

$.fn.tSelectBox.defaults = {
    // effects: $t.fx.slide.defaults()
};

/* color picker */

kendo.ui.colorpicker = function (element, options) {
    var that = this;

    that.element = element;
    var $element = $(element);

    $.extend(that, options);

    $element.attr("tabIndex", 0)
            .click($.proxy(that.click, that))
            .keydown(function(e) {
                var popup = that.popup(), selected, next, prev;
                if (e.keyCode == 40) {
                    if (!popup.is(":visible")) {
                        that.open();
                    } else {
                       selected = popup.find(".k-state-selected");
                       if (selected[0]) {
                           next = selected.next();
                       } else {
                           next = popup.find("li:first");
                       }
                       if (next[0]) {
                            selected.removeClass("k-state-selected");
                            next.addClass("k-state-selected");
                       } 
                    }
                    e.preventDefault();
                } else if (e.keyCode == 38) {
                    if (popup.is(":visible")) {
                       selected = popup.find(".k-state-selected");
                       prev = selected.prev();
                       if (prev[0]) {
                            selected.removeClass("k-state-selected");
                            prev.addClass("k-state-selected");
                       } 
                    }
                    e.preventDefault();
                } else if (e.keyCode == 9 || e.keyCode == 39 || e.keyCode == 37) {
                    that.close();
                } else if (e.keyCode == 13) {
                   popup.find(".k-state-selected").click();
                   e.preventDefault();
                }
            })
            .find('*')
            .attr('unselectable', 'on');

    if ($.browser.msie) {
        $element.focus(function () {
            $element.css("outline", "1px dotted #000");
        })
        .blur(function() {
            $element.css("outline", "");
        });
    }    

    if (that.selectedColor)
        $element.find('.k-selected-color').css('background-color', this.selectedColor);

    $(element.ownerDocument.documentElement)
        .bind('mousedown', $.proxy(function (e) {
            if (!$(e.target).closest('.k-colorpicker-popup').length) {
                this.close();
            }
        }, that));

    $t.bind(that, {
        change: that.onChange,
        load: that.onLoad
    });
}

kendo.ui.colorpicker.prototype = {
    select: function(color) {
        if (color) {
            color = dom.toHex(color);
            if (!this.trigger('change', { value: color })) {
                this.value(color);
                this.close();
            }
        } else
            this.trigger('change', { value: this.selectedColor })
    },

    open: function() {
        var $popup = this.popup();
        var $element = $(this.element);

        var elementPosition = $element.offset();
        elementPosition.top += $element.outerHeight();

        if ($element.closest('.k-rtl').length)
            elementPosition.left -= $popup.outerWidth() - $element.outerWidth();

        var zIndex = 'auto';

        $element.parents().andSelf().each(function () {
            zIndex = $(this).css('zIndex');
            if (Number(zIndex)) {
                zIndex = Number(zIndex) + 1;
                return false;
            }
        });

        $t.fx._wrap($popup).css($.extend({
            position: 'absolute',
            zIndex: zIndex
        }, elementPosition));
        
        $popup
            .find('.k-item').bind('click', $.proxy(function(e) {
                var color = $(e.currentTarget, e.target.ownerDocument).find("div").css('background-color');
                this.select(color);
            }, this));

        // animate
        $t.fx.play(this.effects, $popup, { direction: 'bottom' });
    },

    close: function() {
        if (!this.$popup) return;

        $t.fx.rewind(this.effects, this.$popup, { direction: 'bottom' }, $.proxy(function() {
            if (this.$popup) {
                dom.remove(this.$popup[0].parentNode);
                this.$popup = null;
            }
        }, this));
    },

    toggle: function() {
        if (!this.$popup || !this.$popup.is(':visible'))
            this.open();
        else {
            this.close();
        }
    },

    click: function(e) {
        if ($(e.target).closest('.k-tool-icon').length > 0)
            this.select();
        else
            this.toggle();
    },

    value: function(color) {
        if (!color)
            return this.selectedColor;

        color = dom.toHex(color);

        this.selectedColor = color;

        $('.k-selected-color', this.element)
            .css('background-color', color);
    },

    popup: function() {
        if (!this.$popup)
            this.$popup = $($t.colorpicker.buildPopup(this))
                    .hide()
                    .appendTo(document.body)
                    .find('*')
                    .attr('unselectable', 'on')
                    .end();

        return this.$popup;
    }
}

$.extend(kendo.ui.colorpicker, {
    buildPopup: function(component) {
        var html = new $t.stringBuilder();

        html.cat('<div class="k-popup k-group k-colorpicker-popup">')
            .cat('<ul class="k-reset">');

        var data = component.data;
        var currentColor = (component.value() || '').substring(1);

        for (var i = 0, len = data.length; i < len; i++) {
            html.cat('<li class="k-item')
                .catIf(' k-state-selected', data[i] == currentColor)
                .cat('"><div style="background-color:#')
                .cat(data[i])
                .cat('"></div></li>');
        }

        html.cat('</ul></div>');

        return html.string();
    }
});

$.fn.tColorPicker = function (options) {
    return $t.create(this, {
        name: 'tColorPicker',
        init: function (element, options) {
            return new $t.colorpicker(element, options)
        },
        options: options
    });
};

$.fn.tColorPicker.defaults = {
    data: '000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7'.split(','),
    selectedColor: null
    //effects: $t.fx.slide.defaults()
};

})(jQuery);
