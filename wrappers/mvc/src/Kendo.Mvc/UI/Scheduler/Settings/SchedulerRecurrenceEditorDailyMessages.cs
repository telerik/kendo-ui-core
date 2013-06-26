namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;

    public class SchedulerRecurrenceEditorDailyMessages : JsonObject
    {
        private const string DefaultRepeatEvery = "Repeat every: ";

        private const string DefaultDays = " days(s)";

        public SchedulerRecurrenceEditorDailyMessages()
        {
            RepeatEvery = Messages.Scheduler_Recurrence_Editor_Daily_RepeatEvery;

            Days = Messages.Scheduler_Recurrence_Editor_Daily_Days;
        }

        public string RepeatEvery { get; set; }

        public string Days { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (RepeatEvery != DefaultRepeatEvery)
            {
                json["repeatEvery"] = RepeatEvery;
            }

            if (Days != DefaultDays)
            {
                json["days"] = Days;
            }
        }
    }
}
