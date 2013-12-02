namespace Kendo.Mvc.UI
{
    public class SchedulerWorkWeekView : SchedulerMultiDayView
    {
        public SchedulerWorkWeekView(IScheduler scheduler) 
            : base(SchedulerViewType.WorkWeek, scheduler)
        {            
        }
    }
}
