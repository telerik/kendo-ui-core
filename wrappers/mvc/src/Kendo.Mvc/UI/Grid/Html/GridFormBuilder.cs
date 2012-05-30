namespace Kendo.Mvc.UI.Html
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    
    public class GridFormBuilder : IGridFormBuilder
    {
        private readonly IDictionary<string, object> htmlAttributes;

        public GridFormBuilder(IDictionary<string, object> htmlAttributes)
        {
            this.htmlAttributes = htmlAttributes;
        }

        public IHtmlNode CreateForm()
        {
            var form = new HtmlElement("form")
                        .Attribute("method", "post")
                        .Attributes(htmlAttributes);
                        
            return form;
        }
    }
}