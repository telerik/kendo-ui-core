namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Fluent;
    using Kendo.Mvc.UI.Html;

    public class Editor : WidgetBase
    {
        public Editor(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            UrlGenerator = urlGenerator;

            DefaultToolGroup = new EditorToolGroup(this);

            Template = new HtmlTemplate();
            Messages = new EditorMessages();
            StyleSheets = new List<string>();

            new EditorToolFactory(DefaultToolGroup)
                .Formatting()
                .Bold().Italic().Underline()
                .JustifyLeft().JustifyCenter().JustifyRight()
                .InsertUnorderedList().InsertOrderedList()
                .Outdent().Indent()
                .CreateLink().Unlink()
                .InsertImage()
                .TableEditing();

            ImageBrowserSettings = new EditorImageBrowserSettings(Messages.ImageBrowserMessages);
        }

        internal IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public EditorImageBrowserSettings ImageBrowserSettings
        {
            get;
            private set;
        }

        public EditorMessages Messages
        {
            get;
            private set;
        }

        public EditorToolGroup DefaultToolGroup
        {
            get;
            private set;
        }

        public IList<string> StyleSheets
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

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            options["tools"] = DefaultToolGroup.Tools.Select(tool =>
            {
                var customButtonTool = tool as EditorCustomButtonTool;
                var customTemplateTool = tool as EditorCustomTemplateTool;
                var listTool = tool as EditorListTool;
                var colorPickerTool = tool as EditorColorPickerTool;

                if (customButtonTool != null)
                {
                    return new Dictionary<string, object>() {
                        { "name", customButtonTool.Name},
                        { "tooltip", (!string.IsNullOrEmpty(customButtonTool.ToolTip) ? customButtonTool.ToolTip : customButtonTool.Name) },
                        { "exec", customButtonTool.Exec }
                    };
                }
                else if (customTemplateTool != null)
                {
                    return new Dictionary<string, object>() {
                        { "template", customTemplateTool.Template }
                    };
                }
                else if (listTool != null && listTool.Items != null && listTool.Items.Count > 0)
                {
                    var listToolItems = listTool.Items.Select(item => new { text = item.Text, value = item.Value });

                    return new Dictionary<string, object>() {
                        { "name", listTool.Name},
                        { "items", listToolItems }
                    };
                }
                else if (colorPickerTool != null)
                {
                    object palette = "websafe";

                    if (colorPickerTool.Palette == ColorPickerPalette.Basic)
                    {
                        palette = "basic";
                    }
                    else if (colorPickerTool.PaletteColors != null && colorPickerTool.PaletteColors.Any())
                    {
                        palette = colorPickerTool.PaletteColors;
                    }

                    return new Dictionary<string, object>() {
                        { "name", colorPickerTool.Name},
                        { "palette", palette }
                    };
                }
                else
                {
                    return new Dictionary<string, object>() {
                        { "name", tool.Name }
                    };
                }
            });

            var snippetOptions = DefaultToolGroup.Tools.OfType<EditorListTool>()
                .Where(t => t.Name == "insertHtml" && t.Items != null && t.Items.Any())
                .SelectMany((t, index) => t.Items.Select(item => new { text = item.Text, value = item.Value }));

            if (snippetOptions.Any())
            {
                options["insertHtml"] = snippetOptions;
            }

            var styleOptions = DefaultToolGroup.Tools.OfType<EditorListTool>()
                .Where(t => t.Name == "style" && t.Items != null && t.Items.Any())
                .SelectMany((t, index) => t.Items.Select(item => new { text = item.Text, value = item.Value }));

            if (styleOptions.Any())
            {
                options["style"] = styleOptions;
            }

            if (Encode.HasValue && !Encode.Value)
            {
                options["encoded"] = Encode.Value;
            }

            var messages = Messages.ToJson();

            if (messages.Any())
            {
                options["messages"] = messages;
            }

            if (StyleSheets.Count > 0)
            {
                options["stylesheets"] = StyleSheets;
            }

            var fileSettings = ImageBrowserSettings.ToJson();
            if (fileSettings.Any())
            {
                options["imageBrowser"] = fileSettings;
            }

            writer.Write(Initializer.Initialize(Selector, "Editor", options));

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
