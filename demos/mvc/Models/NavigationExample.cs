using System;
using System.Linq;

namespace Kendo.Models
{
    public class NavigationExample : NavigationItem
    {
        public string Url { get; set; }
        public string Documentation { get; set; }
        public bool New { get; set; }
    }
}
