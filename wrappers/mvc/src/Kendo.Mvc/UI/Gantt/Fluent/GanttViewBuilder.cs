namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttView settings.
    /// </summary>
    public class GanttViewBuilder: IHideObjectMembers
    {
        private readonly GanttView container;

        public GanttViewBuilder(GanttView settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// If set to true the view will be initially selected by the gantt widget.
        /// </summary>
        /// <param name="value">The value that configures the selected.</param>
        public GanttViewBuilder Selected(bool value)
        {
            container.Selected = value;

            return this;
        }
        
        /// <summary>
        /// The view type. Supported types are "day", "week", and "month".
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public GanttViewBuilder Type(GanttViewType value)
        {
            container.Type = value;

            return this;
        }
        
        //<< Fields
    }
}

