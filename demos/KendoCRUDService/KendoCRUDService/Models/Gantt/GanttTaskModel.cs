using KendoCRUDService.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KendoCRUDService.Models
{
    public class GanttTaskModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public int? ParentID { get; set; }
        public int OrderID { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public decimal PercentComplete { get; set; }
        public bool Summary { get; set; }
        public bool Expanded { get; set; }


        public GanttTask ToEntity()
        {
            return new GanttTask
            {
                ID = ID,
                Title = Title,
                OrderID = OrderID,
                ParentID = ParentID,
                Start = Start,
                End = End,
                PercentComplete = PercentComplete,
                Expanded = Expanded
            };
        }
    }
}