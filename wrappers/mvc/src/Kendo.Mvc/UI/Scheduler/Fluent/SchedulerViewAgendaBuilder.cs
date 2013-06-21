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
        /// Sets the eventDateTemplate option.
        /// </summary>
        /// <param name="eventDateTemplate">The eventDateTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder EventDateTemplate(string eventDateTemplate)
        {
            resource.EventDateTemplate = eventDateTemplate;

            return this;
        }

        /// <summary>
        /// Sets the eventDateTemplate option.
        /// </summary>
        /// <param name="eventDateTemplateId">The eventDateTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder EventDateTemplateId(string eventDateTemplateId)
        {
            resource.EventDateTemplateId = eventDateTemplateId;

            return this;
        }

        /// <summary>
        /// Sets the eventTimeTemplate option.
        /// </summary>
        /// <param name="eventTimeTemplate">The eventTimeTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder EventTimeTemplate(string eventTimeTemplate)
        {
            resource.EventTimeTemplate = eventTimeTemplate;

            return this;
        }

        /// <summary>
        /// Sets the eventTimeTemplate option.
        /// </summary>
        /// <param name="eventTimeTemplateId">The eventTimeTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder EventTimeTemplateId(string eventTimeTemplateId)
        {
            resource.EventTimeTemplateId = eventTimeTemplateId;

            return this;
        }
    }
}
