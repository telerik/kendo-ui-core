namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListExcelSettings : JsonObject
    {
        public TreeListExcelSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string FileName { get; set; }
        
        public bool? Filterable { get; set; }
        
        public bool? ForceProxy { get; set; }
        
        public string ProxyURL { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (FileName.HasValue())
            {
                json["fileName"] = FileName;
            }
            
            if (Filterable.HasValue)
            {
                json["filterable"] = Filterable;
            }
                
            if (ForceProxy.HasValue)
            {
                json["forceProxy"] = ForceProxy;
            }
                
            if (ProxyURL.HasValue())
            {
                json["proxyURL"] = ProxyURL;
            }
            
        //<< Serialization
        }
    }
}
