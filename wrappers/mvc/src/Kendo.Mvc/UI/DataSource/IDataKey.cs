namespace Kendo.Mvc.UI
{
    public interface IDataKey
    {
        string Name
        {
            get;
        }

        string RouteKey
        {
            get;
            set;
        }

        object GetValue(object dataItem);
    }
}
