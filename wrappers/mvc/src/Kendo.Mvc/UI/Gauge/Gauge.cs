namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI.Html;
    using Kendo.Mvc.Infrastructure;

    public class Gauge : WidgetBase, IGauge
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Gauge" /> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="initializer">The javascript initializer.</param>
        /// <param name="urlGenerator">The URL Generator.</param>
        public Gauge(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            UrlGenerator = urlGenerator;
            GaugeArea = new GaugeArea();
            Transitions = true;
        }

        /// <summary>
        /// Gets or sets the URL generator.
        /// </summary>
        /// <value>The URL generator.</value>
        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the Gauge area.
        /// </summary>
        /// <value>
        /// The Gauge area.
        /// </value>
        public GaugeArea GaugeArea
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the Gauge transitions.
        /// </summary>
        /// <value>
        /// The Gauge Transitions.
        /// </value>
        public bool Transitions
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Gauge theme.
        /// </summary>
        /// <value>
        /// The Gauge theme.
        /// </value>
        public string Theme
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the render type.
        /// </summary>
        /// <value>The render type.</value>
        public RenderingMode? RenderAs
        {
            get;
            set;
        }

        public void SerializeData(string key, IDictionary<string, object> data, IDictionary<string, object> options)
        {
            if (data.Count > 0)
            {
                options.Add(key, data);
            }
        }

        public void SerializeTheme(IDictionary<string, object> options)
        {
            if (Theme.HasValue())
            {
                options.Add("theme", Theme);
            }
        }

        public void SerializeTransitions(IDictionary<string, object> options)
        {
            if (!Transitions)
            {
                options.Add("transitions", Transitions);
            }
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            if (!HtmlAttributes.ContainsKey("id"))
            {
                HtmlAttributes["id"] = Id;
            }

            new GaugeHtmlBuilder(this)
                .Build()
                .WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}