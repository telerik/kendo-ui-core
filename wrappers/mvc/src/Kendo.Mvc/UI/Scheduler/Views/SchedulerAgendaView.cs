namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    public class SchedulerAgendaView : SchedulerViewBase
    {
        public SchedulerAgendaView(IScheduler scheduler) : base (SchedulerViewType.Agenda, scheduler)
        {            
        }

        public string EventDateTemplate 
        { 
            get;
            set; 
        }

        public string EventDateTemplateId
        {
            get;
            set;
        }

        public string EventTimeTemplate 
        { 
            get; 
            set; 
        }

        public string EventTimeTemplateId
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);

            var idPrefix = "#";

            if (!string.IsNullOrEmpty(EventDateTemplate))
            {
                json["eventDateTemplate"] = EventDateTemplate;
            }

            if (!string.IsNullOrEmpty(EventDateTemplateId))
            {
                json["eventDateTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template(jQuery('{0}{1}').html())", idPrefix, EventDateTemplateId) };
            }

            if (!string.IsNullOrEmpty(EventTimeTemplate))
            {
                json["eventTimeTemplate"] = EventTimeTemplate;
            }

            if (!string.IsNullOrEmpty(EventTimeTemplateId))
            {
                json["eventTimeTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template(jQuery('{0}{1}').html())", idPrefix, EventTimeTemplateId) };
            }

        }
    }
}
