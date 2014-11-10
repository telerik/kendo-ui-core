using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KendoCRUDService.Models.EF;

namespace KendoCRUDService.Models
{
    public class GanttResourceModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }

        public GanttResource ToEntity()
        {
            return new GanttResource
            {
                ID = ID,
                Name = Name,
                Color = Color
            };
        }
    }
}