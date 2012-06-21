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

    public class Editor : ViewComponentBase
    {
        public Editor(ViewContext viewContext, IJavaScriptInitializer initializer) : base(viewContext, initializer)
        {
            DefaultToolGroup = new EditorToolGroup(this);

            Template = new HtmlTemplate();
            Messages = new EditorMessages();

            //TODO: Implement customization of the fonts names and sizes

            new EditorToolFactory(DefaultToolGroup)
                .Bold().Italic().Underline().Strikethrough()
                .FontName()
                .FontSize()
                .FontColor().BackColor()
                .JustifyLeft().JustifyCenter().JustifyRight().JustifyFull()
                .InsertUnorderedList().InsertOrderedList()
                .Outdent().Indent()
                .FormatBlock()
                .CreateLink().Unlink()
                .InsertImage();
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
                return tool.Name;
            });

            if (Encode.HasValue && !Encode.Value)
            {
                options["encoded"] = Encode.Value;
            }

            var messages = Messages.ToJson();

            if (messages.Any())
            {
                options["messages"] = messages;
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
