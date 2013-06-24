namespace Kendo.Mvc.Examples.Models.Scheduler
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Data.Linq;
    using System.Reflection;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;
    using System.Data;

    public class SchedulerEventService<T> : ISchedulerEventService<T>
        where T : Task
    {

        private SchedulerEntities db;

        public SchedulerEventService(SchedulerEntities context)
        {
            db = context;
        }

        public SchedulerEventService()
            : this(new SchedulerEntities())
        {
        }

        public virtual IQueryable<T> GetAll()
        {
            return (IQueryable<T>)db.Tasks;      
        }

        public virtual void Insert(T appointment, ModelStateDictionary modelState)
        {
            if (ValidateModel(appointment, modelState))
            {
                db.Tasks.AddObject((T)appointment);
                db.SaveChanges();
            }
        }

        public virtual void Update(T appointment, ModelStateDictionary modelState)
        {
            if (ValidateModel(appointment, modelState))
            {
                Task dbAppointment;
                if (TryFindRecord(appointment, modelState, out dbAppointment))
                {
                    db.Tasks.Attach(dbAppointment);
                    db.Tasks.ApplyCurrentValues(appointment);
                    db.SaveChanges();
                }
            }
        }

        public virtual void Delete(T appointment, ModelStateDictionary modelState)
        {
            Task dbAppointment;
            if (TryFindRecord(appointment, modelState, out dbAppointment))
            {
                db.Tasks.DeleteObject(dbAppointment);
                db.SaveChanges();
            }
        }

        //TODO: better naming or refactor
        private bool TryFindRecord(T appointment, ModelStateDictionary modelState, out Task dbAppointment)
        {
            dbAppointment = db.Tasks.SingleOrDefault(a => a.TaskID == appointment.TaskID);
            if (dbAppointment != null)
            {
                return true;
            }
            else
            {
                modelState.AddModelError("error", "Record was not found.");
                return false;
            }
        }

        //TODO: better naming or refactor
        private bool ValidateModel(T appointment, ModelStateDictionary modelState)
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