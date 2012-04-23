// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
using System;

namespace Telerik.Web.Mvc.UI.Html
{
    public class GridTemplateRowBuilder : IGridRowBuilder
    {
        private readonly Action<IHtmlNode> template;

        private readonly int colspan;

        public GridTemplateRowBuilder(Action<IHtmlNode> template, int colspan)
        {
            this.colspan = colspan;
            this.template = template;
        }

        public IHtmlNode CreateRow()
        {
            var tr = new HtmlElement("tr");
            var td = new HtmlElement("td");

            td.Attribute("colspan", colspan.ToString());

            template(td);

            td.AppendTo(tr);

            return tr;
        }
    }
}
