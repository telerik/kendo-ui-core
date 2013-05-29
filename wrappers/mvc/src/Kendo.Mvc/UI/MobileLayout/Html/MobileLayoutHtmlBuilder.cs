namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileLayoutHtmlBuilder
    {
        private readonly MobileLayout component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileLayoutHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileLayout component.</param>
        public MobileLayoutHtmlBuilder(MobileLayout component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileLayout markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "layout")
                .Attribute("data-id", component.Id);

            AddEventAttributes(html, component.Events);

            html.Attributes(component.HtmlAttributes);

            html.Children.Add(CreateHeaderElement());            
            html.Children.Add(CreateFooterElement());

            return html;
        }

        protected virtual IHtmlNode CreateElement()
        {
            return new HtmlElement("div");
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

        protected virtual IHtmlNode CreateHeaderElement()
        {
            var dom = new HtmlElement("header")
                        .Attribute("data-role", "header");

            if (component.Header.HasValue())
            {
                component.Header.Apply(dom);
            }

            return dom;
        }       

        protected virtual IHtmlNode CreateFooterElement()
        {
            var dom = new HtmlElement("footer")
                        .Attribute("data-role", "footer");

            if (component.Footer.HasValue())
            {
                component.Footer.Apply(dom);
            }

            return dom;
        }
    }
}

