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

            NavigatableSettings = new MobileNavigatableSettings();
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

        public MobileNavigatableSettings NavigatableSettings
        {
            get;
            private set;
        }

        //>> Fields
        
        public string Url { get; set; }
        
        public string Icon { get; set; }
        
        public string Text { get; set; }
        
        public string Target { get; set; }
        
        public string ActionsheetContext { get; set; }
        
        public string Badge { get; set; }
        
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
            
            if (Badge.HasValue())
            {
                json["badge"] = Badge;
            }
            
        //<< Serialization

            if (Rel != MobileButtonRel.None)
            {
                json["rel"] = Rel.ToString().ToLower();
            }
        }
    }
}
