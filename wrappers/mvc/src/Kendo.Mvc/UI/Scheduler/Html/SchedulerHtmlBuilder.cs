namespace Kendo.Mvc.UI
{
    public class SchedulerHtmlBuilder<TModel> where TModel : class, ISchedulerEvent
    {
        public SchedulerHtmlBuilder(Scheduler<TModel> scheduler)
        {
            Scheduler = scheduler;
        }

        public Scheduler<TModel> Scheduler
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
