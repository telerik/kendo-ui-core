namespace Kendo.Mvc.UI
{
    public class SchedulerHtmlBuilder<T> where T : class, ISchedulerEvent
    {
        public SchedulerHtmlBuilder(Scheduler<T> scheduler)
        {
            Scheduler = scheduler;
        }

        public Scheduler<T> Scheduler
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            return new HtmlElement("div")
                            .Attribute("id", Scheduler.Id)
                            .Attributes(Scheduler.HtmlAttributes)
                            .PrependClass(UIPrimitives.Widget, "k-scheduler");
        }

    }
}
