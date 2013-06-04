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
                  new { firstName = "Ann", lastName = "Devon", firstLetter = "A", lastLetter = "D", photo = "/content/mobilethemebuilder/images/ann.jpg" },
                  new { firstName = "Annette", lastName = "Roulet", firstLetter = "A", lastLetter = "R", photo = "/content/mobilethemebuilder/images/annette.jpg" },
                  new { firstName = "Antonio", lastName = "Moreno", firstLetter = "A", lastLetter = "M", photo = "/content/mobilethemebuilder/images/antonio.jpg" },
                  new { firstName = "Carine", lastName = "Schmitt", firstLetter = "C", lastLetter = "S", photo = "/content/mobilethemebuilder/images/carine.jpg" },
                  new { firstName = "Catherine", lastName = "Dewey", firstLetter = "C", lastLetter = "D", photo = "/content/mobilethemebuilder/images/catherine.jpg" },
                  new { firstName = "Daniel", lastName = "Tonini", firstLetter = "D", lastLetter = "T", photo = "/content/mobilethemebuilder/images/daniel.jpg" },
                  new { firstName = "Diego", lastName = "Roel", firstLetter = "D", lastLetter = "R", photo = "/content/mobilethemebuilder/images/diego.jpg" },
                  new { firstName = "Eduardo", lastName = "Saavedra", firstLetter = "E", lastLetter = "S", photo = "/content/mobilethemebuilder/images/eduardo.jpg" },
                  new { firstName = "Elizabeth", lastName = "Brown", firstLetter = "E", lastLetter = "B", photo = "/content/mobilethemebuilder/images/elizabeth.jpg" },
                  new { firstName = "Felipe", lastName = "Izquierdo", firstLetter = "F", lastLetter = "I", photo = "/content/mobilethemebuilder/images/felipe.jpg" },
                  new { firstName = "Fran", lastName = "Wilson", firstLetter = "F", lastLetter = "W", photo = "/content/mobilethemebuilder/images/fran.jpg" },
                  new { firstName = "Francisco", lastName = "Chang", firstLetter = "F", lastLetter = "C", photo = "/content/mobilethemebuilder/images/francisco.jpg" }
            };

            return View(data);
        }        
    }
}
