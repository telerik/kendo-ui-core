namespace Kendo.Mvc.UI
{
    using System;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Fluent;
    using Kendo.Mvc.UI.Html;

    public class Editor : ViewComponentBase
    {
        private readonly IUrlGenerator urlGenerator;

        public Editor(ViewContext viewContext, 
            IClientSideObjectWriterFactory clientSideObjectWriterFactory, 
            ILocalizationService localizationService,
            IUrlGenerator urlGenerator)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            this.urlGenerator = urlGenerator;

            DefaultToolGroup = new EditorToolGroup(this);

            ClientEvents = new EditorClientEvents();

            Localization = new EditorLocalization(localizationService, CultureInfo.CurrentUICulture);

            Template = new HtmlTemplate();

            new EditorToolFactory(DefaultToolGroup)
                .Bold().Italic().Underline().Strikethrough()
                .Separator()
                .FontName()
                .FontSize()
                .FontColor().BackColor()
                .Separator()
                .JustifyLeft().JustifyCenter().JustifyRight().JustifyFull()
                .Separator()
                .InsertUnorderedList().InsertOrderedList()
                .Separator()
                .Outdent().Indent()
                .Separator()
                .FormatBlock()
                .Separator()
                .CreateLink().Unlink()
                .Separator()
                .InsertImage();
            
            FileBrowserSettings = new EditorFileBrowserSettings(this);
            
            DefaultToolGroup.Tools.OfType<EditorComboBox>()
                .Each(combo => combo.InputHtmlAttributes.Add("title", combo.Identifier));
        }

        public EditorFileBrowserSettings FileBrowserSettings 
        { 
            get; 
            private set; 
        }

        public EditorClientEvents ClientEvents
        {
            get;
            private set;
        }

        public EditorToolGroup DefaultToolGroup
        {
            get;
            private set;
        }

        public HtmlTemplate Template
        {
            get;
            private set;
        }

        public string Value
        {
            get
            {
                return Template.Html;
            }
            set
            {
                Template.Html = value;
            }
        }
        
        public Action Content 
        {
            get
            {
                return Template.Content;
            }

            set
            {
                Template.Content = value;
            }
        }

        public bool? Encode
        {
            get;
            set;
        }

        public EditorLocalization Localization
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var objectWriter = ClientSideObjectWriterFactory.Create(Id, "tEditor", writer);

            objectWriter.Start();

            ClientEvents.SerializeTo(objectWriter);

            DefaultToolGroup.Tools.OfType<IEditorListTool>().Each(tool =>
            {
                if (!tool.Items.SequenceEqual(EditorDefaultOptions.Get(tool.Identifier)))
                {
                    objectWriter.AppendCollection(tool.Identifier, tool.Items);
                }
            });

            var urlBuilder = new EditorUrlBuilder(urlGenerator, ViewContext);
            
            FileBrowserSettings.SerializeTo("fileBrowser", objectWriter, urlBuilder);

            if (Encode.HasValue && !Encode.Value)
            {
                objectWriter.Append("encoded", Encode.Value);
            }

            Localization.SerializeTo("localization", objectWriter);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            new EditorHtmlBuilder(this)
                .Build()
                .WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
