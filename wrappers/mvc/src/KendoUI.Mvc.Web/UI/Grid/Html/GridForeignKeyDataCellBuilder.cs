// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System.Linq;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.UI;

    public class GridForeignKeyDataCellBuilder<TModel, TValue> : GridDataCellBuilder<TModel, TValue>
        where TModel : class
    {
        public SelectList Data
        {
            get;
            set;
        }

        protected override void AppendCellContent(IHtmlNode td, object dataItem)
        {
            object value = null;

            if (dataItem != null && Data != null)
            {
                if (!Data.Any(i => i.Selected))
                {
                    var key = Value((TModel)dataItem);

                    if (key != null)
                    {
                        var selectedItem = Data.FirstOrDefault(i => i.Value.Equals(key.ToString()));
                        if (selectedItem != null)
                        {
                            value = selectedItem.Text;
                        }
                    }
                }
                else
                {
                    value = value = Data.First(i => i.Selected).Text;
                }
            }

            if (value != null)
            {
                SetCellContent(td, ApplyFormat(value));
            }
            else
            {
                td.Html("&nbsp;");
            }
        }             
    }
}
