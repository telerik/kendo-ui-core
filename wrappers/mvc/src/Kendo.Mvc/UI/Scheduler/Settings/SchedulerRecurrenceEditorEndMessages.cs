namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Resources;
    using System.Collections.Generic;

    public class SchedulerRecurrenceEditorEndMessages : JsonObject
    {
        private const string DefaultLabel = "End:";

        private const string DefaultNever = "Never";

        private const string DefaultAfter = "After ";

        private const string DefaultOccurrence = " occurrence(s)";

        private const string DefaultOn = "On ";

        public SchedulerRecurrenceEditorEndMessages()
        {
            Label = Messages.Scheduler_Recurrence_Editor_End_Label;

            Never = Messages.Scheduler_Recurrence_Editor_End_Never;

            After = Messages.Scheduler_Recurrence_Editor_End_After;

            Occurrence = Messages.Scheduler_Recurrence_Editor_End_Occurrence;

            On = Messages.Scheduler_Recurrence_Editor_End_On;
        }

        public string Label { get; set; }

        public string Never { get; set; }

        public string After { get; set; }

        public string Occurrence { get; set; }

        public string On { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Label != DefaultLabel)
            {
                json["label"] = Label;
            }

            if (Never != DefaultNever)
            {
                json["never"] = Never;
            }

            if (After != DefaultAfter)
            {
                json["after"] = After;
            }

            if (Occurrence != DefaultOccurrence)
            {
                json["occurrence"] = Occurrence;
            }

            if (On != DefaultOn)
            {
                json["on"] = On;
            }
        }
    }
}
