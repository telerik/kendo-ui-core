namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayerDefaultsBubbleStyleSettings : JsonObject
    {
        public MapLayerDefaultsBubbleStyleSettings()
        {
            //>> Initialization
        
            Fill = new MapLayerDefaultsBubbleStyleFillSettings();
                
            Stroke = new MapLayerDefaultsBubbleStyleStrokeSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public MapLayerDefaultsBubbleStyleFillSettings Fill
        {
            get;
            set;
        }
        
        public MapLayerDefaultsBubbleStyleStrokeSettings Stroke
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
