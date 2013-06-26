namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;

    public class SchedulerRecurrenceEditorMonthlyMessages : JsonObject
    {
        private const string DefaultRepeatEvery = "Repeat every: ";

        private const string DefaultRepeatOn = "Repeat on: ";

        private const string DefaultMonths = " month(s)";

        private const string DefaultDay = "Day ";

        public SchedulerRecurrenceEditorMonthlyMessages()
        {
            RepeatEvery = Messages.Scheduler_Recurrence_Editor_Monthly_RepeatEvery;

            RepeatOn = Messages.Scheduler_Recurrence_Editor_Monthly_RepeatOn;

            Months = Messages.Scheduler_Recurrence_Editor_Monthly_Months;

            Day = Messages.Scheduler_Recurrence_Editor_Monthly_Day;
        }

        public string RepeatEvery { get; set; }
        
        public string RepeatOn { get; set; }
        
        public string Months { get; set; }
        
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

            if (Months != DefaultMonths)
            {
                json["months"] = Months;
            }

            if (Day != DefaultDay)
            {
                json["day"] = Day;
            }
        }
    }
}
