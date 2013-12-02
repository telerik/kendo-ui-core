namespace Kendo.Mvc.UI
{
    public class SchedulerCustomView : SchedulerViewBase
    {
        public SchedulerCustomView(string typeName, IScheduler scheduler) 
            : base(SchedulerViewType.Custom, scheduler) 
        {
            TypeName = typeName;
        }

        public string TypeName { get; set; }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            base.Serialize(json);

            json["type"] = TypeName;
        }
    }
}
