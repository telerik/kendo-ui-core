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

            that._started = true,

            that._timeoutId = setTimeout(function selectNext() {
                var selected = listView.selected().next();
                if(selected.length == 0) {
                    selected = listView.element.find("li:first");
                }
                listView.selectable.clear();
                listView.selectable.value(selected);

                $("#bigPhoto")[0].onload = function() {
                    if (that._started) {
                        that._timeoutId = setTimeout(selectNext, TIMEOUT);
                    }
                };
            }, TIMEOUT);
        },
        stop: function() {
            this._started = false,
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
