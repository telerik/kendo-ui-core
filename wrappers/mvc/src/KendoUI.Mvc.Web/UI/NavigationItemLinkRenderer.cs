// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI
{
    using System.Web.UI;

    using Extensions;

    public class NavigationItemLinkRenderer<T> where T : NavigationItem<T>
    {
        private readonly HtmlTextWriter writer;
        public NavigationItemLinkRenderer(HtmlTextWriter writer)
        {
            this.writer = writer;
        }

        public void Start(T item, string url)
        {
            if (item.Enabled)
            {
                item.LinkHtmlAttributes.Merge("href", url, false);
            }

            item.LinkHtmlAttributes.PrependInValue("class", " ", UIPrimitives.Link);
            writer.AddAttributes(item.LinkHtmlAttributes);
            writer.RenderBeginTag(HtmlTextWriterTag.A);
        }

        public void End()
        {
            writer.RenderEndTag();
        }
    }
}
