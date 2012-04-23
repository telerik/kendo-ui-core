// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    public class GridPopUpEditRowBuilder : IGridRowBuilder
    {
        private readonly IGridEditFormBuilder editFormBuilder;

        private readonly IHtmlNode container;

        private readonly IGridRowBuilder dataRowBuilder;

        public GridPopUpEditRowBuilder(IGridRowBuilder dataRowBuilder, IGridEditFormBuilder editFormBuilder, IHtmlNode container)
        {
            this.dataRowBuilder = dataRowBuilder;
            this.container = container;
            this.editFormBuilder = editFormBuilder;
        }

        public IHtmlNode CreateRow()
        {
            var form = editFormBuilder.CreateForm();

            form.AppendTo(container);

            return dataRowBuilder.CreateRow();
        }
    }
}
