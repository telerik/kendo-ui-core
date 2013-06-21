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
        /// Sets the allDayEventTemplate option.
        /// </summary>
        /// <param name="allDayEventTemplate">The allDayEventTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder AllDayEventTemplate(string allDayEventTemplate)
        {
            resource.AllDayEventTemplate = allDayEventTemplate;

            return this;
        }

        /// <summary>
        /// Sets the allDayEventTemplate option.
        /// </summary>
        /// <param name="allDayEventTemplateId">The allDayEventTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder AllDayEventTemplateId(string allDayEventTemplateId)
        {
            resource.AllDayEventTemplateId = allDayEventTemplateId;

            return this;
        }

        /// <summary>
        /// Sets the allDaySlot option.
        /// </summary>
        /// <param name="allDaySlot">The allDaySlot.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder AllDaySlot(bool allDaySlot)
        {
            resource.AllDaySlot = allDaySlot;

            return this;
        }

        /// <summary>
        /// Sets the dateHeaderTemplate option.
        /// </summary>
        /// <param name="dateHeaderTemplate">The dateHeaderTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder DateHeaderTemplate(string dateHeaderTemplate)
        {
            resource.DateHeaderTemplate = dateHeaderTemplate;

            return this;
        }

        /// <summary>
        /// Sets the dateHeaderTemplate option.
        /// </summary>
        /// <param name="dateHeaderTemplateId">The dateHeaderTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder DateHeaderTemplateId(string dateHeaderTemplateId)
        {
            resource.DateHeaderTemplateId = dateHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// Sets the majorTick option.
        /// </summary>
        /// <param name="majorTick">The majorTick.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder MajorTick(int majorTick)
        {
            resource.MajorTick = majorTick;

            return this;
        }

        /// <summary>
        /// Sets the majorTimeHeaderTemplate option.
        /// </summary>
        /// <param name="majorTimeHeaderTemplate">The majorTimeHeaderTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder MajorTimeHeaderTemplate(string majorTimeHeaderTemplate)
        {
            resource.MajorTimeHeaderTemplate = majorTimeHeaderTemplate;

            return this;
        }

        /// <summary>
        /// Sets the majorTimeHeaderTemplate option.
        /// </summary>
        /// <param name="majorTimeHeaderTemplateId">The majorTimeHeaderTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder MajorTimeHeaderTemplateId(string majorTimeHeaderTemplateId)
        {
            resource.MajorTimeHeaderTemplateId = majorTimeHeaderTemplateId;

            return this;
        }

        /// <summary>
        /// Sets the minorTickCount option.
        /// </summary>
        /// <param name="minorTickCount">The minorTickCount.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder MinorTickCount(int minorTickCount)
        {
            resource.MinorTickCount = minorTickCount;

            return this;
        }

        /// <summary>
        /// Sets the minorTimeHeaderTemplate option.
        /// </summary>
        /// <param name="minorTimeHeaderTemplate">The minorTimeHeaderTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder MinorTimeHeaderTemplate(string minorTimeHeaderTemplate)
        {
            resource.MinorTimeHeaderTemplate = minorTimeHeaderTemplate;

            return this;
        }

        /// <summary>
        /// Sets the minorTimeHeaderTemplate option.
        /// </summary>
        /// <param name="minorTimeHeaderTemplateId">The minorTimeHeaderTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder MinorTimeHeaderTemplateId(string minorTimeHeaderTemplateId)
        {
            resource.MinorTimeHeaderTemplateId = minorTimeHeaderTemplateId;

            return this;
        }
    }
}
