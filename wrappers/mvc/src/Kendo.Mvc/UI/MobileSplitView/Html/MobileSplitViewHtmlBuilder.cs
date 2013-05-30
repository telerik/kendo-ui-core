namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileSplitViewHtmlBuilder
    {
        private readonly MobileSplitView component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileSplitViewHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileSplitView component.</param>
        public MobileSplitViewHtmlBuilder(MobileSplitView component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileSplitView markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "splitview")
                .Attribute("id", component.Id);

            AddEventAttributes(html, component.Events);
            
            html.Attribute("data-style", component.Style.ToString().ToLower());            

            foreach (var pane in component.Panes)
            {
                html.Children.Add(CreatePane(pane));
            }

            html.Attributes(component.HtmlAttributes);

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

        protected virtual IHtmlNode CreatePane(MobileSplitViewPane pane)
        {
            var dom = new HtmlElement("div")
                        .Attribute("id", pane.Id)
                        .Attribute("data-role", "pane")
                        .Attributes(pane.HtmlAttributes);

            if (pane.Content.HasValue())
            {
                pane.Content.Apply(dom);
            }

            foreach (var item in pane.ToJson())
            {
                dom.Attribute("data-" + item.Key, item.Value.ToString());
            }

            AddEventAttributes(dom, pane.Events);

            return dom;
        }
    }
}

