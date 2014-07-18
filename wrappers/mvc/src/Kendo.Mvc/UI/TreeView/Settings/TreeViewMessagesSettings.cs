namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeViewMessagesSettings : JsonObject
    {
        public TreeViewMessagesSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Loading { get; set; }
        
        public string Retry { get; set; }
        
        public string RequestFailed { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Loading.HasValue())
            {
                json["loading"] = Loading;
            }
            
            if (Retry.HasValue())
            {
                json["retry"] = Retry;
            }
            
            if (RequestFailed.HasValue())
            {
                json["requestFailed"] = RequestFailed;
            }
            
        //<< Serialization
        }
    }
}
