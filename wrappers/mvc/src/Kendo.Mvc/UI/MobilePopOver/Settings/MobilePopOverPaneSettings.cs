namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MobilePopOverPaneSettings : JsonObject
    {
        public MobilePopOverPaneSettings()
        {
            //>> Initialization
        
        //<< Initialization

            
        }

        

        //>> Fields
        
        public string Initial { get; set; }
        
        public string Layout { get; set; }
        
        public string Loading { get; set; }
        
        public string Transition { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Initial.HasValue())
            {
                json["initial"] = Initial;
            }
            
            if (Layout.HasValue())
            {
                json["layout"] = Layout;
            }
            
            if (Loading.HasValue())
            {
                json["loading"] = Loading;
            }
            
            if (Transition.HasValue())
            {
                json["transition"] = Transition;
            }
            
        //<< Serialization
        }
    }
}
