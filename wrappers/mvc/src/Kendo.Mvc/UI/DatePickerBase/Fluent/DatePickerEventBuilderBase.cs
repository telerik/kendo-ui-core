namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring datepicker client events.
    /// </summary>
    public class DatePickerEventBuilderBase : EventBuilder
    {
        public DatePickerEventBuilderBase(IDictionary<string, object> events) : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DatePicker()
        ///            .Name("DatePicker")
        ///            .Events(events => events.Change(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public DatePickerEventBuilderBase Change(Func<object, object> handler)
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
        /// @(Html.Kendo().DatePicker()
        ///             .Name("DatePicker")
        ///             .Events(events => events.Change("change"))
        /// )
        /// </code>
        /// </example>
        public DatePickerEventBuilderBase Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Open client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DatePicker()
        ///            .Name("DatePicker")
        ///            .Events(events => events.Open(
        ///                 @&lt;text&gt;
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///   )
        /// </code>
        /// </example>
        public DatePickerEventBuilderBase Open(Func<object, object> handler)
        {
            Handler("open", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the Open client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DatePicker()
        ///             .Name("DatePicker")
        ///             .Events(events => events.Open("open"))
        /// )
        /// </code>
        /// </example>
        public DatePickerEventBuilderBase Open(string handler)
        {
            Handler("open", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Close client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DatePicker()
        ///            .Name("DatePicker")
        ///            .Events(events => events.Close(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public DatePickerEventBuilderBase Close(Func<object, object> handler)
        {
            Handler("close", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the Close client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DatePicker()
        ///             .Name("DatePicker")
        ///             .Events(events => events.Close("close"))
        /// )
        /// </code>
        /// </example>
        public DatePickerEventBuilderBase Close(string handler)
        {
            Handler("close", handler);

            return this;
        }
    }
}
