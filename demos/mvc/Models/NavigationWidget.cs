using System;
using System.Linq;
using System.Collections.Generic;

namespace Kendo.Models
{
    public class NavigationWidget : NavigationItem
    {
        public string Api { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Category { get; set; }
        public string SpriteCssClass { get; set; }
        public bool Tablet { get; set; }
        public bool Expanded { get; set; }
        public bool New { get; set; }
        public bool Beta { get; set; }
        public bool Pro { get; set; }
        public bool Mobile { get; set; }
        public IDictionary<string, string> Documentation { get; set; }
        public IDictionary<string, string> Forum { get; set; }
        public IDictionary<string, string> CodeLibrary { get; set; }

        public NavigationExample[] Items { get; set; }
    }
}
