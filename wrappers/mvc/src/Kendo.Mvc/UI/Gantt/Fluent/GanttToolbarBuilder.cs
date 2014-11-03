namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttToolbar settings.
    /// </summary>
    public class GanttToolbarBuilder: IHideObjectMembers
    {
        private readonly GanttToolbar container;

        public GanttToolbarBuilder(GanttToolbar settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The name of the toolbar command. Either a built-in ("append" and "pdf") or custom. The name is reflected in one of the CSS classes, which is applied to the button - k-gantt-name.
		/// This class can be used to obtain reference to the button after Gantt initialization and attach click handlers.
        /// </summary>
        /// <param name="value">The value that configures the name.</param>
        public GanttToolbarBuilder Name(string value)
        {
            container.Name = value;

            return this;
        }
        
        /// <summary>
        /// The template which renders the command. By default renders a button.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public GanttToolbarBuilder Template(string value)
        {
            container.Template = value;

            return this;
        }

        /// <summary>
        /// The template which renders the command. By default renders a button.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public GanttToolbarBuilder TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The text displayed by the command button. If not set the name` option would be used as the button text instead.
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public GanttToolbarBuilder Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        //<< Fields
    }
}

