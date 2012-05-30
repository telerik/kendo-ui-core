namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    //public interface IGridDataKey
    //{
    //    string Name
    //    {
    //        get;
    //    }

    //    string RouteKey
    //    {
    //        get; 
    //        set;
    //    }

    //    object GetValue(object dataItem);
    //}
    
    public interface IGridDataKey<T> : IDataKey
            where T : class
    {

        string HiddenFieldHtml(HtmlHelper<T> htmlHelper);
    }
}
