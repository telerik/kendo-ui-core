namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public abstract class SchedulerTimelineViewBase : SchedulerViewBase
    {
        protected SchedulerTimelineViewBase(SchedulerViewType type, IScheduler scheduler) 
            : base(type, scheduler)
        {
        }

        public int? EventHeight
        {
            get;
            set;
        }

        public int? ColumnWidth
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);

            if (ColumnWidth != null)
            {
                json["columnWidth"] = ColumnWidth;
            }

            if (EventHeight != null)
            {
                json["eventHeight"] = EventHeight;
            }
        }
    }
}
