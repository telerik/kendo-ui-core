using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KendoCRUDService.Models
{
    public class TaskViewModel
    {
        public int TaskID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Recurrence { get; set; }
        public int? RecurrenceID { get; set; }
        public string RecurrenceException { get; set; }
        public bool IsAllDay { get; set; }
        public int? OwnerID { get; set; }
    }
}