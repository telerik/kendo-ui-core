kendo_module({
    id: "mobile.scrollview",
    name: "ScrollView",
    category: "mobile",
    description: "The Kendo Mobile ScrollView widget is used to scroll content wider than the device screen.",
    depends: [ "mobile.application" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        proxy = $.proxy,
        Transition = kendo.effects.Transition,
        Pane = kendo.ui.Pane,
        PaneDimensions = kendo.ui.PaneDimensions,
        Widget = ui.Widget,
        DataSource = kendo.data.DataSource,

        // Math
        math = Math,
        abs  = math.abs,
        ceil = math.ceil,
        round = math.round,
        max = math.max,
        min = math.min,
        floor = math.floor,
        CHANGE = "change",
        CHANGING = "changing",
        REFRESH = "refresh",
        CURRENT_PAGE_CLASS = "km-current-page",

        LEFT_SWIPE = -1,
        NUDGE = 0,
        RIGHT_SWIPE = 1;

    var Pager = kendo.Class.extend({
        init: function(scrollView) {
            var that = this,
                element = $("<ol class='km-pages'/>");

            scrollView.element.append(element);

            this._changeProxy = $.proxy(that, "_change");
            this._refreshProxy = $.proxy(that, "_refresh");
            scrollView.bind(CHANGE, this._changeProxy);
            scrollView.bind(REFRESH, this._refreshProxy);

            $.extend(that, { element: element, scrollView: scrollView });
        },

        items: function() {
            return this.element.children();
        },

        _refresh: function(e) {
            var pageHTML = "";

            for (var idx = 0; idx < e.pageCount; idx ++) {
                pageHTML += "<li/>";
            }

            this.element.html(pageHTML);
            this.items().eq(e.page).addClass(CURRENT_PAGE_CLASS);
        },

        _change: function(e) {
            this.items().removeClass(CURRENT_PAGE_CLASS).eq(e.page).addClass(CURRENT_PAGE_CLASS);
        },

        destroy: function() {
            this.scrollView.unbind(CHANGE, this._changeProxy);
            this.scrollView.unbind(REFRESH, this._refreshProxy);
            this.element.remove();
        }
    });

    kendo.mobile.ui.ScrollViewPager = Pager;


    var TRANSITION_END = "transitionEnd",
        DRAG_END = "dragEnd";

    var ElasticPane = kendo.Observable.extend({
        init: function(element, options) {
            var that = this;

            kendo.Observable.fn.init.call(this);

            this.element = element;
            this.container = element.parent();

            var movable,
                transition,
                userEvents,
                dimensions,
                dimension,
                pane;

            movable = new kendo.ui.Movable(that.element);

            transition = new Transition({
                axis: "x",
                movable: movable,
                onEnd: function() {
                    that.trigger(TRANSITION_END);
                }
            });

            userEvents = new kendo.UserEvents(element, {
                start: function(e) {
                    if (abs(e.x.velocity) * 2 >= abs(e.y.velocity)) {
                        userEvents.capture();
                    } else {
                        userEvents.cancel();
                    }

                    transition.cancel();
                },
                allowSelection: true,

                end: function(e) {
                    that.trigger(DRAG_END, e);
                }
            });

            dimensions = new PaneDimensions({
                element: that.element,
                container: that.container
            });

            dimension = dimensions.x;

            dimension.bind(CHANGE, function() {
                that.trigger(CHANGE);
            });

            pane = new Pane({
                dimensions: dimensions,
                userEvents: userEvents,
                movable: movable,
                elastic: true
            });

            $.extend(that, {
                duration: options && options.duration || 1,
                movable: movable,
                transition: transition,
                userEvents: userEvents,
                dimensions: dimensions,
                dimension: dimension,
                pane: pane
            });

            this.bind([TRANSITION_END, DRAG_END, CHANGE], options);
        },

        size: function() {
            return this.dimension.getSize();
        },

        total: function() {
            return this.dimension.getTotal();
        },

        offset: function() {
            return -this.movable.x;
        },

        updateDimension: function() {
            this.dimension.update(true);
        },

        refresh: function() {
            this.dimensions.refresh();
        },

        moveTo: function(offset) {
            this.movable.moveAxis("x", -offset);
        },

        transitionTo: function(offset, ease, instant) {
            if (instant) {
                this.moveTo(-offset);
            } else {
                this.transition.moveTo({ location: offset, duration: this.duration, ease: ease });
            }
        }
    });

    kendo.mobile.ui.ScrollViewElasticPane = ElasticPane;

    var ScrollViewContent = kendo.Class.extend({
        init: function (element, pane) {
            var that = this;

            that.element = element;
            that.pane = pane;
            that._getPages();
            this.page = 0;
            this.pageSize = 1;
        },

        scrollTo: function(page, instant) {
            this.page = page;
            this.pane.transitionTo(- page * this.pane.size(), Transition.easeOutExpo, instant);
        },

        paneMoved: function(swipeType, bounce, callback) {
            var that = this,
                pane = that.pane,
                width = pane.size() * that.pageSize,
                approx = round,
                ease = bounce ? Transition.easeOutBack : Transition.easeOutExpo,
                snap,
                nextPage;

            if (swipeType === LEFT_SWIPE) {
                approx = ceil;
            } else if (swipeType === RIGHT_SWIPE) {
                approx = floor;
            }

            nextPage = approx(pane.offset() / width);

            snap = max(that.minSnap, min(-nextPage * width, that.maxSnap));

            if (nextPage != that.page) {
                if (callback && callback({ currentPage: that.page, nextPage: nextPage })) {
                    snap = -that.page * pane.size();
                }
            }

            pane.transitionTo(snap, ease);
        },

        updatePage: function() {
            var pane = this.pane,
                page = round(pane.offset() / pane.size());

            if (page != this.page) {
                this.page = page;
                return true;
            }

            return false;
        },

        resizeTo: function(width) {
            var pane = this.pane;

            this.pageElements.width(width);

            // re-read pane dimension after the pageElements have been resized.
            pane.updateDimension();

            if (!this._paged) {
                this.page = floor(pane.offset() / width);
            }

            this.scrollTo(this.page, true);

            this.pageCount = ceil(pane.total() / width);
            this.minSnap = - (this.pageCount - 1) * width;
            this.maxSnap = 0;
        },

        _getPages: function () {
            this.pageElements = this.element.find("[data-role=page]");
            this._paged = this.pageElements.length > 0;
        }
    });

    kendo.mobile.ui.ScrollViewContent = ScrollViewContent;

    var ScrollView = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);


            element = that.element;

            kendo.stripWhitespace(element[0]);

            element
                .wrapInner("<div/>")
                .addClass("km-scrollview");

            if(this.options.enablePager) {
                this.pager = new Pager(this);
            }

            that.inner = element.children().first();
            that.page = 0;

            that.inner.css("height", that.options.contentHeight);
            that.container().bind("show", $.proxy(this, "viewShow")).bind("init", $.proxy(this, "viewInit"));

            that.pane = new ElasticPane(that.inner, {
                duration: this.options.duration,
                transitionEnd: $.proxy(this, "_transitionEnd"),
                dragEnd: $.proxy(this, "_dragEnd"),
                change: $.proxy(this, REFRESH)
            });

            that.page = that.options.page;

            that._content = new ScrollViewContent(that.inner, that.pane);
            that._content.page = that.page;
        },

        options: {
            name: "ScrollView",
            page: 0,
            duration: 300,
            velocityThreshold: 0.8,
            contentHeight: "auto",
            pageSize: 1,
            bounceVelocityThreshold: 1.6,
            enablePager: true
        },

        events: [
            CHANGING,
            CHANGE,
            REFRESH
        ],

        destroy: function() {
            Widget.fn.destroy.call(this);
            kendo.destroy(this.element);
        },

        viewInit: function() {
            this._content.scrollTo(this._content.page, true);
        },

        viewShow: function() {
            this.pane.refresh();
        },

        refresh: function() {
            var content = this._content;

            content.resizeTo(this.pane.size());
            this.page = content.page;
            this.trigger(REFRESH, { pageCount: content.pageCount, page: content.page });
        },

        content: function(html) {
           this.element.children().first().html(html);
           this.pane.refresh();
        },

        scrollTo: function(page, instant) {
            this._content.scrollTo(page, instant);
            this.page = this._content.page;
        },

        _dragEnd: function(e) {
            var that = this,
                velocity = e.x.velocity,
                velocityThreshold = this.options.velocityThreshold,
                swipeType = NUDGE,
                bounce = abs(velocity) > this.options.bounceVelocityThreshold;

            if (velocity > velocityThreshold) {
                swipeType = RIGHT_SWIPE;
            } else if(velocity < -velocityThreshold) {
                swipeType = LEFT_SWIPE;
            }

            this._content.paneMoved(swipeType, bounce, function(eventData) {
                return that.trigger(CHANGING, eventData);
            });
        },

        _transitionEnd:  function() {
            if (this._content.updatePage()) {
                this.page = this._content.page;
                this.trigger(CHANGE, { page: this.page });
            }
        }
    });

    ui.plugin(ScrollView);

    var VirtualScrollView = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            element
                .append("<div/>")
                .addClass("km-virtual-scrollview");

            that.template = kendo.template(options.template || "");
            that.emptyTemplate = kendo.template(options.emptyTemplate || "");

            that.inner = element.children().first();
            that.pages = [];
            that._needsRefresh = false;

            //that.inner.css("height", that.options.contentHeight);

            var movable,
                transition,
                dimensions,
                dimension,
                userEvents,
                pane,
                width = element.width();

            movable = new kendo.ui.Movable(that.inner);

            transition = new Transition({
                axis: "x",
                movable: movable,
                onEnd: proxy(that._transitionEnd, that)
            });

            dimensions = new PaneDimensions({
                element: that.inner,
                container: that.element
            });

            dimension = dimensions.x;
            dimension.bind(CHANGE, proxy(that.refresh, that));
            dimension.forceEnabled();

            userEvents = new kendo.UserEvents(element, {
                start: function(e) {
                    if (abs(e.x.velocity) * 2 >= abs(e.y.velocity)) {
                        userEvents.capture();
                    } else {
                        userEvents.cancel();
                    }

                    transition.cancel();
                },
                allowSelection: true,
                end: proxy(that._dragEnd, that)
            });

            pane = new Pane({
                dimensions: dimensions,
                movable: movable,
                userEvents: userEvents,
                elastic: true
            });

            $.extend(that, {
                movable: movable,
                transition: transition,
                userEvents: userEvents,
                dimensions: dimensions,
                dimension: dimension,
                pane: pane,
                width: width,
                offset: 0,
                _widgetNeedsRefresh: false
            });

            that._dataSource();
            that._buffer();
            that._initPages();

            that.view().bind("show", function() {
                if(that._widgetNeedsRefresh) {
                    setTimeout(function() {
                        that._resetPages();
                    }, 0);
                    that._widgetNeedsRefresh = false;
                }
            });

            if(that.options.autoBind) {
                that.dataSource.fetch();
            }
        },

        options: {
            name: "VirtualScrollView",
            autoBind: true,
            duration: 300,
            velocityThreshold: 0.8,
            contentHeight: "auto",
            bounceVelocityThreshold: 1.6,
            batchSize: 1,
            template: "",
            emptyTemplate: ""
        },

        events: [
            "changed"
        ],

        _dataSource: function() {
            var that = this,
                options = that.options;

            that.dataSource = DataSource.create(options.dataSource);
        },

        _buffer: function() {
            var that = this,
                batchSize = that.options.batchSize;

            if(batchSize > 1) {
                that.buffer = new BatchBuffer(that.dataSource, batchSize);
            } else {
                that.buffer = new kendo.data.Buffer(that.dataSource, batchSize * 3);
            }

            that.buffer.bind({
                "resize": proxy(that._onResize, that),
                "reset": proxy(that._onReset, that),
                "endreached": proxy(that._onEndReached, that)
            });
        },

        _unbindDataSource: function() {
            var that = this;

            that.buffer
                .unbind("resize", that._onResize)
                .unbind("reset", that._onReset)
                .unbind("endreached", that._onEndReached);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;
            this._dataSource();
            this._buffer();

            if (this.options.autoBind) {
                dataSource.fetch();
            }
        },

        refresh: function() {
            var that = this,
                dimension = that.dimension,
                pages = that.pages,
                width = dimension.getSize();

            for(var i = 0; i < pages.length; i++) {
                pages[i].width = width;
                pages[i].element.width(width);
            }

            pages[0].position(-1);
            pages[1].position(0);
            pages[2].position(1);

            that.width = width;
            that.dimension.update(true);
        },

        _initPages: function() {
            var that = this,
                pages = that.pages,
                inner = that.inner,
                page;

            for (var i = 0; i < 3; i++) { //widget works with 3 pages
                page = new Page(inner);
                pages.push(page);
            }

            that.dimension.update(true);
        },

        _resetPages: function() {
            var that = this,
                pages = that.pages;

            for (var i = 0; i < pages.length; i++) {
                pages[i].position(i-1);
                that.setPageContent(pages[i], i-1);
            }

            that.offset = 0;

            that.trigger("changed", {
                element: pages[1].element,
                page: pages[1]
            });
        },

        _moveTo: function(location, ease, instant) {
            this.transition.moveTo({ location: location, duration: (instant ? 1 : this.options.duration), ease: ease });
        },

        _resetMovable: function() {
            this.movable.moveTo({ x: 0 });
        },

        forward: function(instant) {
            this._moveTo(-this.width, Transition.easeOutExpo, instant);
        },

        backward: function(instant) {
            this._moveTo(this.width, Transition.easeOutBack, instant);
        },

        reset: function(ease) {
            this._moveTo(0, ease, false);
        },

        scrollTo: function(offset) {
            var that = this,
                buffer = that.buffer,
                pages = that.pages,
                dataItem;

            buffer.syncDataSource();
            dataItem = buffer.at(offset);

            if(!dataItem) {
                return;
            }

            for (var i = 0; i < pages.length; i++) {
                pages[i].position(i-1);
                that.setPageContent(pages[i], offset + (i-1));
            }

            that.offset = offset;

            that.trigger("changed", {
                element: pages[1].element,
                page: pages[1]
            });
        },

        _dragEnd: function(e) {
            var that = this,
                velocity = e.x.velocity,
                width = that.width,
                velocityThreshold = that.options.velocityThreshold,
                ease = Transition.easeOutExpo,
                isEndReached = that.offset + 2 > that.buffer.total;

            if (velocity > velocityThreshold) {
                if(that.offset === 0) {
                    that.reset(ease);
                } else {
                    that.backward();
                }
                return;
            } else if(velocity < -velocityThreshold && !isEndReached) {
                that.forward();
                return;
            }

            if(that.movable.x < 0 && (abs(that.movable.x) >= width / 3 && !isEndReached)) {
                that.forward();
            } else if(that.movable.x > 0 && (abs(that.movable.x) >= width / 3)) {
                if(that.offset === 0) {
                    that.reset(ease);
                } else {
                    that.backward();
                }
            } else {
                that.reset(ease);
            }
        },

        _transitionEnd: function() {
            var that = this,
                pages = that.pages;

            if(that.movable.x === 0) {
                return;
            }

            if(that.movable.x < 0) {
                pages.push(that.pages.shift());//forward
                that.offset++;
                that.setPageContent(pages[2], that.offset + 1);
            } else {
                pages.unshift(that.pages.pop()); //back
                that.offset--;
                that.setPageContent(pages[0], that.offset - 1);
            }

            pages[0].position(-1);
            pages[1].position(0);
            pages[2].position(1);

            that._resetMovable();
            that.trigger("changed", {
                element: pages[1].element,
                page: pages[1]
            });
        },

        _onResize: function() {
            var that = this,
                page = that.pages[2],
                idx = that.offset + 1;

            if(that._needsRefresh) {
                that.setPageContent(page, idx);
                that._needsRefresh = false;
            }
        },

        _onReset: function() {
            if(this.element.is(":visible")) {
                this._resetPages();
            } else {
                this._widgetNeedsRefresh = true;
            }
        },

        _onEndReached: function() {
            this._needsRefresh = true;
        },

        setPageContent: function(page, index) {
            var buffer = this.buffer,
                template = this.template,
                emptyTemplate = this.emptyTemplate,
                view;

            if(index >= 0) {
                view = buffer.at(index);
                if(view) {
                    page.content(template(view));
                } else {
                    page.content(emptyTemplate({}));
                }
            } else {
                page.content(emptyTemplate({}));
            }

            mobile.init(page.element);
        }

    });

    ui.plugin(VirtualScrollView);

    var Page = kendo.Class.extend({
        init: function (container) {
            this.element = $("<div class='virtual-page'></div>");
            this.width = container.width();
            this.element.width(this.width);
            container.append(this.element);
        },
        content: function (theContent) {
            this.element.html(theContent);
        },
        position: function (index) { //index can be -1, 0, 1
            this.element.css("transform", "translate3d(" + this.width * index + "px, 0, 0)");
        }
    });

    var BatchBuffer = kendo.Observable.extend({
        init: function (dataSource, batchSize) {
            var batchBuffer = this;

            kendo.Observable.fn.init.call(batchBuffer);

            this.dataSource = dataSource;
            this.batchSize = batchSize;
            this.total = 0;

            this.buffer = new kendo.data.Buffer(dataSource, batchSize * 3);

            this.buffer.bind({
                "endreached": function (e) {
                    batchBuffer.trigger("endreached", { index: e.index });
                },
                "prefetching": function (e) {
                    batchBuffer.trigger("prefetching", { skip: e.skip, take: e.take });
                },
                "prefetched": function (e) {
                    batchBuffer.trigger("prefetched", { skip: e.skip, take: e.take });
                },
                "reset": function () {
                    batchBuffer.total = 0;
                    batchBuffer.trigger("reset");
                },
                "resize": function () {
                    batchBuffer.total = this.length / batchBuffer.batchSize;
                    batchBuffer.trigger("resize", { total: batchBuffer.total, offset: this.offset });
                }
            });
        },

        syncDataSource: function() {
            this.buffer.syncDataSource();
        },

        at: function(index) {
            var buffer = this.buffer,
                skip = index * this.batchSize,
                take = this.batchSize,
                view = [],
                item;

            if (buffer.offset > skip) {
                buffer.at(buffer.offset - 1);
            }

            for (var i = 0; i < take; i++) {
                item = buffer.at(skip + i);

                if (item === undefined) {
                    return;
                }

                view.push(item);
            }

            return view;
        }
    });

})(window.kendo.jQuery);
