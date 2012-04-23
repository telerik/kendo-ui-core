// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.UI.Html;

    public class GridDeleteActionCommand : GridActionCommandBase
    {
        public override string Name
        {
            get { return "delete"; }
        }

        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var deleteButton = CreateButton<GridFormButtonBuilder>(Text ?? localization.Delete, UIPrimitives.Grid.Delete);

            deleteButton.Url = urlBuilder.DeleteUrl;

            deleteButton.HtmlHelper = htmlHelper;

            deleteButton.SpriteCssClass = "t-delete";

            return new[] { deleteButton };
        }
    }
}
