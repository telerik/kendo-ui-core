namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;

    public class SchedulerRecurrenceEditorFrequenciesMessages : JsonObject
    {

        private const string DefaultNever = "Never";

        private const string DefaultDaily = "Daily";

        private const string DefaultWeekly = "Weekly";

        private const string DefaultMonthly = "Monthly";

        private const string DefaultYearly = "Yearly";

        public SchedulerRecurrenceEditorFrequenciesMessages()
        {
            Never = Messages.Scheduler_Recurrence_Editor_Frequencies_Never;

            Daily = Messages.Scheduler_Recurrence_Editor_Frequencies_Daily;

            Weekly = Messages.Scheduler_Recurrence_Editor_Frequencies_Weekly;

            Monthly = Messages.Scheduler_Recurrence_Editor_Frequencies_Monthly;

            Yearly = Messages.Scheduler_Recurrence_Editor_Frequencies_Yearly;
        }

        public string Never { get; set; }

        public string Daily { get; set; }

        public string Weekly { get; set; }

        public string Monthly { get; set; }

        public string Yearly { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Never != DefaultNever)
            {
                json["never"] = Never;
            }

            if (Daily != DefaultDaily)
            {
                json["daily"] = Daily;
            }

            if (Weekly != DefaultWeekly)
            {
                json["weekly"] = Weekly;
            }

            if (Monthly != DefaultMonthly)
            {
                json["monthly"] = Monthly;
            }

            if (Yearly != DefaultYearly)
            {
                json["yearly"] = Yearly;
            }
        }
    }
}
