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

        //>> Handlers
        
        /// <summary>
        /// Triggered after the user has checked or unchecked a checkbox.
		/// If checkChildren is true, the event is triggered after all checked states are updated.
		/// This event has been introduced in internal builds after 2014.2.828.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the check event.</param>
        public TreeViewEventBuilder Check(string handler)
        {
            Handler("check", handler);

            return this;
        }
        
        /// <summary>
        /// Triggered before a subgroup gets collapsed. Cancellable.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the collapse event.</param>
        public TreeViewEventBuilder Collapse(string handler)
        {
            Handler("collapse", handler);

            return this;
        }
        
        /// <summary>
        /// Triggered after the dataSource change event has been processed (adding/removing items);
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBound event.</param>
        public TreeViewEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }
        
        /// <summary>
        /// Triggered while a node is being dragged.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the drag event.</param>
        public TreeViewEventBuilder Drag(string handler)
        {
            Handler("drag", handler);

            return this;
        }
        
        /// <summary>
        /// Triggered after a node has been dropped.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dragend event.</param>
        public TreeViewEventBuilder DragEnd(string handler)
        {
            Handler("dragend", handler);

            return this;
        }
        
        /// <summary>
        /// Triggered before the dragging of a node starts.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dragstart event.</param>
        public TreeViewEventBuilder DragStart(string handler)
        {
            Handler("dragstart", handler);

            return this;
        }
        
        /// <summary>
        /// Triggered when a node is being dropped.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the drop event.</param>
        public TreeViewEventBuilder Drop(string handler)
        {
            Handler("drop", handler);

            return this;
        }
        
        /// <summary>
        /// Triggered before a subgroup gets expanded.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the expand event.</param>
        public TreeViewEventBuilder Expand(string handler)
        {
            Handler("expand", handler);

            return this;
        }
        
        /// <summary>
        /// Triggered when the selection has changed (either by the user or through the select method).
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public TreeViewEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
        
        /// <summary>
        /// Triggered when a node is being selected by the user. Cancellable.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the select event.</param>
        public TreeViewEventBuilder Select(string handler)
        {
            Handler("select", handler);

            return this;
        }
        
        /// <summary>
        /// Triggered when the user moves the focus on another node
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the navigate event.</param>
        public TreeViewEventBuilder Navigate(string handler)
        {
            Handler("navigate", handler);

            return this;
        }
        
        //<< Handlers

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
        /// Defines the inline handler of the dragend client-side event
        /// </summary>
        /// <param name="onDragEndAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().TreeView()
        ///           .Name("TreeView")
        ///           .Events(events => events.DragEnd(
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
        public TreeViewEventBuilder DragEnd(Func<object, object> onDragEndAction)
        {
            Handler("dragend", onDragEndAction);

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
        /// Defines the inline handler of the change client-side event
        /// </summary>
        /// <param name="onChangeAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().TreeView()
        ///           .Name("TreeView")
        ///           .Events(events => events.Change(
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
        public TreeViewEventBuilder Change(Func<object, object> onChangeAction)
        {
            Handler("change", onChangeAction);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the check client-side event
        /// </summary>
        /// <param name="onCheckAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().TreeView()
        ///           .Name("TreeView")
        ///           .Events(events => events.Check(
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
        public TreeViewEventBuilder Check(Func<object, object> onCheckAction)
        {
            Handler("check", onCheckAction);

            return this;
        }
    }
}

