namespace Kendo.Mvc.UI
{
    using System.IO;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;

    public class RadialGauge : Gauge
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="LinearGauge" /> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="initializer">The javascript initializer.</param>
        /// <param name="urlGenerator">The URL Generator.</param>
        public RadialGauge(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, urlGenerator)
        {
            Scale = new GaugeRadialScale(this);
            Pointer = new GaugeRadialPointer();
        }

        /// <summary>
        /// Configuration for the default scale (if any)
        /// </summary>
        public IRadialScale Scale
        {
            get;
            set;
        }

        /// <summary>
        /// Configuration for the default pointer (if any)
        /// </summary>
        public GaugeRadialPointer Pointer
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>();

            SerializeData("gaugeArea", this.GaugeArea.CreateSerializer().Serialize(), options);
            SerializeData("pointer", this.Pointer.CreateSerializer().Serialize(), options);
            SerializeData("scale", this.Scale.CreateSerializer().Serialize(), options);

            if (RenderAs.HasValue) {
                options.Add("renderAs", RenderAs.ToString().ToLowerInvariant());
            }

            SerializeTheme(options);
            SerializeTransitions(options);

            writer.Write(Initializer.Initialize(Selector, "RadialGauge", options));
            base.WriteInitializationScript(writer);
        }
    }
}