namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo TreeView for ASP.NET MVC events
    /// </summary>
    public class TreeViewEventBuilder : EventBuilder
    {
        public TreeViewEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Expand client-side event
        /// </summary>
        /// <param name="onExpandAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.Expand(
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
        public TreeViewEventBuilder Expand(Func<object, object> handler)
        {
            Handler("expand", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Expand client-side event.
        /// </summary>
        /// <param name="onExpandHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Events(events => events.Expand("onExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Expand(string handler)
        {
            Handler("expand", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Collapse client-side event
        /// </summary>
        /// <param name="onCollapseAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.Collapse(
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
        public TreeViewEventBuilder Collapse(Func<object, object> handler)
        {
            Handler("collapse", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Collapse client-side event.
        /// </summary>
        /// <param name="onCollapseHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Events(events => events.Collapse("onCollapse"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Collapse(string handler)
        {
            Handler("collapse", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Select client-side event
        /// </summary>
        /// <param name="onSelectAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.Select(
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
        public TreeViewEventBuilder Select(Func<object, object> handler)
        {
            Handler("select", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Select client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Events(events => events.Select("onSelect"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Select(string handler)
        {
            Handler("select", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the DragStart client-side event
        /// </summary>
        /// <param name="onNodeDragAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.DragStart(
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
        public TreeViewEventBuilder DragStart(Func<object, object> handler)
        {
            Handler("dragstart", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DragStart client-side event.
        /// </summary>
        /// <param name="onNodeDragHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Events(events => events.DragStart("onNodeDragStrat"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder DragStart(string handler)
        {
            Handler("dragstart", handler);

            return this;
        }

        /// Defines the inline handler of the Drop client-side event
        /// </summary>
        /// <param name="DropAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.Drop(
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
        public TreeViewEventBuilder Drop(Func<object, object> handler)
        {
            Handler("drop", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Drop client-side event.
        /// </summary>
        /// <param name="DropHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Events(events => events.Drop("Drop"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Drop(string handler)
        {
            Handler("drop", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the DragEnd client-side event
        /// </summary>
        /// <param name="DragEndAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.DragEnd(
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
        public TreeViewEventBuilder DragEnd(Func<object, object> handler)
        {
            Handler("dragend", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DragEnd client-side event.
        /// </summary>
        /// <param name="DragEndHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Events(events => events.DragEnd("DragEnd"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder DragEnd(string handler)
        {
            Handler("dragend", handler);

            return this;
        }


        /// <summary>
        /// Defines the inline handler of the Drag client-side event
        /// </summary>
        /// <param name="onNodeDragging">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.Drag(
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
        public TreeViewEventBuilder Drag(Func<object, object> handler)
        {
            Handler("drag", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Drag client-side event.
        /// </summary>
        /// <param name="onNodeDragging">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Events(events => events.Drag("Drag"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Drag(string handler)
        {
            Handler("drag", handler);

            return this;
        }
    }
}