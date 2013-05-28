namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileTabStripHtmlBuilder
    {
        private readonly MobileTabStrip component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileTabStripHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileTabStrip component.</param>
        public MobileTabStripHtmlBuilder(MobileTabStrip component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileTabStrip markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "tabstrip")
                .Attribute("id", component.Id);

            AddEventAttributes(html, component.Events);

            if (component.SelectedIndex != 0)
            {
                html.Attribute("data-selected-index", component.SelectedIndex.ToString());
            }

            html.Attributes(component.HtmlAttributes);

            foreach (var item in component.Items)
            {
                html.Children.Add(CreateItem(item));
            }

            return html;
        }

        protected virtual IHtmlNode CreateItem(MobileTabStripItem item)
        {
            var dom = new HtmlElement("a")
                        .Attributes(item.HtmlAttributes)
                        .Text(item.Text);

            if (item.Href.HasValue())
            {
                dom.Attribute("href", item.Href);
            }

            foreach (var keyValuePair in item.ToJson())
            {
                dom.Attribute("data-" + keyValuePair.Key, keyValuePair.Value.ToString());
            }

            return dom;
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
        
    }
}

