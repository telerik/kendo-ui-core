namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using System.Collections;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewAgenda"/>.
    /// </summary>
    public class SchedulerViewAgendaBuilder<T> : SchedulerViewBaseBuilder<T>, ISchedulerViewBuilder
        where T : SchedulerViewAgenda
    {
        public SchedulerViewAgendaBuilder(T resource)
            : base(resource)
        { 
        }

        /// <summary>
        /// The template used by the agenda view to render the date of the scheduler events.
        /// </summary>
        /// <param name="eventDateTemplate">The eventDateTemplate</param>
        public ISchedulerViewBuilder EventDateTemplate(string eventDateTemplate)
        {
            resource.EventDateTemplate = eventDateTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used by the agenda view to render the date of the scheduler events.
        /// </summary>
        /// <param name="eventDateTemplateId">The eventDateTemplateId</param>
        public ISchedulerViewBuilder EventDateTemplateId(string eventDateTemplateId)
        {
            resource.EventDateTemplateId = eventDateTemplateId;

            return this;
        }

        /// <summary>
        /// The template used by the agenda view to render the time of the scheduler events.
        /// </summary>
        /// <param name="eventTimeTemplate">The eventTimeTemplate</param>
        public ISchedulerViewBuilder EventTimeTemplate(string eventTimeTemplate)
        {
            resource.EventTimeTemplate = eventTimeTemplate;

            return this;
        }

        /// <summary>
        /// The Id of the template used by the agenda view to render the time of the scheduler events.
        /// </summary>
        /// <param name="eventTimeTemplateId">The eventTimeTemplateId</param>
        public ISchedulerViewBuilder EventTimeTemplateId(string eventTimeTemplateId)
        {
            resource.EventTimeTemplateId = eventTimeTemplateId;

            return this;
        }
    }
}
