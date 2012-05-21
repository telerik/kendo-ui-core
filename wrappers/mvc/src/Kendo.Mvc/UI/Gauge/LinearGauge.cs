namespace Kendo.Mvc.UI
{
    using System.IO;
    using System.Web.Mvc;

    /// <summary>
    /// Telerik LinearGauge for ASP.NET MVC is a view component for rendering LinearGauge.
    public class LinearGauge : Gauge
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="LinearGauge" /> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="clientSideObjectWriterFactory">The client side object writer factory.</param>
        /// <param name="urlGenerator">The URL Generator.</param>
        public LinearGauge(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IUrlGenerator urlGenerator)
            : base(viewContext, clientSideObjectWriterFactory, urlGenerator)
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
            var objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoLinearGauge", writer);

            objectWriter.Start();

            SerializeData("gaugeArea", this.GaugeArea.CreateSerializer().Serialize(), objectWriter);
            SerializeData("pointer", this.Pointer.CreateSerializer().Serialize(), objectWriter);
            SerializeData("scale", this.Scale.CreateSerializer().Serialize(), objectWriter);

            SerializeTheme(objectWriter);
            SerializeTransitions(objectWriter);

            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }
    }
}