namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class SchedulerViewMonth : SchedulerViewBase
    {
        public SchedulerViewMonth()
        {
            this.Type = SchedulerViewType.Month;

            this.EventHeight = 25;
        }

        public string DayTemplate 
        { 
            get;
            set;
        }

        public string DayTemplateId
        {
            get;
            set;
        }

        public int EventHeight 
        { 
            get; 
            set; 
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //TODO: implement serialize method.
            SerializeBaseOptions(json);

            var idPrefix = "#";

            if (!string.IsNullOrEmpty(DayTemplate))
            {
                json["dayTemplate"] = DayTemplate;
            }

            if (!string.IsNullOrEmpty(DayTemplateId))
            {
                json["dayTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, DayTemplateId) };
            }

            if (EventHeight != 25)
            {
                json["eventHeight"] = EventHeight;
            }

        }
    }
}
