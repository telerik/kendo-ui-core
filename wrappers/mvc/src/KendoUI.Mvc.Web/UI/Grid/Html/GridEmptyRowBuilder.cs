// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Infrastructure;

    public class GridEmptyRowBuilder : IGridRowBuilder
    {
        public GridEmptyRowBuilder(int colspan, HtmlTemplate noRecordsTemplate)
        {
            Colspan = colspan;
            NoRecordsTemplate = noRecordsTemplate;
        }

        public int Colspan
        {
            get;
            private set;
        }

        public HtmlTemplate NoRecordsTemplate
        {
            get;
            set;
        }

        public IHtmlNode CreateRow()
        {
            var tr = new HtmlElement("tr").AddClass("t-no-data");

            var td = new HtmlElement("td")
                .Attribute("colspan", Colspan.ToString())
                .AppendTo(tr);

            NoRecordsTemplate.Apply(td);

            return tr;
        }
    }
}