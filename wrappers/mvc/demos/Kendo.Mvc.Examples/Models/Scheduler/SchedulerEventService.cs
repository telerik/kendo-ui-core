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
        where T : SchedulerEvent
    {

        private SampleEntities db;

        public SchedulerEventService(SampleEntities context)
        {
            db = context;
        }

        public SchedulerEventService()
            : this(new SampleEntities())
        {
        }

        public virtual IQueryable<T> GetAll()
        {
            return (IQueryable<T>)db.SchedulerEvents;
        }

        public virtual void Insert(T appointment, ModelStateDictionary modelState)
        {
            if (ValidateModel(appointment, modelState))
            {
                db.SchedulerEvents.AddObject((T)appointment);
                db.SaveChanges();
            }
        }

        public virtual void Update(T appointment, ModelStateDictionary modelState)
        {
            if (ValidateModel(appointment, modelState))
            {
                db.SchedulerEvents.Attach(appointment);
                db.ObjectStateManager.ChangeObjectState(appointment, System.Data.EntityState.Modified);
                db.SaveChanges();
            }
        }

        public virtual void Delete(T appointment, ModelStateDictionary modelState)
        {
            SchedulerEvent dbAppointment = db.SchedulerEvents.FirstOrDefault(a => a.Id == appointment.Id);

            if (dbAppointment != null)
            {
                db.SchedulerEvents.DeleteObject(dbAppointment);
                db.SaveChanges();
            }
        }

        //TODO: better naming or refactor
        private bool ValidateModel(T appointment, ModelStateDictionary modelState)
        {
            if (appointment.Start > appointment.End)
            {
                modelState.AddModelError("errors", "End date must be greater or equal to Start date");
                return false;
            }

            return true;
        }
    }
}