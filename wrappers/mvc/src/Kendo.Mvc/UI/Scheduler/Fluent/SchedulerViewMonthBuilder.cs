namespace Kendo.Mvc.UI.Fluent
{
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
        /// The template used to render the day slots in month view.
        /// </summary>
        /// <param name="dayTemplate">The dayTemplate</param>
        public ISchedulerViewBuilder DayTemplate(string dayTemplate)
        {
            resource.DayTemplate = dayTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the day slots in month view.
        /// </summary>
        /// <param name="dayTemplateId">The dayTemplateId</param>
        public ISchedulerViewBuilder DayTemplateId(string dayTemplateId)
        {
            resource.DayTemplateId = dayTemplateId;

            return this;
        }

        /// <summary>
        /// The height of the scheduler event rendered in month view.
        /// </summary>
        /// <param name="eventHeight">The eventHeight</param>
        public ISchedulerViewBuilder EventHeight(int eventHeight)
        {
            resource.EventHeight = eventHeight;

            return this;
        }
    }
}
