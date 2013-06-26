namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using System.Globalization;

    public class MobileScrollViewHtmlBuilder
    {
        private readonly MobileScrollView component;

        /// <summary>
        /// Initializes a new instance of the <see cref="MobileScrollViewHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MobileScrollView component.</param>
        public MobileScrollViewHtmlBuilder(MobileScrollView component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the MobileScrollView markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "scrollview")
                .Attribute("id", component.Id);            

            if (component.Duration != 300)
            {
                html.Attribute("data-duration", component.Duration.ToString());
            }

            if (component.Duration != 0)
            {
                html.Attribute("data-page", component.Page.ToString());
            }

            if (component.PageSize != 1)
            {
                html.Attribute("data-page-size", component.PageSize.ToString("r", CultureInfo.InvariantCulture));
            }

            if (component.BounceVelocityThreshold != 1.6)
            {
                html.Attribute("data-bounce-velocity-threshold", component.BounceVelocityThreshold.ToString("r", CultureInfo.InvariantCulture));
            }

            if (component.VelocityThreshold != 0.8)
            {
                html.Attribute("data-velocity-threshold", component.VelocityThreshold.ToString("r", CultureInfo.InvariantCulture));
            }

            AddEventAttributes(html, component.Events);

            if (!component.EnablePager)
            {
                html.Attribute("data-enable-pager", "false");
            }

            if (component.ContentHeight.HasValue())
            {
                html.Attribute("data-content-height", component.ContentHeight);
            }

            if (component.DataSource.Data != null || component.DataSource.Transport.Read.Url.HasValue())
            {
                html.Attribute("data-source", component.Initializer.Serialize(component.DataSource.ToJson()));

                if (!component.AutoBind)
                {
                    html.Attribute("data-auto-bind", "false");
                }

                if (component.TemplateId.HasValue())
                {
                    html.Attribute("data-template", component.TemplateId);
                }

                if (component.EmptyTemplateId.HasValue())
                {
                    html.Attribute("data-empty-template", component.EmptyTemplateId);
                }

                html.Attribute("data-items-per-page", component.ItemsPerPage.ToString());
            }

            html.Attributes(component.HtmlAttributes);            

            foreach (var item in component.Items)
            {
                html.Children.Add(CreateItemElement(item));
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

        protected virtual IHtmlNode CreateItemElement(MobileScrollViewItem item)
        {
            var dom = new HtmlElement(component.ItemTagName ?? "div");

            dom.Attributes(item.HtmlAttributes);

            if (component.FitItemPerPage)
            {
                dom.Attribute("data-role", "page");
            }

            item.Content.Apply(dom);

            return dom;
        }
    }
}

