namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    public abstract class SchedulerTimelineViewBase : SchedulerViewBase
    {
        protected SchedulerTimelineViewBase(SchedulerViewType type, IScheduler scheduler) 
            : base(type, scheduler)
        {
            WorkDayCommand = true;
            Footer = true;
            ShowWorkHours = scheduler.ShowWorkHours;
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

        public DateTime? WorkDayStart
        {
            get;
            set;
        }

        public DateTime? WorkDayEnd
        {
            get;
            set;
        }

        public bool ShowWorkHours
        {
            get;
            set;
        }

        public bool WorkDayCommand
        {
            get;
            set;
        }

        public bool Footer
        {
            get;
            set;
        }

        public int? WorkWeekStart
        {
            get;
            set;
        }

        public int? WorkWeekEnd
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

        public string DateHeaderTemplate
        {
            get;
            set;
        }

        public string DateHeaderTemplateId
        {
            get;
            set;
        }

        public string MajorTimeHeaderTemplate
        {
            get;
            set;
        }

        public string MajorTimeHeaderTemplateId
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

            if (WorkDayStart != null)
            {
                json["workDayStart"] = WorkDayStart;
            }

            if (WorkDayEnd != null)
            {
                json["workDayEnd"] = WorkDayEnd;
            }

            if (!Footer)
            {
                json["footer"] = Footer;
            }

            if (!WorkDayCommand && Footer)
            {
                json["footer"] = new Dictionary<string, object>() {
                    { "command", false }
                };
            }

            if (WorkWeekStart != null)
            {
                json["workWeekStart"] = WorkWeekStart;
            }

            if (WorkWeekEnd != null)
            {
                json["workWeekEnd"] = WorkWeekEnd;
            }

            if (!string.IsNullOrEmpty(DateHeaderTemplate))
            {
                json["dateHeaderTemplate"] = DateHeaderTemplate;
            }

            if (!string.IsNullOrEmpty(DateHeaderTemplateId))
            {
                json["dateHeaderTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template(jQuery('{0}{1}').html())", idPrefix, DateHeaderTemplateId) };
            }

            if (!string.IsNullOrEmpty(MajorTimeHeaderTemplate))
            {
                json["majorTimeHeaderTemplate"] = MajorTimeHeaderTemplate;
            }

            if (!string.IsNullOrEmpty(MajorTimeHeaderTemplateId))
            {
                json["majorTimeHeaderTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template(jQuery('{0}{1}').html())", idPrefix, MajorTimeHeaderTemplateId) };
            }
        }
    }
}
