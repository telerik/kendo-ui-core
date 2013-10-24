namespace Kendo.Mvc.Examples.Models.Scheduler
{
    using Kendo.Mvc.UI;
    using System;
    using System.Linq;
    using System.Web.Mvc;

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
                var entity = db.Meetings.Include("MeetingAtendees").FirstOrDefault(m => m.MeetingID == meeting.MeetingID);

                entity.Title = meeting.Title;
                entity.Start = meeting.Start;
                entity.End = meeting.End;
                entity.Description = meeting.Description;
                entity.IsAllDay = meeting.IsAllDay;
                entity.RoomID = meeting.RoomID;
                entity.RecurrenceID = meeting.RecurrenceID;
                entity.RecurrenceRule = meeting.RecurrenceRule;
                entity.RecurrenceException = meeting.RecurrenceException;
                entity.StartTimezone = meeting.StartTimezone;
                entity.EndTimezone = meeting.EndTimezone;

                foreach (var meetingAttendee in entity.MeetingAtendees.ToList())
                {
                    entity.MeetingAtendees.Remove(meetingAttendee);
                }

                if (meeting.Atendees != null)
                {
                    foreach (var atendeeId in meeting.Atendees)
                    {
                        var meetingAttendee = new MeetingAtendee
                        {
                            MeetingID = entity.MeetingID,
                            AtendeeID = atendeeId
                        };

                        entity.MeetingAtendees.Add(meetingAttendee);
                    }
                }

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
                AtendeeID = atendee,
                MeetingID = entity.MeetingID
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