(function($) {
    var kendo = window.kendo,
        extend = $.extend,
        Observable = kendo.Observable;

    var Model = Observable.extend({
        init: function(data) {
            var that = this;

            Observable.fn.init.call(that);

            that.data = extend(true, {}, data);
        }
    });

    Model.define = function() {
        return Model.extend();
    }

    kendo.data.Model = Model;
})(jQuery);
