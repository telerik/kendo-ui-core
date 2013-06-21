namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public interface ISchedulerEditableSettings
    {
        bool Create
        {
            get;
            set;
        }

        bool Destroy
        {
            get;
            set;
        }

        bool Update
        {
            get;
            set;
        }

        bool Enable
        {
            get;
            set;
        }
    }
}
