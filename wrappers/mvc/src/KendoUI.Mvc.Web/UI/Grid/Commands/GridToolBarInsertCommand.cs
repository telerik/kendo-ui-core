// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.UI.Html;

    public class GridToolBarInsertCommand<T> : GridToolBarCommandBase<T> where T : class
    {
        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var factory = new GridButtonFactory();
            var button = factory.CreateButton<GridLinkButtonBuilder>(ButtonType);

            button.CssClass += " " + UIPrimitives.Grid.Add;
            button.SpriteCssClass = "t-add";
            button.Text = Text ?? localization.AddNew;
            button.HtmlAttributes = HtmlAttributes;
            button.ImageHtmlAttributes = ImageHtmlAttributes;
            button.Url = urlBuilder.AddUrl;

            return new[] { button };
        }
    }
}
