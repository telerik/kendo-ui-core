namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramShapeDefaultsHoverSettings : JsonObject
    {
        public DiagramShapeDefaultsHoverSettings()
        {
            //>> Initialization
        
            Fill = new DiagramShapeDefaultsHoverFillSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public DiagramShapeDefaultsHoverFillSettings Fill
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var fill = Fill.ToJson();
            if (fill.Any())
            {
                json["fill"] = fill;
            }
        //<< Serialization
        }
    }
}
