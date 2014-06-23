namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class ContextMenuAnimationSettings : JsonObject
    {
        public ContextMenuAnimationSettings()
        {
            //>> Initialization
        
            Close = new ContextMenuAnimationCloseSettings();
                
            Open = new ContextMenuAnimationOpenSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public ContextMenuAnimationCloseSettings Close
        {
            get;
            set;
        }
        
        public ContextMenuAnimationOpenSettings Open
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var close = Close.ToJson();
            if (close.Any())
            {
                json["close"] = close;
            }
                
            var open = Open.ToJson();
            if (open.Any())
            {
                json["open"] = open;
            }
                
        //<< Serialization
        }
    }
}
