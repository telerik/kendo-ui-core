namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    /// <summary>
    /// Defines the fluent interface for configuring datepicker client events.
    /// </summary>
    public class CalendarEventBuilder : EventBuilder
    {
        public CalendarEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///            .Name("DatePicker")
        ///            .Events(events => events.Change(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("Calendar")
        ///             .Events(events => events.Change("change"))
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Navigate client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///            .Name("Calendar")
        ///            .Events(events => events.Navigate(
        ///                 @&lt;text&gt;
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarEventBuilder Navigate(Func<object, object> handler)
        {
            Handler("navigate", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the Navigate client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("Calendar")
        ///             .Events(events => events.Navigate("navigate"))
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarEventBuilder Navigate(string handler)
        {
            Handler("navigate", handler);

            return this;
        }
    }
}
