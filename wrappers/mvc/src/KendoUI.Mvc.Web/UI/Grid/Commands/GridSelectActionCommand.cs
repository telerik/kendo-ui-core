// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.UI.Html;

    public class GridSelectActionCommand : GridActionCommandBase
    {
        public override string Name
        {
            get { return "select"; }
        }

        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var button = CreateButton<GridLinkButtonBuilder>(Text ?? localization.Select, UIPrimitives.Grid.Select);
            
            button.SpriteCssClass = "t-select";
            button.Url = urlBuilder.SelectUrl;

            return new[] { button };
        }
    }
}
