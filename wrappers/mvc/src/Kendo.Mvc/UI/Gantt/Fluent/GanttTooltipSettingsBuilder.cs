namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttTooltipSettings settings.
    /// </summary>
    public class GanttTooltipSettingsBuilder: IHideObjectMembers
    {
        private readonly GanttTooltipSettings container;

        public GanttTooltipSettingsBuilder(GanttTooltipSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The template which renders the tooltip.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public GanttTooltipSettingsBuilder Template(string value)
        {
            container.Template = value;

            return this;
        }

        /// <summary>
        /// The template which renders the tooltip.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public GanttTooltipSettingsBuilder TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the gantt will not display the task tooltip. By default the task tooltip is displayed.
        /// </summary>
        /// <param name="value">The value that configures the visible.</param>
        public GanttTooltipSettingsBuilder Visible(bool value)
        {
            container.Visible = value;

            return this;
        }
        
        //<< Fields
    }
}

