namespace Kendo.Mvc.UI
{
    using System;
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

        public int? MinorTickCount
        {
            get;
            set;
        }

        public int? MajorTick
        {
            get;
            set;
        }

        public DateTime? StartTime
        {
            get;
            set;
        }

        public DateTime? EndTime
        {
            get;
            set;
        }

        public string GroupHeaderTemplate
        {
            get;
            set;
        }

        public string GroupHeaderTemplateId
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);

            var idPrefix = "#";

            if (!string.IsNullOrEmpty(GroupHeaderTemplate))
            {
                json["groupHeaderTemplate"] = GroupHeaderTemplate;
            }

            if (!string.IsNullOrEmpty(GroupHeaderTemplateId))
            {
                json["groupHeaderTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template(jQuery('{0}{1}').html())", idPrefix, GroupHeaderTemplateId) };
            }

            if (MajorTick != null)
            {
                json["majorTick"] = MajorTick;
            }

            if (MinorTickCount != null)
            {
                json["minorTickCount"] = MinorTickCount;
            }

            if (ColumnWidth != null)
            {
                json["columnWidth"] = ColumnWidth;
            }

            if (EventHeight != null)
            {
                json["eventHeight"] = EventHeight;
            }

            if (StartTime != null)
            {
                json["startTime"] = StartTime;
            }

            if (EndTime != null)
            {
                json["endTime"] = EndTime;
            }
        }
    }
}
