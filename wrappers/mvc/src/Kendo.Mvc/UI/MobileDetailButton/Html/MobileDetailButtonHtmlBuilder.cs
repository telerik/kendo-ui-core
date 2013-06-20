namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileDetailButtonHtmlBuilder
    {
        private readonly MobileDetailButton component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileDetailButtonHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileDetailButton component.</param>
        public MobileDetailButtonHtmlBuilder(MobileDetailButton component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileDetailButton markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "detailbutton")
                .Attribute("id", component.Id);

            AddEventAttributes(html, component.Events);

            if (component.Url.HasValue())
            {
                html.Attribute("href", component.Url);
            }

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
                html.Attribute("data-transition", component.Transition);
            }

            if (component.Align != MobileButtonAlign.Center)
            {
                html.Attribute("data-align", component.Align.ToString().ToLower());
            }

            if (component.Rel != MobileButtonRel.None)
            {
                html.Attribute("data-rel", component.Rel.ToString().ToLower());
                if (component.Rel == MobileButtonRel.ActionSheet)
                {
                    html.Attribute("data-actionsheet-context", component.ActionsheetContext);
                }
            }

            if (component.Style != MobileDetailButtonStyle.None)
            {
                html.Attribute("data-style", component.Style.ToString().ToLower());
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

