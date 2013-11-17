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
                    Attendees = meeting.MeetingAttendees.Select(m => m.AttendeeID).ToArray()
                }).AsQueryable();
        }

        public virtual void Insert(MeetingViewModel meeting, ModelStateDictionary modelState)
        {
            if (ValidateModel(meeting, modelState))
            {
                if (meeting.Attendees == null)
                {
                    meeting.Attendees = new int[0];
                }

                if (string.IsNullOrEmpty(meeting.Title))
                {
                    meeting.Title = "";
                }

                var entity = meeting.ToEntity();

                foreach (var attendeeId in meeting.Attendees)
                {
                    entity.MeetingAttendees.Add(new MeetingAttendee
                    {
                        AttendeeID = attendeeId
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
                if (string.IsNullOrEmpty(meeting.Title))
                {
                    meeting.Title = "";
                }

                var entity = db.Meetings.Include("MeetingAttendees").FirstOrDefault(m => m.MeetingID == meeting.MeetingID);

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

                foreach (var meetingAttendee in entity.MeetingAttendees.ToList())
                {
                    entity.MeetingAttendees.Remove(meetingAttendee);
                }

                if (meeting.Attendees != null)
                {
                    foreach (var attendeeId in meeting.Attendees)
                    {
                        var meetingAttendee = new MeetingAttendee
                        {
                            MeetingID = entity.MeetingID,
                            AttendeeID = attendeeId
                        };

                        entity.MeetingAttendees.Add(meetingAttendee);
                    }
                }

                db.SaveChanges();
            }
        }

        public virtual void Delete(MeetingViewModel meeting, ModelStateDictionary modelState)
        {
            if (meeting.Attendees == null)
            {
                meeting.Attendees = new int[0];
            }

            var entity = meeting.ToEntity();

            db.Meetings.Attach(entity);

            var attendees = meeting.Attendees.Select(attendee => new MeetingAttendee
            {
                AttendeeID = attendee,
                MeetingID = entity.MeetingID
            });

            foreach (var attendee in attendees)
            {
                db.MeetingAttendees.Attach(attendee);
            }

            entity.MeetingAttendees.Clear();

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