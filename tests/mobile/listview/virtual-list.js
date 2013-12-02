(function() {
    var CellHeight = 20;
    var ViewPortHeight = 200;
    var VirtualList = kendo.mobile.ui.VirtualList;

    var MockBuffer = kendo.Observable.extend({
        offset: 0,
        length: 40,
        viewSize: 30,
        at: function(i) { return i; },
        total: function() { return 10000 },
        setViewSize: $.noop
    });

    var MockCell = kendo.Class.extend({
        init: function(content) {
            this.top = 0;
            this.height = CellHeight;
            this.theContent = content;
            this.bottom = this.height + this.top;
        },

        update: function(content) {
            this.theContent = content;
            this.bottom = this.height + this.top;
        },

        above: function(cell) {
            if (cell) {
                this.top = cell.top - this.height;
                this.bottom = cell.top;
            }
        },

        below: function(cell) {
            if (cell) {
                this.top = cell.bottom;
                this.bottom = this.height + this.top;
            }
        },

        destroy: function() {
            // kendo.destroy()
        }
    });

    var list, buffer, origQueueAnimation = kendo.queueAnimation;

    module('Virtual list', {
        setup: function() {

            kendo.queueAnimation = function(callback) { callback(); };
            buffer = new MockBuffer();
            list = new VirtualList({
                item: function(content) { return new MockCell(content); },
                height: function() { return ViewPortHeight; },
                buffer: buffer
            });

            buffer.trigger("reset");
        },

        teardown: function()
        {
            kendo.queueAnimation = origQueueAnimation;
            CellHeight = 20;
            ViewPortHeight = 200;
        }
    });

    test('initially builds a list 3 times the given height', 2, function() {
        equal(list.items.length, 30);
        equal(list.items[29].bottom, 600);
    });

    test('batch update at a given offset updates cells as expected', 2, function() {
        list.batchUpdate(450); // bottom point of the viewport will be 650
        equal(list.items[0].theContent, 10); // end reached of buffer
        equal(list.items[list.items.length - 1].theContent, 39);
    });

    test('batch update at a given offset triggers resize', 2, function() {
        list.bind('resize', function(e) {
            equal(e.top, 200);
            equal(e.bottom, 800);
        });

        list.batchUpdate(450); // bottom point of the viewport will be 650
    });

    test('snapping back re-orders the items', 2, function() {
        list.update(450); // bottom point of the viewport will be 650

        list.bind('resize', function(e) {
            equal(e.top, 0);
            equal(e.bottom, 600);
        });

        list.update(0);
    });

    test('resetting the buffer redraws list', 1, function() {
        buffer.offset = 10;
        buffer.trigger('reset');
        equal(list.items[0].theContent, 10);
    });

    test('calculates the expected height', 2, function() {
        equal(list.totalHeight(), 800);

        buffer.length = 80;

        equal(list.totalHeight(), 1600);
    });
})();
