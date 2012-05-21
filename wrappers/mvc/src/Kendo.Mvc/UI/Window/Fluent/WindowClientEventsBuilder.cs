namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Window.ClientEvents"/>.
    /// </summary>
    public class WindowClientEventsBuilder
    {
        private readonly WindowClientEvents clientEvents;
        private readonly ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="WindowClientEventsBuilder"/> class.
        /// </summary>
        /// <param name="clientEvents">The client events.</param>
        /// <param name="viewContext">The view context.</param>
        public WindowClientEventsBuilder(WindowClientEvents clientEvents, ViewContext viewContext)
        {
            Guard.IsNotNull(clientEvents, "clientEvents");
            Guard.IsNotNull(viewContext, "viewContext");

            this.clientEvents = clientEvents;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Defines the inline handler of the OnOpen client-side event
        /// </summary>
        /// <param name="javaScript">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
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
        public WindowClientEventsBuilder OnOpen(Action onOpenCodeBlock)
        {
            Guard.IsNotNull(onOpenCodeBlock, "onOpenCodeBlock");

            clientEvents.OnOpen.CodeBlock = onOpenCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnOpen client-side event
        /// </summary>
        /// <param name="javaScript">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnOpen(
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
        public WindowClientEventsBuilder OnOpen(Func<object, object> onOpenInlineCodeBlock)
        {
            Guard.IsNotNull(onOpenInlineCodeBlock, "onOpenInlineCodeBlock");

            clientEvents.OnOpen.InlineCodeBlock = onOpenInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnOpen client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.OnOpen("onOpen"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder OnOpen(string onOpenHandlerName)
        {
            Guard.IsNotNullOrEmpty(onOpenHandlerName, "onOpenHandlerName");

            clientEvents.OnOpen.HandlerName = onOpenHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnActivate client-side event
        /// </summary>
        /// <param name="javaScript">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
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
        public WindowClientEventsBuilder OnActivate(Action onActivateCodeBlock)
        {
            Guard.IsNotNull(onActivateCodeBlock, "onActivateCodeBlock");

            clientEvents.OnActivate.CodeBlock = onActivateCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnActivate client-side event
        /// </summary>
        /// <param name="javaScript">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
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
        public WindowClientEventsBuilder OnActivate(Func<object, object> onActivateInlineCodeBlock)
        {
            Guard.IsNotNull(onActivateInlineCodeBlock, "onActivateInlineCodeBlock");

            clientEvents.OnActivate.InlineCodeBlock = onActivateInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnActivate client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.OnActivate("onActivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder OnActivate(string onActivateHandlerName)
        {
            Guard.IsNotNullOrEmpty(onActivateHandlerName, "onActivateHandlerName");

            clientEvents.OnActivate.HandlerName = onActivateHandlerName;

            return this;
        }


        /// <summary>
        /// Defines the inline handler of the OnDeactivate client-side event
        /// </summary>
        /// <param name="javaScript">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnDeactivate(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     // event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder OnDeactivate(Action onDeactivateCodeBlock)
        {
            Guard.IsNotNull(onDeactivateCodeBlock, "onDeactivateCodeBlock");

            clientEvents.OnDeactivate.CodeBlock = onDeactivateCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDeactivate client-side event
        /// </summary>
        /// <param name="javaScript">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnDeactivate(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     // event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder OnDeactivate(Func<object, object> onDeactivateInlineCodeBlock)
        {
            Guard.IsNotNull(onDeactivateInlineCodeBlock, "onDeactivateInlineCodeBlock");

            clientEvents.OnDeactivate.InlineCodeBlock = onDeactivateInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDeactivate client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.OnDeactivate("onDeactivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder OnDeactivate(string onDeactivateHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDeactivateHandlerName, "onDeactivateHandlerName");

            clientEvents.OnDeactivate.HandlerName = onDeactivateHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnClose client-side event
        /// </summary>
        /// <param name="javaScript">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
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
        public WindowClientEventsBuilder OnClose(Action onCloseCodeBlock)
        {
            Guard.IsNotNull(onCloseCodeBlock, "onCloseCodeBlock");

            clientEvents.OnClose.CodeBlock = onCloseCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnClose client-side event
        /// </summary>
        /// <param name="javaScript">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
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
        public WindowClientEventsBuilder OnClose(Func<object, object> onCloseInlineCodeBlock)
        {
            Guard.IsNotNull(onCloseInlineCodeBlock, "onCloseInlineCodeBlock");

            clientEvents.OnClose.InlineCodeBlock = onCloseInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnClose client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.OnClose("onClose"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder OnClose(string onCloseHandlerName)
        {
            Guard.IsNotNullOrEmpty(onCloseHandlerName, "onCloseHandlerName");

            clientEvents.OnClose.HandlerName = onCloseHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDragStart client-side event
        /// </summary>
        /// <param name="javaScript">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnDragStart(() =>
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
        public WindowClientEventsBuilder OnDragStart(Action onDragStartCodeBlock)
        {
            Guard.IsNotNull(onDragStartCodeBlock, "onDragStartCodeBlock");

            clientEvents.OnDragStart.CodeBlock = onDragStartCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDragStart client-side event
        /// </summary>
        /// <param name="javaScript">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnDragStart(
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
        public WindowClientEventsBuilder OnDragStart(Func<object, object> onDragStartInlineCodeBlock)
        {
            Guard.IsNotNull(onDragStartInlineCodeBlock, "onDragStartInlineCodeBlock");

            clientEvents.OnDragStart.InlineCodeBlock = onDragStartInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDragStart client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.OnDragStart("onDragStart"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder OnDragStart(string onDragStartHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDragStartHandlerName, "onDragStartHandlerName");

            clientEvents.OnDragStart.HandlerName = onDragStartHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDragStart client-side event
        /// </summary>
        /// <param name="javaScript">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnDragStart(() =>
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
        public WindowClientEventsBuilder OnDragEnd(Action onDragEndCodeBlock)
        {
            Guard.IsNotNull(onDragEndCodeBlock, "onDragEndCodeBlock");

            clientEvents.OnDragEnd.CodeBlock = onDragEndCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDragEnd client-side event
        /// </summary>
        /// <param name="javaScript">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnDragEnd(
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
        public WindowClientEventsBuilder OnDragEnd(Func<object, object> onDragEndInlineCodeBlock)
        {
            Guard.IsNotNull(onDragEndInlineCodeBlock, "onDragEndInlineCodeBlock");

            clientEvents.OnDragEnd.InlineCodeBlock = onDragEndInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDragEnd client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.OnDragEnd("onDragEnd"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder OnDragEnd(string onDragEndHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDragEndHandlerName, "onDragEndHandlerName");

            clientEvents.OnDragEnd.HandlerName = onDragEndHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnMove client-side event
        /// </summary>
        /// <param name="javaScript">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnMove(() =>
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
        [Obsolete("Move event is deprecated in favor of DragStart and DragEnd")]
        public WindowClientEventsBuilder OnMove(Action onMoveCodeBlock)
        {
            Guard.IsNotNull(onMoveCodeBlock, "onMoveCodeBlock");

            clientEvents.OnMove.CodeBlock = onMoveCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnMove client-side event
        /// </summary>
        /// <param name="javaScript">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnMove(
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
        [Obsolete("Move event is deprecated in favor of DragStart and DragEnd")]
        public WindowClientEventsBuilder OnMove(Func<object, object> onMoveInlineCodeBlock)
        {
            Guard.IsNotNull(onMoveInlineCodeBlock, "onMoveInlineCodeBlock");

            clientEvents.OnMove.InlineCodeBlock = onMoveInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnMove client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.OnMove("onMove"))
        /// %&gt;
        /// </code>
        /// </example>
        [Obsolete("Move event is deprecated in favor of DragStart and DragEnd")]
        public WindowClientEventsBuilder OnMove(string onMoveHandlerName)
        {
            Guard.IsNotNullOrEmpty(onMoveHandlerName, "onMoveHandlerName");

            clientEvents.OnMove.HandlerName = onMoveHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnResize client-side event
        /// </summary>
        /// <param name="javaScript">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnResize(() =>
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
        public WindowClientEventsBuilder OnResize(Action onResizeCodeBlock)
        {
            Guard.IsNotNull(onResizeCodeBlock, "onResizeCodeBlock");

            clientEvents.OnResize.CodeBlock = onResizeCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnResize client-side event
        /// </summary>
        /// <param name="javaScript">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnResize(
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
        public WindowClientEventsBuilder OnResize(Func<object, object> onResizeInlineCodeBlock)
        {
            Guard.IsNotNull(onResizeInlineCodeBlock, "onResizeInlineCodeBlock");

            clientEvents.OnResize.InlineCodeBlock = onResizeInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnResize client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.OnResize("onResize"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder OnResize(string onResizeHandlerName)
        {
            Guard.IsNotNullOrEmpty(onResizeHandlerName, "onResizeHandlerName");

            clientEvents.OnResize.HandlerName = onResizeHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnRefresh client-side event
        /// </summary>
        /// <param name="javaScript">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnRefresh(() =>
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
        public WindowClientEventsBuilder OnRefresh(Action onRefreshCodeBlock)
        {
            Guard.IsNotNull(onRefreshCodeBlock, "onRefreshCodeBlock");

            clientEvents.OnRefresh.CodeBlock = onRefreshCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnRefresh client-side event
        /// </summary>
        /// <param name="javaScript">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .ClientEvents(events => events.OnRefresh(
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
        public WindowClientEventsBuilder OnRefresh(Func<object, object> onRefreshInlineCodeBlock)
        {
            Guard.IsNotNull(onRefreshInlineCodeBlock, "onRefreshInlineCodeBlock");

            clientEvents.OnRefresh.InlineCodeBlock = onRefreshInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnRefresh client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.OnRefresh("onRefresh"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder OnRefresh(string onRefreshHandlerName)
        {
            Guard.IsNotNullOrEmpty(onRefreshHandlerName, "onRefreshHandlerName");

            clientEvents.OnRefresh.HandlerName = onRefreshHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event
        /// </summary>
        /// <param name="javaScript">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
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
        public WindowClientEventsBuilder OnError(Action onErrorCodeBlock)
        {
            Guard.IsNotNull(onErrorCodeBlock, "onErrorCodeBlock");

            clientEvents.OnError.CodeBlock = onErrorCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event
        /// </summary>
        /// <param name="javaScript">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
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
        public WindowClientEventsBuilder OnError(Func<object, object> onErrorInlineCodeBlock)
        {
            Guard.IsNotNull(onErrorInlineCodeBlock, "onErrorInlineCodeBlock");

            clientEvents.OnError.InlineCodeBlock = onErrorInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnError client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.OnError("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder OnError(string onErrorHandlerName)
        {
            Guard.IsNotNullOrEmpty(onErrorHandlerName, "onErrorHandlerName");

            clientEvents.OnError.HandlerName = onErrorHandlerName;

            return this;
        }
    }
}