namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Resources;
    using System.Collections.Generic;

    public class SchedulerRecurrenceEditorYearlyMessages : JsonObject
    {
        private const string DefaultRepeatEvery = "Repeat every: ";

        private const string DefaultRepeatOn = "Repeat on: ";

        private const string DefaultInterval = " year(s)";

        private const string DefaultOf = " of ";

        public SchedulerRecurrenceEditorYearlyMessages()
        {
            RepeatEvery = Messages.Scheduler_Recurrence_Editor_Yearly_RepeatEvery;

            RepeatOn = Messages.Scheduler_Recurrence_Editor_Yearly_RepeatOn;

            Interval = Messages.Scheduler_Recurrence_Editor_Yearly_Interval;

            Of = Messages.Scheduler_Recurrence_Editor_Yearly_Of;
        }

        public string RepeatEvery { get; set; }

        public string RepeatOn { get; set; }

        public string Interval { get; set; }

        public string Of { get; set; }

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

            if (Of != DefaultOf)
            {
                json["of"] = Of;
            }
        }
    }
}
