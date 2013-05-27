namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileSwitchHtmlBuilder
    {
        private readonly MobileSwitch component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileSwitchHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileSwitch component.</param>
        public MobileSwitchHtmlBuilder(MobileSwitch component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileSwitch markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "switch")
                .Attribute("id", component.Id);

            AddEventAttributes(html, component.Events);

            if (component.Checked)
            {
                html.Attribute("checked", "checked");
            }

            if (component.OffLabel.HasValue())
            {
                html.Attribute("data-off-label", component.OffLabel);
            }

            if (component.OnLabel.HasValue())
            {
                html.Attribute("data-on-label", component.OnLabel);
            }

            html.Attributes(component.HtmlAttributes);

            return html;
        }

        protected virtual IHtmlNode CreateElement()
        {
            return new HtmlElement("input", System.Web.Mvc.TagRenderMode.SelfClosing)
                        .Attribute("type", "checkbox");
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

