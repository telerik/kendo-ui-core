namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileListViewHtmlBuilder<T> where T : class
    {
        private readonly MobileListView<T> component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileListViewHtmlBuilder{T}" /> class.
        /// </summary>
        /// <param name="component">The MobileListView component.</param>
        public MobileListViewHtmlBuilder(MobileListView<T> component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileListView markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "listview")
                .Attribute("id", component.Id);

            html.Attribute("data-source", component.Initializer.Serialize(component.DataSource.ToJson()));
            
            html.Attribute("data-auto-bind", component.AutoBind.GetValueOrDefault(true) ? "true" : "false");            

            if (component.Template.HasValue())
            {
                html.Attribute("data-template", component.Template);
            }

            return html;
        }

        protected virtual IHtmlNode CreateElement()
        {
            return new HtmlElement("ul");
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

