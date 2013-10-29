namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapMarker : JsonObject
    {
        public MapMarker()
        {
            //>> Initialization
        
        //<< Initialization

            
            HtmlAttributes = new RouteValueDictionary();
            
        }

        
        /// <summary>
        /// Gets the HTML attributes.
        /// </summary>
        /// <value>The HTML attributes.</value>
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        }
        

        //>> Fields
        
        public string Color { get; set; }
        
        public double? Size { get; set; }
        
        public MapMarkerShape? Shape { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Color.HasValue())
            {
                json["color"] = Color;
            }
            
            if (Size.HasValue)
            {
                json["size"] = Size;
            }
                
            if (Shape.HasValue)
            {
                json["shape"] = Shape;
            }
                
        //<< Serialization
        }
    }
}
