function View(options) {
    $.extend(this, options);
    this.element = $('<div class="data-container"/>');
    this.scroller = new Scroller(this.element);
    this.scrollElement = this.scroller.scrollElement;
}

View.prototype = {
    bind: function(data) {
        this.onBind(data, this.scrollElement || this.element);
    }
};

