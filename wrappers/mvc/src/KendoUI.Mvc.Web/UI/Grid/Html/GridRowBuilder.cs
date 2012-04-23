// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System.Collections.Generic;
    
    public class GridRowBuilder : IGridRowBuilder
    {
        private readonly IEnumerable<IGridCellBuilder> cellBuilders;

        public GridRowBuilder(IEnumerable<IGridCellBuilder> cellBuilders)
        {
            this.cellBuilders = cellBuilders;
        }

        public virtual IHtmlNode CreateRow()
        {
            var tr = new HtmlElement("tr");
            
            foreach (var cellBuilder in cellBuilders)
	        {
                var th = cellBuilder.CreateCell();

                th.AppendTo(tr);
	        }
            
            return tr;
        }
    }
}
