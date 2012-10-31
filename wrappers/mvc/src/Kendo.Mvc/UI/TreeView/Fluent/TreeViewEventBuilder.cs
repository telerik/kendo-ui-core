namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the events of the Kendo TreeView for ASP.NET MVC
    /// </summary>
    public class TreeViewEventBuilder : EventBuilder
    {
        public TreeViewEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the collapse client-side event
        /// </summary>
        /// <param name="onCollapseAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().TreeView()
        ///           .Name("TreeView")
        ///           .Events(events => events.Collapse(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    // event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Collapse(Func<object, object> onCollapseAction)
        {
            Handler("collapse", onCollapseAction);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the collapse client-side event.
        /// </summary>
        /// <param name="onCollapseHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.Collapse("onExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Collapse(string onCollapseHandlerName)
        {
            Handler("collapse", onCollapseHandlerName);

            return this;
        }


        /// <summary>
        /// Defines the inline handler of the dataBound client-side event
        /// </summary>
        /// <param name="onDataBoundAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().TreeView()
        ///           .Name("TreeView")
        ///           .Events(events => events.DataBound(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    // event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder DataBound(Func<object, object> onDataBoundAction)
        {
            Handler("dataBound", onDataBoundAction);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the dataBound client-side event.
        /// </summary>
        /// <param name="onDataBoundHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.DataBound("onExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder DataBound(string onDataBoundHandlerName)
        {
            Handler("dataBound", onDataBoundHandlerName);

            return this;
        }


        /// <summary>
        /// Defines the inline handler of the drag client-side event
        /// </summary>
        /// <param name="onDragAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().TreeView()
        ///           .Name("TreeView")
        ///           .Events(events => events.Drag(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    // event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Drag(Func<object, object> onDragAction)
        {
            Handler("drag", onDragAction);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the drag client-side event.
        /// </summary>
        /// <param name="onDragHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.Drag("onExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Drag(string onDragHandlerName)
        {
            Handler("drag", onDragHandlerName);

            return this;
        }


        /// <summary>
        /// Defines the inline handler of the dragend client-side event
        /// </summary>
        /// <param name="onDragendAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().TreeView()
        ///           .Name("TreeView")
        ///           .Events(events => events.Dragend(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    // event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Dragend(Func<object, object> onDragendAction)
        {
            Handler("dragend", onDragendAction);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the dragend client-side event.
        /// </summary>
        /// <param name="onDragendHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.Dragend("onExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Dragend(string onDragendHandlerName)
        {
            Handler("dragend", onDragendHandlerName);

            return this;
        }


        /// <summary>
        /// Defines the inline handler of the dragstart client-side event
        /// </summary>
        /// <param name="onDragStartAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().TreeView()
        ///           .Name("TreeView")
        ///           .Events(events => events.DragStart(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    // event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder DragStart(Func<object, object> onDragStartAction)
        {
            Handler("dragstart", onDragStartAction);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the dragstart client-side event.
        /// </summary>
        /// <param name="onDragStartHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.DragStart("onExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder DragStart(string onDragStartHandlerName)
        {
            Handler("dragstart", onDragStartHandlerName);

            return this;
        }


        /// <summary>
        /// Defines the inline handler of the drop client-side event
        /// </summary>
        /// <param name="onDropAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().TreeView()
        ///           .Name("TreeView")
        ///           .Events(events => events.Drop(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    // event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Drop(Func<object, object> onDropAction)
        {
            Handler("drop", onDropAction);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the drop client-side event.
        /// </summary>
        /// <param name="onDropHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.Drop("onExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Drop(string onDropHandlerName)
        {
            Handler("drop", onDropHandlerName);

            return this;
        }


        /// <summary>
        /// Defines the inline handler of the expand client-side event
        /// </summary>
        /// <param name="onExpandAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().TreeView()
        ///           .Name("TreeView")
        ///           .Events(events => events.Expand(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    // event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Expand(Func<object, object> onExpandAction)
        {
            Handler("expand", onExpandAction);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the expand client-side event.
        /// </summary>
        /// <param name="onExpandHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.Expand("onExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Expand(string onExpandHandlerName)
        {
            Handler("expand", onExpandHandlerName);

            return this;
        }


        /// <summary>
        /// Defines the inline handler of the select client-side event
        /// </summary>
        /// <param name="onSelectAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().TreeView()
        ///           .Name("TreeView")
        ///           .Events(events => events.Select(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    // event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Select(Func<object, object> onSelectAction)
        {
            Handler("select", onSelectAction);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the select client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().TreeView()
        ///            .Name("TreeView")
        ///            .Events(events => events.Select("onExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewEventBuilder Select(string onSelectHandlerName)
        {
            Handler("select", onSelectHandlerName);

            return this;
        }


    }
}

