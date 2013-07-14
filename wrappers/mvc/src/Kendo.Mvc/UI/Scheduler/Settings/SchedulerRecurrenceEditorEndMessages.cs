namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;

    public class SchedulerRecurrenceEditorEndMessages : JsonObject
    {
        private const string DefaultEndLabel = "End:";

        private const string DefaultEndNever = "Never";

        private const string DefaultEndCountAfter = "After ";

        private const string DefaultEndCountOccurrence = " occurrence(s)";

        private const string DefaultEndUntilOn = "On ";

        public SchedulerRecurrenceEditorEndMessages()
        {
            EndLabel = Messages.Scheduler_Recurrence_Editor_End_EndLabel;

            EndNever = Messages.Scheduler_Recurrence_Editor_End_EndNever;

            EndCountAfter = Messages.Scheduler_Recurrence_Editor_End_EndCountAfter;

            EndCountOccurrence = Messages.Scheduler_Recurrence_Editor_End_EndCountOccurrence;

            EndUntilOn = Messages.Scheduler_Recurrence_Editor_End_EndUntilOn;
        }

        public string EndLabel { get; set; }

        public string EndNever { get; set; }

        public string EndCountAfter { get; set; }

        public string EndCountOccurrence { get; set; }

        public string EndUntilOn { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (EndLabel != DefaultEndLabel)
            {
                json["endLabel"] = EndLabel;
            }

            if (EndNever != DefaultEndNever)
            {
                json["endNever"] = EndNever;
            }

            if (EndCountAfter != DefaultEndCountAfter)
            {
                json["endCountAfter"] = EndCountAfter;
            }

            if (EndCountOccurrence != DefaultEndCountOccurrence)
            {
                json["endCountOccurrence"] = EndCountOccurrence;
            }

            if (EndUntilOn != DefaultEndUntilOn)
            {
                json["endUntilOn"] = EndUntilOn;
            }
        }
    }
}
