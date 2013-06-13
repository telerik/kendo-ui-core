using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KendoCRUDService.Models;
using KendoCRUDService.Common;

namespace KendoCRUDService.Controllers
{
    public class MeetingsController : Controller
    {
        public ActionResult Index()
        {
            return this.Jsonp(MeetingsRepository.All());
        }                       
        
        public JsonResult Update()
        {
            var models = this.DeserializeObject<IEnumerable<MeetingViewModel>>("models");
            if (models != null)
            {
                MeetingsRepository.Update(models.First());
            }
            return this.Jsonp(models);
        }
        
        public JsonResult Destroy()
        {
            var events = this.DeserializeObject<IEnumerable<MeetingViewModel>>("models");

            if (events != null)
            {
                MeetingsRepository.Delete(events.First());
            }
            return this.Jsonp(events);
        }
        
        public JsonResult Create()
        {
            var events = this.DeserializeObject<IEnumerable<MeetingViewModel>>("models");
            if (events != null)
            {
                MeetingsRepository.Insert(events.First());
            }
            return this.Jsonp(events);
        }

    }
}
