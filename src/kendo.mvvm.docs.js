(function () {

    /**
    * @name kendo.ui.MVVM
    * @namespace
    */

    /** @name kendo.ui.MVVM.Description
    * @section
    *  <p>This is the MVVM </p>
    */

    var Binding = /** @lends kendo.ui.MVVM.prototype */ {
        /**
        * @constructs
        * @extends kendo.Observable
        * @param {DomElement} source Explanation
        * @param {String} path Explanation
        */

        init: function() {
            //describe events using this patter.
            //
            /**
             * Fires when the chart has received data from the data source
             * and is about to render it.
             * @name kendo.ui.Chart#dataBound
             * @event
             * @param {Event} e
             * @example
             * function onDataBound(e) {
             *     // Series data is now available
             * }
             */
        },

        //Describe methods using this patter.
        /**
         * Reloads the data and repaints the chart.
         * @example
         * var chart = $("#chart").data("kendoChart");
         *
         * // refreshes the chart
         * chart.refresh();
         */
        refresh: function() { },
    }

})();
