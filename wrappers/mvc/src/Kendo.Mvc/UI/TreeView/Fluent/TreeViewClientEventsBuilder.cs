namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TreeView.ClientEvents"/>.
    /// </summary>
    public class TreeViewClientEventsBuilder : IHideObjectMembers
    {
        private readonly TreeViewClientEvents clientEvents;
        private readonly ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="TreeViewClientEventsBuilder"/> class.
        /// </summary>
        /// <param name="clientEvents">The client events.</param>
        /// <param name="viewContext">The view context.</param>
        public TreeViewClientEventsBuilder(TreeViewClientEvents clientEvents, ViewContext viewContext)
        {
            Guard.IsNotNull(clientEvents, "clientEvents");
            Guard.IsNotNull(viewContext, "viewContext");

            this.clientEvents = clientEvents;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Defines the inline handler of the OnExpand client-side event
        /// </summary>
        /// <param name="onExpandAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnExpand(() =>
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
        public TreeViewClientEventsBuilder OnExpand(Action onExpandCodeBlock)
        {
            Guard.IsNotNull(onExpandCodeBlock, "onExpandCodeBlock");

            clientEvents.OnExpand.CodeBlock = onExpandCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnExpand client-side event
        /// </summary>
        /// <param name="onExpandAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnExpand(
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
        public TreeViewClientEventsBuilder OnExpand(Func<object, object> onExpandInlineCodeBlock)
        {
            Guard.IsNotNull(onExpandInlineCodeBlock, "onExpandInlineCodeBlock");

            clientEvents.OnExpand.InlineCodeBlock = onExpandInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnExpand client-side event.
        /// </summary>
        /// <param name="onExpandHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnExpand("onExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnExpand(string onExpandHandlerName)
        {
            Guard.IsNotNullOrEmpty(onExpandHandlerName, "onExpandHandlerName");

            clientEvents.OnExpand.HandlerName = onExpandHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnCollapse client-side event
        /// </summary>
        /// <param name="onCollapseAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnCollapse(() =>
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
        public TreeViewClientEventsBuilder OnCollapse(Action onCollapseCodeBlock)
        {
            Guard.IsNotNull(onCollapseCodeBlock, "onCollapseCodeBlock");

            clientEvents.OnCollapse.CodeBlock = onCollapseCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnCollapse client-side event
        /// </summary>
        /// <param name="onCollapseAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnCollapse(
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
        public TreeViewClientEventsBuilder OnCollapse(Func<object, object> onCollapseInlineCodeBlock)
        {
            Guard.IsNotNull(onCollapseInlineCodeBlock, "onCollapseInlineCodeBlock");

            clientEvents.OnCollapse.InlineCodeBlock = onCollapseInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnCollapse client-side event.
        /// </summary>
        /// <param name="onCollapseHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnCollapse("onCollapse"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnCollapse(string onCollapseHandlerName)
        {
            Guard.IsNotNullOrEmpty(onCollapseHandlerName, "onCollapseHandlerName");

            clientEvents.OnCollapse.HandlerName = onCollapseHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSelect client-side event
        /// </summary>
        /// <param name="onSelectAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnSelect(() =>
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
        public TreeViewClientEventsBuilder OnSelect(Action onSelectCodeBlock)
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
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnSelect(
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
        public TreeViewClientEventsBuilder OnSelect(Func<object, object> onSelectInlineCodeBlock)
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
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnSelect("onSelect"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnSelect(string onSelectHandlerName)
        {
            Guard.IsNotNullOrEmpty(onSelectHandlerName, "onSelectHandlerName");

            clientEvents.OnSelect.HandlerName = onSelectHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDragStart client-side event
        /// </summary>
        /// <param name="onNodeDragAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDragStart(() =>
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
        public TreeViewClientEventsBuilder OnNodeDragStart(Action onDragStartCodeBlock)
        {
            Guard.IsNotNull(onDragStartCodeBlock, "onDragStartCodeBlock");

            clientEvents.OnDragStart.CodeBlock = onDragStartCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDragStart client-side event
        /// </summary>
        /// <param name="onNodeDragAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDragStart(
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
        public TreeViewClientEventsBuilder OnDragStart(Func<object, object> onDragStartInlineCodeBlock)
        {
            Guard.IsNotNull(onDragStartInlineCodeBlock, "onDragStartInlineCodeBlock");

            clientEvents.OnDragStart.InlineCodeBlock = onDragStartInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDragStart client-side event.
        /// </summary>
        /// <param name="onNodeDragHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnDragStart("onNodeDragStrat"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnDragStart(string onDragStartHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDragStartHandlerName, "onDragStartHandlerName");

            clientEvents.OnDragStart.HandlerName = onDragStartHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDrop client-side event
        /// </summary>
        /// <param name="OnDropAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDrop(() =>
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
        public TreeViewClientEventsBuilder OnDrop(Action onDropCodeBlock)
        {
            Guard.IsNotNull(onDropCodeBlock, "onDropCodeBlock");

            clientEvents.OnDrop.CodeBlock = onDropCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDrop client-side event
        /// </summary>
        /// <param name="OnDropAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDrop(
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
        public TreeViewClientEventsBuilder OnDrop(Func<object, object> onDropInlineCodeBlock)
        {
            Guard.IsNotNull(onDropInlineCodeBlock, "onDropInlineCodeBlock");

            clientEvents.OnDrop.InlineCodeBlock = onDropInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDrop client-side event.
        /// </summary>
        /// <param name="OnDropHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnDrop("OnDrop"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnDrop(string onDropHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDropHandlerName, "onDropHandlerName");

            clientEvents.OnDrop.HandlerName = onDropHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDragEnd client-side event
        /// </summary>
        /// <param name="OnDragEndAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDragEnd(() =>
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
        public TreeViewClientEventsBuilder OnDragEnd(Action onDragEndCodeBlock)
        {
            Guard.IsNotNull(onDragEndCodeBlock, "onDragEndCodeBlock");

            clientEvents.OnDragEnd.CodeBlock = onDragEndCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDragEnd client-side event
        /// </summary>
        /// <param name="OnDragEndAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDragEnd(
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
        public TreeViewClientEventsBuilder OnDragEnd(Func<object, object> onDragEndCodeBlock)
        {
            Guard.IsNotNull(onDragEndCodeBlock, "onDragEndCodeBlock");

            clientEvents.OnDragEnd.InlineCodeBlock = onDragEndCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDragEnd client-side event.
        /// </summary>
        /// <param name="OnDragEndHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnDragEnd("OnDragEnd"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnDragEnd(string onDragEndHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDragEndHandlerName, "onDragEndHandlerName");

            clientEvents.OnDragEnd.HandlerName = onDragEndHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDragCancelled client-side event
        /// </summary>
        /// <param name="OnDragCancelledAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDragCancelled(() =>
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
        public TreeViewClientEventsBuilder OnDragCancelled(Action onDragCancelledCodeBlock)
        {
            Guard.IsNotNull(onDragCancelledCodeBlock, "onDragCancelledCodeBlock");

            clientEvents.OnDragCancelled.CodeBlock = onDragCancelledCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDragCancelled client-side event
        /// </summary>
        /// <param name="OnDragCancelledAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDragCancelled(
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
        public TreeViewClientEventsBuilder OnDragCancelled(Func<object, object> onDragCancelledInlineCodeBlock)
        {
            Guard.IsNotNull(onDragCancelledInlineCodeBlock, "onDragCancelledInlineCodeBlock");

            clientEvents.OnDragCancelled.InlineCodeBlock = onDragCancelledInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDragCancelled client-side event.
        /// </summary>
        /// <param name="OnDragCancelledHandlerAction">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnDragCancelled("OnDragCancelled"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnDragCancelled(string onDragCancelledHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDragCancelledHandlerName, "onDragCancelledHandlerName");

            clientEvents.OnDragCancelled.HandlerName = onDragCancelledHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDrag client-side event
        /// </summary>
        /// <param name="onNodeDragging">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDrag(() =>
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
        public TreeViewClientEventsBuilder OnDrag(Action onDragCodeBlock)
        {
            Guard.IsNotNull(onDragCodeBlock, "onDragCodeBlock");

            clientEvents.OnDrag.CodeBlock = onDragCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDrag client-side event
        /// </summary>
        /// <param name="onNodeDragging">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDrag(
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
        public TreeViewClientEventsBuilder OnDrag(Func<object, object> onDragInlineCodeBlock)
        {
            Guard.IsNotNull(onDragInlineCodeBlock, "onDragInlineCodeBlock");

            clientEvents.OnDrag.InlineCodeBlock = onDragInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDrag client-side event.
        /// </summary>
        /// <param name="onNodeDragging">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnDrag("OnDrag"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnDrag(string onDragHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDragHandlerName, "onDragHandlerName");

            clientEvents.OnDrag.HandlerName = onDragHandlerName;

            return this;
        }
    }
}