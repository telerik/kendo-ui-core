namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    public interface IListView
    {
        IUrlGenerator UrlGenerator
        {
            get;
        }

        ViewContext ViewContext
        {
            get;
        }

        DataSource DataSource
        {
            get;
        }

        string ClientTemplateId
        {
            get;
            set;
        }
    }
}
