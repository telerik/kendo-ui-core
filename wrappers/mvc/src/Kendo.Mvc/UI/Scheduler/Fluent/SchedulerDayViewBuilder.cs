namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerDayView"/>.
    /// </summary>
    public class SchedulerDayViewBuilder<T> : SchedulerMultiDayViewBuilder<T>
        where T : SchedulerDayView
    {
        public SchedulerDayViewBuilder(T resource)
            : base(resource)
        { 
        }
    }
}
