import './kendo.core.js';
import './kendo.floatinglabel.js';

var __meta__ = {
    id: 'label',
    name: 'Label',
    category: 'framework',
    description: 'Abstraction of label rendering for inputs',
    depends: ['core', 'floatinglabel'],
    hidden: true
};

const kendo = window.kendo;
const $ = kendo.jQuery;
const ui = kendo.ui;
const Widget = ui.Widget;
const isFunction = kendo.isFunction;

const LABELCLASSES = "k-label k-input-label";

var Label = Widget.extend({
    options: {
        name: "Label",
        widget: null
    },

    init: function(element, options) {
        var that = this;

        element = element || $("<label></label>");

        Widget.fn.init.call(that, element, options);
        options = $.extend(true, {}, options);

        that.widget = options.widget;

        if (options.floating) {
            that._floatingLabel();
        }

        that._label();
    },

    destroy: function() {
        if (this.floatingLabel) {
            this.floatingLabel.destroy();
        }
        Widget.fn.destroy.call(this);
    },

    _unwrapFloating: function() {
        var that = this;

        if (that.floatingLabel) {
            that.floatingLabel.destroy();
            that.widget.wrapper.unwrap(that._floatingLabelContainer);
        }
    },

    setOptions: function(options) {
        var that = this;
        var removeFloating = false;

        if (typeof(options) === 'string' || ($.isPlainObject(options) && options.floating === false )) {
            removeFloating = true;
        }

        options = $.isPlainObject(options) ? options : { content: options };

        Widget.fn.setOptions.call(that, options);

        if (removeFloating && that.floatingLabel) {
            that._unwrapFloating();
            that.floatingLabel.destroy();
            delete that.floatingLabel;
        } else if (options.floating === true && !that.floatingLabel) {
            that.element.remove();
            that._floatingLabel();
        }

        that._label();

        if (that.floatingLabel) {
            that.floatingLabel.refresh();
        }
    },

    _label: function() {
        var that = this;
        var element = that.widget.element;
        var options = that.options;
        var id = element.attr("id");
        var labelText = options.content;

        if (isFunction(labelText)) {
            labelText = labelText.call(that);
        }

        if (!labelText) {
            labelText = "";
        }

        if (!id) {
            id = options.name + "_" + kendo.guid();
            element.attr("id", id);
        }

        that.element.addClass(LABELCLASSES)
            .attr("for", id)
            .text(labelText)
            .insertBefore(that.options.beforeElm || that.widget.wrapper);
    },

    _floatingLabel: function() {
        var that = this;
        var options = $.extend({}, that.options);
        var floating;

        delete options.name;

        floating = options.floating || false;

        if (floating) {
            that._floatingLabelContainer = that.widget.wrapper.wrap("<span></span>").parent();
            that.floatingLabel = new kendo.ui.FloatingLabel(that._floatingLabelContainer, $.extend({}, options));
        }
    }
});

kendo.ui.plugin(Label);