function Application(options) {
    this.views = [];
    $.extend(this, options);
    this.running = false;
}

Application.prototype = {
    run: function(callback) {
        if (this.running)
            return;

        this.running = true;

        var that = this;

        window.addEventListener("DOMContentLoaded", function() {
            that.root = document.body;

            callback(that);
            that.show(0);
        }, false);

        window.scrollTo(0, 1);
    },

    addView: function(view) {
        this.views.push(view);
    },

    show: function(viewIndex) {
        this.views[viewIndex].element.appendTo(this.root);
    },

    goToView: function(viewName) {
    }
};

