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
        }

        DateTime? StartTime
        {
            get;
        }

        DateTime? EndTime
        {
            get;
        }

        SchedulerViewType Type
        {
            get;
        }

        SchedulerViewEditableSettings Editable
        {
            get;
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
