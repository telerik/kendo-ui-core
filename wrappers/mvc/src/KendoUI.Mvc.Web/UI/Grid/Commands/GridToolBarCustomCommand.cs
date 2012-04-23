// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.UI.Html;

    public class GridToolBarCustomCommand<T> : GridCustomCommandBase where T : class
    {
        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var button = CreateButton<GridLinkButtonBuilder>(Text, CssClass());

            button.Url = delegate { return urlBuilder.Url(this); };

            return new[] { button };
        }
    }
}
