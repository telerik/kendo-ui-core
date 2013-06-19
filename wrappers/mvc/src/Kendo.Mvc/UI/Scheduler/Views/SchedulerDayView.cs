namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class SchedulerDayView : SchedulerViewBase
    {
        public SchedulerDayView() 
        {
            this.Type = SchedulerViewType.Day;

            this.AllDaySlot = true;

            this.MajorTick = 60;

            this.MinorTickCount = 2;
        }

        public string AllDayEventTemplate 
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

        public int MajorTick 
        { 
            get; 
            set; 
        }

        public string MajorTimeHeaderTemplate 
        { 
            get; 
            set; 
        }

        public int MinorTickCount 
        { 
            get; 
            set; 
        }

        public string MinorTimeHeaderTemplate 
        { 
            get; 
            set; 
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            SerializeBaseOptions(json);

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

            if (MajorTick != 60)
            {
                json["majorTick"] = MajorTick;
            }

            if (!string.IsNullOrEmpty(MajorTimeHeaderTemplate))
            {
                json["majorTimeHeaderTemplate"] = MajorTimeHeaderTemplate;
            }

            if (MinorTickCount != 2)
            {
                json["minorTickCount"] = MinorTickCount;
            }

            if (!string.IsNullOrEmpty(MinorTimeHeaderTemplate))
            {
                json["minorTimeHeaderTemplate"] = MinorTimeHeaderTemplate;
            }
        }
    }
}
