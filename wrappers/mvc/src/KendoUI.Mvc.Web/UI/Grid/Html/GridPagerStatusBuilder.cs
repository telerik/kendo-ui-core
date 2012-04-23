// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using Extensions;
    using Infrastructure;

    class GridPagerStatusBuilder : IGridPagerStatusBuilder
    {
        public IHtmlNode Create(GridPagerData pagerSection)
        {
            var firstItemInPage = pagerSection.Total > 0 ? (pagerSection.CurrentPage - 1) * pagerSection.PageSize + 1 : 0;
            var lastItemInPage = Math.Min(pagerSection.PageSize*pagerSection.CurrentPage, pagerSection.Total);

            var itemsText = pagerSection.DisplayingItemsText ?? string.Empty;
            return new HtmlElement("div")
                        .AddClass("t-status-text")
                        .Text(itemsText.FormatWith(firstItemInPage, lastItemInPage, pagerSection.Total));
        }
    }
}