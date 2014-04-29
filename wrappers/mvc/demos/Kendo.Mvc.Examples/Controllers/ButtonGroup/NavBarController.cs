using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ButtonGroupController : Controller
    {       
        public ActionResult NavBar()
        {
            var data = new [] {
                  new { firstName = "Ann", lastName = "Devon", firstLetter = "A", lastLetter = "D", photo = Url.Content("~/content/mobile/overview/ann.jpg") },
                  new { firstName = "Annette", lastName = "Roulet", firstLetter = "A", lastLetter = "R", photo = Url.Content("~/content/mobile/overview/annette.jpg") },
                  new { firstName = "Antonio", lastName = "Moreno", firstLetter = "A", lastLetter = "M", photo = Url.Content("~/content/mobile/overview/antonio.jpg") },
                  new { firstName = "Carine", lastName = "Schmitt", firstLetter = "C", lastLetter = "S", photo = Url.Content("~/content/mobile/overview/carine.jpg") },
                  new { firstName = "Catherine", lastName = "Dewey", firstLetter = "C", lastLetter = "D", photo = Url.Content("~/content/mobile/overview/catherine.jpg") },
                  new { firstName = "Daniel", lastName = "Tonini", firstLetter = "D", lastLetter = "T", photo = Url.Content("~/content/mobile/overview/daniel.jpg") },
                  new { firstName = "Diego", lastName = "Roel", firstLetter = "D", lastLetter = "R", photo = Url.Content("~/content/mobile/overview/diego.jpg") },
                  new { firstName = "Eduardo", lastName = "Saavedra", firstLetter = "E", lastLetter = "S", photo = Url.Content("~/content/mobile/overview/eduardo.jpg") },
                  new { firstName = "Elizabeth", lastName = "Brown", firstLetter = "E", lastLetter = "B", photo = Url.Content("~/content/mobile/overview/elizabeth.jpg") },
                  new { firstName = "Felipe", lastName = "Izquierdo", firstLetter = "F", lastLetter = "I", photo = Url.Content("~/content/mobile/overview/felipe.jpg") },
                  new { firstName = "Fran", lastName = "Wilson", firstLetter = "F", lastLetter = "W", photo = Url.Content("~/content/mobile/overview/fran.jpg") },
                  new { firstName = "Francisco", lastName = "Chang", firstLetter = "F", lastLetter = "C", photo = Url.Content("~/content/mobile/overview/francisco.jpg") }
            };

            return View(data);
        }        
    }
}
