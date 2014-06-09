namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Text.RegularExpressions;
    using System.Web.Mvc;

    /// <summary>
    /// The server side wrapper for Kendo UI Scheduler
    /// </summary>
    /// <typeparam name="TModel"></typeparam>
    public class PivotGrid : WidgetBase
    {
        public PivotGrid(ViewContext viewContext,
                    IJavaScriptInitializer initializer,
                    IUrlGenerator urlGenerator
            )
            : base(viewContext, initializer)
        {
            DataSource = new PivotGridDataSource();

            DataSource.Type = DataSourceType.Custom;

            UrlGenerator = urlGenerator;
        }

        public PivotGridDataSource DataSource
        {
            get;
            private set;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public bool? AutoBind { get; set; }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = this.SeriailzeBaseOptions();

            var autoBind = DataSource.Type != DataSourceType.Server && AutoBind.GetValueOrDefault(true);

            if (autoBind == false)
            {
                options["autoBind"] = autoBind;
            }

            options["dataSource"] = DataSource.ToJson();

            writer.Write(Initializer.Initialize(Selector, "PivotGrid", options));

            base.WriteInitializationScript(writer);
        }

        protected virtual IDictionary<string, object> SeriailzeBaseOptions()
        {
            var options = new Dictionary<string, object>(Events);

            return options;
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            PivotGridHtmlBuilder builder = new PivotGridHtmlBuilder(this);

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
