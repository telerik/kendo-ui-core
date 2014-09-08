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
        /// If set to true the gantt will display a confirmation dialog when the user deletes a task or a dependency.
        /// </summary>
        /// <param name="value">The value that configures the confirmation.</param>
        public GanttEditableSettingsBuilder Confirmation(bool value)
        {
            container.Confirmation = value;

            return this;
        }
        
        //<< Fields
    }
}

