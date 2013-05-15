namespace Kendo.Mvc.Examples.Models.Scheduler
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Reflection;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;

    public class SchedulerEventService<T> : ISchedulerEventService<T>
        where T : class, ISchedulerEvent
    {
        //TODO: Model validation 
        //TODO: Are the naming conventions are respected ?
        //TODO: make this varaible virtual or just use another interface for the DAL?
        private SampleContext<T> db;

        public SchedulerEventService(SampleContext<T> context)
        {
            db = context;
        }

        public SchedulerEventService()
            : this(new SampleContext<T>())
        {
        }

        public virtual IQueryable<T> GetAll()
        {
            //TODO: Dynamic type name - the same way as in the DBContext
            return (db.SchedulerEvents);
        }

        public virtual void Insert(T appointment, ModelStateDictionary modelState)
        {
            //TODO: Model validation
            db.SchedulerEvents.Add((T)appointment);
            db.SaveChanges();
        }

        public virtual void Update(T appointment, ModelStateDictionary modelState)
        {
            //TODO: Model validation
            db.Entry(appointment).State = System.Data.EntityState.Modified;
            db.SaveChanges();
        }

        public virtual void Delete(T appointment, ModelStateDictionary modelState)
        {
            //TODO: Model validation
            ExecuteFor(appointment, (entity) =>
            {
                db.SchedulerEvents.Remove(entity);
                db.SaveChanges();
            });
        }

        private void ExecuteFor(T entity, Action<T> action)
        {
            if (entity != null)
            {

                PropertyInfo modelKey =
                    typeof(T)
                    .GetProperties()
                    .FirstOrDefault(p => p.GetCustomAttributes(typeof(KeyAttribute), true).Length > 0);

                var value = modelKey != null ? modelKey.GetValue(entity, null) : null;

                if (value != null)
                {
                    entity = db.SchedulerEvents.Find(value);
                    action(entity);
                }
            }

        }
    }
}