using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KendoCRUDService.Models;
using KendoCRUDService.Common;
using System.Web.Script.Serialization;

namespace KendoCRUDService.Controllers
{
    public class EventsController : Controller
    {
        public ActionResult Index()
        {
            return this.Jsonp(EventsRepository.All());
        }                       
        
        public JsonResult Update()
        {
            var models = this.DeserializeObject<IEnumerable<EventModel>>("models");
            if (models != null)
            {
                EventsRepository.Update(models.First());
            }
            return this.Jsonp(models);
        }
        
        public ActionResult Destroy()
        {
            var events = this.DeserializeObject<IEnumerable<EventModel>>("models");

            if (events != null)
            {
                EventsRepository.Delete(events.First());
            }
            return this.Jsonp(events);
        }
        
        public ActionResult Create()
        {
            var events = this.DeserializeObject<IEnumerable<EventModel>>("models");
            if (events != null)
            {
                EventsRepository.Insert(events.First());
            }
            return this.Jsonp(events);
        }
    }
}
