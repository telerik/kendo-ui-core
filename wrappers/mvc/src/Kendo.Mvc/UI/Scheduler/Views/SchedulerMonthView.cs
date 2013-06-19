namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class SchedulerMonthView : SchedulerViewBase
    {
        public SchedulerMonthView()
        {
            this.Type = SchedulerViewType.Month;

            this.EventHeight = 25;
        }

        public string DayTemplate { get; set; }

        public int EventHeight { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //TODO: implement serialize method.
            SerializeBaseOptions(json);

            if (!string.IsNullOrEmpty(DayTemplate))
            {
                json["dayTemplate"] = DayTemplate;
            }

            if (EventHeight != 25)
            {
                json["eventHeight"] = EventHeight;
            }

        }
    }
}
