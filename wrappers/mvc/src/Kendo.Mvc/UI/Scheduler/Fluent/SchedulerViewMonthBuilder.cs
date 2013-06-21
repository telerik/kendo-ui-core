namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using System.Collections;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewMonth"/>.
    /// </summary>
    public class SchedulerViewMonthBuilder<T> : SchedulerViewBaseBuilder<T>, ISchedulerViewBuilder
        where T : SchedulerViewMonth
    {
        public SchedulerViewMonthBuilder(T resource)
            : base(resource)
        { 
        }

        /// <summary>
        /// Sets the dayTemplate option.
        /// </summary>
        /// <param name="dayTemplate">The dayTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder DayTemplate(string dayTemplate)
        {
            resource.DayTemplate = dayTemplate;

            return this;
        }

        /// <summary>
        /// Sets the dayTemplate option.
        /// </summary>
        /// <param name="dayTemplateId">The dayTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder DayTemplateId(string dayTemplateId)
        {
            resource.DayTemplateId = dayTemplateId;

            return this;
        }

        /// <summary>
        /// Sets the eventHeight option.
        /// </summary>
        /// <param name="eventHeight">The eventHeight.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder EventHeight(int eventHeight)
        {
            resource.EventHeight = eventHeight;

            return this;
        }
    }
}
