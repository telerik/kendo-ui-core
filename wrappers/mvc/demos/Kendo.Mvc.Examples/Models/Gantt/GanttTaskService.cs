namespace Kendo.Mvc.Examples.Models.Gantt
{
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;
    using System;
    using System.Data;

    public class GanttTaskService
    {

        private SampleEntities db;

        public GanttTaskService(SampleEntities context)
        {
            db = context;
        }

        public GanttTaskService()
            : this(new SampleEntities())
        {
        }

        public virtual IQueryable<TaskViewModel> GetAll()
        {
            return db.GanttTasks.ToList().Select(task => new TaskViewModel
            {
                TaskID = task.ID,
                Title = task.Title,
                Start = DateTime.SpecifyKind(task.Start, DateTimeKind.Utc),
                End = DateTime.SpecifyKind(task.End, DateTimeKind.Utc),
                ParentID = task.ParentID,
                PercentComplete = task.PercentComplete,
                OrderID = task.OrderID,
                Expanded = task.Expanded,
                Summary = task.Summary
            }).AsQueryable();  
        }

        public virtual void Insert(TaskViewModel task, ModelStateDictionary modelState)
        {
            if (ValidateModel(task, modelState))
            {
                if (string.IsNullOrEmpty(task.Title))
                {
                    task.Title = "";
                }

                var entity = task.ToEntity();

                db.GanttTasks.Add(entity);
                db.SaveChanges();

                task.TaskID = entity.ID;
            }
        }

        public virtual void Update(TaskViewModel task, ModelStateDictionary modelState)
        {
            if (ValidateModel(task, modelState))
            {
                if (string.IsNullOrEmpty(task.Title))
                {
                    task.Title = "";
                }

                var entity = task.ToEntity();
                db.GanttTasks.Attach(entity);
                db.Entry(entity).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public virtual void Delete(TaskViewModel task, ModelStateDictionary modelState)
        {
            var entity = task.ToEntity();
            db.GanttTasks.Attach(entity);

            db.GanttTasks.Remove(entity);
            db.SaveChanges();
        }

        private bool ValidateModel(TaskViewModel appointment, ModelStateDictionary modelState)
        {
            if (appointment.Start > appointment.End)
            {
                modelState.AddModelError("errors", "End date must be greater or equal to Start date.");
                return false;
            }
            
            return true;
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}