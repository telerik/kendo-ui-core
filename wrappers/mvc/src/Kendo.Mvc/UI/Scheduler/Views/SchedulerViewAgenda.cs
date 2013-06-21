namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class SchedulerViewAgenda : SchedulerViewBase
    {
        public SchedulerViewAgenda()
        {
            this.Type = SchedulerViewType.Agenda;
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
            //TODO: implement serialize method.
            SerializeBaseOptions(json);

            var idPrefix = "#";

            if (!string.IsNullOrEmpty(EventDateTemplate))
            {
                json["eventDateTemplate"] = EventDateTemplate;
            }

            if (!string.IsNullOrEmpty(EventDateTemplateId))
            {
                json["eventDateTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, EventDateTemplateId) };
            }

            if (!string.IsNullOrEmpty(EventTimeTemplate))
            {
                json["eventTimeTemplate"] = EventTimeTemplate;
            }

            if (!string.IsNullOrEmpty(EventTimeTemplateId))
            {
                json["eventTimeTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, EventTimeTemplateId) };
            }

        }
    }
}
