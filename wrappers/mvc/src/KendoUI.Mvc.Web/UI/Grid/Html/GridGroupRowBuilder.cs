// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System;

    public class GridGroupRowBuilder : IGridRowBuilder
    {
        private readonly int colspan;

        private readonly Action<IHtmlNode> template;

        public GridGroupRowBuilder(Action<IHtmlNode> template, int colspan)
        {
            this.template = template;
            this.colspan = colspan;
        }

        public IHtmlNode CreateRow()
        {
            var tr = new HtmlElement("tr").AddClass("t-grouping-row");

            var td = new HtmlElement("td")
                .Attribute("colspan", colspan.ToString())
                .AppendTo(tr);

            AppendText(td);
            return tr;
        }

        private void AppendText(IHtmlNode td)
        {
            var p = new HtmlElement("p").AddClass(UIPrimitives.ResetStyle)
                .AppendTo(td);

            new HtmlElement("a").AddClass(UIPrimitives.Icon, "t-collapse")
                .Attribute("href", "#")
                .AppendTo(p);
            
            var fragment = new HtmlFragment().AppendTo(p);

            template(fragment);
        }
    }
}