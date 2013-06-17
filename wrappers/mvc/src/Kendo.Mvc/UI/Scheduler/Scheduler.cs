namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using System.IO;

    /// <summary>
    /// The server side wrapper for Kendo UI Scheduler
    /// </summary>
    /// <typeparam name="TModel"></typeparam>
    public class Scheduler<TModel> : WidgetBase, IScheduler<TModel> 
        where TModel : class, ISchedulerEvent
    {
        public Scheduler(ViewContext viewContext,
                    IJavaScriptInitializer initializer,
                    IUrlGenerator urlGenerator
            )
            : base(viewContext, initializer)
        {
            DataSource = new DataSource();

            DataSource.Type = DataSourceType.Ajax;

            DataSource.ModelType(typeof(TModel));

            UrlGenerator = urlGenerator;

            Resources = new List<SchedulerResource<TModel>>();
        }

        public DataSource DataSource
        {
            get;
            private set;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public IList<SchedulerResource<TModel>> Resources
        {
            get;
            private set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = this.SeriailzeBaseOptions();

            writer.Write(Initializer.Initialize(Selector, "Scheduler", options));

            base.WriteInitializationScript(writer);
        }

        protected virtual IDictionary<string, object> SeriailzeBaseOptions()
        {
            var options = new Dictionary<string, object>(Events);


            Dictionary<string, object> dataSource = (Dictionary<string, object>)DataSource.ToJson();

            dataSource["type"] = "scheduler-aspnetmvc";

            if (!string.IsNullOrEmpty(DataSource.Transport.Read.Url))
            {      
                options["dataSource"] = dataSource;
            }
            else if (DataSource.Data != null)
            {
                dataSource["data"] = new { Data = DataSource.Data };

                options["dataSource"] = dataSource;
            }

            options["resources"] = Resources.ToJson();

            return options;
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            SchedulerHtmlBuilder<TModel> builder = new SchedulerHtmlBuilder<TModel>(this);

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
