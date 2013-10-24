namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Resources;
    using System.Collections.Generic;

    public class SchedulerRecurrenceEditorWeeklyMessages : JsonObject
    {
        private const string DefaultInterval = " week(s)";

        private const string DefaultRepeatEvery = "Repeat every: ";

        private const string DefaultRepeatOn = "Repeat on: ";

        public SchedulerRecurrenceEditorWeeklyMessages()
        {
            Interval = Messages.Scheduler_Recurrence_Editor_Weekly_Interval;

            RepeatEvery = Messages.Scheduler_Recurrence_Editor_Weekly_RepeatEvery;

            RepeatOn = Messages.Scheduler_Recurrence_Editor_Weekly_RepeatOn;
        }

        public string Interval { get; set; }

        public string RepeatEvery { get; set; }

        public string RepeatOn { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Interval != DefaultInterval)
            {
                json["interval"] = Interval;
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
