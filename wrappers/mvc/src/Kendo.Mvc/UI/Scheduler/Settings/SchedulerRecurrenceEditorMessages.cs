namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public class SchedulerRecurrenceEditorMessages : JsonObject
    {
        public SchedulerRecurrenceEditorMessages()
        {
            FrequenciesMessages = new SchedulerRecurrenceEditorFrequenciesMessages();

            DailyMessages = new SchedulerRecurrenceEditorDailyMessages();

            WeeklyMessages = new SchedulerRecurrenceEditorWeeklyMessages();

            MonthlyMessages = new SchedulerRecurrenceEditorMonthlyMessages();

            YearlyMessages = new SchedulerRecurrenceEditorYearlyMessages();

            EndMessages = new SchedulerRecurrenceEditorEndMessages();

            OffsetPositionsMessages = new SchedulerRecurrenceEditorOffsetPositionsMessages();
        }

        public SchedulerRecurrenceEditorFrequenciesMessages FrequenciesMessages { get; set; }

        public SchedulerRecurrenceEditorDailyMessages DailyMessages { get; set; }

        public SchedulerRecurrenceEditorWeeklyMessages WeeklyMessages { get; set; }

        public SchedulerRecurrenceEditorMonthlyMessages MonthlyMessages { get; set; }

        public SchedulerRecurrenceEditorYearlyMessages YearlyMessages { get; set; }

        public SchedulerRecurrenceEditorEndMessages EndMessages { get; set; }

        public SchedulerRecurrenceEditorOffsetPositionsMessages OffsetPositionsMessages { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {

            IDictionary<string, object> frequenciesMessages = FrequenciesMessages.ToJson();
            if (frequenciesMessages.Count > 0)
            {
                json["frequencies"] = frequenciesMessages;
            }

            IDictionary<string, object> dailyMessages = DailyMessages.ToJson();
            if (dailyMessages.Count > 0)
            {
                json["daily"] = dailyMessages;
            }

            IDictionary<string, object> weeklyMessages = WeeklyMessages.ToJson();
            if (weeklyMessages.Count > 0)
            {
                json["weekly"] = weeklyMessages;
            }

            IDictionary<string, object> monthlyMessages = MonthlyMessages.ToJson();
            if (monthlyMessages.Count > 0)
            {
                json["monthly"] = monthlyMessages;
            }

            IDictionary<string, object> yearlyMessages = YearlyMessages.ToJson();
            if (yearlyMessages.Count > 0)
            {
                json["yearly"] = yearlyMessages;
            }

            IDictionary<string, object> endMessages = EndMessages.ToJson();
            if (endMessages.Count > 0)
            {
                json["end"] = endMessages;
            }

            IDictionary<string, object> offsetPositionsMessages = OffsetPositionsMessages.ToJson();
            if (offsetPositionsMessages.Count > 0)
            {
                json["offsetPositions"] = offsetPositionsMessages;
            }
        }
    }
}
