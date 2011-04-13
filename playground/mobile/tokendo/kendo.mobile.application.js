function Application(options) {
    $.extend(this, options);
    this.running = false;
}

Application.prototype = {
    run: function() {
        if (this.running)
            return;

        this.running = true;

        var that = this;

        window.addEventListener("DOMContentLoaded", function() {
            that.root = document.body;

            that.show(0);
        }, false);

        window.scrollTo(0, 1);
    },

    show: function(viewIndex) {
        this.views[viewIndex].element.appendTo(this.root);
    }
};

