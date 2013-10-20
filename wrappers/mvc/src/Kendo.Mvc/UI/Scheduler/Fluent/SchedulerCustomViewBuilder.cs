namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerCustomView"/>.
    /// </summary>
    public class SchedulerCustomViewBuilder<TView> : SchedulerBaseViewBuilder<TView, SchedulerCustomViewBuilder<TView>>
        where TView : SchedulerCustomView
    {
        public SchedulerCustomViewBuilder(TView view)
            : base(view)
        {
        }
    }
}