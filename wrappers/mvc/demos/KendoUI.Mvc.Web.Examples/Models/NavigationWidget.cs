using System;
using System.Linq;

namespace KendoUI.Mvc.Web.Examples.Models
{
    public class NavigationWidget
    {
        public NavigationWidget()
        {
            Offline = new OfflineFilter();
        }

        public string Name { get; set; }
        public string Text { get; set; }
        public string Documentation { get; set; }
        public string ThumbnailUrl { get; set; }
        public string SpriteCssClass { get; set; }
        public bool Expanded { get; set; }
        public OfflineFilter Offline { get; set; }
        public NavigationExample[] Items { get; set; }
    }
}
