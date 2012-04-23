// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
#if MVC2 || MVC3
namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;

    public class GridForeignKeyEditorForCellBuilder<TModel, TValue> : GridEditorForCellBuilder<TModel, TValue>
             where TModel : class
    {
        public Action<IDictionary<string, object>, object> AppendViewData
        {
            get;
            set;
        }

        protected override void AppendCellContent(IHtmlNode td, object dataItem)
        {
            AppendViewData(ViewContext.ViewData, dataItem);
            base.AppendCellContent(td, dataItem);
        }       
    }
}

#endif
