function View(options) {
    $.extend(this, options);
    this.element = $('<div class="data-container"/>');
    this.scroller = new Scroller(this.element);
    this.contentElement = this.scroller.scrollElement || this.element;
    
    if (this.onCreate) {
        this.onCreate();
    }
}

View.prototype = {
    bind: function(data) {
        this.onBind(data);
    },

    show: function(container) {
        if (this.onShow) {
            this.onShow();
        }

        this.element.appendTo(container);
    },

    hide: function() {
        this.element.remove();
    }
};

