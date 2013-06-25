namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    public abstract class SchedulerViewMultiDay : SchedulerViewBase
    {
        protected SchedulerViewMultiDay(SchedulerViewType type) : base(type)
        {
            AllDaySlot = true;
        }

        public string AllDayEventTemplate
        {
            get;
            set;
        }

        public string AllDayEventTemplateId
        {
            get;
            set;
        }

        public bool AllDaySlot
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

        public int? MajorTick
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

        public int? MinorTickCount
        {
            get;
            set;
        }

        public string MinorTimeHeaderTemplate
        {
            get;
            set;
        }


        public string MinorTimeHeaderTemplateId
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

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);

            var idPrefix = "#";

            if (!string.IsNullOrEmpty(AllDayEventTemplate))
            {
                json["allDayEventTemplate"] = AllDayEventTemplate;
            }

            if (!AllDaySlot)
            {
                json["allDaySlot"] = AllDaySlot;
            }

            if (!string.IsNullOrEmpty(DateHeaderTemplate))
            {
                json["dateHeaderTemplate"] = DateHeaderTemplate;
            }

            if (!string.IsNullOrEmpty(DateHeaderTemplateId))
            {
                json["dateHeaderTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, DateHeaderTemplateId) };
            }

            if (MajorTick != null)
            {
                json["majorTick"] = MajorTick;
            }

            if (!string.IsNullOrEmpty(MajorTimeHeaderTemplate))
            {
                json["majorTimeHeaderTemplate"] = MajorTimeHeaderTemplate;
            }

            if (!string.IsNullOrEmpty(MajorTimeHeaderTemplateId))
            {
                json["majorTimeHeaderTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, MajorTimeHeaderTemplateId) };
            }

            if (MinorTickCount != null)
            {
                json["minorTickCount"] = MinorTickCount;
            }

            if (!string.IsNullOrEmpty(MinorTimeHeaderTemplate))
            {
                json["minorTimeHeaderTemplate"] = MinorTimeHeaderTemplate;
            }

            if (!string.IsNullOrEmpty(MinorTimeHeaderTemplateId))
            {
                json["minorTimeHeaderTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, MinorTimeHeaderTemplateId) };
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
