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
        public MapLayer(ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            DataSource = new DataSource();
            ViewContext = viewContext;
            UrlGenerator = urlGenerator;
            //>> Initialization
        
            Style = new MapLayerStyleSettings();
                
        //<< Initialization
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

        //>> Fields
        
        public bool? AutoBind { get; set; }
        
        public string Copyright { get; set; }
        
        public MapLayerStyleSettings Style
        {
            get;
            private set;
        }
        
        public string UrlTemplateId { get; set; }
        
        public MapLayerType? Type { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            var dataSource = DataSource.ToJson();

            if (dataSource.Any())
            {
                json["dataSource"] = dataSource;
            }

            //>> Serialization
        
            if (AutoBind.HasValue)
            {
                json["autoBind"] = AutoBind;
            }
                
            if (Copyright.HasValue())
            {
                json["copyright"] = Copyright;
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
            
            if (Type.HasValue)
            {
                json["type"] = Type;
            }
                
        //<< Serialization
        }
    }
}
