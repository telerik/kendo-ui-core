namespace Kendo.Mvc.UI.Html
{
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;

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
                    value = Data.First(i => i.Selected).Text;
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
