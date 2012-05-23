namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring datepicker client events.
    /// </summary>
    public class DatePickerClientEventsBuilder : IHideObjectMembers
    {
        private readonly IDictionary<string, ClientEvent> clientEvents;

        public DatePickerClientEventsBuilder(IDictionary<string, ClientEvent> clientEvents)
        {
            this.clientEvents = clientEvents;
        }

        /// <summary>
        /// Defines the inline handler of the OnChange client-side event
        /// </summary>
        /// <param name="onChangeAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DatePicker()
        ///            .Name("DatePicker")
        ///            .ClientEvents(events => events.OnChange(
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
        public DatePickerClientEventsBuilder OnChange(Func<object, object> onChangeInlineCodeBlock)
        {
            clientEvents["change"] = new ClientEvent { InlineCodeBlock = onChangeInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnChange client-side event.
        /// </summary>
        /// <param name="onChangeHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DatePicker()
        ///             .Name("DatePicker")
        ///             .ClientEvents(events => events.OnChange("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerClientEventsBuilder OnChange(string onChangeHandlerName)
        {
            clientEvents["change"] = new ClientEvent { HandlerName = onChangeHandlerName };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnOpen client-side event
        /// </summary>
        /// <param name="onOpenInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DatePicker()
        ///            .Name("DatePicker")
        ///            .ClientEvents(events => events.OnOpen(
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
        public DatePickerClientEventsBuilder OnOpen(Func<object, object> onOpenInlineCodeBlock)
        {
            clientEvents["open"] = new ClientEvent { InlineCodeBlock = onOpenInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the OnOpen client-side event.
        /// </summary>
        /// <param name="onOpenHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DatePicker()
        ///             .Name("DatePicker")
        ///             .ClientEvents(events => events.OnOpen("onOpen"))
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerClientEventsBuilder OnOpen(string onOpenHandlerName)
        {
            clientEvents["open"] = new ClientEvent { HandlerName = onOpenHandlerName };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnClose client-side event
        /// </summary>
        /// <param name="onCloseInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DatePicker()
        ///            .Name("DatePicker")
        ///            .ClientEvents(events => events.OnClose(
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
        public DatePickerClientEventsBuilder OnClose(Func<object, object> onCloseInlineCodeBlock)
        {
            clientEvents["close"] = new ClientEvent { InlineCodeBlock = onCloseInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the OnClose client-side event.
        /// </summary>
        /// <param name="onCloseHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DatePicker()
        ///             .Name("DatePicker")
        ///             .ClientEvents(events => events.OnClose("onClose"))
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerClientEventsBuilder OnClose(string onCloseHandlerName)
        {
            clientEvents["close"] = new ClientEvent { HandlerName = onCloseHandlerName };

            return this;
        }
    }
}
