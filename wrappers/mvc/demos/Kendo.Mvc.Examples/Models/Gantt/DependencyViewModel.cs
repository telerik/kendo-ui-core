namespace Kendo.Mvc.Examples.Models.Gantt
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using Kendo.Mvc.UI;

    public class DependencyViewModel : IGanttDependency
    {
        public int DependencyID { get; set; }

        public int PredecessorID { get; set; }
        public int SuccessorID { get; set; }
        public int Type { get; set; }

        public GanttDependency ToEntity()
        {
            return new GanttDependency
            {
                ID = DependencyID,
                PredecessorID = PredecessorID,
                SuccessorID = SuccessorID,
                Type = Type
            };
        }
    }
}