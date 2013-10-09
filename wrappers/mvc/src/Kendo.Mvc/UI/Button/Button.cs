namespace Kendo.Mvc.UI
{
    using System;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using System.Web.UI;
    using Kendo.Mvc.UI.Html;
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;

    public class Button : WidgetBase
    {
        public Button(ViewContext viewContext, IJavaScriptInitializer initializer)
            : base(viewContext, initializer)
        {
            Enable = true;
            Tag = "button";
            Template = new HtmlTemplate();
        }

        /// <summary>
        /// Specifies the pane contents
        /// </summary>
        public HtmlTemplate Template { get; set; }

        public bool Enable { get; set; }

        public string Icon { get; set; }

        public string ImageUrl { get; set; }

        public string SpriteCssClass { get; set; }

        public string Tag { get; set; }
        
        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            if (ImageUrl.HasValue())
            {
                options["imageUrl"] = ImageUrl;
            }

            if (SpriteCssClass.HasValue())
            {
                options["spriteCssClass"] = SpriteCssClass;
            }

            if (Icon.HasValue())
            {
                options["icon"] = Icon;
            }

            if (Enable == false)
            {
                options["enable"] = Enable;
            }

            writer.Write(Initializer.Initialize(Selector, "Button", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var renderer = new ButtonHtmlBuilder(this);

            renderer.ButtonTag().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}