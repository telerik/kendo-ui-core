namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileButtonHtmlBuilder
    {
        private readonly MobileButton component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileButtonHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileButton component.</param>
        public MobileButtonHtmlBuilder(MobileButton component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileButton markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "button")
                .Attribute("id", component.Id);

            AddEventAttributes(html, component.Events);

            html.Text(component.Text);
            html.Attribute("href", component.Href);

            if (component.Target.HasValue())
            {
                html.Attribute("data-target", component.Target);
            }

            if (component.Icon.HasValue())
            {
                html.Attribute("data-icon", component.Icon);
            }

            if (component.Transition.HasValue())
            {
                html.Attribute("data-target", component.Transition);
            }

            if (component.Rel != MobileButtonRel.None)
            {
                html.Attribute("data-rel", component.Rel.ToString().ToLower());
                if (component.Rel == MobileButtonRel.ActionSheet)
                {
                    html.Attribute("data-actionsheet-context", component.ActionsheetContext);
                }
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

