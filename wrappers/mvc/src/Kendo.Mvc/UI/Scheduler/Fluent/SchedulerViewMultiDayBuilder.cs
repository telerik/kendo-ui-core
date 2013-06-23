namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using System.Collections;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewWeek"/>.
    /// </summary>
    public class SchedulerViewMultiDayBuilder<T> : SchedulerViewBaseBuilder<T>, ISchedulerViewBuilder
        where T : SchedulerViewMultiDay
    {
        public SchedulerViewMultiDayBuilder(T resource)
            : base(resource)
        {
        }

        /// <summary>
        /// The template used to render the "all day" scheduler events.
        /// </summary>
        /// <param name="allDayEventTemplate">The allDayEventTemplate</param>
        public ISchedulerViewBuilder AllDayEventTemplate(string allDayEventTemplate)
        {
            resource.AllDayEventTemplate = allDayEventTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the "all day" scheduler events.
        /// </summary>
        /// <param name="allDayEventTemplateId">The allDayEventTemplateId</param>
        public ISchedulerViewBuilder AllDayEventTemplateId(string allDayEventTemplateId)
        {
            resource.AllDayEventTemplateId = allDayEventTemplateId;

            return this;
        }

        /// <summary>
        /// If set to true the scheduler will display a slot for "all day" events. Default value is true.
        /// </summary>
        /// <param name="allDaySlot">The allDaySlot</param>
        public ISchedulerViewBuilder AllDaySlot(bool allDaySlot)
        {
            resource.AllDaySlot = allDaySlot;

            return this;
        }

        /// <summary>
        /// The template used to render the date header cells.
        /// </summary>
        /// <param name="dateHeaderTemplate">The dateHeaderTemplate</param>
        public ISchedulerViewBuilder DateHeaderTemplate(string dateHeaderTemplate)
        {
            resource.DateHeaderTemplate = dateHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the date header cells.
        /// </summary>
        /// <param name="dateHeaderTemplateId">The dateHeaderTemplateId</param>
        public ISchedulerViewBuilder DateHeaderTemplateId(string dateHeaderTemplateId)
        {
            resource.DateHeaderTemplateId = dateHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// The number of minutes represented by a major tick.
        /// </summary>
        /// <param name="majorTick">The majorTick</param>
        public ISchedulerViewBuilder MajorTick(int majorTick)
        {
            resource.MajorTick = majorTick;

            return this;
        }

        /// <summary>
        /// The template used to render the major ticks.
        /// </summary>
        /// <param name="majorTimeHeaderTemplate">The majorTimeHeaderTemplate</param>
        public ISchedulerViewBuilder MajorTimeHeaderTemplate(string majorTimeHeaderTemplate)
        {
            resource.MajorTimeHeaderTemplate = majorTimeHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the major ticks.
        /// </summary>
        /// <param name="majorTimeHeaderTemplateId">The majorTimeHeaderTemplateId</param>
        public ISchedulerViewBuilder MajorTimeHeaderTemplateId(string majorTimeHeaderTemplateId)
        {
            resource.MajorTimeHeaderTemplateId = majorTimeHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// The number of time slots to display per major tick.
        /// </summary>
        /// <param name="minorTickCount">The minorTickCount</param>
        public ISchedulerViewBuilder MinorTickCount(int minorTickCount)
        {
            resource.MinorTickCount = minorTickCount;

            return this;
        }

        /// <summary>
        /// The template used to render the minor ticks.
        /// </summary>
        /// <param name="minorTimeHeaderTemplate">The minorTimeHeaderTemplate</param>
        public ISchedulerViewBuilder MinorTimeHeaderTemplate(string minorTimeHeaderTemplate)
        {
            resource.MinorTimeHeaderTemplate = minorTimeHeaderTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the minor ticks.
        /// </summary>
        /// <param name="minorTimeHeaderTemplateId">The minorTimeHeaderTemplateId</param>
        public ISchedulerViewBuilder MinorTimeHeaderTemplateId(string minorTimeHeaderTemplateId)
        {
            resource.MinorTimeHeaderTemplateId = minorTimeHeaderTemplateId;

            return this;
        }
    }
}
