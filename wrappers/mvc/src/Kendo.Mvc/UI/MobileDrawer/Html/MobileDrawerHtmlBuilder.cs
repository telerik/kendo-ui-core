namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using System.Text;
    using System.Web;

    public class MobileDrawerHtmlBuilder
    {
        private readonly MobileDrawer component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileDrawerHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileDrawer component.</param>
        public MobileDrawerHtmlBuilder(MobileDrawer component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileDrawer markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "drawer")
                .Attribute("id", component.Id);

            CreateHeaderElement(html);
            CreateContentElement(html);
            CreateFooterElement(html);

            AddEventAttributes(html, component.Events);

            if (component.Title.HasValue())
            {
                html.Attribute("data-title", component.Title);
            }

            html.Attribute("data-position", component.Position.ToString().ToLower());

            SerializeViews(html);

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

        private void SerializeViews(IHtmlNode html)
        {
            if (component.Views.Length == 0)
                return;

            var output = new StringBuilder();

            output.Append("[");

            foreach (var view in component.Views)
            {
                output.Append("\"");
                output.Append(HttpUtility.HtmlAttributeEncode(view));
                output.Append("\",");
            }

            output.Remove(output.Length - 1, 1);

            output.Append("]");

            html.Attribute("data-views", output.ToString());
        }
    }
}

