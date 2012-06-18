using Kendo.Mvc.Resources;
namespace Kendo.Mvc.UI
{
    public class PagerMessages
    {
        public PagerMessages()
        {
            Of = Messages.Pager_Of;
            Display = Messages.Pager_Display;
        }

        public string Display { get; set; }

        public string Empty { get; set; }

        public string Page { get; set; }

        public string Of { get; set; }

        public string ItemsPerPage { get; set; }

        public string First { get; set; }

        public string Previous { get; set; }

        public string Next { get; set; }

        public string Last { get; set; }

        public string Refresh { get; set; }
    }
}