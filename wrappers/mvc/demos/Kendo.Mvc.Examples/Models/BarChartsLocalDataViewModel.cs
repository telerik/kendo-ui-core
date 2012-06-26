using System;
using System.Linq;

namespace Kendo.Mvc.Examples.Models
{
    public class BarChartsLocalDataViewModel : InternetUsers
    {
        public BarChartsLocalDataViewModel()
        {
        }

        public BarChartsLocalDataViewModel(InternetUsers internetUsers)
            : base(internetUsers.Year, internetUsers.Country, internetUsers.Value)
        {
        }

        public string Color { get; set; }
    }
}