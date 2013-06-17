namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    public interface IScheduler<TModel>
        where TModel : class
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

        IList<SchedulerResource<TModel>> Resources
        {
            get;
        }
    }
}
