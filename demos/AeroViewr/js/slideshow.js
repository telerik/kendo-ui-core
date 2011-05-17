(function($, window){
    var TIMEOUT = 3000;
    window.slideshow = {
        init: function(listView) {
            this._listView = listView;
            this.stop();
        },
        play: function() {
            var that = this,
                listView = that._listView;
            that._timeoutId = setTimeout(function() {
                var selected = listView.selected().next();
                if(selected.length == 0) {
                    selected = listView.element.find("li:first");
                }
                listView.selectable.clear();
                listView.selectable.value(selected);
                that._timeoutId = setTimeout(arguments.callee, TIMEOUT);
            }, TIMEOUT);
        },
        stop: function() {
            clearTimeout(this._timeoutId);
            this._timeoutId = null;
        },
        toggle: function() {
            if(this._timeoutId) {
                this.stop();
            }
            else {
                this.play();
            }
        }
    }
})(jQuery, window);
