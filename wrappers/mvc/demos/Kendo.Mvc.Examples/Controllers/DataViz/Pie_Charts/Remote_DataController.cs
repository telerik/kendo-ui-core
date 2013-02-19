using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Pie_ChartsController : Controller
    {
        public ActionResult Remote_Data()
        {
            ViewData["years"] = new[] { "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009" };
            return View();
        }

        private Dictionary<int, string> resolutionColors = new Dictionary<int, string>() { 
            {1,"#ccc"},
            {2,"#c00"}
        };

        public ActionResult _SpainElectricityProduction()
        {
            var screenResolutions = ChartDataRepository.WorldScreenResolution();
            var viewModel = new List<ScreenResolutionRemoteDataViewModel>();

            for (var i = 0; i < screenResolutions.Count; i++)
            {
                var data = screenResolutions[i];
                var model = new ScreenResolutionRemoteDataViewModel(data);
                if (model.Year == "2006" && model.Resolution == "1024x768")
                {
                    model.Color = resolutionColors[2];
                }
                else if (model.Resolution == "Other")
                {
                    model.Color = resolutionColors[1];
                }

                viewModel.Add(model);
            }

            return Json(viewModel);
        }
    }
}