namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;

    public class SchedulerRecurrenceEditorOffsetPositionsMessages : JsonObject
    {
        private const string DefaultFirst = "first";

        private const string DefaultSecond = "second";

        private const string DefaultThird = "third";

        private const string DefaultFourth = "fourth";

        private const string DefaultLast = "last";

        public SchedulerRecurrenceEditorOffsetPositionsMessages()
        {
            First = Messages.Scheduler_Recurrence_Editor_OffsetPositions_First;

            Second = Messages.Scheduler_Recurrence_Editor_OffsetPositions_Second;

            Third = Messages.Scheduler_Recurrence_Editor_OffsetPositions_Third;

            Fourth = Messages.Scheduler_Recurrence_Editor_OffsetPositions_Fourth;

            Last = Messages.Scheduler_Recurrence_Editor_OffsetPositions_Last;
        }

        public string First { get; set; }

        public string Second { get; set; }

        public string Third { get; set; }

        public string Fourth { get; set; }

        public string Last { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (First != DefaultFirst)
            {
                json["first"] = First;
            }

            if (Second != DefaultSecond)
            {
                json["second"] = Second;
            }

            if (Third != DefaultThird)
            {
                json["third"] = Third;
            }

            if (Fourth != DefaultFourth)
            {
                json["fourth"] = Fourth;
            }

            if (Last != DefaultLast)
            {
                json["last"] = Last;
            }
        }
    }
}
