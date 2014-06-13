using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Waterfall_ChartsController : Controller
    {
        public ActionResult Local_Data_Binding()
        {
            var model = new CashFlowData[] {
                new CashFlowData
                {
                    Period = "Beginning\nBalance",
                    Amount = 50000
                },
                new CashFlowData
                {
                    Period = "Jan",
                    Amount = 17000
                },
                new CashFlowData 
                {
                    Period = "Feb",
                    Amount = 14000
                },
                new CashFlowData
                {
                    Period = "Mar",
                    Amount = -12000
                },
                new CashFlowData
                {
                    Period = "Q1",
                    Summary = "runningTotal"
                },
                new CashFlowData
                {
                    Period = "Apr",
                    Amount = -22000
                },
                new CashFlowData
                {
                    Period = "May",
                    Amount = -18000
                },
                new CashFlowData
                {
                    Period = "Jun",
                    Amount = 10000
                },
                new CashFlowData
                {
                    Period = "Q2",
                    Summary = "runningTotal"
                },
                new CashFlowData
                {
                    Period = "Ending\nBalance",
                    Summary = "total"
                }
            };

            return View(model);
        }
    }
}