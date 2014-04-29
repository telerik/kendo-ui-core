using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Bar_ChartsController : Controller
    {
        private Dictionary<int, string> userColors = new Dictionary<int, string>() { 
            {1,"#ffd600"},
            {2,"#565656"}
        };

        public ActionResult Local_Data()
        {
            var blogComments = ChartDataRepository.BlogComments();
            var viewModel = new List<BarChartsLocalDataViewModel>();

            for (var i = 0; i < blogComments.Count; i++)
            {
                var data = blogComments[i];
                var model = new BarChartsLocalDataViewModel(data);
                if (model.Day > 14 && model.Day < 21)
                {
                    model.UserColor = userColors[2];
                }
                else
                {
                    model.UserColor = userColors[1];
                }

                viewModel.Add(model);
            }

            return View(viewModel);
        }
    }
}