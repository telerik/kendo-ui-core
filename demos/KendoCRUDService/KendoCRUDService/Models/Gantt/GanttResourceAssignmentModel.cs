using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KendoCRUDService.Models.EF;

namespace KendoCRUDService.Models
{
    public class GanttResourceAssignmentModel
    {
        public int ID { get; set; }
        public int TaskID { get; set; }
        public int ResourceID { get; set; }
        public decimal Units { get; set; }

        public GanttResourceAssignment ToEntity()
        {
            return new GanttResourceAssignment
            {
                ID = ID,
                TaskID = TaskID,
                ResourceID = ResourceID,
                Units = Units
            };
        }
    }
}