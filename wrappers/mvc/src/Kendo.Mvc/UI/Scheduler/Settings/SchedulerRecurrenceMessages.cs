namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;

    public class SchedulerRecurrenceMessages : JsonObject
    {
        private const string DefaultDeleteWindowTitle = "Delete Recurring Item";

        private const string DefaultDeleteWindowOccurrence = "Delete current occurrence";

        private const string DefaultDeleteWindowSeries = "Delete the series";

        private const string DefaultEditWindowTitle = "Edit Recurring Item";

        private const string DefaultEditWindowOccurrence = "Edit current occurrence";

        private const string DefaultEditWindowSeries = "Edit the series";

        private const string DefaultEditRecurring = "Do you want to edit only this event occurrence or the whole series?";

        private const string DefaultDeleteRecurring = "Do you want to delete only this event occurrence or the whole series?";

        public SchedulerRecurrenceMessages()
        {
            DeleteWindowTitle = Messages.Scheduler_Recurrence_DeleteWindowTitle;

            DeleteWindowOccurrence = Messages.Scheduler_Recurrence_DeleteWindowOccurrence;

            DeleteWindowSeries = Messages.Scheduler_Recurrence_DeleteWindowSeries;

            EditWindowTitle = Messages.Scheduler_Recurrence_EditWindowTitle;

            EditWindowOccurrence = Messages.Scheduler_Recurrence_EditWindowOccurrence;

            EditWindowSeries = Messages.Scheduler_Recurrence_EditWindowSeries;

            EditRecurring = Messages.Scheduler_Recurrence_EditRecurring;

            DeleteRecurring = Messages.Scheduler_Recurrence_DeleteRecurring;
        }

        public string DeleteWindowTitle { get; set; }

        public string DeleteWindowOccurrence { get; set; }

        public string DeleteWindowSeries { get; set; }

        public string EditWindowTitle { get; set; }

        public string EditWindowOccurrence { get; set; }

        public string EditWindowSeries { get; set; }

        public string EditRecurring { get; set; }

        public string DeleteRecurring { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (DeleteWindowTitle != DefaultDeleteWindowTitle)
            {
                json["deleteWindowTitle"] = DeleteWindowTitle;
            }

            if (DeleteWindowOccurrence != DefaultDeleteWindowOccurrence)
            {
                json["deleteWindowOccurrence"] = DeleteWindowOccurrence;
            }

            if (DeleteWindowSeries != DefaultDeleteWindowSeries)
            {
                json["deleteWindowSeries"] = DeleteWindowSeries;
            }

            if (EditWindowTitle != DefaultEditWindowTitle)
            {
                json["editWindowTitle"] = EditWindowTitle;
            }

            if (EditWindowOccurrence != DefaultEditWindowOccurrence)
            {
                json["editWindowOccurrence"] = EditWindowOccurrence;
            }

            if (EditWindowSeries != DefaultEditWindowSeries)
            {
                json["editWindowSeries"] = EditWindowSeries;
            }

            if (EditRecurring != DefaultEditRecurring)
            {
                json["editRecurring"] = EditRecurring;
            }

            if (DeleteRecurring != DefaultDeleteRecurring)
            {
                json["deleteRecurring"] = DeleteRecurring;
            }
        }
    }
}
