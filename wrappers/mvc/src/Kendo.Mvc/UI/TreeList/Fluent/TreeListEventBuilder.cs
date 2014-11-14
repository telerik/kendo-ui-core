namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo TreeList for ASP.NET MVC events.
    /// </summary>
    public class TreeListEventBuilder: EventBuilder
    {
        public TreeListEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fired when an item is about to be collapsed.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the collapse event.</param>
        public TreeListEventBuilder Collapse(string handler)
        {
            Handler("collapse", handler);

            return this;
        }
        
        /// <summary>
        /// Fired before the widget binds to its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBinding event.</param>
        public TreeListEventBuilder DataBinding(string handler)
        {
            Handler("dataBinding", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the widget is bound to data from its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBound event.</param>
        public TreeListEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when an item is about to be expanded.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the expand event.</param>
        public TreeListEventBuilder Expand(string handler)
        {
            Handler("expand", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user clicks the "destroy" command button.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the remove event.</param>
        public TreeListEventBuilder Remove(string handler)
        {
            Handler("remove", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user edits or creates a data item.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the edit event.</param>
        public TreeListEventBuilder Edit(string handler)
        {
            Handler("edit", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when a data item is saved.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the save event.</param>
        public TreeListEventBuilder Save(string handler)
        {
            Handler("save", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user clicks the "cancel" button (in inline or popup editing mode) or closes the popup window.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the cancel event.</param>
        public TreeListEventBuilder Cancel(string handler)
        {
            Handler("cancel", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user selects a table row or cell in the treelist.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public TreeListEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the treelist filter menu is initialized.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the filterMenuInit event.</param>
        public TreeListEventBuilder FilterMenuInit(string handler)
        {
            Handler("filterMenuInit", handler);

            return this;
        }
        
        //<< Handlers
    }
}

