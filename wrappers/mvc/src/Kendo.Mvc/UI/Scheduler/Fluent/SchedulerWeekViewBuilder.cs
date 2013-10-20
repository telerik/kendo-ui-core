namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerWeekView"/>.
    /// </summary>
    public class SchedulerWeekViewBuilder<T> : SchedulerMultiDayViewBuilder<T>
        where T : SchedulerWeekView
    {
        public SchedulerWeekViewBuilder(T resource)
            : base(resource)
        { 
        }
    }
}
