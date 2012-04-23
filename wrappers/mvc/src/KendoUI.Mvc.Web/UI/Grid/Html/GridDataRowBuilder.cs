// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using System.Collections.Generic;

    public class GridDataRowBuilder : IGridRowBuilder
    {
        private readonly object dataItem;

        private readonly IEnumerable<IGridDataCellBuilder> cellBuilders;

        public GridDataRowBuilder(object dataItem, IEnumerable<IGridDataCellBuilder> cellBuilders)
        {
            this.cellBuilders = cellBuilders;
            this.dataItem = dataItem;
        }

        public IHtmlNode CreateRow()
        {
            var tr = new HtmlElement("tr");

            foreach (var cellBuilder in cellBuilders)
            {
                var td = cellBuilder.CreateCell(dataItem);
                td.AppendTo(tr);
            }

            return tr;
        }
    }
}