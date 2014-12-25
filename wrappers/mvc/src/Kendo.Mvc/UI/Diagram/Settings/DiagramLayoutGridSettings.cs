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
        
        public double? ComponentSpacingX { get; set; }
        
        public double? ComponentSpacingY { get; set; }
        
        public double? OffsetX { get; set; }
        
        public double? OffsetY { get; set; }
        
        public double? Width { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (ComponentSpacingX.HasValue)
            {
                json["componentSpacingX"] = ComponentSpacingX;
            }
                
            if (ComponentSpacingY.HasValue)
            {
                json["componentSpacingY"] = ComponentSpacingY;
            }
                
            if (OffsetX.HasValue)
            {
                json["offsetX"] = OffsetX;
            }
                
            if (OffsetY.HasValue)
            {
                json["offsetY"] = OffsetY;
            }
                
            if (Width.HasValue)
            {
                json["width"] = Width;
            }
                
        //<< Serialization
        }
    }
}
