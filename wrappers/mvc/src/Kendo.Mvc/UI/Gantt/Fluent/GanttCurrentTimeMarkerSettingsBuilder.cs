namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttCurrentTimeMarkerSettings settings.
    /// </summary>
    public class GanttCurrentTimeMarkerSettingsBuilder: IHideObjectMembers
    {
        private readonly GanttCurrentTimeMarkerSettings container;

        public GanttCurrentTimeMarkerSettingsBuilder(GanttCurrentTimeMarkerSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The update interval of the "current time" marker, in milliseconds.
        /// </summary>
        /// <param name="value">The value that configures the updateinterval.</param>
        public GanttCurrentTimeMarkerSettingsBuilder UpdateInterval(double value)
        {
            container.UpdateInterval = value;

            return this;
        }
        
        //<< Fields
    }
}

