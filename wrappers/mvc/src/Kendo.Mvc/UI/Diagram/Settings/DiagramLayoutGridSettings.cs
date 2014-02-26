namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramLayoutGridSettings : JsonObject
    {
        public DiagramLayoutGridSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public double? Width { get; set; }
        
        public double? OffsetX { get; set; }
        
        public double? OffsetY { get; set; }
        
        public double? ComponentSpacingX { get; set; }
        
        public double? ComponentSpacingY { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Width.HasValue)
            {
                json["width"] = Width;
            }
                
            if (OffsetX.HasValue)
            {
                json["offsetX"] = OffsetX;
            }
                
            if (OffsetY.HasValue)
            {
                json["offsetY"] = OffsetY;
            }
                
            if (ComponentSpacingX.HasValue)
            {
                json["componentSpacingX"] = ComponentSpacingX;
            }
                
            if (ComponentSpacingY.HasValue)
            {
                json["componentSpacingY"] = ComponentSpacingY;
            }
                
        //<< Serialization
        }
    }
}
