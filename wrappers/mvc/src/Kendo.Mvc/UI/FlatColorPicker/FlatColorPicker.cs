namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class FlatColorPicker : WidgetBase
    {
        public FlatColorPicker(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData)
            : base(viewContext, initializer, viewData)
        {
            Enabled = true;
            Input = true;
            Buttons = true;
        }

        public string Value { get; set; }

        public bool Enabled { get; set; }

        public bool Opacity { get; set; }

        public bool Input { get; set; }

        public bool Buttons { get; set; }
       
        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            if (Opacity)
            {
                options["opacity"] = true;
            }

            if (!Input)
            {
                options["input"] = false;
            }

            if (!Buttons)
            {
                options["buttons"] = false;
            }

            if (!string.IsNullOrEmpty(Value))
            {
                options["value"] = Value;
            }

            writer.Write(Initializer.Initialize(Selector, "FlatColorPicker", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            new HtmlElement("div")
                .Attributes(new { id = this.Id })
                .Attributes(this.HtmlAttributes)
                .PrependClass(UIPrimitives.Widget, "k-flatcolorpicker")
                .WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}