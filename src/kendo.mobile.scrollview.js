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
        CURRENT_PAGE_CLASS = "km-current-page";

    var ScrollView = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element
                .wrapInner("<div/>")
                .addClass("km-scrollview")
                .append('<ol class="km-pages"/>');

            that.inner = element.children().first();
            that.pager = element.children().last();
            that.page = 0;

            that.inner.css("height", that.options.contentHeight);
            that.container().bind("show", $.proxy(this, "viewShow")).bind("init", $.proxy(this, "viewInit"));

            var movable,
                transition,
                userEvents,
                dimensions,
                dimension,
                pane;

            movable = new kendo.ui.Movable(that.inner);

            transition = new Transition({
                axis: "x",
                movable: movable,
                onEnd: proxy(that._transitionEnd, that)
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
                end: proxy(that._dragEnd, that)
            });

            dimensions = new PaneDimensions({
                element: that.inner,
                container: that.element
            });

            dimension = dimensions.x;
            dimension.bind(CHANGE, proxy(that.refresh, that));

            pane = new Pane({
                dimensions: dimensions,
                userEvents: userEvents,
                movable: movable,
                elastic: true
            });

            $.extend(that, {
                movable: movable,
                transition: transition,
                userEvents: userEvents,
                dimensions: dimensions,
                dimension: dimension,
                pane: pane
            });

            that.page = that.options.page;
        },

        options: {
            name: "ScrollView",
            page: 0,
            duration: 300,
            velocityThreshold: 0.8,
            contentHeight: "auto",
            pageSize: 1,
            bounceVelocityThreshold: 1.6
        },

        events: [
            CHANGING,
            CHANGE
        ],

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.userEvents.destroy();

            kendo.destroy(this.element);
        },

        viewInit: function() {
            this.movable.moveAxis("x", -this.page * this.dimension.getSize());
        },

        viewShow: function() {
            this.dimensions.refresh();
        },

        refresh: function() {
            var that = this,
                pageHTML = "",
                dimension = that.dimension,
                width = dimension.getSize(),
                pages,
                pageElements = that.element.find("[data-role=page]");

                pageElements.width(width);
                dimension.update(true);

                // if no pages present, try to retain the current position
                if (!pageElements[0]) {
                    that.page = Math.floor((-that.movable.x) / width);
                }

                that.scrollTo(that.page, true);

                pages = that.pages = ceil(dimension.getTotal() / width);

                that.minSnap = - (pages - 1) * width;
                that.maxSnap = 0;

                for (var idx = 0; idx < pages; idx ++) {
                    pageHTML += "<li/>";
                }

                that.pager.html(pageHTML);
                that._updatePager();
        },

        content: function(html) {
           this.element.children().first().html(html);
           this.dimensions.refresh();
        },

        scrollTo: function(page, instant) {
            this.page = page;
            this._moveTo(- page * this.dimension.getSize(), Transition.easeOutExpo, instant);
        },

        _moveTo: function(location, ease, instant) {
            this.transition.moveTo({ location: location, duration: (instant ? 1 : this.options.duration), ease: ease });
        },

        _dragEnd: function(e) {
            var that = this,
                velocity = e.x.velocity,
                width = that.dimension.size * that.options.pageSize,
                options = that.options,
                velocityThreshold = options.velocityThreshold,
                approx = round,
                ease = Transition.easeOutExpo,
                snap,
                nextPage;

            if (velocity > velocityThreshold) {
                approx = ceil;
            } else if(velocity < -velocityThreshold) {
                approx = floor;
            }

            if (abs(velocity) > options.bounceVelocityThreshold) {
                ease = Transition.easeOutBack;
            }

            nextPage = - approx(that.movable.x / width);
            snap = max(that.minSnap, min(- nextPage * width, that.maxSnap));

            if (nextPage != that.page) {
                if (this.trigger(CHANGING, { currentPage: that.page, nextPage: nextPage })) {
                    snap = - that.page * that.dimension.getSize();
                }
            }

            this._moveTo(snap, ease);
        },

        _transitionEnd:  function() {
            var that = this,
                page = Math.round(- that.movable.x / that.dimension.size);

            if (page != that.page) {
                that.page = page;
                that.trigger(CHANGE, {page: page});
                that._updatePager();
            }
        },

        _updatePager: function() {
            this.pager.children().removeClass(CURRENT_PAGE_CLASS).eq(this.page).addClass(CURRENT_PAGE_CLASS);
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
                itemCount: 0,
                _widgetNeedsRefresh: false
            });

            that._dataSource();
            that._buffer();
            that._initPages();

            that.view().bind("show", function () {
                if(that._needsRefresh) {
                    setTimeout(function () {
                        that._resetPages();
                    }, 0);
                    that._widgetNeedsRefresh = false;
                }
            })

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

        _dataSource: function () {
            var that = this,
                options = that.options;

            that.dataSource = DataSource.create(options.dataSource);
        },

        _buffer: function () {
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

        _unbindDataSource: function () {
            var that = this;

            that.buffer.unbind("resize", that._onResize)
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

        refresh: function () {
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

        _initPages: function () {
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

        _resetPages: function () {
            var that = this,
                pages = that.pages;

            for (var i = 0; i < pages.length; i++) {
                pages[i].position(i-1);
                that.setPageContent(pages[i], i-1);
            }

            that.itemCount = pages.length - 1;

            that.trigger("changed", {
                element: pages[1].element,
                page: pages[1]
            });
        },

        _moveTo: function (location, ease, instant) {
            this.transition.moveTo({ location: location, duration: (instant ? 1 : this.options.duration), ease: ease });
        },

        _resetMovable: function () {
            this.movable.moveTo({ x: 0 });
        },

        forward: function (instant) {
            this._moveTo(-this.width, Transition.easeOutExpo, instant);
        },

        backward: function (instant) {
            this._moveTo(this.width, Transition.easeOutBack, instant);
        },

        reset: function (ease) {
            this._moveTo(0, ease, false);
        },

        scrollTo: function (offset, instant) {
            var that = this,
                buffer = that.buffer,
                pages = that.pages,
                dataItem;

            dataItem = buffer.at(offset);
            console.log(dataItem);
            if(!dataItem) {
                return;
            }

            for (var i = 0; i < pages.length; i++) {
                pages[i].position(i-1);
                that.setPageContent(pages[i], offset + (i-1));
            }

            that.itemCount = offset + 2;

            that.trigger("changed", {
                element: pages[1].element,
                page: pages[1]
            });
        },

        _dragEnd: function (e) {
            var that = this,
                velocity = e.x.velocity,
                width = that.width,
                velocityThreshold = that.options.velocityThreshold,
                ease = Transition.easeOutExpo,
                isEndReached = that.itemCount > that.buffer.total;

            if (velocity > velocityThreshold) {
                if(that.itemCount === 2) {
                    that.reset(ease);
                    return;
                }
                that.backward();
                return;
            } else if(velocity < -velocityThreshold && !isEndReached) {
                that.forward();
                return;
            }

            if(that.movable.x < 0 && (abs(that.movable.x) >= width / 3 && !isEndReached)) {
                that.forward();
                return;
            } else if(that.movable.x > 0 && (abs(that.movable.x) >= width / 3)) {
                if(that.itemCount === 2) {
                    that.reset(ease);
                    return;
                }
                that.backward();
                return;
            } else {
                that.reset(ease);
            }
        },

        _transitionEnd: function () {
            var that = this,
                pages = that.pages;

            if(that.movable.x === 0) {
                return;
            }

            if(that.movable.x < 0) {
                pages.push(that.pages.shift());//forward
                that.setPageContent(pages[2], that.itemCount ++);
            } else {
                pages.unshift(that.pages.pop()); //back
                that.itemCount--;
                that.setPageContent(pages[0], that.itemCount - 3);
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

        _onResize: function () {
            var that = this,
                page = that.pages[2],
                idx = that.itemCount - 1;

            if(that._needsRefresh) {
                that.setPageContent(page, idx);
                that._needsRefresh = false;
            }
        },

        _onReset: function () {
            if(this.element.is(":visible")) {
                console.log("reset pages");
                this._resetPages();
            } else {
                this._widgetNeedsRefresh = true;
            }
        },

        _onEndReached: function () {
            this._needsRefresh = true;
        },

        setPageContent: function (page, index) {
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
        at: function (index) {
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
