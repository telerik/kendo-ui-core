namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using System.ComponentModel.DataAnnotations;

    public class SchedulerEventServiceDouble<T> : ISchedulerEventService<T>
        where T : SchedulerEventDouble
    {
        private List<T> db;

        public SchedulerEventServiceDouble(List<T> context)
        {
            db = context;
        }

        public SchedulerEventServiceDouble()
            : this(new List<T>())
        {
        }

        public virtual IQueryable<T> GetAll()
        {
            return (db.AsQueryable());
        }

        public virtual void Insert(T appointment, ModelStateDictionary modelState)
        {
            if (appointment.Start >= appointment.End)
            {
                modelState.AddModelError("errors", "Start must be greater than End!");
                return;
            }

            db.Add((T)appointment);
        }

        public virtual void Update(T appointment, ModelStateDictionary modelState)
        {
            if (appointment.Start >= appointment.End)
            {
                modelState.AddModelError("errors", "Start must be greater than End!");
                return;
            }

            T dbRecord = db.Find(a => a.Id == appointment.Id);

            if (dbRecord != null)
            {
                dbRecord.Title = appointment.Title;
                dbRecord.Description = appointment.Description;
                dbRecord.Start = appointment.Start;
                dbRecord.End = appointment.End;
                dbRecord.AllDayEvent = appointment.AllDayEvent;
                dbRecord.RecurrenceRules = appointment.RecurrenceRules;
            }
            else
            {
                modelState.AddModelError("errors", "Record not found!");
            }
        }

        public virtual void Delete(T appointment, ModelStateDictionary modelState)
        {
            T dbRecord = db.Find(a => a.Id == appointment.Id);
            if (dbRecord != null)
            {
                db.Remove(dbRecord);
            }
            else
            {
                modelState.AddModelError("errors", "Record not found!");
            }
        }
    }
}
