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
        //TODO: Model validation 
        //TODO: Are the naming conventions are respected ?
        //TODO: make this varaible virtual or just use another interface for the DAL?
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
            //TODO: Dynamic type name - the same way as in the DBContext
            return (IQueryable<T>)db.SchedulerEvents;
        }

        public virtual void Insert(T appointment, ModelStateDictionary modelState)
        {
            //TODO: Model validation
            db.SchedulerEvents.AddObject((T)appointment);
            db.SaveChanges();
        }

        public virtual void Update(T appointment, ModelStateDictionary modelState)
        {
            //TODO: Model validation
            db.SchedulerEvents.Attach(appointment);
            db.ObjectStateManager.ChangeObjectState(appointment, System.Data.EntityState.Modified);
            db.SaveChanges();
        }

        public virtual void Delete(T appointment, ModelStateDictionary modelState)
        {
            ////TODO: Model validation
            SchedulerEvent dbAppointment = db.SchedulerEvents.FirstOrDefault(a => a.Id == appointment.Id);
            if (dbAppointment != null)
            {
                db.SchedulerEvents.DeleteObject(dbAppointment);
                db.SaveChanges();
            }
        }        
    }
}