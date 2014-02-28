namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramConnectionPoint : JsonObject
    {
        public DiagramConnectionPoint()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public double? X { get; set; }
        
        public double? Y { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (X.HasValue)
            {
                json["x"] = X;
            }
                
            if (Y.HasValue)
            {
                json["y"] = Y;
            }
                
        //<< Serialization
        }
    }
}
