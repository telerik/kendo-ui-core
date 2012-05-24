namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring datepicker client events.
    /// </summary>
    public class DatePickerBaseClientEventsBuilder : IHideObjectMembers
    {
        private readonly IDictionary<string, object> clientEvents;

        public DatePickerBaseClientEventsBuilder(IDictionary<string, object> clientEvents)
        {
            this.clientEvents = clientEvents;
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="changeInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DatePicker()
        ///            .Name("DatePicker")
        ///            .ClientEvents(events => events.Change(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerBaseClientEventsBuilder Change(Func<object, object> changeInlineCodeBlock)
        {
            clientEvents["change"] = new ClientEvent { InlineCodeBlock = changeInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>
        /// <param name="changeHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DatePicker()
        ///             .Name("DatePicker")
        ///             .ClientEvents(events => events.Change("change"))
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerBaseClientEventsBuilder Change(string changeHandlerName)
        {
            clientEvents["change"] = new ClientEvent { HandlerName = changeHandlerName };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Open client-side event
        /// </summary>
        /// <param name="openInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DatePicker()
        ///            .Name("DatePicker")
        ///            .ClientEvents(events => events.Open(
        ///                 @&lt;text&gt;
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerBaseClientEventsBuilder Open(Func<object, object> openInlineCodeBlock)
        {
            clientEvents["open"] = new ClientEvent { InlineCodeBlock = openInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the Open client-side event.
        /// </summary>
        /// <param name="openHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DatePicker()
        ///             .Name("DatePicker")
        ///             .ClientEvents(events => events.Open("open"))
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerBaseClientEventsBuilder Open(string openHandlerName)
        {
            clientEvents["open"] = new ClientEvent { HandlerName = openHandlerName };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Close client-side event
        /// </summary>
        /// <param name="closeInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DatePicker()
        ///            .Name("DatePicker")
        ///            .ClientEvents(events => events.Close(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerBaseClientEventsBuilder Close(Func<object, object> closeInlineCodeBlock)
        {
            clientEvents["close"] = new ClientEvent { InlineCodeBlock = closeInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the Close client-side event.
        /// </summary>
        /// <param name="closeHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DatePicker()
        ///             .Name("DatePicker")
        ///             .ClientEvents(events => events.Close("close"))
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerBaseClientEventsBuilder Close(string closeHandlerName)
        {
            clientEvents["close"] = new ClientEvent { HandlerName = closeHandlerName };

            return this;
        }
    }
}
