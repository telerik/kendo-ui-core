using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> component client-side events.
    /// </summary>
    public class DataSourceEventBuilder : EventBuilder
    {
        public DataSourceEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }       
        
        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>  
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        public DataSourceEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event.
        /// </summary>                
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        public DataSourceEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the Sync client-side event.
        /// </summary>  
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        public DataSourceEventBuilder Sync(string handler)
        {
            Handler("sync", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Sync client-side event.
        /// </summary>                
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        public DataSourceEventBuilder Sync(Func<object, object> handler)
        {
            Handler("sync", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the RequestStart client-side event.
        /// </summary> 
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        public DataSourceEventBuilder RequestStart(string handler)
        {
            Handler("requestStart", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the RequestStart client-side event.
        /// </summary>                
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        public DataSourceEventBuilder RequestStart(Func<object, object> handler)
        {
            Handler("requestStart", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the RequestEnd client-side event.
        /// </summary> 
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        public DataSourceEventBuilder RequestEnd(string handler)
        {
            Handler("requestEnd", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the RequestEnd client-side event.
        /// </summary>                
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        public DataSourceEventBuilder RequestEnd(Func<object, object> handler)
        {
            Handler("requestEnd", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the Error client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        public DataSourceEventBuilder Error(string handler)
        {
            Handler("error", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Error client-side event.
        /// </summary>                
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        public DataSourceEventBuilder Error(Func<object, object> handler)
        {
            Handler("error", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the Push client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        public DataSourceEventBuilder Push(string handler)
        {
            Handler("push", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Push client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        public DataSourceEventBuilder Push(Func<object, object> handler)
        {
            Handler("push", handler);

            return this;
        }
    }
}