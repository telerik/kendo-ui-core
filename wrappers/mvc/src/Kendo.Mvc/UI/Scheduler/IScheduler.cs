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

        string AllDayEventTemplate
        {
            get;
        }

        string AllDayEventTemplateId
        {
            get;
        }

        bool AllDaySlot
        {
            get;
        }

        string DateHeaderTemplate
        {
            get;
        }

        string DateHeaderTemplateId
        {
            get;
        }

        int? MajorTick
        {
            get;
        }

        string MajorTimeHeaderTemplate
        {
            get;
        }

        string MajorTimeHeaderTemplateId
        {
            get;
        }

        int? MinorTickCount
        {
            get;
        }

        string MinorTimeHeaderTemplate
        {
            get;
        }

        string MinorTimeHeaderTemplateId
        {
            get;
        }

        string Timezone
        {
            get;
        }

        int? Width
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

        SchedulerMessages Messages
        {
            get;
        }
    }
}
