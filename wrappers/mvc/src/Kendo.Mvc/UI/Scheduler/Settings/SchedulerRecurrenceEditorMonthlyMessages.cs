namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Resources;
    using System.Collections.Generic;

    public class SchedulerRecurrenceEditorMonthlyMessages : JsonObject
    {
        private const string DefaultRepeatEvery = "Repeat every: ";

        private const string DefaultRepeatOn = "Repeat on: ";

        private const string DefaultInterval = " month(s)";

        private const string DefaultDay = "Day ";

        public SchedulerRecurrenceEditorMonthlyMessages()
        {
            RepeatEvery = Messages.Scheduler_Recurrence_Editor_Monthly_RepeatEvery;

            RepeatOn = Messages.Scheduler_Recurrence_Editor_Monthly_RepeatOn;

            Interval = Messages.Scheduler_Recurrence_Editor_Monthly_Interval;

            Day = Messages.Scheduler_Recurrence_Editor_Monthly_Day;
        }

        public string RepeatEvery { get; set; }
        
        public string RepeatOn { get; set; }

        public string Interval { get; set; }
        
        public string Day { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (RepeatEvery != DefaultRepeatEvery)
            {
                json["repeatEvery"] = RepeatEvery;
            }

            if (RepeatOn != DefaultRepeatOn)
            {
                json["repeatOn"] = RepeatOn;
            }

            if (Interval != DefaultInterval)
            {
                json["interval"] = Interval;
            }

            if (Day != DefaultDay)
            {
                json["day"] = Day;
            }
        }
    }
}
