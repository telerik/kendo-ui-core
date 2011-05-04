(function ($, window) {
    var kendo = window.kendo, 
        keys = kendo.keys,
        proxy = $.proxy,               
        MOUSEDOWN = "mousedown",
        MOUSEUP = "mouseup",
        MOUSEMOVE = "mousemove"       

    function Selectable(element, options) {
        var that = this;
        kendo.ui.Component.apply(that, arguments);
                	
        that.options = $.extend({}, that.options, options);		       
        that._marquee = $("<div class='t-marquee'></div>");

        that._moveDelegate = proxy(that._move, that);
        that._upDelegate = proxy(that._up, that);

        that._eventSelector = "." + that.options.selectableClass + " " + that.options.filter;

        that.element.addClass(that.options.selectableClass);                
        that.element.delegate(that._eventSelector, MOUSEDOWN, proxy(that._down, that));     
    }
    
    Selectable.prototype = {
        options: {
                filter: ">*",
                single: true,
                selectedClass: "t-state-selected",
                selectingClass: "t-state-selecting",
                selectableClass: "t-selectable",
                unselectingClass: "t-unselecting"
            },
            _collide: function(element, marqueePos) {
                var pos = element.offset();
                var selectee = {
                            left: pos.left,
				            top: pos.top,
				            right: pos.left + element.outerWidth(),
				            bottom: pos.top + element.outerHeight()
                };
                return (!(selectee.left > marqueePos.right 
                    || selectee.right < marqueePos.left 
                    || selectee.top > marqueePos.bottom 
                    || selectee.bottom < marqueePos.top));
            },
            _position: function(event) {
                var pos = this._originalPosition;
                var left = pos.x,
                top = pos.y,
                right = event.pageX,
                bottom = event.pageY;
                if (left > right) {
                    var tmp = right;
                    right = left;
                    left = tmp;
                }
                if (top > bottom) {
                    var tmp = bottom;
                    bottom = top;
                    top = tmp;
                }

                return {
                    top: top,
                    right: right,
                    left: left,
                    bottom: bottom
                };
            },
            _down: function (event) {                
                var that = this,                    
                    ctrlKey = event.ctrlKey,
                    shiftKey = event.shiftKey;

                that._downTarget = $(event.currentTarget)

                $(document).bind(MOUSEUP, that._upDelegate);     
                if(!that.options.single) {
                    $(document).bind(MOUSEMOVE, that._moveDelegate)
                }           

                that._originalPosition = {
                    x: event.pageX,
                    y: event.pageY
                };
                
                if (!that.options.single) {
                    $("body").append(that._marquee);
                    that._marquee.css({
                        "left": event.clientX + 1,
                        "top": event.clientY + 1,
                        "width": 0,
                        "height": 0
                    });
                }
               
                var wasSelected = that._downTarget.hasClass(that.options.selectedClass);                
                if(that.options.single || !ctrlKey) {
                    //unselect all selected
                    that.element
                        .find(that.options.filter + "." + that.options.selectedClass)
                        .removeClass(that.options.selectedClass);                    
                }                      

                if(!that._downTarget.hasClass(that.options.selectedClass)) {                    
                    if(wasSelected && ctrlKey) {
                        that._downTarget.addClass(that.options.selectedClass);
                        if(that.options.single) {
                            that._downTarget.addClass(that.options.unselectingClass);
                        }
                    }
                    else {
                        that._downTarget.addClass(that.options.selectingClass);
                    }
                }
                
                event.preventDefault();
            },
            _move: function (event) {
                var that = this,
                    pos = that._position(event),
                    ctrlKey = event.ctrlKey,
                    selectingClassName = that.options.selectingClass,
                    selectedClassName = that.options.selectedClass,
                    unselectingClassName = that.options.unselectingClass;
                
                that._marquee.css({
                    "left": pos.left,
                    "top": pos.top,
                    "width": pos.right - pos.left,
                    "height": pos.bottom - pos.top
                });                
                that.element.find(that.options.filter).each(function () {                    
                    var selectee = $(this),
                        collide = that._collide(selectee, pos);
                        
                    if (collide) {         
                        if(selectee.hasClass(selectedClassName)) {
                            if(ctrlKey && that._downTarget[0] !== selectee[0]) {                                
                                selectee
                                    .removeClass(selectedClassName)
                                    .addClass(unselectingClassName);
                            }
                        } else if (!selectee.hasClass(selectingClassName) && !selectee.hasClass(unselectingClassName)) {
                            selectee.addClass(selectingClassName);
                        }
                    }
                    else {
                        if (selectee.hasClass(selectingClassName)) {                                                   
                            selectee.removeClass(selectingClassName);
                        }
                        else if(ctrlKey && selectee.hasClass(unselectingClassName)) {
                            selectee
                                .removeClass(unselectingClassName)
                                .addClass(selectedClassName);
                        }
                    }
                });
            },
            _up: function (event) {                
                var that = this;                
                $(document)
                    .unbind(MOUSEMOVE, that._moveDelegate)
			        .unbind(MOUSEUP, that._upDelegate);                
                that._downTarget = null;
                if (!that.options.single) {
                    that._marquee.remove();
                }

                that.element
                    .find(that.options.filter + "." + that.options.selectingClass)
                    .removeClass(that.options.selectingClass)
                    .addClass(that.options.selectedClass);   

                that.element
                    .find(that.options.filter + "." + that.options.unselectingClass)
                    .removeClass(that.options.unselectingClass)
                    .removeClass(that.options.selectedClass);
            },
            values: function() {
                var that = this;
                return that.element
                    .find(that.options.filter + "." + that.options.selectedClass)
                    .toArray();
            }
    }
    kendo.ui.plugin("Selectable", Selectable, kendo.ui.Component);
    
   })(jQuery, window);
