namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Resources;
    using System.Collections.Generic;

    public class SchedulerViewMessages : JsonObject
    {
        private const string DefaultDay = "Day";

        private const string DefaultWeek = "Week";

        private const string DefaultWorkWeek = "Work Week";

        private const string DefaultMonth = "Month";

        private const string DefaultAgenda = "Agenda";

        public SchedulerViewMessages()
        {
            Day = Messages.Scheduler_View_Day;

            Week = Messages.Scheduler_View_Week;

            WorkWeek = Messages.Scheduler_View_WorkWeek;

            Month = Messages.Scheduler_View_Month;

            Agenda = Messages.Scheduler_View_Agenda;
        }

        public string Day { get; set; }

        public string Week { get; set; }

        public string WorkWeek { get; set; }

        public string Month { get; set; }

        public string Agenda { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Day != DefaultDay)
            {
                json["day"] = Day;
            }

            if (Week != DefaultWeek)
            {
                json["week"] = Week;
            }

            if (WorkWeek != DefaultWorkWeek)
            {
                json["workWeek"] = WorkWeek;
            }

            if (Month != DefaultMonth)
            {
                json["month"] = Month;
            }

            if (Agenda != DefaultAgenda)
            {
                json["agenda"] = Agenda;
            }
        }
    }
}
