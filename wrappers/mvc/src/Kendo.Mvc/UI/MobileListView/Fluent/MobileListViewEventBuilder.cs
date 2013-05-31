namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileListView for ASP.NET MVC events.
    /// </summary>
    public class MobileListViewEventBuilder: EventBuilder
    {
        public MobileListViewEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Fires when item is tapped.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the click event.</param>
        public MobileListViewEventBuilder Click(string handler)
        {
            Handler("click", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the ListView has received data from the data source.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBound event.</param>
        public MobileListViewEventBuilder DataBound(string handler)
        {
            Handler("data-bound", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the ListView is about to be rendered.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBinding event.</param>
        public MobileListViewEventBuilder DataBinding(string handler)
        {
            Handler("data-binding", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the last page of the ListView is reached. Event will be raised only if the 'endless scroll' or 'load more' option is enabled.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the lastPageReached event.</param>
        public MobileListViewEventBuilder LastPageReached(string handler)
        {
            Handler("last-page-reached", handler);

            return this;
        }        
    }
}

