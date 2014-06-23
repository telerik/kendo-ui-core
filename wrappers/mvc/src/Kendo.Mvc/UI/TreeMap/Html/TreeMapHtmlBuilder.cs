namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class TreeMapHtmlBuilder
    {
        private readonly TreeMap component;

        /// <summary>
        /// Initializes a new instance of the <see cref="TreeMapHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The TreeMap component.</param>
        public TreeMapHtmlBuilder(TreeMap component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the TreeMap markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "treemap")
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

