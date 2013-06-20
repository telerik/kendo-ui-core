namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MobileActionSheetItem : JsonObject
    {
        public MobileActionSheetItem()
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
        
        public string Action { get; set; }
        
        public string Text { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Action.HasValue())
            {
                json["action"] = Action;
            }
            
        //<< Serialization
        }
    }
}
