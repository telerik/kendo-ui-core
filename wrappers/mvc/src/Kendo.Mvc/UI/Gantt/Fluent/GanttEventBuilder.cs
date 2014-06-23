namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo Gantt for ASP.NET MVC events.
    /// </summary>
    public class GanttEventBuilder: EventBuilder
    {
        public GanttEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fired before the widget binds to its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBinding event.</param>
        public GanttEventBuilder DataBinding(string handler)
        {
            Handler("dataBinding", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the widget is bound to data from its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBound event.</param>
        public GanttEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when a new task or a new dependency is about to be added.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the add event.</param>
        public GanttEventBuilder Add(string handler)
        {
            Handler("add", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user starts task edit upon double click on a cell.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the edit event.</param>
        public GanttEventBuilder Edit(string handler)
        {
            Handler("edit", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when a task or a dependency is about to be removed.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the remove event.</param>
        public GanttEventBuilder Remove(string handler)
        {
            Handler("remove", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user cancels tasks's cell editing by pressing the 'Esc' key.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the cancel event.</param>
        public GanttEventBuilder Cancel(string handler)
        {
            Handler("cancel", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when a task field is updated upon user interaction.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the save event.</param>
        public GanttEventBuilder Save(string handler)
        {
            Handler("save", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user selects a task in the gantt.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public GanttEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user changes the selected view of the gantt.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the navigate event.</param>
        public GanttEventBuilder Navigate(string handler)
        {
            Handler("navigate", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user starts to drag a task.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the moveStart event.</param>
        public GanttEventBuilder MoveStart(string handler)
        {
            Handler("moveStart", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user is moving a task.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the move event.</param>
        public GanttEventBuilder Move(string handler)
        {
            Handler("move", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user stops moving a task.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the moveEnd event.</param>
        public GanttEventBuilder MoveEnd(string handler)
        {
            Handler("moveEnd", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user starts to resize a task.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the resizeStart event.</param>
        public GanttEventBuilder ResizeStart(string handler)
        {
            Handler("resizeStart", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user is resizing a task.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the resize event.</param>
        public GanttEventBuilder Resize(string handler)
        {
            Handler("resize", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user releases the mouse after resizing a task.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the resizeEnd event.</param>
        public GanttEventBuilder ResizeEnd(string handler)
        {
            Handler("resizeEnd", handler);

            return this;
        }
        
        //<< Handlers
    }
}

