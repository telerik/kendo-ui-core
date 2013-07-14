namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;

    public class SchedulerViewMessages : JsonObject
    {
        private const string DefaultDay = "Day";

        private const string DefaultWeek = "Week";

        private const string DefaultMonth = "Month";

        private const string DefaultAgenda = "Agenda";

        public SchedulerViewMessages()
        {
            Day = Messages.Scheduler_View_Day;

            Week = Messages.Scheduler_View_Week;

            Month = Messages.Scheduler_View_Month;

            Agenda = Messages.Scheduler_View_Agenda;
        }

        public string Day { get; set; }

        public string Week { get; set; }

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
