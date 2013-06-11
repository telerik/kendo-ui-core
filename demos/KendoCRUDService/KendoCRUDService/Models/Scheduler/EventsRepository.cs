using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KendoCRUDService.Models
{
    public static class EventsRepository
    {
        public static IList<EventModel> All()
        {
            var result = HttpContext.Current.Session["Events"] as IList<EventModel>;

            if (result == null)
            {                
                HttpContext.Current.Session["Events"] = result = new List<EventModel>(){
                    new EventModel {
                        ID = 1,
                        Start = DateTime.SpecifyKind(DateTime.Today.AddHours(10), DateTimeKind.Utc),
                        End = DateTime.SpecifyKind(DateTime.Today.AddHours(14), DateTimeKind.Utc),
                        Timezone = "",
                        Title = "Event1"
                    }
                };






            }

            return result;
        }

        public static EventModel One(Func<EventModel, bool> predicate)
        {
            return All().FirstOrDefault(predicate);
        }

        public static void Insert(EventModel schedulerEvent)
        {
            var first = All().OrderByDescending(e => e.ID).FirstOrDefault();
            var id = 0;
            if (first != null)
            {
                id = first.ID;
            }            

            schedulerEvent.ID = id + 1;

            All().Insert(0, schedulerEvent);
        }        

        public static void Update(EventModel schedulerEvent)
        {
            var target = One(e => e.ID == schedulerEvent.ID);
            
            if (target != null)
            {
                target.Title = schedulerEvent.Title;
                target.Timezone = schedulerEvent.Timezone;
                target.Start = schedulerEvent.Start;
                target.End = schedulerEvent.End;
                target.Description = schedulerEvent.Description;
                target.IsAllDay = schedulerEvent.IsAllDay;                
            }
        }

        public static void Delete(EventModel schedulerEvent)
        {
            var target = One(p => p.ID == schedulerEvent.ID);
            if (target != null)
            {
                All().Remove(target);
            }
        }
    }
}