namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttEditableSettings settings.
    /// </summary>
    public class GanttEditableSettingsBuilder: IHideObjectMembers
    {
        private readonly GanttEditableSettings container;

        public GanttEditableSettingsBuilder(GanttEditableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// If set to true the Gantt will display a confirmation dialog when the user deletes a task or a dependency.
        /// </summary>
        /// <param name="value">The value that configures the confirmation.</param>
        public GanttEditableSettingsBuilder Confirmation(bool value)
        {
            container.Confirmation = value;

            return this;
        }
        
        /// <summary>
        /// The template which renders the editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the Gantt will know
		/// which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public GanttEditableSettingsBuilder Template(string value)
        {
            container.Template = value;

            return this;
        }

        /// <summary>
        /// The template which renders the editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the Gantt will know
		/// which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public GanttEditableSettingsBuilder TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        //<< Fields
    }
}

