namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewDay"/>.
    /// </summary>
    public class SchedulerViewDayBuilder<T> : SchedulerViewMultiDayBuilder<T>
        where T : SchedulerViewDay
    {
        public SchedulerViewDayBuilder(T resource)
            : base(resource)
        { 
        }
    }
}
