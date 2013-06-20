namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MobileButtonGroupItem : JsonObject
    {
        public MobileButtonGroupItem()
        {
            //>> Initialization
        
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
        
        public string Icon { get; set; }
        
        public string Text { get; set; }
        
        public string Badge { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Icon.HasValue())
            {
                json["icon"] = Icon;
            }
            
            if (Badge.HasValue())
            {
                json["badge"] = Badge;
            }
            
        //<< Serialization
        }
    }
}
