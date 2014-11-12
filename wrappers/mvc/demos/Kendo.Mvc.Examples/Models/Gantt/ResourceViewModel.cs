namespace Kendo.Mvc.Examples.Models.Gantt
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class ResourceViewModel
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