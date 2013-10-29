namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayerStyleSettings : JsonObject
    {
        public MapLayerStyleSettings()
        {
            //>> Initialization
        
            Fill = new MapLayerStyleFillSettings();
                
            Stroke = new MapLayerStyleStrokeSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public MapLayerStyleFillSettings Fill
        {
            get;
            private set;
        }
        
        public MapLayerStyleStrokeSettings Stroke
        {
            get;
            private set;
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
                
            var stroke = Stroke.ToJson();
            if (stroke.Any())
            {
                json["stroke"] = stroke;
            }
                
        //<< Serialization
        }
    }
}
