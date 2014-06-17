namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayerDefaultsSettings : JsonObject
    {
        public MapLayerDefaultsSettings(Map map)
        {
            //>> Initialization
        
            Bing = new MapLayerDefaultsBingSettings();
                
            Bubble = new MapLayerDefaultsBubbleSettings();
                
            Shape = new MapLayerDefaultsShapeSettings();
                
            Tile = new MapLayerDefaultsTileSettings();
                
        //<< Initialization

            Marker = new MapLayerDefaultsMarkerSettings(map);
        }

        

        //>> Fields
        
        public MapLayerDefaultsMarkerSettings Marker
        {
            get;
            set;
        }
        
        public MapLayerDefaultsShapeSettings Shape
        {
            get;
            set;
        }
        
        public MapLayerDefaultsBubbleSettings Bubble
        {
            get;
            set;
        }
        
        public MapLayerDefaultsTileSettings Tile
        {
            get;
            set;
        }
        
        public MapLayerDefaultsBingSettings Bing
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var marker = Marker.ToJson();
            if (marker.Any())
            {
                json["marker"] = marker;
            }
                
            var shape = Shape.ToJson();
            if (shape.Any())
            {
                json["shape"] = shape;
            }
                
            var bubble = Bubble.ToJson();
            if (bubble.Any())
            {
                json["bubble"] = bubble;
            }
                
            var tile = Tile.ToJson();
            if (tile.Any())
            {
                json["tile"] = tile;
            }
                
            var bing = Bing.ToJson();
            if (bing.Any())
            {
                json["bing"] = bing;
            }
                
        //<< Serialization
        }
    }
}
