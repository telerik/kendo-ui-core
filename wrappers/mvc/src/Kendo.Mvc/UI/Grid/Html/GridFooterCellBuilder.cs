namespace Kendo.Mvc.UI.Html
{
    using System.Collections.Generic;

    public class GridFooterCellBuilder : IGridCellBuilder
    {
        private readonly HtmlTemplate<GridAggregateResult> template;        
        private readonly IDictionary<string, object> htmlAttributes;

        
        public GridFooterCellBuilder(IDictionary<string, object> htmlAttributes, HtmlTemplate<GridAggregateResult> template)
        {
            this.htmlAttributes = htmlAttributes;
            this.template = template;

            Decorators = new List<IGridCellBuilderDecorator>();
        }

        public GridAggregateResult AggregateResults
        {
            get;
            set;
        }

        public virtual IHtmlNode CreateCell()
        {            
            var td = new HtmlElement("td").Attributes(htmlAttributes);

            if (template.HasValue())
            {
                template.Apply(AggregateResults, td);
            }
            else
            {
                td.Html("&nbsp;");
            }

            Decorate(td);

            return td;
        }

        public ICollection<IGridCellBuilderDecorator> Decorators
        {
            get;
            private set;
        }

        protected void Decorate(IHtmlNode td)
        {
            foreach (var decorator in Decorators)
            {
                decorator.Decorate(td);
            }
        }
    }
}
