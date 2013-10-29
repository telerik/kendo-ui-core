namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayer : JsonObject
    {
        public MapLayer()
        {
            DataSource = new DataSource();
            //>> Initialization
        
            Style = new MapLayerStyleSettings();
                
        //<< Initialization
        }

        public DataSource DataSource { get; set; }

        //>> Fields
        
        public bool AutoBind { get; set; }
        
        public string Type { get; set; }
        
        public string Copyright { get; set; }
        
        public MapLayerStyleSettings Style
        {
            get;
            private set;
        }
        
        public string UrlTemplateId { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            var dataSource = DataSource.ToJson();

            if (dataSource.Any())
            {
                json["dataSource"] = dataSource;
            }

            //>> Serialization
        
            json["autoBind"] = AutoBind;
                
            if (Type.HasValue())
            {
                json["type"] = Type;
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
            
        //<< Serialization
        }
    }
}
