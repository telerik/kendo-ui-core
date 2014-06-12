using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public class RangeBarChartsLocalDataViewModel
    {
        public int FromA { get; set; }
        public int ToA { get; set; }
        public int FromB { get; set; }
        public int ToB { get; set; }
        public string Day { get; set; }

        public RangeBarChartsLocalDataViewModel()
        {
        }

        public RangeBarChartsLocalDataViewModel(int fromA, int toA, int fromB, int toB, string day)
        {
            this.FromA = fromA;
            this.ToA = toA;
            this.FromB = fromB;
            this.ToB = toB;
            this.Day = day;
        }
    }
}