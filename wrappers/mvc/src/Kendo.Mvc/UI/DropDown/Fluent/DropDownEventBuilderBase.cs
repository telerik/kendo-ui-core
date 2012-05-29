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

    public class DropDownEventBuilderBase
    {
        private readonly IDictionary<string, object> Events;       

        /// <summary>
        /// Initializes a new instance of the <see cref="DropDownEventBuilderBase"/> class.
        /// </summary>
        /// <param name="Events">The client events.</param>
        /// <param name="viewContext">The view context.</param>
        public DropDownEventBuilderBase(IDictionary<string, object> Events)
        {
            Guard.IsNotNull(Events, "Events");

            this.Events = Events;
        }

        
        /// <summary>
        /// Defines the inline handler of the Select client-side event
        /// </summary>
        /// <param name="selectInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().DropDownList()
        ///            .Name("DropDownList")
        ///            .Events(events => events.Select(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Select(Func<object, object> selectInlineCodeBlock)
        {
            Guard.IsNotNull(selectInlineCodeBlock, "selectInlineCodeBlock");

            Events["select"] = new ClientEvent { InlineCodeBlock = selectInlineCodeBlock };


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
        ///             .Events(events => events.Select("select"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Select(string selectHandlerName)
        {
            Guard.IsNotNullOrEmpty(selectHandlerName, "selectHandlerName");

            Events["select"] = new ClientEvent { HandlerName = selectHandlerName };

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
        public DropDownEventBuilderBase Change(Func<object, object> changeInlineCodeBlock)
        {
            Guard.IsNotNull(changeInlineCodeBlock, "changeInlineCodeBlock");

            Events["change"] = new ClientEvent { InlineCodeBlock = changeInlineCodeBlock };

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
        ///             .Events(events => events.Change("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Change(string changeHandlerName)
        {
            Guard.IsNotNullOrEmpty(changeHandlerName, "changeHandlerName");

            Events["change"] = new ClientEvent { HandlerName = changeHandlerName };

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
        ///             .Events(events => events.Open("Open"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Open(string openHandlerName)
        {
            Guard.IsNotNullOrEmpty(openHandlerName, "openHandlerName");

            Events["open"] = new ClientEvent { HandlerName = openHandlerName };

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
        ///            .Events(events => events.Open(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Open(Func<object, object> openInlineCodeBlock)
        {
            Guard.IsNotNull(openInlineCodeBlock, "openInlineCodeBlock");

            Events["open"] = new ClientEvent { InlineCodeBlock = openInlineCodeBlock };

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
        ///            .Events(events => events.Close(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Close(Func<object, object> closeInlineCodeBlock)
        {
            Guard.IsNotNull(closeInlineCodeBlock, "closeInlineCodeBlock");
            
            Events["close"] = new ClientEvent { InlineCodeBlock = closeInlineCodeBlock };

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
        ///             .Events(events => events.Close("close"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Close(string closeHandlerName)
        {
            Guard.IsNotNullOrEmpty(closeHandlerName, "closeHandlerName");
            
            Events["close"] = new ClientEvent { HandlerName = closeHandlerName };

            return this;
        }
    }
}
