namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    
    public abstract class GridDataCellBuilderBase : IGridDataCellBuilder
    {
        public GridDataCellBuilderBase()
        {
            Decorators = new List<IGridCellBuilderDecorator>();
            HtmlAttributes = new Dictionary<string, object>();
        }
        
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        }
        
        public IHtmlNode CreateCell(object dataItem)
        {
            Callback(dataItem);

            var td = new HtmlElement("td").Attributes(HtmlAttributes);

            if (Html.HasValue())
            {
                td.Html(Html);
            }
            else
            {
                AppendCellContent(td, dataItem);
            }

            foreach (var decorator in Decorators)
            {
                decorator.Decorate(td);
            }

            return td;
        }

        public ICollection<IGridCellBuilderDecorator> Decorators
        {
            get;
            private set;
        }

        protected abstract void AppendCellContent(IHtmlNode td, object dataItem);

        public Action<object> Callback
        {
            get;
            set;
        }
        
        public string Html
        {
            get;
            set;
        }
    }
}
