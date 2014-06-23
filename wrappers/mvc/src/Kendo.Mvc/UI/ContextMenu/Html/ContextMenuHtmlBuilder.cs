namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class ContextMenuHtmlBuilder
    {
        private readonly ContextMenu component;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContextMenuHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The ContextMenu component.</param>
        public ContextMenuHtmlBuilder(ContextMenu component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the ContextMenu markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "contextmenu")
                .Attribute("id", component.Id);

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

