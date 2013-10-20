namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerAgendaView"/>.
    /// </summary>
    public class SchedulerAgendaViewBuilder<TView> : SchedulerBaseViewBuilder<TView, SchedulerAgendaViewBuilder<TView>>
        where TView : SchedulerAgendaView
    {
        public SchedulerAgendaViewBuilder(TView view)
            : base(view)
        { 
        }

        /// <summary>
        /// The template used by the agenda view to render the date of the scheduler events.
        /// </summary>
        /// <param name="eventDateTemplate">The eventDateTemplate</param>
        public SchedulerAgendaViewBuilder<TView> EventDateTemplate(string eventDateTemplate)
        {
            view.EventDateTemplate = eventDateTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used by the agenda view to render the date of the scheduler events.
        /// </summary>
        /// <param name="eventDateTemplateId">The eventDateTemplateId</param>
        public SchedulerAgendaViewBuilder<TView> EventDateTemplateId(string eventDateTemplateId)
        {
            view.EventDateTemplateId = eventDateTemplateId;

            return this;
        }

        /// <summary>
        /// The template used by the agenda view to render the time of the scheduler events.
        /// </summary>
        /// <param name="eventTimeTemplate">The eventTimeTemplate</param>
        public SchedulerAgendaViewBuilder<TView> EventTimeTemplate(string eventTimeTemplate)
        {
            view.EventTimeTemplate = eventTimeTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used by the agenda view to render the time of the scheduler events.
        /// </summary>
        /// <param name="eventTimeTemplateId">The eventTimeTemplateId</param>
        public SchedulerAgendaViewBuilder<TView> EventTimeTemplateId(string eventTimeTemplateId)
        {
            view.EventTimeTemplateId = eventTimeTemplateId;

            return this;
        }        
    }
}
