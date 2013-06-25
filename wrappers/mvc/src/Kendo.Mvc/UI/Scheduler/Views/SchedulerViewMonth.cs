namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class SchedulerViewMonth : SchedulerViewBase
    {
        public SchedulerViewMonth() : base(SchedulerViewType.Month)
        {            
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

        public int? EventHeight 
        { 
            get; 
            set; 
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);

            var idPrefix = "#";

            if (!string.IsNullOrEmpty(DayTemplate))
            {
                json["dayTemplate"] = DayTemplate;
            }

            if (!string.IsNullOrEmpty(DayTemplateId))
            {
                json["dayTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, DayTemplateId) };
            }

            if (EventHeight != null)
            {
                json["eventHeight"] = EventHeight;
            }

        }
    }
}
