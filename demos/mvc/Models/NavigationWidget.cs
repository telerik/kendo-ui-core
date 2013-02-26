using System;
using System.Linq;

namespace Kendo.Models
{
    public class NavigationWidget : NavigationItem
    {
        public string Documentation { get; set; }
        public string ThumbnailUrl { get; set; }
        public string SpriteCssClass { get; set; }
        public bool Tablet { get; set; }
        public bool Expanded { get; set; }
        public bool New { get; set; }

        public NavigationExample[] Items { get; set; }
    }
}
