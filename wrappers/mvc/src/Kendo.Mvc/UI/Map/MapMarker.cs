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

            Tooltip = new MapMarkersTooltipSettings();
        
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

        public double[] Location { get; set; }

        //>> Fields

        public MapMarkersTooltipSettings Tooltip { get; set; }
        
        public MapMarkersShape? Shape { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Location != null)
            {
                json["location"] = Location;
            }

            //>> Serialization

            var tooltip = Tooltip.ToJson();
            if (tooltip.Any())
            {
                json["tooltip"] = tooltip;
            }
                
            if (Shape.HasValue)
            {
                json["shape"] = Shape;
            }
                
        //<< Serialization
        }
    }
}
