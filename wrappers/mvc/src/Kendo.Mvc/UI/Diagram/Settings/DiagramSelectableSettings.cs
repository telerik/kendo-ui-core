namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramSelectableSettings : JsonObject
    {
        public DiagramSelectableSettings()
        {
            //>> Initialization
        
            Stroke = new DiagramSelectableStrokeSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public DiagramSelectableStrokeSettings Stroke
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var stroke = Stroke.ToJson();
            if (stroke.Any())
            {
                json["stroke"] = stroke;
            }
                
        //<< Serialization
        }
    }
}
