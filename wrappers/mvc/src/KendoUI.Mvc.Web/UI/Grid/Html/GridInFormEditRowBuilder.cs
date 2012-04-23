// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.Infrastructure;

    public class GridInFormEditRowBuilder : IGridRowBuilder
    {
        private readonly int colspan;
        private readonly IGridEditFormBuilder editFormBuilder;

        public GridInFormEditRowBuilder(IGridEditFormBuilder editFormBuilder, int colspan)
        {
            this.editFormBuilder = editFormBuilder;
            this.colspan = colspan;
        }

        public IHtmlNode CreateRow()
        {
            var tr = new HtmlElement("tr");

            var td = new HtmlElement("td")
                            .Attribute("colspan", colspan.ToString());
            
            td.AppendTo(tr);
            
            var form = editFormBuilder.CreateForm();

            form.AppendTo(td);
            
            return tr;
        }
    }
}