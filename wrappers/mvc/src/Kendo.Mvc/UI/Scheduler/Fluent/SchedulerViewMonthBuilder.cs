namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewMonth"/>.
    /// </summary>
    public class SchedulerViewMonthBuilder<TView> : SchedulerViewBaseBuilder<TView, SchedulerViewMonthBuilder<TView>>
        where TView : SchedulerViewMonth
    {
        public SchedulerViewMonthBuilder(TView resource)
            : base(resource)
        { 
        }

        /// <summary>
        /// The template used to render the day slots in month view.
        /// </summary>
        /// <param name="dayTemplate">The dayTemplate</param>
        public SchedulerViewMonthBuilder<TView> DayTemplate(string dayTemplate)
        {
            view.DayTemplate = dayTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used to render the day slots in month view.
        /// </summary>
        /// <param name="dayTemplateId">The dayTemplateId</param>
        public SchedulerViewMonthBuilder<TView> DayTemplateId(string dayTemplateId)
        {
            view.DayTemplateId = dayTemplateId;

            return this;
        }

        /// <summary>
        /// The height of the scheduler event rendered in month view.
        /// </summary>
        /// <param name="eventHeight">The eventHeight</param>
        public SchedulerViewMonthBuilder<TView> EventHeight(int eventHeight)
        {
            view.EventHeight = eventHeight;

            return this;
        }
    }
}
