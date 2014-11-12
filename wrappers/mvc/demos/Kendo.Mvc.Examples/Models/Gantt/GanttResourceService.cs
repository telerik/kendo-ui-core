namespace Kendo.Mvc.Examples.Models.Gantt
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class GanttResourceService
    {
        private SampleEntities db;

        public GanttResourceService(SampleEntities context)
        {
            db = context;
        }

        public GanttResourceService()
            : this(new SampleEntities())
        {
        }

        public virtual IQueryable<ResourceViewModel> GetAll()
        {
            return db.GanttResources.ToList().Select(resource => new ResourceViewModel
            {
                ID = resource.ID,
                Name = resource.Name,
                Color = resource.Color
            }).AsQueryable();
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}