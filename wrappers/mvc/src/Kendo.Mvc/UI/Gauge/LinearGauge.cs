namespace Kendo.Mvc.UI
{
    using System.IO;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;

    public class LinearGauge<T> : Gauge where T : struct
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
            Scale = new GaugeLinearScale<T>(this);
            Pointer = new GaugeLinearPointer<T>();
        }

        /// <summary>
        /// Configuration for the default scale (if any)
        /// </summary>
        public ILinearScale<T> Scale
        {
            get;
            set;
        }

        /// <summary>
        /// Configuration for the default pointer (if any)
        /// </summary>
        public GaugeLinearPointer<T> Pointer
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

            writer.Write(Initializer.Initialize(Id, "LinearGauge", options));
            base.WriteInitializationScript(writer);
        }
    }
}