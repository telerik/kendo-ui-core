namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;

    public class MapLayer : JsonObject
    {
        public MapLayer(Map map)
        {
            DataSource = new DataSource();
            ViewContext = map.ViewContext;
            UrlGenerator = map.UrlGenerator;
            //>> Initialization
        
            Style = new MapLayerStyleSettings();
                
        //<< Initialization

            Tooltip = new MapMarkerTooltip(map.ViewContext, map.Initializer, map.ViewData);
        }

        public ViewContext ViewContext
        {
            get;
            private set;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public DataSource DataSource { get; set; }

        public string[] Subdomains { get; set; }

        //>> Fields
        
        public string Attribution { get; set; }
        
        public bool? AutoBind { get; set; }
        
        public double[] Extent { get; set; }
        
        public string Key { get; set; }
        
        public string LocationField { get; set; }
        
        public string TitleField { get; set; }
        
        public double? MaxSize { get; set; }
        
        public double? MinSize { get; set; }
        
        public double? Opacity { get; set; }
        
        public MapLayerStyleSettings Style
        {
            get;
            set;
        }
        
        public string UrlTemplateId { get; set; }
        
        public string ValueField { get; set; }
        
        public MapLayerType? Type { get; set; }
        
        public MapLayersImagerySet? ImagerySet { get; set; }
        
        public MapMarkersShape? Shape { get; set; }
        
        public MapSymbol? Symbol { get; set; }
        
        //<< Fields

        public string ShapeName { get; set; }

        public string SymbolName { get; set; }

        public ClientHandlerDescriptor SymbolHandler { get; set; }

        public MapMarkerTooltip Tooltip { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            var dataSource = DataSource.ToJson();

            if (dataSource.Any())
            {
                json["dataSource"] = dataSource;
            }

            if (Subdomains != null)
            {
                json["subdomains"] = Subdomains;
            }

            //>> Serialization
        
            if (Attribution.HasValue())
            {
                json["attribution"] = Attribution;
            }
            
            if (AutoBind.HasValue)
            {
                json["autoBind"] = AutoBind;
            }
                
            if (Extent != null)
            {
                json["extent"] = Extent;
            }
	    
            if (Key.HasValue())
            {
                json["key"] = Key;
            }
            
            if (LocationField.HasValue())
            {
                json["locationField"] = LocationField;
            }
            
            if (TitleField.HasValue())
            {
                json["titleField"] = TitleField;
            }
            
            if (MaxSize.HasValue)
            {
                json["maxSize"] = MaxSize;
            }
                
            if (MinSize.HasValue)
            {
                json["minSize"] = MinSize;
            }
                
            if (Opacity.HasValue)
            {
                json["opacity"] = Opacity;
            }
                
            var style = Style.ToJson();
            if (style.Any())
            {
                json["style"] = style;
            }
                
            if (UrlTemplateId.HasValue())
            {
                json["urlTemplate"] = UrlTemplateId;
            }
            
            if (ValueField.HasValue())
            {
                json["valueField"] = ValueField;
            }
            
            if (Type.HasValue)
            {
                json["type"] = Type;
            }
                
            if (ImagerySet.HasValue)
            {
                json["imagerySet"] = ImagerySet;
            }
                
        //<< Serialization

            var tooltip = Tooltip.ToJson();
            if (tooltip.Any())
            {
                json["tooltip"] = tooltip;
            }

            if (ShapeName.HasValue())
            {
                json["shape"] = ShapeName;
            }
            else if (Shape.HasValue)
            {
                var shapeName = Shape.ToString();
                json["shape"] = shapeName.ToLowerInvariant()[0] + shapeName.Substring(1);
            }

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
