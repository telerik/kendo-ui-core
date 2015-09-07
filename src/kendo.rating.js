/* jshint browser: true, jquery: true */
/* globals define: false */

(function (f, define) {
    'use strict';
    define(['./vendor/kendo/kendo.binder'], f);
})(function () {

    'use strict';

    // TODO: update for angular
    // TODO: check touch interfaces
    // TODO: Add tooltip with value and/or description
    // TODO: Display half stars
    // TODO: Consider https://developers.google.com/structured-data/rich-snippets/reviews

    (function ($, undefined) {

        // shorten references to variables for uglification
        var // fn = Function,
        // global = fn('return this')(),
            kendo = window.kendo,
            ui = kendo.ui,
            Widget = ui.Widget,
            SPAN = 'span',
            NUMBER = 'number',
            STAR = 'star',
            STAR_P = '&#x2605;',
            STAR_O = '&#x2606;',
            STAR_SELECTOR = 'span.k-rating-star',
            STATE_HOVER = 'k-state-hover',
            STATE_SELECTED = 'k-state-selected',
            STATE_DISABLED = 'k-state-disabled',

        // Rating
            RATING_MIN = 0,
            RATING_MAX = 5,
            RATING_STEP = 1,
            PRECISION = 3,

        // Events
            NS = '.kendoRating',
            CLICK = 'click' + NS,
            MOUSEENTER = 'mouseenter',
            MOUSELEAVE = 'mouseleave',
            HOVEREVENTS = MOUSEENTER + NS + ' ' + MOUSELEAVE + NS,
            CHANGE = 'change';

        /*********************************************************************************
         * Helpers
         *********************************************************************************/

        /**
         * rounding numbers for the star rating widget
         * @method round
         * @param value {Number}
         * @return {Number}
         */
        function round(value) {
            value = parseFloat(value);
            var power = Math.pow(10, PRECISION || 0);
            return Math.round(value * power) / power;
        }

        /*******************************************************************************************
         * Rating
         * SEE: http://css-tricks.com/star-ratings/
         * SEE: http://www.fyneworks.com/jquery/star-rating/
         * SEE: http://www.enfew.com/5-best-jquery-star-rating-plugins-tutorials/
         *******************************************************************************************/

        /**
         * Rating (kendoRating)
         * @class Rating
         * @extend Widget
         */
        var Rating = Widget.extend({

            /**
             * Initializes the widget
             * @method init
             * @param element
             * @param options
             */
            init: function (element, options) {
                var that = this,
                    input = $(element);
                input.type = NUMBER;
                that.ns = NS;
                options = $.extend({}, {
                    value: parseFloat(input.attr('value') || RATING_MIN),
                    min: parseFloat(input.attr('min') || RATING_MIN),
                    max: parseFloat(input.attr('max') || RATING_MAX),
                    step: parseFloat(input.attr('step') || RATING_STEP),
                    disabled: input.prop('disabled'),
                    readonly: input.prop('readonly')
                }, options);
                Widget.fn.init.call(that, element, options);
                that._layout();
                that.value(options.value);
                that.refresh();
                kendo.notify(that);
            },

            /**
             * Widget events
             * @property events
             */
            events: [
                CHANGE // Changing the rating value by clicking a star raises the change event
            ],

            /**
             * Widget options
             * @property options
             */
            options: {
                name: 'Rating',
                value: RATING_MIN,
                min: RATING_MIN,
                max: RATING_MAX,
                step: RATING_STEP
            },

            /**
             * Gets a sets the rating value
             * @method value
             * @param value
             * @return {*}
             */
            value: function (value) {
                var that = this,
                    input = that.element,
                    options = that.options;
                value = parseFloat(value);
                if (isNaN(value)) {
                    return parseFloat(input.val());
                } else if (value >= options.min && value <= options.max) {
                    if (parseFloat(input.val()) !== value) {
                        // update input element
                        input.val(value);
                        // also trigger the DOM change event so any subscriber gets notified
                        // http://stackoverflow.com/questions/4672505/why-does-the-jquery-change-event-not-trigger-when-i-set-the-value-of-a-select-us
                        input.trigger(CHANGE + NS);
                    }
                } else {
                    throw new RangeError(kendo.format('Expecting a number between {0} and {1}', options.min, options.max));
                }
            },

            /**
             * Builds the widget layout
             * @method _layout
             * @private
             */
            _layout: function () {
                var that = this,
                    input = that.element,
                    options = that.options;
                that._clear();
                input.wrap('<span class="k-widget k-rating"/>');
                input.hide();
                input.on(CHANGE + NS, function(e) {
                    // update widget
                    that.refresh();
                    that.trigger(CHANGE, { value: parseFloat(input.val()) });
                });
                // We need that.wrapper for visible/invisible bindings
                that.wrapper = input.parent();
                // Calculate the number of stars
                var n = round((options.max - options.min)/options.step);  // number of stars
                // Add stars to the DOM
                for(var i = 1; i <= n; i++) {
                    that.wrapper.append(kendo.format('<span class="k-rating-star" data-star="{0}">{1}</span>', i, STAR_O));
                }
                // Make (non)editable
                that._editable(options);
            },

            /**
             * Toggle between editing modes
             * @private
             */
            _editable: function (options) {
                var that = this,
                    disabled = options.disabled,
                    readonly = options.readonly,
                    wrapper = that.wrapper;
                wrapper.find(STAR_SELECTOR).off(NS);
                if (!readonly && !disabled) {
                    wrapper.removeClass(STATE_DISABLED);
                    wrapper.find(STAR_SELECTOR)
                        .on(HOVEREVENTS, $.proxy(that._toggleHover, that))
                        .on(CLICK, $.proxy(that._onStarClick, that));
                } else {
                    wrapper.addClass(STATE_DISABLED);
                }
            },

            /**
             * Function called by the enabled/disabled bindings
             * @param enable
             */
            enable: function (enable) {
                this._editable({
                    readonly: false,
                    disabled: !(enable = enable === undefined ? true : enable)
                });
            },

            /**
             * Refreshes the widget
             * @method refresh
             */
            refresh: function (e) {
                var that = this,
                    options = that.options;
                if (that.wrapper) {
                    var i = round((that.value() - options.min)/options.step);
                    $.each(that.wrapper.find(STAR_SELECTOR), function (index, element) {
                        var star = $(element);
                        if(parseFloat(star.attr(kendo.attr(STAR))) <= i) {
                            star.html(STAR_P).addClass(STATE_SELECTED);
                        } else {
                            star.html(STAR_O).removeClass(STATE_SELECTED);
                        }
                    });
                }
            },

            /**
             * Event handler for clicking/tapping a star
             * @param e
             * @private
             */
            _onStarClick: function (e) {
                var that = this,
                    options = that.options;
                e.preventDefault();
                var i = parseFloat($(e.currentTarget).attr(kendo.attr(STAR))),
                    value = options.min + i * options.step;
                that.value(value);
            },

            /**
             * EVent handler for hovering stars
             * @param e
             * @private
             */
            _toggleHover: function (e) {
                var that = this,
                    i = parseFloat($(e.currentTarget).attr(kendo.attr(STAR)));
                $.each(that.wrapper.find(STAR_SELECTOR), function (index, element) {
                    var star = $(element);
                    if(e.type=== MOUSEENTER && parseFloat(star.attr(kendo.attr(STAR))) <= i) {
                        star.html(STAR_P).addClass(STATE_HOVER);
                    } else {
                        star.html(star.hasClass(STATE_SELECTED) ? STAR_P : STAR_O).removeClass(STATE_HOVER);
                    }
                });
            },

            /**
             * Clears the DOM from modifications made by the widget
             * @method _clear
             * @private
             */
            _clear: function () {
                var that = this,
                    input = that.element;
                // remove wrapper and stars
                if (that.wrapper) {
                    that.wrapper.find(STAR_SELECTOR).off(NS).remove();
                    input.unwrap();
                    input.off(NS);
                    delete that.wrapper;
                    input.show();
                }
            },

            /**
             * Destroys the widget
             * @method destroy
             */
            destroy: function () {
                var that = this;
                that._clear();
                Widget.fn.destroy.call(this);
            }
        });

        ui.plugin(Rating);

    } (window.jQuery));

    return window.kendo;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });


