namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttMessagesViewsSettings settings.
    /// </summary>
    public class GanttMessagesViewsSettingsBuilder: IHideObjectMembers
    {
        private readonly GanttMessagesViewsSettings container;

        public GanttMessagesViewsSettingsBuilder(GanttMessagesViewsSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The text similar to "Day" displayed as gantt "day" view title.
        /// </summary>
        /// <param name="value">The value that configures the day.</param>
        public GanttMessagesViewsSettingsBuilder Day(string value)
        {
            container.Day = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Week" displayed as gantt "week" view title.
        /// </summary>
        /// <param name="value">The value that configures the week.</param>
        public GanttMessagesViewsSettingsBuilder Week(string value)
        {
            container.Week = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Month" displayed as gantt "month" view title.
        /// </summary>
        /// <param name="value">The value that configures the month.</param>
        public GanttMessagesViewsSettingsBuilder Month(string value)
        {
            container.Month = value;

            return this;
        }
        
        //<< Fields
    }
}

