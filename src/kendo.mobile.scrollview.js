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
            that.itemCount = 0;
            that._endReached = false;

            that.inner.css("height", that.options.contentHeight);

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
                width: width
            });

            if(that.options.batchSize > 1) {
                that.batchBuffer = new BatchBuffer(that.options.dataSource, that.options.batchSize);
            } else {
                that.batchBuffer = new kendo.data.Buffer(that.options.dataSource, that.itemCount);
            }

            that.batchBuffer.bind({
                "endreached": proxy(that._onEndReached, that),
                "reset": proxy(that._onReset, that)
            });

            that._initPages();
        },

        options: {
            name: "VirtualScrollView",
            duration: 300,
            velocityThreshold: 0.8,
            contentHeight: "auto",
            bounceVelocityThreshold: 1.6,
            batchSize: 1,
            template: "",
            emptyTemplate: ""
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

            pages[0].first();
            pages[1].center();
            pages[2].last();

            that.width = width;
            that.dimension.update(true);
        },

        _initPages: function () {
            var that = this,
                dimension = that.dimension,
                pages = that.pages,
                inner = that.inner,
                page;

            page = new Page(inner);
            page.content(that.emptyTemplate({}));
            page.first();
            pages.push(page);

            page = new Page(inner);
            that.setPageContent(page, that.itemCount ++);
            page.center();
            pages.push(page);

            page = new Page(inner);
            that.setPageContent(page, that.itemCount ++);
            page.last();
            pages.push(page);

            that.dimension.update(true);
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

        _dragEnd: function (e) {
            var that = this,
                velocity = e.x.velocity,
                width = that.width,
                velocityThreshold = that.options.velocityThreshold,
                ease = Transition.easeOutExpo;

            if (velocity > velocityThreshold) {
                if(that.itemCount === 2) {
                    that.reset(ease);
                    return;
                }
                that.backward();
                return;
            } else if(velocity < -velocityThreshold && !that._endReached) {
                that.forward();
                return;
            }

            if(that.movable.x < 0 && (abs(that.movable.x) >= width / 3 && !that._endReached)) {
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

        _transitionEnd: function (e) {
            var that = this,
                pages = that.pages,
                pageToBeUpdated;

            if(that.movable.x === 0) {
                return;
            }

            if(that.movable.x < 0) { 
                pages.push(that.pages.shift()); //forward
                that.setPageContent(pages[2], that.itemCount ++);
            } else {
                pages.unshift(that.pages.pop()); //back
                that.itemCount--;
                that.setPageContent(pages[0], that.itemCount - 3);
            }

            pages[0].first();
            pages[1].center();
            pages[2].last();

            that._resetMovable();
        },

        _onEndReached: function (e) {
            console.log("end reached");
            this._endReached = true;
        },

        _onReset: function (e) {
            console.log("reset");   
        },

        setPageContent: function (page, index) {
            var batchBuffer = this.batchBuffer,
                template = this.template,
                emptyTemplate = this.emptyTemplate;

            if(index >= 0) {
                page.content(template(batchBuffer.at(index)));
            } else {
                page.content(emptyTemplate({}));
            }
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
        center: function () {
            this.element.css("transform", "translate3d(0, 0, 0)");
        },
        first: function () {
            this.element.css("transform", "translate3d(-" + this.width + "px, 0, 0)");
        },
        last: function () {
            this.element.css("transform", "translate3d(" + this.width + "px, 0, 0)"); 
        }
    });

    var BatchBuffer = kendo.Observable.extend({
        init: function (dataSource, batchSize) {
            var batchBuffer = this;

            kendo.Observable.fn.init.call(batchBuffer);

            this.dataSource = dataSource;
            this.batchSize = batchSize;
            this.buffer = new kendo.data.Buffer(dataSource, batchSize*2);

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
                "reset": function (e) {
                    batchBuffer.trigger("reset");
                }
            });
        },
        at: function (index) {
            var buffer = this.buffer,
                skip = index * this.batchSize,
                take = this.batchSize,
                view = [];

            for (var i = 0; i < take; i++) {
                view.push(buffer.at(skip + i));
            }

            return view;
        }
    });

})(window.kendo.jQuery);
