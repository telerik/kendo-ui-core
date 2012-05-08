namespace KendoUI.Mvc.UI
{
    using System.IO;
    using System.Web.Mvc;

    /// <summary>
    /// Telerik RadialGauge for ASP.NET MVC is a view component for rendering RadialGauge.
    public class RadialGauge : Gauge
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="LinearGauge" /> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="clientSideObjectWriterFactory">The client side object writer factory.</param>
        /// <param name="urlGenerator">The URL Generator.</param>
        public RadialGauge(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IUrlGenerator urlGenerator)
            : base(viewContext, clientSideObjectWriterFactory, urlGenerator)
        {
        }

        /// <summary>
        /// Writes the initialization script.
        /// </summary>
        /// <param name="writer">The writer object.</param>
        public override void WriteInitializationScript(TextWriter writer)
        {
            var objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoRadialGauge", writer);

            objectWriter.Start();

            SerializeData("gaugeArea", this.GaugeArea.CreateSerializer().Serialize(), objectWriter);

            SerializeTheme(objectWriter);
            SerializeTransitions(objectWriter);

            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }
    }
}