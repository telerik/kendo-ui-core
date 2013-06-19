namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public abstract class SchedulerViewBase : JsonObject, ISchedulerView
    {
        public string Title { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public SchedulerViewType Type { get; set; }

        public SchedulerViewEditableSettings Editable { get; set; }

        public string EventTemplate { get; set; }

        public string SelectedDateFormat { get; set; }

        protected void SerializeBaseOptions(IDictionary<string, object> json)
        {
            if (!string.IsNullOrEmpty(Title))
            {
                json["title"] = Title;
            }

            if (StartTime != null)
            {
                json["startTime"] = StartTime;
            }

            if (EndTime != null)
            {
                json["endTime"] = EndTime;
            }
            
            json["type"] = Type;

            if (Editable != null && Editable.ToJson().Count > 0)
            {
                json["editable"] = Editable.ToJson();
            }

            if (!string.IsNullOrEmpty(EventTemplate))
            {
                json["eventTemplate"] = EventTemplate;   
            }

            if (!string.IsNullOrEmpty(SelectedDateFormat))
            {
                json["selectedDateFormat"] = SelectedDateFormat;
            }
        }
    }
}
