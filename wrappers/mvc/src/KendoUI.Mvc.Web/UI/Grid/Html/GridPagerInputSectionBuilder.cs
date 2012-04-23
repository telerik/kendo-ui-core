// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System.Web.Mvc;

    class GridPagerInputSectionBuilder : IGridPagerInputBuilder
    {
        public IHtmlNode Create(GridPagerData section)
        {
            var div = new HtmlElement("div")
                .AddClass("t-page-i-of-n");

            var page = new LiteralNode(section.PageText);

            page.AppendTo(div);

            var input = new HtmlElement("input", TagRenderMode.SelfClosing)
                .Attribute("type", "text")
                .Attribute("value", section.CurrentPage.ToString());

            input.AppendTo(div);

            var of = new LiteralNode(string.Format(section.PageOfText, section.PageCount));

            of.AppendTo(div);

            return div;
        }
    }
}