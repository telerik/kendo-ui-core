using KendoCRUDService.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KendoCRUDService.Models
{
    public class GanttDependencyModel
    {
        public int ID { get; set; }
        public int PredecessorID { get; set; }
        public int SuccessorID { get; set; }
        public int Type { get; set; }


        public GanttDependency ToEntity()
        {
            return new GanttDependency
            {
                ID = ID,
                PredecessorID = PredecessorID,
                SuccessorID = SuccessorID,
                Type = Type
            };
        }
    }
}