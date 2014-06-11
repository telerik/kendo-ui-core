using KendoCRUDService.Models.EF;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace KendoCRUDService.Models
{
    public static class GanttDependencyRepository
    {
        private static bool UpdateDatabase = false;
        
        public static IList<GanttDependencyModel> All()
        {
            var result = HttpContext.Current.Session["GanttDependencies"] as IList<GanttDependencyModel>;

            if (result == null || UpdateDatabase)
            {
                using (SampleEntities context = new SampleEntities())
                {
                    result = context.GanttDependencies.ToList()
                        .Select(p => new GanttDependencyModel
                        {
                            ID = p.ID,
                            PredecessorID = p.PredecessorID,
                            SuccessorID = p.SuccessorID,
                            Type = p.Type
                        })
                        .ToList();
                }

                HttpContext.Current.Session["GanttDependencies"] = result;
            }

            return result;
        }

        public static GanttDependencyModel One(Func<GanttDependencyModel, bool> predicate)
        {
            return All().FirstOrDefault(predicate);
        }

        public static IList<GanttDependencyModel> GetDependencies()
        {
            IList<GanttDependencyModel> result;

            using (SampleEntities context = new SampleEntities())
            {
                result = context.GanttDependencies.ToList()
                    .Select(p => new GanttDependencyModel
                    {
                        ID = p.ID,
                        PredecessorID = p.PredecessorID,
                        SuccessorID = p.SuccessorID,
                        Type = p.Type
                    })
                    .ToList();
            }

            return result;
        }

        public static void Insert(IEnumerable<GanttDependencyModel> dependencies)
        {
            foreach (var dependency in dependencies)
            {
                Insert(dependency);
            }
        }

        public static void Insert(GanttDependencyModel dependency)
        {
            if (!UpdateDatabase)
            {
                var first = All().OrderByDescending(e => e.ID).FirstOrDefault();

                var id = 0;

                if (first != null)
                {
                    id = first.ID;
                }

                dependency.ID = id + 1;

                All().Insert(0, dependency);
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = dependency.ToEntity();

                    db.GanttDependencies.AddObject(entity);

                    db.SaveChanges();

                    dependency.ID = entity.ID;
                }
            }
        }

        public static void Update(IEnumerable<GanttDependencyModel> dependencies)
        {
            foreach (var dependency in dependencies)
            {
                Update(dependency);
            }
        }

        public static void Update(GanttDependencyModel dependency)
        {
            if (!UpdateDatabase)
            {
                var target = One(e => e.ID == dependency.ID);

                if (target != null)
                {
                    target.Type = dependency.Type;
                    target.PredecessorID = dependency.PredecessorID;
                    target.SuccessorID = dependency.SuccessorID;
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = dependency.ToEntity();

                    db.GanttDependencies.Attach(entity);
                    db.ObjectStateManager.ChangeObjectState(entity, EntityState.Modified);

                    db.SaveChanges();
                }
            }
        }

        public static void Delete(IEnumerable<GanttDependencyModel> dependencies)
        {
            foreach (var dependency in dependencies)
            {
                Delete(dependency);
            }
        }

        public static void Delete(GanttDependencyModel dependency)
        {
            if (!UpdateDatabase)
            {
                var target = One(p => p.ID == dependency.ID);
                if (target != null)
                {
                    All().Remove(target);
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = dependency.ToEntity();
                    db.GanttDependencies.Attach(entity);

                    db.GanttDependencies.DeleteObject(entity);

                    db.SaveChanges();
                }
            }
        }
    }
}