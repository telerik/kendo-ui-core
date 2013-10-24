namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Resources;
    using System.Collections.Generic;

    public class SchedulerRecurrenceEditorDailyMessages : JsonObject
    {
        private const string DefaultRepeatEvery = "Repeat every: ";

        private const string DefaultInterval = " days(s)";

        public SchedulerRecurrenceEditorDailyMessages()
        {
            RepeatEvery = Messages.Scheduler_Recurrence_Editor_Daily_RepeatEvery;

            Interval = Messages.Scheduler_Recurrence_Editor_Daily_Interval;
        }

        public string RepeatEvery { get; set; }

        public string Interval { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (RepeatEvery != DefaultRepeatEvery)
            {
                json["repeatEvery"] = RepeatEvery;
            }

            if (Interval != DefaultInterval)
            {
                json["interval"] = Interval;
            }
        }
    }
}
