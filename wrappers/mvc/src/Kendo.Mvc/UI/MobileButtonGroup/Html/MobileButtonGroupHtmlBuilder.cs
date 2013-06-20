namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileButtonGroupHtmlBuilder
    {
        private readonly MobileButtonGroup component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileButtonGroupHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileButtonGroup component.</param>
        public MobileButtonGroupHtmlBuilder(MobileButtonGroup component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileButtonGroup markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "buttongroup")
                .Attribute("id", component.Id);

            AddEventAttributes(html, component.Events);

            if (component.Index > -1)
            {
                html.Attribute("data-index", component.Index.ToString());
            }

            if (component.SelectOn.HasValue())
            {
                html.Attribute("data-select-on", component.SelectOn);
            }

            html.Attributes(component.HtmlAttributes);

            foreach (var item in component.Items)
            {
                html.Children.Add(CreateItem(item));
            }

            return html;
        }

        protected virtual IHtmlNode CreateElement()
        {
            return new HtmlElement("ul");
        }

        protected virtual IHtmlNode CreateItem(MobileButtonGroupItem item)
        {
            var dom = new HtmlElement("li")
                        .Attributes(item.HtmlAttributes)
                        .Text(item.Text);

            foreach (var keyValuePair in item.ToJson())
            {
                dom.Attribute("data-" + keyValuePair.Key, keyValuePair.Value.ToString());
            }

            return dom;
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

