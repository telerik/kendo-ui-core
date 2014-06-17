namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayerDefaultsBubbleSettings : JsonObject
    {
        public MapLayerDefaultsBubbleSettings()
        {
            //>> Initialization
        
            Style = new MapLayerDefaultsBubbleStyleSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public string Attribution { get; set; }
        
        public double? Opacity { get; set; }
        
        public double? MaxSize { get; set; }
        
        public double? MinSize { get; set; }
        
        public MapLayerDefaultsBubbleStyleSettings Style
        {
            get;
            set;
        }
        
        public MapSymbol? Symbol { get; set; }
        
        //<< Fields

        public string SymbolName { get; set; }

        public ClientHandlerDescriptor SymbolHandler { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Attribution.HasValue())
            {
                json["attribution"] = Attribution;
            }
            
            if (Opacity.HasValue)
            {
                json["opacity"] = Opacity;
            }
                
            if (MaxSize.HasValue)
            {
                json["maxSize"] = MaxSize;
            }
                
            if (MinSize.HasValue)
            {
                json["minSize"] = MinSize;
            }
                
            var style = Style.ToJson();
            if (style.Any())
            {
                json["style"] = style;
            }
                
        //<< Serialization

            if (SymbolHandler != null)
            {
                json["symbol"] = SymbolHandler;
            }
            else if (SymbolName.HasValue())
            {
                json["symbol"] = SymbolName;
            }
            else if (Symbol.HasValue)
            {
                json["symbol"] = Symbol.ToString().ToLowerInvariant();
            }
        }
    }
}
