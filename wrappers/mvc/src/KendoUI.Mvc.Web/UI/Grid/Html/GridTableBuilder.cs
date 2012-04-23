// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using System.Web.Mvc;
    
    public class GridTableBuilder : IGridTableBuilder
    {
        private readonly IEnumerable<GridColData> colsData;

        public GridTableBuilder(IEnumerable<GridColData> colsData)
        {
            this.colsData = colsData;
            Decorators = new List<IGridTableBuilderDecorator>();
        }

        public IHtmlNode CreateTable()
        {
            var table = new HtmlElement("table")
                            .Attribute("cellspacing", "0");

            var colgroup = new HtmlElement("colgroup");
            colgroup.AppendTo(table);

            foreach (var colData in colsData)
            {
                AppendCol(colgroup, colData.Width, colData.Hidden);
            }

            ApplyDecorators(table);

            return table;
        }

        private void AppendCol(HtmlElement colgroup, string columnWidth, bool hidden)
        {
            if (hidden) return;

            var col = new HtmlElement("col",TagRenderMode.SelfClosing);            

            if (columnWidth.HasValue())
            {
                col.Css("width", columnWidth);
            }
            
            col.AppendTo(colgroup);
        }

        private void ApplyDecorators(IHtmlNode table)
        {
            foreach (var decorator in Decorators)
            {
                decorator.Decorate(table);
            }
        }

        public ICollection<IGridTableBuilderDecorator> Decorators
        {
            get;
            private set;
        }
    }
}