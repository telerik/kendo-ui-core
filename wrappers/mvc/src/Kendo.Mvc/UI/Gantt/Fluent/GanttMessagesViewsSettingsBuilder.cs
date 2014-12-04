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
        /// The text similar to "Day" displayed as Gantt "day" view title.
        /// </summary>
        /// <param name="value">The value that configures the day.</param>
        public GanttMessagesViewsSettingsBuilder Day(string value)
        {
            container.Day = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "End" displayed in Gantt resize hint.
        /// </summary>
        /// <param name="value">The value that configures the end.</param>
        public GanttMessagesViewsSettingsBuilder End(string value)
        {
            container.End = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Month" displayed as Gantt "month" view title.
        /// </summary>
        /// <param name="value">The value that configures the month.</param>
        public GanttMessagesViewsSettingsBuilder Month(string value)
        {
            container.Month = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Start" displayed in Gantt resize hint.
        /// </summary>
        /// <param name="value">The value that configures the start.</param>
        public GanttMessagesViewsSettingsBuilder Start(string value)
        {
            container.Start = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Week" displayed as Gantt "week" view title.
        /// </summary>
        /// <param name="value">The value that configures the week.</param>
        public GanttMessagesViewsSettingsBuilder Week(string value)
        {
            container.Week = value;

            return this;
        }
        
        /// <summary>
        /// The text similar to "Year" displayed as Gantt "year" view title.
        /// </summary>
        /// <param name="value">The value that configures the year.</param>
        public GanttMessagesViewsSettingsBuilder Year(string value)
        {
            container.Year = value;

            return this;
        }
        
        //<< Fields
    }
}

