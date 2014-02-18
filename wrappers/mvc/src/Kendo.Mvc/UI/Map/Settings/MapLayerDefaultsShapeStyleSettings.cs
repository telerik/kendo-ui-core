namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayerDefaultsShapeStyleSettings : JsonObject
    {
        public MapLayerDefaultsShapeStyleSettings()
        {
            //>> Initialization
        
            Fill = new MapLayerDefaultsShapeStyleFillSettings();
                
            Stroke = new MapLayerDefaultsShapeStyleStrokeSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public MapLayerDefaultsShapeStyleFillSettings Fill
        {
            get;
            set;
        }
        
        public MapLayerDefaultsShapeStyleStrokeSettings Stroke
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
                
            var stroke = Stroke.ToJson();
            if (stroke.Any())
            {
                json["stroke"] = stroke;
            }
                
        //<< Serialization
        }
    }
}
