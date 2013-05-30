namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MobileScrollViewItem : JsonObject
    {
        public MobileScrollViewItem()
        {                        
            HtmlAttributes = new RouteValueDictionary();

            Content = new HtmlTemplate();
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

        /// <summary>
        /// Gets the content of the item
        /// </summary>
        public HtmlTemplate Content
        {
            get;
            private set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
         
        }
    }
}
