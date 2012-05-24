namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Query.Dynamic;

    public class DropDownBaseClientEventsBuilder
    {
        private readonly IDictionary<string, object> clientEvents;       

        /// <summary>
        /// Initializes a new instance of the <see cref="DropDownBaseClientEventsBuilder"/> class.
        /// </summary>
        /// <param name="clientEvents">The client events.</param>
        /// <param name="viewContext">The view context.</param>
        public DropDownBaseClientEventsBuilder(IDictionary<string, object> clientEvents)
        {
            Guard.IsNotNull(clientEvents, "clientEvents");

            this.clientEvents = clientEvents;
        }

        
        /// <summary>
        /// Defines the inline handler of the Select client-side event
        /// </summary>
        /// <param name="selectInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DropDownList()
        ///            .Name("DropDownList")
        ///            .ClientEvents(events => events.Select(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownBaseClientEventsBuilder Select(Func<object, object> selectInlineCodeBlock)
        {
            Guard.IsNotNull(selectInlineCodeBlock, "selectInlineCodeBlock");

            clientEvents["select"] = new ClientEvent { InlineCodeBlock = selectInlineCodeBlock };


            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Select client-side event.
        /// </summary>
        /// <param name="selectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .ClientEvents(events => events.Select("select"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownBaseClientEventsBuilder Select(string selectHandlerName)
        {
            Guard.IsNotNullOrEmpty(selectHandlerName, "selectHandlerName");

            clientEvents["select"] = new ClientEvent { HandlerName = selectHandlerName };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="changeInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DropDownList()
        ///            .Name("DropDownList")
        ///            .ClientEvents(events => events.Change(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownBaseClientEventsBuilder Change(Func<object, object> changeInlineCodeBlock)
        {
            Guard.IsNotNull(changeInlineCodeBlock, "changeInlineCodeBlock");

            clientEvents["change"] = new ClientEvent { InlineCodeBlock = changeInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>
        /// <param name="changeHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .ClientEvents(events => events.Change("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownBaseClientEventsBuilder Change(string changeHandlerName)
        {
            Guard.IsNotNullOrEmpty(changeHandlerName, "changeHandlerName");

            clientEvents["change"] = new ClientEvent { HandlerName = changeHandlerName };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Open client-side event.
        /// </summary>
        /// <param name="openHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .ClientEvents(events => events.Open("Open"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownBaseClientEventsBuilder Open(string openHandlerName)
        {
            Guard.IsNotNullOrEmpty(openHandlerName, "openHandlerName");

            clientEvents["open"] = new ClientEvent { HandlerName = openHandlerName };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Open client-side event
        /// </summary>
        /// <param name="openInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DropDownList()
        ///            .Name("DropDownList")
        ///            .ClientEvents(events => events.Open(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownBaseClientEventsBuilder Open(Func<object, object> openInlineCodeBlock)
        {
            Guard.IsNotNull(openInlineCodeBlock, "openInlineCodeBlock");

            clientEvents["open"] = new ClientEvent { InlineCodeBlock = openInlineCodeBlock };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Close client-side event
        /// </summary>
        /// <param name="closeInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DropDownList()
        ///            .Name("DropDownList")
        ///            .ClientEvents(events => events.Close(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownBaseClientEventsBuilder Close(Func<object, object> closeInlineCodeBlock)
        {
            Guard.IsNotNull(closeInlineCodeBlock, "closeInlineCodeBlock");
            
            clientEvents["close"] = new ClientEvent { InlineCodeBlock = closeInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Close client-side event.
        /// </summary>
        /// <param name="closeHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .ClientEvents(events => events.Close("close"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownBaseClientEventsBuilder Close(string closeHandlerName)
        {
            Guard.IsNotNullOrEmpty(closeHandlerName, "closeHandlerName");
            
            clientEvents["close"] = new ClientEvent { HandlerName = closeHandlerName };

            return this;
        }
    }
}
