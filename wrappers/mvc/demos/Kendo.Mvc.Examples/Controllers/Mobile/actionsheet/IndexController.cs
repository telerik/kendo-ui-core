using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ActionSheetController: Controller
    {       
        public ActionResult Index()
        {
            
            var inbox = new [] {
                new {
                    ID = 1,
                    From = "John Doe",
                    Subject = "Monday meeting",
                    Text = "Hi Tom, Since Monday I'll be out of office, I'm rescheduling the meeting for Tuesday.",
                    Time = "07:56"
                },
                new {
                    ID = 2,
                    From = "Sarah Connor",
                    Subject = "Regarding org chart changes",
                    Text = "Tom, I checked the new org chart last night and I have some reservations about it...",
                    Time = "08:22"
                },
                new {
                    ID = 3,
                    From = "Jane Parker",
                    Subject = "Your Costume is ready",
                    Text = "Hi mr. Sawyer, I'm sorry for the delay, your Halloween costume is ready. The bears...",
                    Time = "10:14"
                },
                new {
                    ID = 4,
                    From = "Joe Harper",
                    Subject = "I'm sorry, Tom",
                    Text = "Hi Tom, my aunt comes for a visit this Saturday, so I can't come back to St. Pete...",
                    Time = "10:14"
                },
                new {
                    ID = 5,
                    From = "Becky Thatcher",
                    Subject = "Out tonight?",
                    Text = "Honey, wanna go out tonight to grab some chicken? My weekly vouchers for cooking...",
                    Time = "10:14"
                }
            };

            ViewBag.InboxData = inbox;
           
            return View();
        }        
    }
}
