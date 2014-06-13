using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public class CashFlowData
    {
        public string Period { get; set; }
        public decimal? Amount { get; set; }
        public string Summary { get; set; }
    }
}