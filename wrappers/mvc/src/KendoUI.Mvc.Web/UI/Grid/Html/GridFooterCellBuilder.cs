// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
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
