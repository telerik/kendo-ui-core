namespace Kendo.Mvc.UI.Html
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