namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileActionSheetPopupSettings : JsonObject
    {
        public MobileActionSheetPopupSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public MobileActionSheetPopupDirection Direction { get; set; }
        
        public string Height { get; set; }
        
        public string Width { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            json["direction"] = Direction;
                
            if (Height.HasValue())
            {
                json["height"] = Height;
            }
            
            if (Width.HasValue())
            {
                json["width"] = Width;
            }
            
        //<< Serialization
        }
    }
}
