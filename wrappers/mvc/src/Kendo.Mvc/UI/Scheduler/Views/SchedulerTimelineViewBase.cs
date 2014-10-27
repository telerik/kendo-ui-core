namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public abstract class SchedulerTimelineViewBase : SchedulerViewBase
    {
        protected SchedulerTimelineViewBase(SchedulerViewType type, IScheduler scheduler) 
            : base(type, scheduler)
        {
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);
        }
    }
}
