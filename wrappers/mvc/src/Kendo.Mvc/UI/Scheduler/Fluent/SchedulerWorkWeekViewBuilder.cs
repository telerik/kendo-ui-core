namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerWorkWeekView"/>.
    /// </summary>
    public class SchedulerWorkWeekViewBuilder<T>: SchedulerMultiDayViewBuilder<T>
        where T : SchedulerWorkWeekView
    {
        public SchedulerWorkWeekViewBuilder(T resource)
            : base(resource)
        { 
        }
    }
}
