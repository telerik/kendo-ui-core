using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using KendoCRUDService.Models.EF;

namespace KendoCRUDService.Models
{
    public static class TasksRepository
    {
        private static bool UpdateDatabase = false;
        
        public static IList<TaskViewModel> All()
        {
            var result = HttpContext.Current.Session["Tasks"] as IList<TaskViewModel>;

            if (result == null || UpdateDatabase)
            {
                using (var db = new SampleEntities())
                {
                    result = db.Tasks.ToList().Select(task => new TaskViewModel
                    {
                        TaskID = task.TaskID,
                        Title = task.Title,
                        Start = DateTime.SpecifyKind(task.Start, DateTimeKind.Utc),
                        End = DateTime.SpecifyKind(task.End, DateTimeKind.Utc),
                        StartTimezone = task.StartTimezone,
                        EndTimezone = task.EndTimezone,
                        Description = task.Description,
                        IsAllDay = task.IsAllDay,
                        RecurrenceRule = task.RecurrenceRule,
                        RecurrenceException = task.RecurrenceException,
                        RecurrenceID = task.RecurrenceID,
                        OwnerID = task.OwnerID
                    }).ToList();
                }

                HttpContext.Current.Session["Tasks"] = result;
            }

            return result;
        }

        public static TaskViewModel One(Func<TaskViewModel, bool> predicate)
        {
            return All().FirstOrDefault(predicate);
        }

        public static void Insert(TaskViewModel task)
        {
            if (!UpdateDatabase)
            {
                var first = All().OrderByDescending(e => e.TaskID).FirstOrDefault();

                var id = 0;

                if (first != null)
                {
                    id = first.TaskID;
                }

                task.TaskID = id + 1;                
                task.ApplyTimezone();

                All().Insert(0, task);
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    task.ApplyTimezone();
                    var entity = task.ToEntity();

                    db.Tasks.AddObject(entity);
                    db.SaveChanges();

                    task.TaskID = entity.TaskID;
                }
            }
        }

        public static void Update(TaskViewModel task)
        {
            if (!UpdateDatabase)
            {
                var target = One(e => e.TaskID == task.TaskID);

                if (target != null)
                {
                    target.Title = task.Title;
                    target.Description = task.Description;
                    target.IsAllDay = task.IsAllDay;
                    target.RecurrenceRule = task.RecurrenceRule;
                    target.RecurrenceException = task.RecurrenceException;
                    target.RecurrenceID = task.RecurrenceID;
                    target.OwnerID = task.OwnerID;
                    target.StartTimezone = task.StartTimezone;
                    target.EndTimezone = task.EndTimezone;

                    target.ApplyTimezone();
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    task.ApplyTimezone();

                    var entity = task.ToEntity();
                    db.Tasks.Attach(entity);
                    db.ObjectStateManager.ChangeObjectState(entity, EntityState.Modified);
                    db.SaveChanges();
                }
            }
        }

        public static void Delete(TaskViewModel task)
        {
            if (!UpdateDatabase)
            {
                var target = One(p => p.TaskID == task.TaskID);
                if (target != null)
                {
                    All().Remove(target);

                    var recurrenceExceptions = All().Where(m => m.RecurrenceID == task.TaskID).ToList();

                    foreach (var recurrenceException in recurrenceExceptions)
                    {
                        All().Remove(recurrenceException);
                    }
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = task.ToEntity();
                    db.Tasks.Attach(entity);

                    var recurrenceExceptions = db.Tasks.Where(t => t.RecurrenceID == task.TaskID);

                    foreach (var recurrenceException in recurrenceExceptions)
                    {
                        db.Tasks.DeleteObject(recurrenceException);
                    }

                    db.Tasks.DeleteObject(entity);
                    db.SaveChanges();
                }
            }
        }
    }
}