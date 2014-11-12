namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramShapeHoverSettings : JsonObject
    {
        public DiagramShapeHoverSettings()
        {
            //>> Initialization
        
            Fill = new DiagramShapeHoverFillSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public DiagramShapeHoverFillSettings Fill
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
