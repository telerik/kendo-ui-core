namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MobileSplitViewPane : JsonObject
    {
        public MobileSplitViewPane()
        {
            //>> Initialization
        
        //<< Initialization

            
            HtmlAttributes = new RouteValueDictionary();

            Content = new HtmlTemplate();

            Events = new Dictionary<string, object>();
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
        
        public string Id { get; set; }
        
        public string Initial { get; set; }
        
        public string Layout { get; set; }
        
        public string Loading { get; set; }
        
        public string Transition { get; set; }
        
        //<< Fields

        public HtmlTemplate Content
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the client events of the grid.
        /// </summary>
        /// <value>The client events.</value>
        public IDictionary<string, object> Events 
        { 
            get; 
            private set; 
        }

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
