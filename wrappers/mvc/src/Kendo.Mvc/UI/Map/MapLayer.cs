namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayer : JsonObject
    {
        public MapLayer()
        {
            //>> Initialization
        
            Layer = new MapLayer();
                
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
        
        public MapLayer Layer
        {
            get;
            private set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            json["layer"] = Layer.ToJson();
                
        //<< Serialization
        }
    }
}
