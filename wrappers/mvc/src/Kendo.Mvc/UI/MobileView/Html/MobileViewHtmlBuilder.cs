namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileViewHtmlBuilder
    {
        private readonly MobileView component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileViewHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileView component.</param>
        public MobileViewHtmlBuilder(MobileView component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileView markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "view")
                .Attribute("id", component.Id);

            CreateHeaderElement(html);
            CreateContentElement(html);
            CreateFooterElement(html);

            AddEventAttributes(html, component.Events);

            if (component.Title.HasValue())
            {
                html.Attribute("data-title", component.Title);
            }

            if (component.Layout.HasValue())
            {
                html.Attribute("data-layout", component.Layout);
            }

            html.Attribute("data-reload", component.Reload ? "true" : "false");
            html.Attribute("data-use-native-scrolling", component.UseNativeScrolling ? "true" : "false");
            html.Attribute("data-stretch", component.Stretch ? "true" : "false");
            html.Attribute("data-zoom", component.Zoom ? "true" : "false");

            html.Attributes(component.HtmlAttributes);

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

        protected virtual void CreateHeaderElement(IHtmlNode html)
        {
            if (component.Header.HasValue())
            {
                var dom = new HtmlElement("header")
                            .Attribute("data-role", "header");
            
                component.Header.Apply(dom);

                html.Children.Add(dom);
            }                        
        }

        protected virtual void CreateContentElement(IHtmlNode html)
        {
            if (component.Content.HasValue())
            {
                var dom = new HtmlElement("div")
                            .Attribute("data-role", "content");
            
                component.Content.Apply(dom);

                html.Children.Add(dom);
            }            
        }

        protected virtual void CreateFooterElement(IHtmlNode html)
        {
            if (component.Footer.HasValue())
            {
                var dom = new HtmlElement("footer")
                            .Attribute("data-role", "footer");
            
                component.Footer.Apply(dom);

                html.Children.Add(dom);
            }            
        }
    }
}

