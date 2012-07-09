namespace Kendo.Mvc.UI
{
    using System.IO;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;

    public class LinearGauge : Gauge
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="LinearGauge" /> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="IJavaScriptInitializer">The javascript initializer.</param>
        /// <param name="urlGenerator">The URL Generator.</param>
        public LinearGauge(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, urlGenerator)
        {
            Scale = new GaugeLinearScale(this);
            Pointer = new GaugeLinearPointer();
        }

        /// <summary>
        /// Configuration for the default scale (if any)
        /// </summary>
        public ILinearScale Scale
        {
            get;
            set;
        }

        /// <summary>
        /// Configuration for the default pointer (if any)
        /// </summary>
        public GaugeLinearPointer Pointer
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

            writer.Write(Initializer.Initialize(Selector, "LinearGauge", options));
            base.WriteInitializationScript(writer);
        }
    }
}