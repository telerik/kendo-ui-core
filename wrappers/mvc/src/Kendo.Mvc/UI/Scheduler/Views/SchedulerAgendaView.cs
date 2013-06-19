namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class SchedulerAgendaView : SchedulerViewBase
    {
        public SchedulerAgendaView()
        {
            this.Type = SchedulerViewType.Agenda;
        }

        public string EventDateTemplate 
        { 
            get;
            set; 
        }

        public string EventTimeTemplate 
        { 
            get; 
            set; 
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //TODO: implement serialize method.
            SerializeBaseOptions(json);

            if (!string.IsNullOrEmpty(EventDateTemplate))
            {
                json["eventDateTemplate"] = EventDateTemplate;
            }

            if (!string.IsNullOrEmpty(EventTimeTemplate))
            {
                json["eventTimeTemplate"] = EventTimeTemplate;
            }

        }
    }
}
