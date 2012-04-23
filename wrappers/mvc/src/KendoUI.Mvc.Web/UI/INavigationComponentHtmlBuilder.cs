// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    public interface INavigationComponentHtmlBuilder<TItem>
        where TItem : NavigationItem<TItem>, IContentContainer
    {
        IHtmlNode Build();

        IHtmlNode ItemTag(TItem item);

        IHtmlNode ItemContentTag(TItem item);

        IHtmlNode ItemInnerContentTag(TItem item, bool hasAccessibleChildren);

        IHtmlNode ChildrenTag(TItem item); //from panelbar
    }
}
