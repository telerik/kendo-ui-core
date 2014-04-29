namespace Kendo.Mvc.Examples.Controllers
{
    using System.Collections.Generic;
    using System.Data.Linq;
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.Examples.Models;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;
    using System;

    public partial class ListViewController : Controller
    {
        public ActionResult Custom_DataSource()
        {
            return View();
        }
    }
}
