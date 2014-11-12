namespace Kendo.Mvc.Examples.Models.Gantt
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class ResourceAssignmentViewModel
    {
        public int ID { get; set; }
        public int TaskID { get; set; }
        public int ResourceID { get; set; }
        public decimal Units { get; set; }

        public GanttResourceAssignment ToEntity()
        {
            return new GanttResourceAssignment()
            {
                ID = ID,
                TaskID = TaskID,
                ResourceID = ResourceID,
                Units = Units
            };
        }
    }
}