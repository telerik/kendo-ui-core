namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class GanttTask : IGanttTask
    {
        public int Id
        {
            get;
            set;
        }

        public int ParentId
        {
            get;
            set;
        }

        public string Title
        {
            get;
            set;
        }

        private DateTime start;
        public DateTime Start
        {
            get
            {
                return start;
            }
            set
            {
                start = value.ToUniversalTime();
            }
        }

        private DateTime end;
        public DateTime End
        {
            get
            {
                return end;
            }
            set
            {
                end = value.ToUniversalTime();
            }
        }

        public decimal PercentComplete
        {
            get;
            set;
        }

        public bool Summary
        {
            get;
            set;
        }

        public bool Expanded
        {
            get;
            set;
        }

        public int OrderId
        {
            get;
            set;
        }
    }
}
