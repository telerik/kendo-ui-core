namespace Kendo.Mvc.UI
{
    using System.Globalization;
    using System.IO;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;

    /// <summary>
    /// Telerik Upload for ASP.NET MVC is a view component for uploading files.
    /// It supports the following features:
    /// <list type="bullet">
    ///     <item>Asynchronous uploading</item>
    ///     <item>Progress tracking</item>
    ///     <item>Multiple file selection</item>
    ///     <item>Drag &amp; drop</item>
    /// </list>
    /// Note that some of the features depend on browser capabilities.
    /// For more information, see the online documentation.
    /// </summary>
    public class Upload : ViewComponentBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Upload" /> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="clientSideObjectWriterFactory">The client side object writer factory.</param>
        public Upload(  ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory,
                        IUrlGenerator urlGenerator, ILocalizationService localizationService)
        : base(viewContext, clientSideObjectWriterFactory)
        {
            ClientEvents = new UploadClientEvents();
            Enabled = true;
            Multiple = true;
            ShowFileList = true;
            Async = new UploadAsyncSettings(this);

            UrlGenerator = urlGenerator;
        }

        /// <summary>
        /// Represents the client-side event handlers for the component
        /// </summary>
        public UploadClientEvents ClientEvents
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets a value indicating if the component is enabled.
        /// </summary>
        /// <value>
        /// true if the component should be enabled, false otherwise; the default is true.
        /// </value>
        public bool Enabled
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating if multiple file selection is enabled.
        /// </summary>
        /// <value>
        /// true if multiple file selection should be enabled, false otherwise; the default is true.
        /// </value>
        public bool Multiple
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether to show the list of uploaded files
        /// </summary>
        /// <value>
        /// true if the list of uploaded files should be visible, false otherwise; true by default
        /// </value>
        public bool ShowFileList
        { 
            get; 
            set; 
        }

        /// <summary>
        /// Defines the asynchronous uploading settings
        /// </summary>
        public UploadAsyncSettings Async
        {
            get;
            private set;
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
        /// Writes the initialization script.
        /// </summary>
        /// <param name="writer">The writer object.</param>
        public override void WriteInitializationScript(TextWriter writer)
        {
            var objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoUpload", writer);

            objectWriter.Start();

            objectWriter.Append("enabled", Enabled, true);
            objectWriter.Append("multiple", Multiple, true);
            objectWriter.Append("showFileList", ShowFileList, true);

            Async.SerializeTo("async", objectWriter);
            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        /// <summary>
        /// Writes the Upload HTML.
        /// </summary>
        /// <param name="writer">The writer object.</param>
        protected override void WriteHtml(HtmlTextWriter writer)
        {
            new UploadHtmlBuilder(this)
                .Build()
                .WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
