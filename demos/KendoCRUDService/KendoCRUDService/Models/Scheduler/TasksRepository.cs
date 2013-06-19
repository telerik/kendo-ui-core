using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KendoCRUDService.Models.EF;
using KendoCRUDService.Models;
using System.Data;

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
                        Start = task.Start,
                        End = task.End,
                        Description = task.Description,
                        IsAllDay = task.IsAllDay,
                        Recurrence = task.Recurrence,
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

                All().Insert(0, task);
            } 
            else 
            {
                using (var db = new SampleEntities())
                {
                    var entity = new Task
                    {
                        Title = task.Title,
                        Start = task.Start,
                        End = task.End,
                        Description = task.Description,
                        Recurrence = task.Recurrence,
                        RecurrenceException = task.RecurrenceException,
                        RecurrenceID = task.RecurrenceID,
                        IsAllDay = task.IsAllDay,
                        OwnerID = task.OwnerID
                    };

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
                    target.Start = task.Start;
                    target.End = task.End;
                    target.Description = task.Description;
                    target.IsAllDay = task.IsAllDay;
                    target.Recurrence = task.Recurrence;
                    target.RecurrenceException = task.RecurrenceException;
                    target.RecurrenceID = task.RecurrenceID;
                    target.OwnerID = task.OwnerID;
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = new Task
                    {
                        TaskID = task.TaskID,
                        Title = task.Title,
                        Start = task.Start,
                        End = task.End,
                        Description = task.Description,
                        Recurrence = task.Recurrence,
                        RecurrenceException = task.RecurrenceException,
                        RecurrenceID = task.RecurrenceID,
                        IsAllDay = task.IsAllDay,
                        OwnerID = task.OwnerID
                    };

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
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = new Task
                    {
                        TaskID = task.TaskID,
                        Title = task.Title,
                        Start = task.Start,
                        End = task.End,
                        Description = task.Description,
                        Recurrence = task.Recurrence,
                        RecurrenceException = task.RecurrenceException,
                        RecurrenceID = task.RecurrenceID,
                        IsAllDay = task.IsAllDay,
                        OwnerID = task.OwnerID
                    };

                    db.Tasks.Attach(entity);
                    db.Tasks.DeleteObject(entity);
                    db.SaveChanges();
                }
            }
        }
    }
}