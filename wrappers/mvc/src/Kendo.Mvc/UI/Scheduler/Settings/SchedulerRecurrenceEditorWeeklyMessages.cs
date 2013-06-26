namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;

    public class SchedulerRecurrenceEditorWeeklyMessages : JsonObject
    {
        private const string DefaultWeeks = " week(s)";

        private const string DefaultRepeatEvery = "Repeat every: ";

        private const string DefaultRepeatOn = "Repeat on: ";

        public SchedulerRecurrenceEditorWeeklyMessages()
        {
            Weeks = Messages.Scheduler_Recurrence_Editor_Weekly_Weeks;

            RepeatEvery = Messages.Scheduler_Recurrence_Editor_Weekly_RepeatEvery;

            RepeatOn = Messages.Scheduler_Recurrence_Editor_Weekly_RepeatOn;
        }

        public string Weeks { get; set; }

        public string RepeatEvery { get; set; }

        public string RepeatOn { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Weeks != DefaultWeeks)
            {
                json["weeks"] = Weeks;
            }

            if (RepeatEvery != DefaultRepeatEvery)
            {
                json["repeatEvery"] = RepeatEvery;
            }

            if (RepeatOn != DefaultRepeatOn)
            {
                json["repeatOn"] = RepeatOn;
            }
        }
    }
}
