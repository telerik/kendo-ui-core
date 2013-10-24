namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Resources;
    using System.Collections.Generic;

    public class SchedulerRecurrenceEditorWeekdaysMessages : JsonObject
    {
        private const string DefaultDay = "day";

        private const string DefaultWeekday = "weekday";

        private const string DefaultWeekend = "weekend day";

        public SchedulerRecurrenceEditorWeekdaysMessages() 
        {
            Day = Messages.Scheduler_Recurrence_Editor_Weekdays_Day;

            Weekday = Messages.Scheduler_Recurrence_Editor_Weekdays_Weekday;

            Weekend = Messages.Scheduler_Recurrence_Editor_Weekdays_Weekend;
        }

        public string Day { get; set; }

        public string Weekday { get; set; }

        public string Weekend { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Day != DefaultDay)
            {
                json["day"] = Day;
            }

            if (Weekday != DefaultWeekday)
            {
                json["weekday"] = Weekday;
            }

            if (Weekend != DefaultWeekend)
            {
                json["weekend"] = Weekend;
            }
        }
    }
}
