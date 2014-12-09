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
        /// If set to true the view will be initially selected by the Gantt widget. The default selected view is "day".
        /// </summary>
        /// <param name="value">The value that configures the selected.</param>
        public GanttViewBuilder Selected(bool value)
        {
            container.Selected = value;

            return this;
        }
        
        /// <summary>
        /// The size of the time slot headers. Values are treated as pixels.
        /// </summary>
        /// <param name="value">The value that configures the slotsize.</param>
        public GanttViewBuilder SlotSize(double value)
        {
            container.SlotSize = value;

            return this;
        }
        
        /// <summary>
        /// The template used to render the time slots in "day" view
        /// </summary>
        /// <param name="value">The value that configures the timeheadertemplate.</param>
        public GanttViewBuilder TimeHeaderTemplate(string value)
        {
            container.TimeHeaderTemplate = value;

            return this;
        }

        /// <summary>
        /// The template used to render the time slots in "day" view
        /// </summary>
        /// <param name="value">The value that configures the timeheadertemplate.</param>
        public GanttViewBuilder TimeHeaderTemplateId(string value)
        {
            container.TimeHeaderTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The template used to render the day slots in "day" and "week" views.
        /// </summary>
        /// <param name="value">The value that configures the dayheadertemplate.</param>
        public GanttViewBuilder DayHeaderTemplate(string value)
        {
            container.DayHeaderTemplate = value;

            return this;
        }

        /// <summary>
        /// The template used to render the day slots in "day" and "week" views.
        /// </summary>
        /// <param name="value">The value that configures the dayheadertemplate.</param>
        public GanttViewBuilder DayHeaderTemplateId(string value)
        {
            container.DayHeaderTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The template used to render the week slots in "week" and "month" views.
        /// </summary>
        /// <param name="value">The value that configures the weekheadertemplate.</param>
        public GanttViewBuilder WeekHeaderTemplate(string value)
        {
            container.WeekHeaderTemplate = value;

            return this;
        }

        /// <summary>
        /// The template used to render the week slots in "week" and "month" views.
        /// </summary>
        /// <param name="value">The value that configures the weekheadertemplate.</param>
        public GanttViewBuilder WeekHeaderTemplateId(string value)
        {
            container.WeekHeaderTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The template used to render the month slots in "month" and "year" views.
        /// </summary>
        /// <param name="value">The value that configures the monthheadertemplate.</param>
        public GanttViewBuilder MonthHeaderTemplate(string value)
        {
            container.MonthHeaderTemplate = value;

            return this;
        }

        /// <summary>
        /// The template used to render the month slots in "month" and "year" views.
        /// </summary>
        /// <param name="value">The value that configures the monthheadertemplate.</param>
        public GanttViewBuilder MonthHeaderTemplateId(string value)
        {
            container.MonthHeaderTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The template used to render the year slots in "year" view.
        /// </summary>
        /// <param name="value">The value that configures the yearheadertemplate.</param>
        public GanttViewBuilder YearHeaderTemplate(string value)
        {
            container.YearHeaderTemplate = value;

            return this;
        }

        /// <summary>
        /// The template used to render the year slots in "year" view.
        /// </summary>
        /// <param name="value">The value that configures the yearheadertemplate.</param>
        public GanttViewBuilder YearHeaderTemplateId(string value)
        {
            container.YearHeaderTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The format used to display the start and end dates in the resize tooltip.
        /// </summary>
        /// <param name="value">The value that configures the resizetooltipformat.</param>
        public GanttViewBuilder ResizeTooltipFormat(string value)
        {
            container.ResizeTooltipFormat = value;

            return this;
        }
        
        /// <summary>
        /// The view type. Supported types are "day", "week", "month" and "year".
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

