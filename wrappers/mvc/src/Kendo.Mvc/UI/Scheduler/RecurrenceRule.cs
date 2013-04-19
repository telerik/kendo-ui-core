

namespace Kendo.Mvc.UI
{
    public class RecurrenceRule
    {
        /// <summary>
        /// The frequency expressed as enumeration.
        /// </summary>
        public RecurrenceFrequency Frequency { get; set; }

        /// <summary>
        /// Defines interval between RecurrenceFrequency occurrance. Minimum 1.
        /// </summary>
        public int Interval { get; set; }

        /// <summary>
        /// List of months (1-12) in which event occurs
        /// </summary>
        public int[] OccurByMonths { get; set; }

        /// <summary>
        /// List of days (1-31) in month in which event occurs
        /// </summary>
        public int[] OccurByDaysInMonth { get; set; }

        /// <summary>
        /// List of days (1-366) in year in which event occurs
        /// </summary>
        public int[] OccurByDaysInYear { get; set; }

        /// <summary>
        /// The days of the week that the event occurs as a value
        /// of the DayOfWeek Enum
        /// </summary>
        public DayOfWeek[] OccurByDaysOfWeek { get; set; }

        ///// <summary>
        ///// List of week numbers (1-53) in which event occurs
        ///// </summary>
        //public int[] OccurByWeekNumbers { get; set; }

        /// <summary>
        /// List of seconds (0-60) in which event occurs
        /// </summary>
        public int[] OccurBySeconds { get; set; }

        /// <summary>
        /// List of minutes (0-59) in which event occurs
        /// </summary>
        public int[] OccurByMinutes { get; set; }

        /// <summary>
        /// List of hours (0-23) in which event occurs
        /// </summary>
        public int[] OccurByHours { get; set; }

        //TODO: implement GetOccurrences(DateRange period)
    }
}
