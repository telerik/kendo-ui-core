namespace Kendo.Mvc.UI
{
    using System;

    public interface IGanttTask
    {
        string Title
        {
            get;
            set;
        }

        DateTime Start
        {
            get;
            set;
        }

        DateTime End
        {
            get;
            set;
        }

        decimal PercentComplete
        {
            get;
            set;
        }

        bool Summary
        {
            get;
            set;
        }

        bool Expanded
        {
            get;
            set;
        }

        int OrderID
        {
            get;
            set;
        }
    }
}
