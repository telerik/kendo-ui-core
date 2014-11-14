namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramPdfMarginSettings : JsonObject
    {
        public DiagramPdfMarginSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public double? Bottom { get; set; }
        
        public double? Left { get; set; }
        
        public double? Right { get; set; }
        
        public double? Top { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Bottom.HasValue)
            {
                json["bottom"] = Bottom;
            }
                
            if (Left.HasValue)
            {
                json["left"] = Left;
            }
                
            if (Right.HasValue)
            {
                json["right"] = Right;
            }
                
            if (Top.HasValue)
            {
                json["top"] = Top;
            }
                
        //<< Serialization
        }
    }
}
