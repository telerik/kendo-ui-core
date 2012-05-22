namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI.Html;

    /// <summary>
    /// Telerik Gauge for ASP.NET MVC is a view component for rendering gauge.
    /// Features:
    /// <list type="bullet">
    ///     <item>Linear</item>
    ///     <item>Radial</item>
    /// </list>
    /// For more information, see the online documentation.
    /// </summary>
    public class Gauge : ViewComponentBase, IGauge
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Gauge" /> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="clientSideObjectWriterFactory">The client side object writer factory.</param>
        /// <param name="urlGenerator">The URL Generator.</param>
        public Gauge(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IUrlGenerator urlGenerator)
            : base(viewContext, clientSideObjectWriterFactory)
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

        protected void SerializeData(string key, IDictionary<string, object> data, IClientSideObjectWriter objectWriter)
        {
            if (data.Count > 0)
            {
                objectWriter.AppendObject(key, data);
            }
        }

        protected void SerializeTheme(IClientSideObjectWriter objectWriter)
        {
            if (Theme.HasValue())
            {
                objectWriter.Append("theme", Theme);
            }
        }

        protected void SerializeTransitions(IClientSideObjectWriter objectWriter)
        {
            if (!Transitions)
            {
                objectWriter.Append("transitions", Transitions);
            }
        }

        /// <summary>
        /// Writes the Gauge HTML.
        /// </summary>
        /// <param name="writer">The writer object.</param>
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