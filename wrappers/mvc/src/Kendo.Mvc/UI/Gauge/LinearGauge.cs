namespace Kendo.Mvc.UI
{
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;

    public class LinearGauge : Gauge
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="LinearGauge" /> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="initializer">The javascript initializer.</param>
        /// <param name="urlGenerator">The URL Generator.</param>
        public LinearGauge(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, urlGenerator)
        {
            Scale = new GaugeLinearScale(this);
            Pointer = new GaugeLinearPointer();
            Pointers = new List<GaugeLinearPointer>();
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
        /// Configuration for the default multiple pointers (if any)
        /// </summary>
        public IList<GaugeLinearPointer> Pointers
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>();

            SerializeData("gaugeArea", this.GaugeArea.CreateSerializer().Serialize(), options);
            SerializeData("scale", this.Scale.CreateSerializer().Serialize(), options);

            var pointers = this.Pointers.Select(pointer => pointer.CreateSerializer().Serialize());
            if (pointers.Any())
            {
                options.Add("pointer", pointers);
            }
            else
            {
                SerializeData("pointer", this.Pointer.CreateSerializer().Serialize(), options);
            }

            if (RenderAs.HasValue) {
                options.Add("renderAs", RenderAs.ToString().ToLowerInvariant());
            }

            SerializeTheme(options);
            SerializeTransitions(options);

            writer.Write(Initializer.Initialize(Selector, "LinearGauge", options));
            base.WriteInitializationScript(writer);
        }
    }
}