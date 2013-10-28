namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    public abstract class SchedulerMultiDayView : SchedulerViewBase
    {
        protected SchedulerMultiDayView(SchedulerViewType type) : base(type)
        {
            AllDaySlot = true;
            WorkDayCommand = true;
            Footer = true;
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

        public string SlotTemplate
        {
            get;
            set;
        }

        public string SlotTemplateId
        {
            get;
            set;
        }

        public string AllDaySlotTemplate
        {
            get;
            set;
        }

        public string AllDaySlotTemplateId
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

            if (!string.IsNullOrEmpty(SlotTemplate))
            {
                json["slotTemplate"] = SlotTemplate;
            }

            if (!string.IsNullOrEmpty(SlotTemplateId))
            {
                json["slotTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, SlotTemplateId) };
            }
 
            if (!string.IsNullOrEmpty(AllDaySlotTemplate))
            {
                json["allDaySlotTemplate"] = AllDaySlotTemplate;
            }

            if (!string.IsNullOrEmpty(AllDaySlotTemplateId))
            {
                json["allDaySlotTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, AllDaySlotTemplateId) };
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

            if (!WorkDayCommand)
            {
                json["workDayCommand"] = WorkDayCommand;
            }
      
            if (!Footer)
            {
                json["footer"] = Footer;
            }

            if (WorkWeekStart != null)
            {
                json["workWeekStart"] = WorkWeekStart;
            }

            if (WorkWeekEnd != null)
            {
                json["workWeekEnd"] = WorkWeekEnd;
            }

            json["showWorkHours"] = ShowWorkHours;
        }
    }
}
