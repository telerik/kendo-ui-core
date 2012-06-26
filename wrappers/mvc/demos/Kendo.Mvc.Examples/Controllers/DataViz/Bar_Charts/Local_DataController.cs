using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Bar_ChartsController : Controller
    {
        private const string HighlightColor = "#aaa";

        public ActionResult Local_Data()
        {
            var internetUsers = ChartDataRepository.InternetUsers();
            var viewModel = new List<BarChartsLocalDataViewModel>();

            for (var i = 1; i < internetUsers.Count; i++)
            {
                var data = internetUsers[i];
                var model = new BarChartsLocalDataViewModel(data);
                if (internetUsers[i - 1].Value > data.Value)
                {
                    // Highlight years with less users than the previous year
                    model.Color = HighlightColor;
                }

                viewModel.Add(model);
            }

            return View(viewModel);
        }
    }
}