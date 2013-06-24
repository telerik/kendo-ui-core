using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI
{
    public class BarcodeTextElement : JsonObject
    {
        public BarcodeTextElement()
        {
            this.Margin = new BarcodeSpacing();
        }

        public bool Visible { get; set; }
        public BarcodeSpacing Margin { get; set; }
        public string Color { get; set; }
        public string Font { get; set; }

        public bool ShouldSerialize() {
            return Visible == false || Margin.ShouldSerialize() || Color.HasValue() || Font.HasValue();
        }
    
        protected override void  Serialize(IDictionary<string,object> json)
        {
            if (Visible==false)
            {
                json["visible"] = Visible;
            }
            if (Margin.ShouldSerialize())
            {
                json["margin"] = Margin.CreateSerializer().Serialize();
            }
            if (this.Color.HasValue())
            {
                json["color"] = Color;
            }
            if (this.Font.HasValue())
            {
                json["font"] = Font;
            }
        }
}
}
