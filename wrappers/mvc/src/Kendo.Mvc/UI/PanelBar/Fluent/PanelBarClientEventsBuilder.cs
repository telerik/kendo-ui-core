namespace Kendo.Mvc.UI
{
    using System;
    using System.Web.Mvc;

    using Infrastructure;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PanelBar.ClientEvents"/>.
    /// </summary>
    public class PanelBarClientEventsBuilder
    {
        private readonly IDictionary<string, object> clientEvents;
        
        /// <summary>
        /// Initializes a new instance of the <see cref="PanelBarClientEventsBuilder"/> class.
        /// </summary>
        /// <param name="clientEvents">The client events.</param>
        public PanelBarClientEventsBuilder(IDictionary<string, object> clientEvents)
        {
            this.clientEvents = clientEvents;
        }

        /// <summary>
        /// Defines the inline handler of the Expand client-side event
        /// </summary>
        /// <param name="expandInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().PanelBar()
        ///            .Name("PanelBar")
        ///            .ClientEvents(events => events.OnExpand(
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
        public PanelBarClientEventsBuilder OnExpand(Func<object, object> expandInlineCodeBlock)
        {
            clientEvents["expand"] = new ClientEvent { InlineCodeBlock = expandInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Expand client-side event.
        /// </summary>
        /// <param name="expandHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .ClientEvents(events => events.OnExpand("expand"))
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarClientEventsBuilder OnExpand(string expandHandlerName)
        {
            clientEvents["expand"] = new ClientEvent { HandlerName = expandHandlerName };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the ContentLoad client-side event
        /// </summary>
        /// <param name="contentLoadInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().PanelBar()
        ///            .Name("PanelBar")
        ///            .ClientEvents(events => events.OnContentLoad(
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
        public PanelBarClientEventsBuilder OnContentLoad(Func<object, object> contentLoadInlineCodeBlock)
        {
            clientEvents["contentLoad"] = new ClientEvent { InlineCodeBlock = contentLoadInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the ContentLoad client-side event.
        /// </summary>
        /// <param name="contentLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .ClientEvents(events => events.OnContentLoad("contentLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarClientEventsBuilder OnContentLoad(string contentLoadHandlerName)
        {
            clientEvents["contentLoad"] = new ClientEvent { HandlerName = contentLoadHandlerName };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Activate client-side event
        /// </summary>
        /// <param name="activateInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().PanelBar()
        ///            .Name("PanelBar")
        ///            .ClientEvents(events => events.OnContentLoad(
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
        public PanelBarClientEventsBuilder OnActivate(Func<object, object> activateInlineCodeBlock)
        {
            clientEvents["activate"] = new ClientEvent { InlineCodeBlock = activateInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Activate client-side event.
        /// </summary>
        /// <param name="activateLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .ClientEvents(events => events.OnContentLoad("contentLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarClientEventsBuilder OnActivate(string activateLoadHandlerName)
        {
            clientEvents["activate"] = new ClientEvent { HandlerName = activateLoadHandlerName };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Collapse client-side event
        /// </summary>
        /// <param name="collapseInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().PanelBar()
        ///            .Name("PanelBar")
        ///            .ClientEvents(events => events.OnCollapse(
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
        public PanelBarClientEventsBuilder OnCollapse(Func<object, object> collapseInlineCodeBlock)
        {
            clientEvents["collapse"] = new ClientEvent { InlineCodeBlock = collapseInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Collapse client-side event.
        /// </summary>
        /// <param name="collapseHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .ClientEvents(events => events.OnCollapse("collapse"))
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarClientEventsBuilder OnCollapse(string collapseHandlerName)
        {
            clientEvents["collapse"] = new ClientEvent { HandlerName = collapseHandlerName };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Select client-side event
        /// </summary>
        /// <param name="selectInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().PanelBar()
        ///            .Name("PanelBar")
        ///            .ClientEvents(events => events.OnSelect(
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
        public PanelBarClientEventsBuilder OnSelect(Func<object, object> selectInlineCodeBlock)
        {
            clientEvents["select"] = new ClientEvent { InlineCodeBlock = selectInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Select client-side event.
        /// </summary>
        /// <param name="selectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .ClientEvents(events => events.OnSelect("select"))
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarClientEventsBuilder OnSelect(string selectHandlerName)
        {
            clientEvents["select"] = new ClientEvent { HandlerName = selectHandlerName };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Error client-side event
        /// </summary>
        /// <param name="errorInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().PanelBar()
        ///            .Name("PanelBar")
        ///            .ClientEvents(events => events.OnError(
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
        public PanelBarClientEventsBuilder OnError(Func<object, object> errorInlineCodeBlock)
        {
            clientEvents["error"] = new ClientEvent { InlineCodeBlock = errorInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnError client-side event.
        /// </summary>
        /// <param name="errorHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .ClientEvents(events => events.OnError("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarClientEventsBuilder OnError(string errorHandlerName)
        {
            clientEvents["error"] = new ClientEvent { HandlerName = errorHandlerName };

            return this;
        }
    }
}