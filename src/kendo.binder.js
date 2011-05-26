(function ($) {
    var kendo = window.kendo,
        data = kendo.data,
        Model = data.Model;

    function bindSelect(select, model) {
        select = $(select);

        var text = select.attr("data-text-field"),
            value = select.attr("data-value-field"),
            source = select.attr("data-source");

        if (model[source]) {
            source = model[source].call(model);
        } else {
            try {
                source = eval(source);
            } catch(e) {
                return;
            }
        }

        if ($.isArray(source)) {
            select.html(kendo.render(kendo.template('<option value="${'+ value +'}">${' + text + '}</option>'), source));
        }
    }

    var ModelViewBinder = kendo.Class.extend({
        init: function(element, model, options) {
            var that = this;

            that.element = $(element);
            that.options = options || {};
            that.model = model instanceof Model ? model : new Model(model);

            that.element.find("input")
                .add(that.element)
                .bind("change", $.proxy(that._change, that))
                .each(function() {
                    var mapping = that._map(this);
                    if (mapping) {
                        mapping.bindView();
                    }
                });
        },

        _change: function(e) {
            var that = this,
                mapping = that._map(e.target);

            if (mapping) {
                mapping.bindModel();
            }
        },

        _map: function(target) {
            var that = this,
                model = that.model,
                options = that.options,
                field = $(target).attr("data-field") || target.name,
                setting = options[field] || {};

            if (field) {
                return {
                    bindView: function() {
                        var value = model.get(field);
                        if (setting.format) {
                            value = setting.format(value);
                        }

                        if (target.nodeName.toLowerCase() === "select") {
                            bindSelect(target, model);
                        }

                        target.value = value;
                    },
                    bindModel: function() {
                        var value = target.value;

                        if (setting.parse) {
                           value = setting.parse(value);
                        }
                        model.set(field, value);
                    }
                }
            }
        }
    });

    data.ModelViewBinder = ModelViewBinder;
})(jQuery);
