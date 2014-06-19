namespace Kendo.Mvc.Examples.Models.Gantt
{
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;
    using System;
    using System.Data;

    public class GanttDependencyService
    {

        private SampleEntities db;

        public GanttDependencyService(SampleEntities context)
        {
            db = context;
        }

        public GanttDependencyService()
            : this(new SampleEntities())
        {
        }

        public virtual IQueryable<DependencyViewModel> GetAll()
        {
            return db.GanttDependencies.ToList().Select(dependency => new DependencyViewModel
            {
                DependencyID = dependency.ID,
                PredecessorID = dependency.PredecessorID,
                SuccessorID = dependency.SuccessorID,
                Type = dependency.Type
            }).AsQueryable();  
        }

        public virtual void Insert(DependencyViewModel dependency, ModelStateDictionary modelState)
        {
            var entity = dependency.ToEntity();

            db.GanttDependencies.Add(entity);
            db.SaveChanges();

            dependency.DependencyID = entity.ID;
        }

        public virtual void Update(DependencyViewModel dependency, ModelStateDictionary modelState)
        {
            var entity = dependency.ToEntity();
            db.GanttDependencies.Attach(entity);
            db.Entry(entity).State = EntityState.Modified;
            db.SaveChanges();
        }

        public virtual void Delete(DependencyViewModel dependency, ModelStateDictionary modelState)
        {
            var entity = dependency.ToEntity();
            db.GanttDependencies.Attach(entity);
            db.GanttDependencies.Remove(entity);
            db.SaveChanges();
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}