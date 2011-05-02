(function ($, window) {
    var kendo = window.kendo, 
        proxy = $.proxy,               
        MOUSEDOWN = "mousedown",
        MOUSEUP = "mouseup",
        MOUSEMOVE = "mousemove";    

    function Selectable(element, options) {
        var that = this;
        kendo.ui.Component.apply(that, arguments);
                	
        that.options = $.extend({}, that.options, options);		
        that._initSelectables();
        that._values = [];
        that.lasso = $("<div style='position:absolute;border:1px dotted black;'></div>");
        that._moveDelegate = proxy(that._move, that);
        that._upDelegate = proxy(that._up, that);
        that.element.bind(MOUSEDOWN, proxy(that._down, that));
    }

    Selectable.prototype = {
        options: {
                filter: "*",                
                single: true,
                selectedClass: "selected"
            },
            values: function () {
                return this._values;
            },            
            _indexOf: function (element) {
                var values = this._values;
                if (!Array.prototype.indexOf) {                    
                    for (var idx = 0, len = values.length; idx < len; idx++) {
                        if (values[idx] === element)
                            return idx;
                    }
                    return -1;                    
                }
                else {                    
                    return Array.prototype.indexOf.call(values, element);                    
                }
            },
            _selectElement: function (element, selected) {
                var that = this;
                if (selected) {
                    var index = that._indexOf(element[0]);
                    if (index < 0) {
                        element.addClass(that.options.selectedClass);
                        that._values.push(element[0]);
                    }
                }
                else {
                    element.removeClass(that.options.selectedClass);
                    var index = that._indexOf(element[0]);
                    that._values.splice(index, 1);
                }
            },
            _initSelectables: function() {
                var that = this;
                $(that.options.filter, that.element).each(function () {
                    var $this = $(this);
			        var pos = $this.offset();
                    $this.data("kendoSelectableItem", {
                        element: $this, 
                        selected: false,
                        selecting: false,
                        unselecting: false,
                        left: pos.left,
				        top: pos.top,
				        right: pos.left + $this.outerWidth(),
				        bottom: pos.top + $this.outerHeight()
                    });
                });
            },
            _down: function (event) {                
                var that = this;
                $(document)
                    .bind(MOUSEMOVE, that._moveDelegate)
			        .bind(MOUSEUP, that._upDelegate);

                that._originalPosition = {
                    x: event.pageX,
                    y: event.pageY
                };
                
                if (!that.options.single) {
                    $("body").append(that.lasso);
                    that.lasso.css({
                        "left": event.clientX,
                        "top": event.clientY,
                        "width": 0,
                        "height": 0
                    });
                }
                //unselect all selected
                $(that.options.filter, that.element).each(function () {
                    var selectee = $(this).data("kendoSelectableItem");
                    if (selectee && selectee.selected) {
                        selectee.selected = false;
                        selectee.selecting = false;
                        selectee.unselecting = true;
                        selectee.element.removeClass(that.options.selectedClass);
                    }
                });

                //select element
                $(event.target).parents().andSelf().each(function () {
                    var selectee = $(this).data("kendoSelectableItem");
                    if (selectee) {
                        selectee.selected = false;
                        selectee.unselecting = false;
                        selectee.selecting = true;
                        selectee.element.addClass(that.options.selectedClass);
                        return false;
                    }
                });

                event.preventDefault();
            },
            _move: function (event) {
                var that = this;
                if (that.options.single)
                    return;
                
                var pos = that._originalPosition;
                var x1 = pos.x,
                y1 = pos.y,
                x2 = event.pageX,
                y2 = event.pageY;
                if (x1 > x2) {
                    var tmp = x2;
                    x2 = x1;
                    x1 = tmp;
                }
                if (y1 > y2) {
                    var tmp = y2;
                    y2 = y1;
                    y1 = tmp;
                }

                that.lasso.css({
                    "left": x1,
                    "top": y1,
                    "width": x2 - x1,
                    "height": y2 - y1
                });

                $(that.options.filter, that.element).each(function () {
                    var selectee = $(this).data("kendoSelectableItem");
                    if (!selectee)
                        return;

                    var hitTest = (!(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1));
                    if (hitTest) {
                        if (!selectee.selecting) {
                            selectee.selecting = true;
                            selectee.element.addClass(that.options.selectedClass);
                        }
                    }
                    else {
                        if (selectee.selecting) {
                            selectee.selecting = false;                            
                            selectee.element.removeClass(that.options.selectedClass);
                        }
                    }
                });
            },
            _up: function (event) {
                var that = this;
                $(document)
                    .unbind(MOUSEMOVE, that._moveDelegate)
			        .unbind(MOUSEUP, that._upDelegate);
                if (!that.options.single) {
                    that.lasso.remove();
                }

                $(that.options.filter, that.element).each(function () {
                    var selectee = $(this).data("kendoSelectableItem");
                    if (selectee) {
                        if (selectee.selecting) {
                            selectee.selecting = false;
                            selectee.unselecting = false;
                            selectee.selected = true;
                            that._selectElement(selectee.element, true);
                        }
                        else if (selectee.unselecting) {
                            selectee.selecting = false;
                            selectee.unselecting = false;
                            selectee.selected = false;
                            that._selectElement(selectee.element, false);
                        }
                    }
                });

                console.log(that.values());
            }
    }
    kendo.ui.plugin("Selectable", Selectable, kendo.ui.Component);

   })(jQuery, window);
