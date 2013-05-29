namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobilePopOverHtmlBuilder
    {
        private readonly MobilePopOver component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobilePopOverHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobilePopOver component.</param>
        public MobilePopOverHtmlBuilder(MobilePopOver component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobilePopOver markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "popover")
                .Attribute("id", component.Id);

            AddEventAttributes(html, component.Events);

            html.Attribute("data-pane", component.Initializer.Serialize(component.Pane.ToJson()));

            html.Attribute("data-popup", component.Initializer.Serialize(component.Popup.ToJson()));

            html.Attributes(component.HtmlAttributes);

            if (component.Content.HasValue())
            {
                component.Content.Apply(html);
            }

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
        
    }
}

