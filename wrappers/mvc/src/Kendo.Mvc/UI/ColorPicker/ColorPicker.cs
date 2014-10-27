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
    using Kendo.Mvc.Extensions;

    public class ColorPicker : WidgetBase
    {
        public ColorPicker(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData)
            : base(viewContext, initializer, viewData)
        {
            Palette = ColorPickerPalette.None;
            Enabled = true;

            //>> Initialization
        
            Messages = new ColorPickerMessagesSettings();
                
        //<< Initialization
        }

        public ColorPickerPalette Palette { get; set; }

        public IEnumerable<string> PaletteColors { get; set; }

        public bool Enabled { get; set; }

        public object TileSize { get; set; }

        //>> Fields
        
        public bool? Buttons { get; set; }
        
        public double? Columns { get; set; }
        
        public ColorPickerMessagesSettings Messages
        {
            get;
            set;
        }
        
        public bool? Opacity { get; set; }
        
        public bool? Preview { get; set; }
        
        public string ToolIcon { get; set; }
        
        public string Value { get; set; }
        
        //<< Fields
       
        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

            if (Palette == ColorPickerPalette.Basic)
            {
                json["palette"] = "basic";
            }
            else if (Palette == ColorPickerPalette.WebSafe)
            {
                json["palette"] = "websafe";
            }
            else if (PaletteColors != null && PaletteColors.Any())
            {
                json["palette"] = PaletteColors;
            }

            if (TileSize != null)
            {
                var tileSize = TileSize as ColorPaletteTileSize;

                if (tileSize != null)
                {
                    json["tileSize"] = new { width = tileSize.Width, height = tileSize.Height };
                }
                else
                {
                    json["tileSize"] = (int)TileSize;
                }
            }

            //>> Serialization
        
            if (Buttons.HasValue)
            {
                json["buttons"] = Buttons;
            }
                
            if (Columns.HasValue)
            {
                json["columns"] = Columns;
            }
                
            var messages = Messages.ToJson();
            if (messages.Any())
            {
                json["messages"] = messages;
            }
            if (Opacity.HasValue)
            {
                json["opacity"] = Opacity;
            }
                
            if (Preview.HasValue)
            {
                json["preview"] = Preview;
            }
                
            if (ToolIcon.HasValue())
            {
                json["toolIcon"] = ToolIcon;
            }
            
            if (Value.HasValue())
            {
                json["value"] = Value;
            }
            
        //<< Serialization

            writer.Write(Initializer.Initialize(Selector, "ColorPicker", json));

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