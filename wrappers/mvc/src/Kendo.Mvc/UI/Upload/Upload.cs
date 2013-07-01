namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;

    public class Upload : WidgetBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Upload" /> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="initializer">The javascript initializer.</param>
        /// <param name="urlGenerator">The URL Generator.</param>
        public Upload(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            Enabled = true;
            Multiple = true;
            ShowFileList = true;
            Async = new UploadAsyncSettings(this);
            Messages = new UploadMessages();

            UrlGenerator = urlGenerator;
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
        /// Gets or sets the Upload messages.
        /// </summary>
        /// <value>The Upload messages.</value>
        public IUploadMessages Messages
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the template Id for the files
        /// </summary>
        /// <value>The template for the files list</value>
        public string TemplateId
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
            var options = new Dictionary<string, object>(Events);

            if (!Enabled)
            {
                options.Add("enabled", Enabled);
            }

            if (!Multiple)
            {
                options.Add("multiple", Multiple);
            }

            if (!ShowFileList)
            {
                options.Add("showFileList", ShowFileList);
            }

            var messagesData = Messages.ToJson();

            if (messagesData.Keys.Count > 0)
            {
                options.Add("localization", messagesData);
            }

            var idPrefix = "#";
            if (IsInClientTemplate)
            {
                idPrefix = "\\" + idPrefix;
            }

            if (!string.IsNullOrEmpty(TemplateId))
            {
                options.Add("template", new ClientHandlerDescriptor { HandlerName = string.Format("$('{0}{1}').html()", idPrefix, TemplateId) });
            }

            Async.SerializeTo("async", options);

            writer.Write(Initializer.Initialize(Selector, "Upload", options));

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
