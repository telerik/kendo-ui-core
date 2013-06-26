namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewAgenda"/>.
    /// </summary>
    public class SchedulerViewAgendaBuilder<T> : SchedulerViewBaseBuilder<T>
        where T : SchedulerViewAgenda
    {
        public SchedulerViewAgendaBuilder(T view)
            : base(view)
        { 
        }

        /// <summary>
        /// The template used by the agenda view to render the date of the scheduler events.
        /// </summary>
        /// <param name="eventDateTemplate">The eventDateTemplate</param>
        public ISchedulerViewBuilder EventDateTemplate(string eventDateTemplate)
        {
            view.EventDateTemplate = eventDateTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used by the agenda view to render the date of the scheduler events.
        /// </summary>
        /// <param name="eventDateTemplateId">The eventDateTemplateId</param>
        public ISchedulerViewBuilder EventDateTemplateId(string eventDateTemplateId)
        {
            view.EventDateTemplateId = eventDateTemplateId;

            return this;
        }

        /// <summary>
        /// The template used by the agenda view to render the time of the scheduler events.
        /// </summary>
        /// <param name="eventTimeTemplate">The eventTimeTemplate</param>
        public ISchedulerViewBuilder EventTimeTemplate(string eventTimeTemplate)
        {
            view.EventTimeTemplate = eventTimeTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used by the agenda view to render the time of the scheduler events.
        /// </summary>
        /// <param name="eventTimeTemplateId">The eventTimeTemplateId</param>
        public ISchedulerViewBuilder EventTimeTemplateId(string eventTimeTemplateId)
        {
            view.EventTimeTemplateId = eventTimeTemplateId;

            return this;
        }        
    }
}
