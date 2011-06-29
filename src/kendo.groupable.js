(function ($, window) {
    var kendo = window.kendo,       
        Component = kendo.ui.Component,
        proxy = $.proxy,
        indicatorTmpl = kendo.template('<div class="t-group-indicator" data-field="${data.field}" data-dir="${data.dir || "asc"}">' + 
                '<a href="#" class="t-link">' +
                    '<span class="t-icon t-arrow-${(data.dir || "asc") == "asc" ? "up" : "down"}-small">(sorted ${(data.dir || "asc") == "asc" ? "ascending": "descending"})</span>' +
                    '${data.field}' + 
                '</a>' + 
                '<a class="t-button t-button-icon t-button-bare">' +
                    '<span class="t-icon t-group-delete"></span>' + 
                '</a>' +
             '</div>',  { useWithBlock:false }),
        groupContainer,
        hint = function(target) {                    
            return $('<div class="t-header t-drag-clue" />')
                .html(target.data("field"))
                .prepend('<span class="t-icon t-drag-status t-denied" />');
        };

    var Groupable = Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            groupContainer = $(that.options.groupContainer, that.element)
                .kendoDropTarget()
                .kendoDraggable({
                    filter: "div.t-group-indicator",
                    hint: hint,
                    dragend: function(e) {
                        var draggable = this;                        
                        if(!draggable.dropped) {                            
                            that._removeIndicator(e.currentTarget);
                        }
                    }
                })
                .delegate(".t-button", "click", function(e) {
                    e.preventDefault();
                    that._removeIndicator($(this).parent());
                })
                .delegate(".t-link", "click", function(e) {
                    var current = $(this).parent(),
                        newIndicator = that.buildIndicator(current.data("field"), current.data("dir") == "asc" ? "desc" : "asc");
                                        
                    current.before(newIndicator).remove();
                    that._change();
                    e.preventDefault();
                });
            
            that.element.kendoDraggable({
                filter: that.options.filter,
                hint: hint,                
                dragend: function(e) {                                       
                    if(this.dropped) {
                        var field = e.currentTarget.data("field");
                        
                        if(!that.indicator(field)) {
                            groupContainer.append(that.buildIndicator(field));                            
                            that._change();
                        }
                    }                    
                }
            });  
            
            that.dataSource = that.options.dataSource;

            if(that.dataSource) {
                that.dataSource.bind("change", function() {
                    groupContainer.empty().append(
                        $.map(this.group() || [], function(item) {
                            return that.buildIndicator(item.field, item.dir);
                        }).join('')
                    );
                });
            }          
        },

        options: {
            filter: "th"
        },

        indicator: function(field) {
            return $.grep($(".t-group-indicator", groupContainer), function (item) 
                { 
                    return $(item).data("field") === field;
                })[0];
        },

        buildIndicator: function(field, dir) {            
            return indicatorTmpl({ field: field, dir: dir });
        },

        descriptors: function() {            
            return $.map($(".t-group-indicator", groupContainer), function(item) {
                item = $(item); 
                
                return {
                    field: item.data("field"),
                    dir: item.data("dir")
                };
            }); 
        },

        _removeIndicator: function(indicator) {
            indicator.remove();
            this._change();
        },

        _change: function() {
            var that = this;
            if(that.dataSource) {
                that.dataSource.group(that.descriptors());
            }
        }
    });

    kendo.ui.plugin("Groupable", Groupable);

})(jQuery, window);
