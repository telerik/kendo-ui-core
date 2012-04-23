// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring datepicker client events.
    /// </summary>
    public class DatePickerClientEventsBuilder : IHideObjectMembers
    {
        private readonly DatePickerClientEvents clientEvents;

        /// <summary>
        /// Initializes a new instance of the <see cref="DatePickerClientEventsBuilder"/> class.
        /// </summary>
        /// <param name="clientEvents">Datepicker client-side events.</param>
        /// <param name="viewContext">The context of the View.</param>
        public DatePickerClientEventsBuilder(DatePickerClientEvents clientEvents)
        {
            Guard.IsNotNull(clientEvents, "clientEvents");

            this.clientEvents = clientEvents;
        }

        /// <summary>
        /// Defines the inline handler of the OnChange client-side event
        /// </summary>
        /// <param name="onChangeAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DatePicker()
        ///            .Name("DatePicker")
        ///            .ClientEvents(events => events.OnChange(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerClientEventsBuilder OnChange(Action onChangeCodeBlock)
        {
            Guard.IsNotNull(onChangeCodeBlock, "onChangeCodeBlock");

            clientEvents.OnChange.CodeBlock = onChangeCodeBlock;

            return this;
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
            Guard.IsNotNull(onChangeInlineCodeBlock, "onChangeInlineCodeBlock");

            clientEvents.OnChange.InlineCodeBlock = onChangeInlineCodeBlock;

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
            Guard.IsNotNullOrEmpty(onChangeHandlerName, "onChangeHandlerName");

            clientEvents.OnChange.HandlerName = onChangeHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="onLoadAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DatePicker()
        ///            .Name("DatePicker")
        ///            .ClientEvents(events => events.OnLoad(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerClientEventsBuilder OnLoad(Action onLoadCodeBlock)
        {
            Guard.IsNotNull(onLoadCodeBlock, "onLoadCodeBlock");

            clientEvents.OnLoad.CodeBlock = onLoadCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="onLoadAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DatePicker()
        ///            .Name("DatePicker")
        ///            .ClientEvents(events => events.OnLoad(
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
        public DatePickerClientEventsBuilder OnLoad(Func<object, object> onLoadInlineCodeBlock)
        {
            Guard.IsNotNull(onLoadInlineCodeBlock, "onLoadInlineCodeBlock");

            clientEvents.OnLoad.InlineCodeBlock = onLoadInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnLoad client-side event.
        /// </summary>
        /// <param name="onLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DatePicker()
        ///             .Name("DatePicker")
        ///             .ClientEvents(events => events.OnLoad("onLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerClientEventsBuilder OnLoad(string onLoadHandlerName)
        {
            Guard.IsNotNullOrEmpty(onLoadHandlerName, "onLoadHandlerName");

            clientEvents.OnLoad.HandlerName = onLoadHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnOpen client-side event
        /// </summary>
        /// <param name="onOpenInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DatePicker()
        ///            .Name("DatePicker")
        ///            .ClientEvents(events => events.OnOpen(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerClientEventsBuilder OnOpen(Action onOpenCodeBlock)
        {
            Guard.IsNotNull(onOpenCodeBlock, "onOpenCodeBlock");

            clientEvents.OnOpen.CodeBlock = onOpenCodeBlock;

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
            Guard.IsNotNull(onOpenInlineCodeBlock, "onOpenInlineCodeBlock");

            clientEvents.OnOpen.InlineCodeBlock = onOpenInlineCodeBlock;

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
            Guard.IsNotNullOrEmpty(onOpenHandlerName, "onOpenHandlerName");

            clientEvents.OnOpen.HandlerName = onOpenHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnClose client-side event
        /// </summary>
        /// <param name="onCloseInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DatePicker()
        ///            .Name("DatePicker")
        ///            .ClientEvents(events => events.OnClose(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public DatePickerClientEventsBuilder OnClose(Action onCloseCodeBlock)
        {
            Guard.IsNotNull(onCloseCodeBlock, "onCloseCodeBlock");

            clientEvents.OnClose.CodeBlock = onCloseCodeBlock;

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
            Guard.IsNotNull(onCloseInlineCodeBlock, "onCloseInlineCodeBlock");

            clientEvents.OnClose.InlineCodeBlock = onCloseInlineCodeBlock;

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
            Guard.IsNotNullOrEmpty(onCloseHandlerName, "onCloseHandlerName");

            clientEvents.OnClose.HandlerName = onCloseHandlerName;

            return this;
        }
    }
}
