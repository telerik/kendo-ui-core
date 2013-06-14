namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    public interface IScheduler
    {
        DataSource DataSource
        {
            get;
        }

        IUrlGenerator UrlGenerator
        {
            get;
        }

        ViewContext ViewContext
        {
            get;
        }

        bool IsInClientTemplate
        {
            get;
        }
    }
}
