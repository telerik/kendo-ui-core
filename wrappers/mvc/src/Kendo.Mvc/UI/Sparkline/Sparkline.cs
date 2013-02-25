namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using System.Web.UI;
    using Kendo.Mvc.UI.Html;

    public class Sparkline<T> : Chart<T>
        where T : class
    {
        public Sparkline(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, urlGenerator)
        {
        }

        /// <summary>
        /// Gets or sets the default series type.
        /// The default value is SparklineType.Line.
        /// </summary>
        /// <value>
        /// The default series type.
        /// </value>
        public SparklineType? Type
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the width to allocate for each point.
        /// The default value is 5.
        /// </summary>
        /// <value>
        /// The width to allocate for each point.
        /// </value>
        public double? PointWidth
        {
            get;
            set;
        }

        protected override string WidgetName {
            get
            {
                return "Sparkline";
            }
        }

        protected override void Serialize(IDictionary<string, object> options)
        {
            base.Serialize(options);

            if (Type.HasValue)
            {
                options.Add("type", Type.ToString().ToLowerInvariant());
            }

            if (PointWidth.HasValue)
            {
                options.Add("pointWidth", PointWidth);
            }
        }

        protected override void SerializeDataSource(IDictionary<string, object> options)
        {
            if (Data != null && string.IsNullOrEmpty(DataSource.Transport.Read.Url))
            {
                options.Add("data", Data);
            }
            else
            {
                base.SerializeDataSource(options);
            }
        }

        protected override HtmlBuilderBase HtmlBuilder
        {
            get
            {
                return new SparklineHtmlBuilder<T>(this);
            }
        }
    }
}