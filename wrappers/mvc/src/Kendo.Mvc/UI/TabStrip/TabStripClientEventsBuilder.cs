namespace Kendo.Mvc.UI
{
    using System;
    using System.Web.Mvc;

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TabStrip.ClientEvents"/>.
    /// </summary>
    public class TabStripClientEventsBuilder : IHideObjectMembers
    {
        private readonly TabStripClientEvents clientEvents;
        private readonly ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="TabStripClientEventsBuilder"/> class.
        /// </summary>
        /// <param name="clientEvents">The client events.</param>
        /// <param name="viewContext">The view context.</param>
        public TabStripClientEventsBuilder(TabStripClientEvents clientEvents, ViewContext viewContext)
        {
            Guard.IsNotNull(clientEvents, "clientEvents");
            Guard.IsNotNull(viewContext, "viewContext");

            this.clientEvents = clientEvents;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Defines the inline handler of the OnActivate client-side event
        /// </summary>
        /// <param name="onSelectAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TabStrip()
        ///            .Name("TabStrip")
        ///            .ClientEvents(events => events.OnActivate(() =>
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
        public TabStripClientEventsBuilder OnActivate(Action onActivateCodeBlock)
        {
            Guard.IsNotNull(onActivateCodeBlock, "onActivateCodeBlock");

            clientEvents.OnActivate.CodeBlock = onActivateCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnActivate client-side event
        /// </summary>
        /// <param name="onSelectAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TabStrip()
        ///            .Name("TabStrip")
        ///            .ClientEvents(events => events.OnActivate(
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
        public TabStripClientEventsBuilder OnActivate(Func<object, object> onActivateInlineCodeBlock)
        {
            Guard.IsNotNull(onActivateInlineCodeBlock, "onActivateInlineCodeBlock");

            clientEvents.OnActivate.InlineCodeBlock = onActivateInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnActivate client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .ClientEvents(events => events.OnActivate("onActivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripClientEventsBuilder OnActivate(string onActivateHandlerName)
        {
            Guard.IsNotNullOrEmpty(onActivateHandlerName, "onActivateHandlerName");

            clientEvents.OnActivate.HandlerName = onActivateHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSelect client-side event
        /// </summary>
        /// <param name="onSelectAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TabStrip()
        ///            .Name("TabStrip")
        ///            .ClientEvents(events => events.OnSelect(() =>
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
        public TabStripClientEventsBuilder OnSelect(Action onSelectCodeBlock)
        {
            Guard.IsNotNull(onSelectCodeBlock, "onSelectCodeBlock");

            clientEvents.OnSelect.CodeBlock = onSelectCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSelect client-side event
        /// </summary>
        /// <param name="onSelectAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TabStrip()
        ///            .Name("TabStrip")
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
        public TabStripClientEventsBuilder OnSelect(Func<object, object> onSelectInlineCodeBlock)
        {
            Guard.IsNotNull(onSelectInlineCodeBlock, "onSelectInlineCodeBlock");

            clientEvents.OnSelect.InlineCodeBlock = onSelectInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnSelect client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .ClientEvents(events => events.OnSelect("onSelect"))
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripClientEventsBuilder OnSelect(string onSelectHandlerName)
        {
            Guard.IsNotNullOrEmpty(onSelectHandlerName, "onSelectHandlerName");

            clientEvents.OnSelect.HandlerName = onSelectHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnContentLoad client-side event
        /// </summary>
        /// <param name="onSelectAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TabStrip()
        ///            .Name("TabStrip")
        ///            .ClientEvents(events => events.OnContentLoad(() =>
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
        public TabStripClientEventsBuilder OnContentLoad(Action onContentLoadCodeBlock)
        {
            Guard.IsNotNull(onContentLoadCodeBlock, "onContentLoadCodeBlock");

            clientEvents.OnContentLoad.CodeBlock = onContentLoadCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnContentLoad client-side event
        /// </summary>
        /// <param name="onSelectAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TabStrip()
        ///            .Name("TabStrip")
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
        public TabStripClientEventsBuilder OnContentLoad(Func<object, object> onContentLoadInlineCodeBlock)
        {
            Guard.IsNotNull(onContentLoadInlineCodeBlock, "onContentLoadInlineCodeBlock");

            clientEvents.OnContentLoad.InlineCodeBlock = onContentLoadInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnContentLoad client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .ClientEvents(events => events.OnContentLoad("onContentLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripClientEventsBuilder OnContentLoad(string onContentLoadHandlerName)
        {
            Guard.IsNotNullOrEmpty(onContentLoadHandlerName, "onContentLoadHandlerName");

            clientEvents.OnContentLoad.HandlerName = onContentLoadHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event
        /// </summary>
        /// <param name="onErrorAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TabStrip()
        ///            .Name("TabStrip")
        ///            .ClientEvents(events => events.OnError(() =>
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
        public TabStripClientEventsBuilder OnError(Action onErrorCodeBlock)
        {
            Guard.IsNotNull(onErrorCodeBlock, "onErrorCodeBlock");

            clientEvents.OnError.CodeBlock = onErrorCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event
        /// </summary>
        /// <param name="onErrorAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TabStrip()
        ///            .Name("TabStrip")
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
        public TabStripClientEventsBuilder OnError(Func<object, object> onErrorInlineCodeBlock)
        {
            Guard.IsNotNull(onErrorInlineCodeBlock, "onErrorInlineCodeBlock");

            clientEvents.OnError.InlineCodeBlock = onErrorInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnError client-side event.
        /// </summary>
        /// <param name="onErrorHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .ClientEvents(events => events.OnError("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripClientEventsBuilder OnError(string onErrorHandlerName)
        {
            Guard.IsNotNullOrEmpty(onErrorHandlerName, "onErrorHandlerName");

            clientEvents.OnError.HandlerName = onErrorHandlerName;

            return this;
        }
    }
}