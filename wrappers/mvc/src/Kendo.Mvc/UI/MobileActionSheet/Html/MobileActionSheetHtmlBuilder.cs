namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileActionSheetHtmlBuilder
    {
        private readonly MobileActionSheet component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileActionSheetHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileActionSheet component.</param>
        public MobileActionSheetHtmlBuilder(MobileActionSheet component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileActionSheet markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "actionsheet")
                .Attribute("id", component.Id);

            AddEventAttributes(html, component.Events);

            html.Attribute("data-cancel", component.Cancel);

            html.Attribute("data-popup", component.Initializer.Serialize(component.Popup.ToJson()));

            html.Children.Add(new HtmlElement("li").AddClass("km-actionsheet-title").Text(component.Title));

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

        protected virtual IHtmlNode CreateItem(MobileActionSheetItem item)
        {
            var dom = new HtmlElement("li");

            dom.Children.Add(new HtmlElement("a")
                        .Text(item.Text)
                        .Attributes(item.HtmlAttributes)
                        .Attribute("href", "#")
                        .Attribute("data-action", item.Action));

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

