using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public class DonutChartsRemoteDataViewModel : ScreenResolution
    {
        public DonutChartsRemoteDataViewModel()
        {
        }

        public DonutChartsRemoteDataViewModel(ScreenResolution screenResolution)
            : base(screenResolution.Year, screenResolution.Resolution, screenResolution.Share, screenResolution.VisibleInLegend, screenResolution.OrderNumber)
        {
        }

        public string Color { get; set; }
    }
}