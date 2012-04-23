// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Web.Mvc;
    
    using Infrastructure;

    /// <summary>
    /// Defines fluent interface for configuring calendar client events.
    /// </summary>
    public class CalendarClientEventsBuilder : IHideObjectMembers
    {
        private readonly CalendarClientEvents clientEvents;
        private readonly ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="CalendarClientEventsBuilder"/> class.
        /// </summary>
        /// <param name="clientEvents">Client events of the calendar.</param>
        /// <param name="viewContext">The context of the View.</param>
        public CalendarClientEventsBuilder(CalendarClientEvents clientEvents, ViewContext viewContext)
        {
            Guard.IsNotNull(clientEvents, "clientEvents");
            Guard.IsNotNull(viewContext, "viewContext");

            this.clientEvents = clientEvents;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Defines the inline handler of the OnSelect client-side event
        /// </summary>
        /// <param name="onSelectAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Calendar()
        ///            .Name("Calendar")
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
        public CalendarClientEventsBuilder OnChange(Action onChangeCodeBlock)
        {
            Guard.IsNotNull(onChangeCodeBlock, "onChangeCodeBlock");

            clientEvents.OnChange.CodeBlock = onChangeCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSelect client-side event
        /// </summary>
        /// <param name="onSelectAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Calendar()
        ///            .Name("Calendar")
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
        public CalendarClientEventsBuilder OnChange(Func<object, object> onChangeInlineCodeBlock)
        {
            Guard.IsNotNull(onChangeInlineCodeBlock, "onChangeInlineCodeBlock");

            clientEvents.OnChange.InlineCodeBlock = onChangeInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the OnDateSelect client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Calendar()
        ///             .Name("Calendar")
        ///             .ClientEvents(events => events.OnChange("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarClientEventsBuilder OnChange(string onChangeHandlerName)
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
        ///  &lt;% Html.Telerik().Calendar()
        ///            .Name("Calendar")
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
        public CalendarClientEventsBuilder OnLoad(Action onLoadCodeBlock)
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
        ///  &lt;% Html.Telerik().Calendar()
        ///            .Name("Calendar")
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
        public CalendarClientEventsBuilder OnLoad(Func<object, object> onLoadInlineCodeBlock)
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
        public CalendarClientEventsBuilder OnLoad(string onLoadHandlerName)
        {
            Guard.IsNotNullOrEmpty(onLoadHandlerName, "onLoadHandlerName");

            clientEvents.OnLoad.HandlerName = onLoadHandlerName;

            return this;
        }
    }
}