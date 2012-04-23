// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
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
        ///  &lt;% Html.Telerik().TreeView()
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
        ///  &lt;% Html.Telerik().TreeView()
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
        ///  &lt;%= Html.Telerik().TreeView()
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
        ///  &lt;% Html.Telerik().TreeView()
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
        ///  &lt;% Html.Telerik().TreeView()
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
        ///  &lt;%= Html.Telerik().TreeView()
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
        ///  &lt;% Html.Telerik().TreeView()
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
        ///  &lt;% Html.Telerik().TreeView()
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
        ///  &lt;%= Html.Telerik().TreeView()
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
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="onLoadAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnLoad(() =>
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
        public TreeViewClientEventsBuilder OnLoad(Action onLoadCodeBlock)
        {
            Guard.IsNotNull(onLoadCodeBlock, "onLoadInlineCode");

            clientEvents.OnLoad.CodeBlock = onLoadCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="onLoadAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnLoad(
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
        public TreeViewClientEventsBuilder OnLoad(Func<object, object> onLoadInlineCodeBlock)
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
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnLoad("onLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnLoad(string onLoadHandlerName)
        {
            Guard.IsNotNullOrEmpty(onLoadHandlerName, "onLoadHandlerName");

            clientEvents.OnLoad.HandlerName = onLoadHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event
        /// </summary>
        /// <param name="onErrorAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnError(() =>
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
        public TreeViewClientEventsBuilder OnError(Action onErrorCodeBlock)
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
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnError(
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
        public TreeViewClientEventsBuilder OnError(Func<object, object> onErrorInlineCodeBlock)
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
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnError("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnError(string onErrorHandlerName)
        {
            Guard.IsNotNullOrEmpty(onErrorHandlerName, "onErrorHandlerName");

            clientEvents.OnError.HandlerName = onErrorHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnNodeDragStart client-side event
        /// </summary>
        /// <param name="onNodeDragAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnNodeDragStart(() =>
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
        public TreeViewClientEventsBuilder OnNodeDragStart(Action onNodeDragStartCodeBlock)
        {
            Guard.IsNotNull(onNodeDragStartCodeBlock, "onNodeDragStartCodeBlock");

            clientEvents.OnNodeDragStart.CodeBlock = onNodeDragStartCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnNodeDragStart client-side event
        /// </summary>
        /// <param name="onNodeDragAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnNodeDragStart(
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
        public TreeViewClientEventsBuilder OnNodeDragStart(Func<object, object> onNodeDragStartInlineCodeBlock)
        {
            Guard.IsNotNull(onNodeDragStartInlineCodeBlock, "onNodeDragStartInlineCodeBlock");

            clientEvents.OnNodeDragStart.InlineCodeBlock = onNodeDragStartInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnNodeDragStart client-side event.
        /// </summary>
        /// <param name="onNodeDragHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnNodeDragStart("onNodeDragStrat"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnNodeDragStart(string onNodeDragStartHandlerName)
        {
            Guard.IsNotNullOrEmpty(onNodeDragStartHandlerName, "onNodeDragStartHandlerName");

            clientEvents.OnNodeDragStart.HandlerName = onNodeDragStartHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnNodeDrop client-side event
        /// </summary>
        /// <param name="onNodeDropAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnNodeDrop(() =>
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
        public TreeViewClientEventsBuilder OnNodeDrop(Action onNodeDropCodeBlock)
        {
            Guard.IsNotNull(onNodeDropCodeBlock, "onNodeDropCodeBlock");

            clientEvents.OnNodeDrop.CodeBlock = onNodeDropCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnNodeDrop client-side event
        /// </summary>
        /// <param name="onNodeDropAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnNodeDrop(
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
        public TreeViewClientEventsBuilder OnNodeDrop(Func<object, object> onNodeDropInlineCodeBlock)
        {
            Guard.IsNotNull(onNodeDropInlineCodeBlock, "onNodeDropInlineCodeBlock");

            clientEvents.OnNodeDrop.InlineCodeBlock = onNodeDropInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnNodeDrop client-side event.
        /// </summary>
        /// <param name="onNodeDropHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnNodeDrop("OnNodeDrop"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnNodeDrop(string onNodeDropHandlerName)
        {
            Guard.IsNotNullOrEmpty(onNodeDropHandlerName, "onNodeDropHandlerName");

            clientEvents.OnNodeDrop.HandlerName = onNodeDropHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnNodeDropped client-side event
        /// </summary>
        /// <param name="onNodeDroppedAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnNodeDropped(() =>
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
        public TreeViewClientEventsBuilder OnNodeDropped(Action onNodeDroppedCodeBlock)
        {
            Guard.IsNotNull(onNodeDroppedCodeBlock, "onNodeDroppedCodeBlock");

            clientEvents.OnNodeDropped.CodeBlock = onNodeDroppedCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnNodeDropped client-side event
        /// </summary>
        /// <param name="onNodeDroppedAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnNodeDropped(
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
        public TreeViewClientEventsBuilder OnNodeDropped(Func<object, object> onNodeDroppedCodeBlock)
        {
            Guard.IsNotNull(onNodeDroppedCodeBlock, "onNodeDroppedCodeBlock");

            clientEvents.OnNodeDropped.InlineCodeBlock = onNodeDroppedCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnNodeDropped client-side event.
        /// </summary>
        /// <param name="onNodeDroppedHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnNodeDropped("OnNodeDropped"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnNodeDropped(string onNodeDroppedHandlerName)
        {
            Guard.IsNotNullOrEmpty(onNodeDroppedHandlerName, "onNodeDroppedHandlerName");

            clientEvents.OnNodeDropped.HandlerName = onNodeDroppedHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnNodeDragCancelled client-side event
        /// </summary>
        /// <param name="onNodeDragCancelledAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnNodeDragCancelled(() =>
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
        public TreeViewClientEventsBuilder OnNodeDragCancelled(Action onNodeDragCancelledCodeBlock)
        {
            Guard.IsNotNull(onNodeDragCancelledCodeBlock, "onNodeDragCancelledCodeBlock");

            clientEvents.OnNodeDragCancelled.CodeBlock = onNodeDragCancelledCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnNodeDragCancelled client-side event
        /// </summary>
        /// <param name="onNodeDragCancelledAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnNodeDragCancelled(
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
        public TreeViewClientEventsBuilder OnNodeDragCancelled(Func<object, object> onNodeDragCancelledInlineCodeBlock)
        {
            Guard.IsNotNull(onNodeDragCancelledInlineCodeBlock, "onNodeDragCancelledInlineCodeBlock");

            clientEvents.OnNodeDragCancelled.InlineCodeBlock = onNodeDragCancelledInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnNodeDragCancelled client-side event.
        /// </summary>
        /// <param name="onNodeDragCancelledHandlerAction">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnNodeDragCancelled("OnNodeDragCancelled"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnNodeDragCancelled(string onNodeDragCancelledHandlerName)
        {
            Guard.IsNotNullOrEmpty(onNodeDragCancelledHandlerName, "onNodeDragCancelledHandlerName");

            clientEvents.OnNodeDragCancelled.HandlerName = onNodeDragCancelledHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnNodeDragging client-side event
        /// </summary>
        /// <param name="onNodeDragging">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnNodeDragging(() =>
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
        public TreeViewClientEventsBuilder OnNodeDragging(Action onNodeDraggingCodeBlock)
        {
            Guard.IsNotNull(onNodeDraggingCodeBlock, "onNodeDraggingCodeBlock");

            clientEvents.OnNodeDragging.CodeBlock = onNodeDraggingCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnNodeDragging client-side event
        /// </summary>
        /// <param name="onNodeDragging">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnNodeDragging(
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
        public TreeViewClientEventsBuilder OnNodeDragging(Func<object, object> onNodeDraggingInlineCodeBlock)
        {
            Guard.IsNotNull(onNodeDraggingInlineCodeBlock, "onNodeDraggingInlineCodeBlock");

            clientEvents.OnNodeDragging.InlineCodeBlock = onNodeDraggingInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnNodeDragging client-side event.
        /// </summary>
        /// <param name="onNodeDragging">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnNodeDragging("OnNodeDragging"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnNodeDragging(string onNodeDraggingHandlerName)
        {
            Guard.IsNotNullOrEmpty(onNodeDraggingHandlerName, "onNodeDraggingHandlerName");

            clientEvents.OnNodeDragging.HandlerName = onNodeDraggingHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDataBinding client-side event
        /// </summary>
        /// <param name="onDataBindingAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDataBinding(() =>
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
        public TreeViewClientEventsBuilder OnDataBinding(Action onDataBindingCodeBlock)
        {
            Guard.IsNotNull(onDataBindingCodeBlock, "onDataBindingCodeBlock");

            clientEvents.OnDataBinding.CodeBlock = onDataBindingCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDataBinding client-side event
        /// </summary>
        /// <param name="onDataBindingAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDataBinding(
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
        public TreeViewClientEventsBuilder OnDataBinding(Func<object, object> onDataBindingInlineCodeBlock)
        {
            Guard.IsNotNull(onDataBindingInlineCodeBlock, "onDataBindingInlineCodeBlock");

            clientEvents.OnDataBinding.InlineCodeBlock = onDataBindingInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDataBinding client-side event.
        /// </summary>
        /// <param name="onDataBindingHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnDataBinding("OnDataBinding"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnDataBinding(string OnDataBindingHandlerName)
        {
            Guard.IsNotNullOrEmpty(OnDataBindingHandlerName, "OnDataBindingHandlerName");

            clientEvents.OnDataBinding.HandlerName = OnDataBindingHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDataBound client-side event
        /// </summary>
        /// <param name="onDataBoundAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDataBound(() =>
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
        public TreeViewClientEventsBuilder OnDataBound(Action onDataBoundCodeBlock)
        {
            Guard.IsNotNull(onDataBoundCodeBlock, "onDataBoundCodeBlock");

            clientEvents.OnDataBound.CodeBlock = onDataBoundCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDataBound client-side event
        /// </summary>
        /// <param name="onDataBoundAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnDataBound(
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
        public TreeViewClientEventsBuilder OnDataBound(Func<object, object> onDataBoundInlineCodeBlock)
        {
            Guard.IsNotNull(onDataBoundInlineCodeBlock, "onDataBoundInlineCode");

            clientEvents.OnDataBound.InlineCodeBlock = onDataBoundInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDataBound client-side event.
        /// </summary>
        /// <param name="onDataBoundHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnDataBound("OnDataBound"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnDataBound(string onDataBoundHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDataBoundHandlerName, "onDataBoundHandlerName");

            clientEvents.OnDataBound.HandlerName = onDataBoundHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnChecked client-side event. Requires ShowCheckBox to be true.
        /// </summary>
        /// <param name="onDataBoundAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnChecked(() =>
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
        public TreeViewClientEventsBuilder OnChecked(Action onCheckedCodeBlock)
        {
            Guard.IsNotNull(onCheckedCodeBlock, "onCheckedCodeBlock");

            clientEvents.OnChecked.CodeBlock = onCheckedCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnChecked client-side event. Requires ShowCheckBox to be true.
        /// </summary>
        /// <param name="onDataBoundAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().TreeView()
        ///            .Name("TreeView")
        ///            .ClientEvents(events => events.OnChecked(
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
        public TreeViewClientEventsBuilder OnChecked(Func<object, object> onCheckedInlineCodeBlock)
        {
            Guard.IsNotNull(onCheckedInlineCodeBlock, "onCheckedInlineCodeBlock");

            clientEvents.OnChecked.InlineCodeBlock = onCheckedInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnChecked client-side event. Requires ShowCheckBox to be true.
        /// </summary>
        /// <param name="onCheckedHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events => events.OnChecked("onChecked"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewClientEventsBuilder OnChecked(string onCheckedHandlerName)
        {
            Guard.IsNotNullOrEmpty(onCheckedHandlerName, "onCheckedHandlerName");

            clientEvents.OnChecked.HandlerName = onCheckedHandlerName;

            return this;
        }
    }
}