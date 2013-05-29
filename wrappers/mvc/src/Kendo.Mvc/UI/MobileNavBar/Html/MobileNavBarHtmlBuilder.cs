namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileNavBarHtmlBuilder
    {
        private readonly MobileNavBar component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileNavBarHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileNavBar component.</param>
        public MobileNavBarHtmlBuilder(MobileNavBar component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileNavBar markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "navbar")
                .Attribute("id", component.Id);

            component.Content.Apply(html);

            html.Attributes(component.HtmlAttributes);

            return html;
        }

        protected virtual IHtmlNode CreateElement()
        {
            return new HtmlElement("div");
        }

        
    }
}

