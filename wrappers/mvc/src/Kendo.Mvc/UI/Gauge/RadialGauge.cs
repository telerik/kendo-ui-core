namespace Kendo.Mvc.UI
{
    using System.IO;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;

    /// <summary>
    /// Telerik RadialGauge for ASP.NET MVC is a view component for rendering RadialGauge.
    public class RadialGauge<T> : Gauge where T : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="LinearGauge" /> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="IJavaScriptInitializer">The javascript initializer.</param>
        /// <param name="urlGenerator">The URL Generator.</param>
        public RadialGauge(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, urlGenerator)
        {
            Scale = new GaugeRadialScale<T>(this);
            Pointer = new GaugeRadialPointer<T>();
        }

        /// <summary>
        /// Configuration for the default scale (if any)
        /// </summary>
        public IRadialScale<T> Scale
        {
            get;
            set;
        }

        /// <summary>
        /// Configuration for the default pointer (if any)
        /// </summary>
        public GaugeRadialPointer<T> Pointer
        {
            get;
            set;
        }

        /// <summary>
        /// Writes the initialization script.
        /// </summary>
        /// <param name="writer">The writer object.</param>
        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>();

            SerializeData("gaugeArea", this.GaugeArea.CreateSerializer().Serialize(), options);
            SerializeData("pointer", this.Pointer.CreateSerializer().Serialize(), options);
            SerializeData("scale", this.Scale.CreateSerializer().Serialize(), options);

            SerializeTheme(options);
            SerializeTransitions(options);

            writer.Write(Initializer.Initialize(Id, "RadialGauge", options));
            base.WriteInitializationScript(writer);
        }
    }
}