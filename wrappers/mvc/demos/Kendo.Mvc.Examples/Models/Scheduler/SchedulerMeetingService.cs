namespace Kendo.Mvc.Examples.Models.Scheduler
{
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;
    using System.Data;
    using System;

    public class SchedulerMeetingService : ISchedulerEventService<MeetingViewModel>
    {
        private SampleEntities db;

        public SchedulerMeetingService(SampleEntities context)
        {
            db = context;
        }

        public SchedulerMeetingService()
            : this(new SampleEntities())
        {
        }

        public virtual IQueryable<MeetingViewModel> GetAll()
        {
            return db.Meetings.ToList().Select(meeting => new MeetingViewModel
                {
                    MeetingID = meeting.MeetingID,
                    Title = meeting.Title,
                    Start = DateTime.SpecifyKind(meeting.Start, DateTimeKind.Utc),
                    End = DateTime.SpecifyKind(meeting.End, DateTimeKind.Utc),
                    StartTimezone = meeting.StartTimezone,
                    EndTimezone = meeting.EndTimezone,
                    Description = meeting.Description,
                    IsAllDay = meeting.IsAllDay,
                    RoomID = meeting.RoomID,
                    RecurrenceRule = meeting.RecurrenceRule,
                    RecurrenceException = meeting.RecurrenceException,
                    RecurrenceID = meeting.RecurrenceID,
                    Atendees = meeting.MeetingAtendees.Select(m => m.AtendeeID).ToArray()
                }).AsQueryable();
        }

        public virtual void Insert(MeetingViewModel meeting, ModelStateDictionary modelState)
        {
            if (ValidateModel(meeting, modelState))
            {
                if (meeting.Atendees == null)
                {
                    meeting.Atendees = new int[0];
                }

                var entity = meeting.ToEntity();

                foreach (var atendeeId in meeting.Atendees)
                {
                    entity.MeetingAtendees.Add(new MeetingAtendee
                    {
                        AtendeeID = atendeeId
                    });
                }

                db.Meetings.Add(entity);
                db.SaveChanges();

                meeting.MeetingID = entity.MeetingID;
            }
        }

        public virtual void Update(MeetingViewModel meeting, ModelStateDictionary modelState)
        {
            if (ValidateModel(meeting, modelState))
            {
                if (meeting.Atendees == null)
                {
                    meeting.Atendees = new int[0];
                }

                var entity = meeting.ToEntity();

                db.Meetings.Attach(entity);

                var atendees = meeting.Atendees.Select(atendee => new MeetingAtendee
                {
                    AtendeeID = atendee
                });

                foreach (var atendee in atendees)
                {
                    db.MeetingAtendees.Attach(atendee);
                }

                entity.MeetingAtendees.Clear();

                foreach (var atendee in atendees)
                {
                    entity.MeetingAtendees.Add(atendee);
                }

                db.Entry(entity).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public virtual void Delete(MeetingViewModel meeting, ModelStateDictionary modelState)
        {
            if (meeting.Atendees == null)
            {
                meeting.Atendees = new int[0];
            }

            var entity = meeting.ToEntity();

            db.Meetings.Attach(entity);

            var atendees = meeting.Atendees.Select(atendee => new MeetingAtendee
            {
                AtendeeID = atendee
            });

            foreach (var atendee in atendees)
            {
                db.MeetingAtendees.Attach(atendee);
            }

            entity.MeetingAtendees.Clear();

            var recurrenceExceptions = db.Meetings.Where(m => m.RecurrenceID == entity.MeetingID);

            foreach (var recurrenceException in recurrenceExceptions)
            {
                db.Meetings.Remove(recurrenceException);
            }

            db.Meetings.Remove(entity);
            db.SaveChanges();
        }

        private bool ValidateModel(MeetingViewModel appointment, ModelStateDictionary modelState)
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