using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using KendoCRUDService.Models.EF;

namespace KendoCRUDService.Models
{
    public static class MeetingsRepository
    {
        private static bool UpdateDatabase = false;

        public static IList<MeetingViewModel> All()
        {
            var result = HttpContext.Current.Session["Meetings"] as IList<MeetingViewModel>;

            if (result == null || UpdateDatabase)
            {
                using (var db = new SampleEntities())
                {
                    result = db.Meetings.ToList().Select(meeting => new MeetingViewModel
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
                    }).ToList();
                }

                HttpContext.Current.Session["Meetings"] = result;
            }

            return result;
        }

        public static MeetingViewModel One(Func<MeetingViewModel, bool> predicate)
        {
            return All().FirstOrDefault(predicate);
        }

        public static void Insert(MeetingViewModel meeting)
        {
            if (!UpdateDatabase)
            {
                var first = All().OrderByDescending(e => e.MeetingID).FirstOrDefault();

                var id = 0;

                if (first != null)
                {
                    id = first.MeetingID;
                }                               

                meeting.MeetingID = id + 1;
                meeting.ApplyTimezone();

                All().Insert(0, meeting);
            } 
            else 
            {
                using (var db = new SampleEntities())
                {
                    if (meeting.Atendees == null)
                    {
                        meeting.Atendees = new int[0];
                    }

                    meeting.ApplyTimezone();

                    var entity = meeting.ToEntity();

                    foreach (var atendeeId in meeting.Atendees)
                    {
                        entity.MeetingAtendees.Add(new MeetingAtendee
                        {
                            AtendeeID = atendeeId
                        });
                    }

                    db.Meetings.AddObject(entity);
                    db.SaveChanges();

                    meeting.MeetingID = entity.MeetingID;
                }
            }
        }        

        public static void Update(MeetingViewModel meeting)
        {
            if (!UpdateDatabase)
            {
                var target = One(e => e.MeetingID == meeting.MeetingID);

                if (target != null)
                {
                    target.Title = meeting.Title;                    
                    target.Start = meeting.Start;
                    target.End = meeting.End;
                    target.StartTimezone = meeting.StartTimezone;
                    target.EndTimezone = meeting.EndTimezone;
                    target.Description = meeting.Description;
                    target.IsAllDay = meeting.IsAllDay;
                    target.RecurrenceRule = meeting.RecurrenceRule;
                    target.RoomID = meeting.RoomID;
                    target.RecurrenceException = meeting.RecurrenceException;
                    target.RecurrenceID = meeting.RecurrenceID;
                    target.Atendees = meeting.Atendees;

                    target.ApplyTimezone();
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    if (meeting.Atendees == null)
                    {
                        meeting.Atendees = new int[0];
                    }

                    meeting.ApplyTimezone();
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

                    db.ObjectStateManager.ChangeObjectState(entity, EntityState.Modified);
                    db.SaveChanges();
                }
            }
        }

        public static void Delete(MeetingViewModel meeting)
        {
            if (!UpdateDatabase)
            {
                var target = One(p => p.MeetingID == meeting.MeetingID);
                if (target != null)
                {
                    All().Remove(target);

                    var recurrenceExceptions = All().Where(m => m.RecurrenceID == meeting.MeetingID).ToList();

                    foreach (var recurrenceException in recurrenceExceptions)
                    {
                        All().Remove(recurrenceException);
                    }
                }
            }
            else
            {
                using (var db = new SampleEntities())
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
                        db.Meetings.DeleteObject(recurrenceException);
                    }

                    db.Meetings.DeleteObject(entity);
                    db.SaveChanges();
                }
            }
        }
    }
}