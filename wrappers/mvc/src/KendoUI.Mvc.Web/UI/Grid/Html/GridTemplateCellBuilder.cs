// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    public class GridTemplateCellBuilder<T> : GridDataCellBuilderBase
        where T : class
    {
        private readonly HtmlTemplate<T> template;

        public GridTemplateCellBuilder(HtmlTemplate<T> template)
        {
            this.template = template;
        }

        protected override void AppendCellContent(IHtmlNode td, object dataItem)
        {
            template.Apply((T)dataItem, td);
        }
    }
}