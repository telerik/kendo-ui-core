(function($, undefined) {
    var kendo = window.kendo,
        abs = Math.abs;

    /**
     *
     * @name kendo.mobile.ui.Swipe.Description
     * @section
     * <p>The mobile swipe component handles user horizontal swiping events.</p>
     * <h3>Getting Started</h3>
     *
     * <p>To register a swipe event for a given jQuery selector, use the <code>kendoMobileSwipe</code> jQuery plugin method.</p>
     *
     * @exampleTitle swipe event handling
     * @example
     * <div>
     * <p>Foo</p>
     * </p>Bar</p>
     * </div>
     *
     * <script>
     *  $("p").kendoMobileSwipe(function(e) {
     *      console.log("You swiped" + e.target.text() );
     *  });
     * </script>
     *
     * @section
     * <p>The event handler accepts a parameter with the following fields:</p>
     * <table>
     *  <tr>
     *  <th align="left" valign="top">target</th>
     *  <td>The DOM element which was swiped</td>
     *  </tr>
     *  <tr>
     *  <th align="left" valign="top">direction</th>
     *  <td>The swipe direction. Can be either <code>left</code> or <code>right</code>.</td>
     *  </tr>
     *  <tr>
     *  <th align="left" valign="top">drag</th>
     *  <td>An instance of the kendo.Drag component, containing additional information about the drag event sequence, that generated the swipe.</td>
     *  </tr>
     * </table>
     *
     * <h3>Configuration</h3>
     *
     * <p>The swipe event criteria (minimum horizontal distance, maximum vertical deviation, timing, and swipe surface) can be configured by passing an additional parameter to the <code>kendoMobileSwipe</code> method. For more details, see the configuration section.</p>
     *
     * @exampleTitle Listen only for longer and faster swipe events
     * @example
     * <div>
     * <p>Foo</p>
     * </p>Bar</p>
     * </div>
     *
     * <script>
     *  $("p").kendoMobileSwipe(function(e) {
     *      console.log("You swiped" + e.target.text() );
     *  }, { minXDelta: 200, maxDuration: 100 });
     * </script>
     */

    var Swipe = kendo.Class.extend(/** @lends kendo.mobile.ui.Swipe.prototype */{
        /**
         * @constructs
         * @param {Element} element DOM element.
         * @param {Function} callback The callback to execute when the user swipes the element
         * @param {Object} options Configuration options.
         * @option {Number} [minXDelta] <30> The minimum horizontal distance in pixels the user should swipe before the event is triggered.
         * @option {Number} [maxYDelta] <10> The maximum vertical deviation in pixels of the swipe event. Swipe with higher deviation are discarded.
         * @option {Number} [maxDuration] <1000> The maximum amount of time in milliseconds the swipe event can last. Slower swipes are discarded.
         * @option {jQuery} [surface] By default, swipe events are tracked only within the element boundries. If a surface is specified, the swipe events are extended to the provided surface. This is useful if  the swipe targets are small (or narrow).
         */
        init: function(element, callback, options) {
            options = $.extend({
                minXDelta: 30,
                maxYDelta: 20,
                maxDuration: 1000
            }, options);

            new kendo.Drag(element, {
                surface: options.surface,

                start: function(e) {
                    if (abs(e.x.velocity) * 2 >= abs(e.y.velocity)) {
                        e.sender.capture();
                    }
                },

                move: function(e) {
                    var drag = e.sender,
                    duration = e.event.timeStamp - drag.startTime,
                    direction = e.x.initialDelta > 0 ? "right" : "left";

                    if (
                        abs(e.x.initialDelta) >= options.minXDelta &&
                        abs(e.y.initialDelta) < options.maxYDelta &&
                    duration < options.maxDuration)
                    {
                        callback({
                            direction: direction,
                            drag: drag,
                            target: $(drag.currentTarget)
                        });

                        drag.cancel();
                    }
                }
            });
        }
    });

    $.fn.kendoMobileSwipe = function(callback, options) {
        new Swipe(this, callback, options);
    };
})(jQuery);
