namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    public interface IGridDataKey<T> : IDataKey
            where T : class
    {
        string HiddenFieldHtml(HtmlHelper<T> htmlHelper);
    }
}
