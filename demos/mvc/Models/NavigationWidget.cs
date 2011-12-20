using System;
using System.Linq;

namespace Kendo.Models
{
    public class NavigationWidget
    {
        public string Text { get; set; }
        public string SpriteCssClass { get; set; }
        public bool Expanded { get; set; }
        public NavigationExample[] Items { get; set; }
    }
}