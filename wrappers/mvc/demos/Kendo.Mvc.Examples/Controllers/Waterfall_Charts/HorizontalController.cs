using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Waterfall_ChartsController : Controller
    {
        public ActionResult Horizontal()
        {
            var data = new RequestDetail[] {
                new RequestDetail { Caption = "DNS Lookup", Elapsed = 20 },
                new RequestDetail { Caption = "Connecting", Elapsed = 122 },
                new RequestDetail { Caption = "Sending", Elapsed = 30 },
                new RequestDetail { Caption = "Waiting", Elapsed = 421 },
                new RequestDetail { Caption = "Receiving", Elapsed = 357 },
                new RequestDetail { Caption = "Total", Summary = "total" }
            };

            return View(data);
        }
    }
}