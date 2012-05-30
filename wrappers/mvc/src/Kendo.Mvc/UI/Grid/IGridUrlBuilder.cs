namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;

    public interface IGridUrlBuilder
    {
        string SelectUrl();

        string SelectUrl(string key, object value);

        string SelectUrl(object dataItem);

        string CancelUrl(object dataItem);

        string EditUrl(object dataItem);
        
        string AddUrl(object dataItem);
        
        string InsertUrl(object dataItem);
        
        string UpdateUrl(object dataItem);

        string DeleteUrl(object dataItem);

        string Url(INavigatable settings);

        string Url(INavigatable settings, bool copy);

        string Url(INavigatable navigatable, Action<RouteValueDictionary> configurator);

        IEnumerable<IDataKey> GetDataKeys();

        IDictionary<string, object> GetState();
    }
}
