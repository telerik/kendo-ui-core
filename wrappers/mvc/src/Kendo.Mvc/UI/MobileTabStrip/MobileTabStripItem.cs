namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MobileTabStripItem : JsonObject
    {
        public MobileTabStripItem()
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
        
        public string Href { get; set; }
        
        public string Icon { get; set; }
        
        public string Text { get; set; }
        
        public string Target { get; set; }
        
        public string ActionsheetContext { get; set; }
        
        //<< Fields

        public MobileButtonRel Rel { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Icon.HasValue())
            {
                json["icon"] = Icon;
            }
            
            if (Target.HasValue())
            {
                json["target"] = Target;
            }
            
            if (ActionsheetContext.HasValue())
            {
                json["actionsheet-context"] = ActionsheetContext;
            }
            
        //<< Serialization

            if (Rel != MobileButtonRel.None)
            {
                json["rel"] = Rel.ToString().ToLower();
            }
        }
    }
}
