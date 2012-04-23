// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using Telerik.Web.Mvc.Infrastructure;

    public class GridSortableHeaderCellBuilder : GridHeaderCellBuilder
    {
        private readonly string url;

        private readonly ListSortDirection? sortDirection;
        private string sortedAscText;
        private string sortedDescText;

        public GridSortableHeaderCellBuilder(IDictionary<string, object> htmlAttributes, string url, ListSortDirection? sortDirection, string sortedAscText, string sortedDescText, Action<IHtmlNode> appendContent) :
            base(htmlAttributes, appendContent)
        {
            this.sortDirection = sortDirection;
            this.sortedAscText = sortedAscText;
            this.sortedDescText = sortedDescText;
            this.url = url;
        }

        public override IHtmlNode CreateCell()
        {
            var th = CreateContainer();

            var sortLink = new HtmlElement("a").AddClass(UIPrimitives.Link)
                                           .Attribute("href", url);

            sortLink.AppendTo(th);

            AppendContent(sortLink);

            AppendSortIcon(sortLink);

            Decorate(th);

            return th;
        }
        
        private void AppendSortIcon(IHtmlNode container)
        {
            if (sortDirection != null)
            {
                var sortIcon = new HtmlElement("span")
                                .AddClass(UIPrimitives.Icon)
                                .ToggleClass("t-arrow-up", sortDirection == ListSortDirection.Ascending)
                                .ToggleClass("t-arrow-down", sortDirection == ListSortDirection.Descending)
                                .Text(String.Format("({0})", sortDirection == ListSortDirection.Ascending ? sortedAscText : sortedDescText));

                sortIcon.AppendTo(container);
            }
        }
    }
}
