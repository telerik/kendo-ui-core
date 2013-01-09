namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;

    public class ColorPicker : WidgetBase
    {
        public ColorPicker(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData)
            : base(viewContext, initializer, viewData)
        {
            Palette = ColorPickerPalette.None;
            Enabled = true;
        }

        public ColorPickerPalette Palette { get; set; }

        public IEnumerable<string> PaletteColors { get; set; }

        public string Value { get; set; }

        public bool Enabled { get; set; }

        public bool Opacity { get; set; }
       
        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            if (Palette == ColorPickerPalette.Basic)
            {
                options["palette"] = "basic";
            }
            else if (Palette == ColorPickerPalette.WebSafe)
            {
                options["palette"] = "websafe";
            }
            else if (PaletteColors != null && PaletteColors.Any())
            {
                options["palette"] = PaletteColors;
            }

            if (Opacity)
            {
                options["opacity"] = true;
            }

            writer.Write(Initializer.Initialize(Selector, "ColorPicker", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            ColorPickerHtmlBuilder renderer = new ColorPickerHtmlBuilder(this);

            renderer.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}