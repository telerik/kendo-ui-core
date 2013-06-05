namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileBackButtonHtmlBuilder
    {
        private readonly MobileBackButton component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileBackButtonHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileBackButton component.</param>
        public MobileBackButtonHtmlBuilder(MobileBackButton component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileBackButton markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "backbutton")
                .Attribute("id", component.Id);

            AddEventAttributes(html, component.Events);

            html.Text(component.Text);

            if (component.Icon.HasValue())
            {
                html.Attribute("data-icon", component.Icon);
            }

            if (component.Align != MobileButtonAlign.Center)
            {
                html.Attribute("data-align", component.Align.ToString().ToLower());
            }

            if (component.Href.HasValue())
            {
                html.Attribute("href", component.Href);
            }

            html.Attributes(component.HtmlAttributes);

            return html;
        }

        protected virtual IHtmlNode CreateElement()
        {
            return new HtmlElement("a");
        }

        
        protected virtual void AddEventAttributes(IHtmlNode html, IDictionary<string, object> events)
        {
            foreach (var keyValuePair in events)
            {
                var value = keyValuePair.Value as ClientHandlerDescriptor;
                var key = "data-" + keyValuePair.Key;

                if (value.HandlerName.HasValue())
                {
                    html.Attribute(key, value.HandlerName);
                }

            }
        }
        
    }
}

