namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramEditableRotateSettings : JsonObject
    {
        public DiagramEditableRotateSettings()
        {
            //>> Initialization
        
            Thumb = new DiagramEditableRotateThumbSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public DiagramEditableRotateThumbSettings Thumb
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var thumb = Thumb.ToJson();
            if (thumb.Any())
            {
                json["thumb"] = thumb;
            }
                
        //<< Serialization
        }
    }
}
