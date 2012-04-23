// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.UI.Fluent;
    using Telerik.Web.Mvc.UI.Html;

    public class Editor : ViewComponentBase
    {
        private readonly IWebAssetCollectionResolver resolver;
        private readonly IUrlGenerator urlGenerator;

        public Editor(ViewContext viewContext, 
            IClientSideObjectWriterFactory clientSideObjectWriterFactory, 
            IWebAssetCollectionResolver resolver, 
            ILocalizationService localizationService,
            IUrlGenerator urlGenerator)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            this.resolver = resolver;
            this.urlGenerator = urlGenerator;

            ScriptFileNames.AddRange(new[] {
                "telerik.common.js", 
                "telerik.list.js", 
                "telerik.combobox.js", 
                "telerik.draganddrop.js", 
                "telerik.window.js", 
                "telerik.editor.js" 
            });

            DefaultToolGroup = new EditorToolGroup(this);

            ClientEvents = new EditorClientEvents();

            StyleSheets = new WebAssetGroup("default", false) { DefaultPath = WebAssetDefaultSettings.StyleSheetFilesPath };

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

        public WebAssetGroup StyleSheets
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

            if (StyleSheets.Items.Any())
            {
                var isSecured = ViewContext.HttpContext.Request.IsSecureConnection;
                var canCompress = ViewContext.HttpContext.Request.CanCompress();

                var mergedGroup = resolver.Resolve(new ResolverContext
                {
                    ContentType = "text/css",
                    HttpHandlerPath = WebAssetHttpHandler.DefaultPath,
                    IsSecureConnection = isSecured,
                    SupportsCompression = canCompress
                }, new WebAssetCollection("~/Content") { StyleSheets });

                objectWriter.AppendCollection("stylesheets", mergedGroup);
            }

            Localization.SerializeTo("localization", objectWriter);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            if (FileBrowserSettings.Upload.HasValue())
            {
                ScriptFileNames.Add("telerik.upload.js");
            }
            
            if (FileBrowserSettings.Select.HasValue())
            {
                ScriptFileNames.Add("telerik.imagebrowser.js");
            }

            new EditorHtmlBuilder(this)
                .Build()
                .WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
