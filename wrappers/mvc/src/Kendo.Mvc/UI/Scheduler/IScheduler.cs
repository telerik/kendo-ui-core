namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;
    using System.Collections.Generic;
    using System;

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

        DateTime? Date
        {
            get;
        }

        DateTime? StartTime
        {
            get;
        }

        DateTime? EndTime
        {
            get;
        }

        int? Height
        {
            get;
        }

        string EventTemplate
        {
            get;
        }

        string EventTemplateId
        {
            get;
        }

        IList<SchedulerResource<TModel>> Resources
        {
            get;
        }

        IList<SchedulerViewBase> Views
        {
            get;
        }
    }
}
