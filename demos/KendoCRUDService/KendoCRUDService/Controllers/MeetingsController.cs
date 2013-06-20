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
            var meetings = this.DeserializeObject<IEnumerable<MeetingViewModel>>("models");

            if (meetings != null)
            {
                foreach (var meeting in meetings)
                {
                    MeetingsRepository.Update(meeting);
                }
            }

            return this.Jsonp(meetings);
        }
        
        public JsonResult Destroy()
        {
            var meetings = this.DeserializeObject<IEnumerable<MeetingViewModel>>("models");

            if (meetings != null)
            {
                foreach (var meeting in meetings)
                {
                    MeetingsRepository.Delete(meeting);
                }
            }

            return this.Jsonp(meetings);
        }
        
        public JsonResult Create()
        {
            var meetings = this.DeserializeObject<IEnumerable<MeetingViewModel>>("models");

            if (meetings != null)
            {
                foreach (var meeting in meetings)
                {
                    MeetingsRepository.Insert(meeting);
                }
            }

            return this.Jsonp(meetings);
        }

    }
}
