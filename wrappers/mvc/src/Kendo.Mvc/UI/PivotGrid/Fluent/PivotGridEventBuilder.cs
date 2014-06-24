namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGrid"/> component client-side events.
    /// </summary>
    public class PivotGridEventBuilder : EventBuilder
    {
        public PivotGridEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DataBinding client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        public PivotGridEventBuilder DataBinding(Func<object, object> handler)
        {
            Handler("dataBinding", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DataBinding client-side event.
        /// </summary>
        public PivotGridEventBuilder DataBinding(string handler)
        {
            Handler("dataBinding", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DataBound client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        public PivotGridEventBuilder DataBound(Func<object, object> handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DataBound client-side event.
        /// </summary>
        public PivotGridEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the ExpandMember client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        public PivotGridEventBuilder ExpandMember(Func<object, object> handler)
        {
            Handler("expandMember", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the ExpandMember client-side event.
        /// </summary>
        public PivotGridEventBuilder ExpandMember(string handler)
        {
            Handler("expandMember", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the CollapseMember client-side event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        public PivotGridEventBuilder CollapseMember(Func<object, object> handler)
        {
            Handler("collapseMember", handler);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the CollapseMember client-side event.
        /// </summary>
        public PivotGridEventBuilder CollapseMember(string handler)
        {
            Handler("collapseMember", handler);

            return this;
        }
    }
}
