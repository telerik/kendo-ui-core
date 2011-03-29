(function($) {
    $.kendo = $.kendo || {};

    function Observable() {
        this._list = {};
    }

    Observable.prototype = {
        bind: function(eventName, handler) {
            var that = this,
                list = that._list[eventName] || [];

            list.push(handler);

            that._list[eventName] = list;

            return that;
        },

        trigger: function(eventName, parameter) {
            var that = this,
                list = that._list[eventName],
                idx,
                length;

            if (list) {
                for (idx = 0, length = list.length; idx < length; idx++) {
                    list[idx].call(that, parameter);
                }
            }

            return that;
        },

        unbind: function(eventName, handler) {
            var that = this,
                list = that._list[eventName],
                idx,
                length;

            if (list) {
                if (handler) {
                    for (idx = 0, length = list.length; idx < length; idx++) {
                        if (list[idx] === handler) {
                            list.splice(idx, 1);
                        }
                    }
                } else {
                    that._list[eventName] = [];
                }
            }

            return that;
        }
    }

    $.kendo.Observable = Observable;
})(jQuery);
