namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public interface ISchedulerView
    {
        string Title
        {
            get;
            set;
        }

        DateTime? StartTime
        {
            get;
            set;
        }

        DateTime? EndTime
        {
            get;
            set;
        }

        SchedulerViewType Type
        {
            get;
            set;
        }

        SchedulerViewEditableSettings Editable
        {
            get;
            set;
        }

        string EventTemplate
        {
            get;
            set;
        }

        string SelectedDateFormat
        {
            get;
            set;
        }
    }
}
