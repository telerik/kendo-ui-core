// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    
    public class GridActionCellBuilder : GridDataCellBuilderBase
    {
        private readonly IEnumerable<Func<object, IHtmlNode>> builders;

        public GridActionCellBuilder(IEnumerable<Func<object, IHtmlNode>> builders)
        {
            this.builders = builders;
        }

        protected override void AppendCellContent(IHtmlNode td, object dataItem)
        {
            foreach (var builder in builders)
            {
                builder(dataItem).AppendTo(td);
            }
        }
    }
}