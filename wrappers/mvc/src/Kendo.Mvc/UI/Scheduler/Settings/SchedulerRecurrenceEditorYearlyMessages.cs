namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;

    public class SchedulerRecurrenceEditorYearlyMessages : JsonObject
    {
        private const string DefaultRepeatEvery = "Repeat every: ";

        private const string DefaultRepeatOn = "Repeat on: ";

        private const string DefaultYears = " year(s)";

        private const string DefaultOf = " of ";

        public SchedulerRecurrenceEditorYearlyMessages()
        {
            RepeatEvery = Messages.Scheduler_Recurrence_Editor_Yearly_RepeatEvery;

            RepeatOn = Messages.Scheduler_Recurrence_Editor_Yearly_RepeatOn;

            Years = Messages.Scheduler_Recurrence_Editor_Yearly_Years;

            Of = Messages.Scheduler_Recurrence_Editor_Yearly_Of;
        }

        public string RepeatEvery { get; set; }

        public string RepeatOn { get; set; }

        public string Years { get; set; }

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

            if (Years != DefaultYears)
            {
                json["years"] = Years;
            }

            if (Of != DefaultOf)
            {
                json["of"] = Of;
            }
        }
    }
}
