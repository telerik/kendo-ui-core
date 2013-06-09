namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using System.IO;

    /// <summary>
    /// The server side wrapper for Kendo UI Scheduler
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Scheduler<T> : WidgetBase, IScheduler where T : class, ISchedulerEvent
    {
        public Scheduler(ViewContext viewContext,
                    IJavaScriptInitializer initializer,
                    IUrlGenerator urlGenerator
            )
            : base(viewContext, initializer)
        {
            UrlGenerator = urlGenerator;

            DataSource = new DataSource();

            DataSource.ModelType(typeof(T));
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

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = this.SeriailzeBaseOptions();

            writer.Write(Initializer.Initialize(Selector, "Scheduler", options));

            base.WriteInitializationScript(writer);
        }

        protected virtual IDictionary<string, object> SeriailzeBaseOptions()
        {
            var options = new Dictionary<string, object>(Events);

            if (!string.IsNullOrEmpty(DataSource.Transport.Read.Url))
            {
                options["dataSource"] = DataSource.ToJson();
            }
            else if (DataSource.Data != null)
            {
                options["dataSource"] = DataSource.Data;
            }

            return options;
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            SchedulerHtmlBuilder<T> builder = new SchedulerHtmlBuilder<T>(this);

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
