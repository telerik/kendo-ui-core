namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewWeek"/>.
    /// </summary>
    public class SchedulerViewWeekBuilder<T> : SchedulerViewMultiDayBuilder<T>
        where T : SchedulerViewWeek
    {
        public SchedulerViewWeekBuilder(T resource)
            : base(resource)
        { 
        }
    }
}
