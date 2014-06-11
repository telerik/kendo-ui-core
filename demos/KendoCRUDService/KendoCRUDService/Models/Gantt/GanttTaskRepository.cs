using KendoCRUDService.Models.EF;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace KendoCRUDService.Models
{
    public static class GanttTaskRepository
    {
        private static bool UpdateDatabase = false;
        
        public static IList<GanttTaskModel> All()
        {
            var result = HttpContext.Current.Session["GanttTasks"] as IList<GanttTaskModel>;

            if (result == null || UpdateDatabase)
            {
                using (SampleEntities context = new SampleEntities())
                {
                    result = context.GanttTasks.ToList()
                        .Select(p => new GanttTaskModel
                        {
                            ID = p.ID,
                            Title = p.Title,
                            OrderID = p.OrderID,
                            ParentID = p.ParentID,
                            Start = p.Start,
                            End = p.End,
                            PercentComplete = p.PercentComplete,
                            Summary = context.GanttTasks.Count(t => t.ParentID.Value == p.ID) > 0,
                            Expanded = p.Expanded
                        })
                        .ToList();
                }

                HttpContext.Current.Session["GanttTasks"] = result;
            }

            return result;
        }

        public static GanttTaskModel One(Func<GanttTaskModel, bool> predicate)
        {
            return All().FirstOrDefault(predicate);
        }

        public static void Insert(IEnumerable<GanttTaskModel> tasks)
        {
            foreach (var task in tasks)
            {
                Insert(task);
            }
        }

        public static void Insert(GanttTaskModel task)
        {
            if (!UpdateDatabase)
            {
                var first = All().OrderByDescending(e => e.ID).FirstOrDefault();

                var id = 0;

                if (first != null)
                {
                    id = first.ID;
                }

                task.ID = id + 1;

                All().Insert(0, task);
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = task.ToEntity();

                    db.GanttTasks.AddObject(entity);

                    db.SaveChanges();

                    task.ID = entity.ID;
                }
            }
        }

        public static void Update(IEnumerable<GanttTaskModel> tasks)
        {
            foreach (var task in tasks)
            {
                Update(task);
            }
        }

        public static void Update(GanttTaskModel task)
        {
            if (!UpdateDatabase)
            {
                var target = One(e => e.ID == task.ID);

                if (target != null)
                {
                    target.Title = task.Title;
                    target.Start = task.Start;
                    target.End = task.End;
                    target.PercentComplete = task.PercentComplete;
                    target.OrderID = task.OrderID;
                    target.ParentID = task.ParentID;
                    target.Summary = task.Summary;
                    target.Expanded = task.Expanded;
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = task.ToEntity();

                    db.GanttTasks.Attach(entity);
                    db.ObjectStateManager.ChangeObjectState(entity, EntityState.Modified);

                    db.SaveChanges();
                }
            }
        }

        public static void Delete(IEnumerable<GanttTaskModel> tasks)
        {
            foreach (var task in tasks)
            {
                Delete(task);
            }
        }

        public static void Delete(GanttTaskModel task)
        {
            if (!UpdateDatabase)
            {
                var target = One(p => p.ID == task.ID);
                if (target != null)
                {
                    All().Remove(target);
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = task.ToEntity();
                    db.GanttTasks.Attach(entity);

                    db.GanttTasks.DeleteObject(entity);

                    db.SaveChanges();
                }
            }
        }
    }
}