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

            AddEventAttributes(html, component.Events);

            if (component.DataSource.Data != null || component.DataSource.Transport.Read.Url.HasValue())
            {
                html.Attribute("data-source", component.Initializer.Serialize(component.DataSource.ToJson()));
            }
            else
            {
                BuildItems(html);
            }

            if (!component.AutoBind.GetValueOrDefault(true))
            {
                html.Attribute("data-auto-bind", "false");
            }

            if (component.TemplateId.HasValue())
            {
                html.Attribute("data-template", component.TemplateId);
            }

            if (component.EndlessScroll)
            {
                //TODO: component.EndlessScrollParameters 
                html.Attribute("data-endless-scroll", "true");

                if (component.ScrollTreshold.HasValue())
                {
                    html.Attribute("data-scroll-treshold", component.ScrollTreshold);
                }
            }

            if (component.FixedHeaders)
            {
                html.Attribute("data-fixed-headers", "true");
            }

            if (component.HeaderTemplateId.HasValue())
            {
                html.Attribute("data-header-template", component.HeaderTemplateId);
            }

            if (component.LoadMore)
            {
                html.Attribute("data-load-more", "true");
                if (component.LoadMoreText.HasValue())
                {
                    html.Attribute("data-load-more-text", component.LoadMoreText);
                }
                //TODO: component.LoadMoreParameters 
            }

            if (component.PullToRefresh)
            {
                html.Attribute("data-pull-to-refresh", "true");

                html.Attribute("data-append-on-refresh", component.AppendOnRefresh ? "true" : "false");

                if (component.PullTemplateId.HasValue())
                {
                    html.Attribute("data-pull-template", component.PullTemplateId);
                }

                if (component.RefreshTemplateId.HasValue())
                {
                    html.Attribute("data-refresh-template", component.RefreshTemplateId);
                }

                if (component.ReleaseTemplateId.HasValue())
                {
                    html.Attribute("data-release-template", component.ReleaseTemplateId);
                }
                //TODO: component.PullParameters
            }            

            if (component.Style.HasValue())
            {
                html.Attribute("data-style", component.Style);
            }

            if (component.Type.HasValue())
            {
                html.Attribute("data-type", component.Type);
            }

            if (component.Filterable.Enabled)
            {
                html.Attribute("data-filterable", component.Initializer.Serialize(component.Filterable.ToJson()));
            }

            html.Attributes(component.HtmlAttributes);

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

        protected void BuildItems(IHtmlNode html)
        {            
            component.Items.Each(item => item.WriteHtml(html));
        }
    }
}

