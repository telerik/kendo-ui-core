// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    public class GridPopUpInsertRowBuilder : IGridRowBuilder
    {
        private readonly IGridEditFormBuilder editFormBuilder;

        private readonly IHtmlNode container;

        public GridPopUpInsertRowBuilder(IGridEditFormBuilder editFormBuilder, IHtmlNode container)
        {
            this.container = container;
            this.editFormBuilder = editFormBuilder;
        }

        public IHtmlNode CreateRow()
        {
            var form = editFormBuilder.CreateForm();

            form.AppendTo(container);

            return null;
        }
    }
}
