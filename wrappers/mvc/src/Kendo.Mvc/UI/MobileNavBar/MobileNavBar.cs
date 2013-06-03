namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileNavBar : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileNavBar(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;

            Content = new HtmlTemplate();
//>> Initialization
        
        //<< Initialization
        }

//>> Fields
        
        //<< Fields

        public HtmlTemplate Content
        {
            get;
            private set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            //no initializtion scripts for mobile widgets
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            
            var html = new MobileNavBarHtmlBuilder(this).Build();

            html.WriteTo(writer);

            //prevent rendering empty script tag
            //base.WriteHtml(writer);
        }

        /// <summary>
        /// Creates a HTML element used as a view title.
        /// </summary>
        /// <param name="text">The text for the content.</param>
        /// <returns>Returns HTML element representing default view title.</returns>
        public MvcHtmlString ViewTitle(string text)
        {
            return MvcHtmlString.Create(
                new HtmlElement("span")                
                    .Attribute("data-role", "view-title")
                    .Text(text)
                    .ToString());
        }
    }
}

