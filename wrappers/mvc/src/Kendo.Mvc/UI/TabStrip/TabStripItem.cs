namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents an item from Kendo TabStrip for ASP.NET MVC
    /// </summary>
    public class TabStripItem : NavigationItem<TabStripItem>, IAsyncContentContainer
    {
        private string loadContentFromUrl;

        public TabStripItem()
        {
        }

        public string ContentUrl
        {
            get
            {
                return loadContentFromUrl;
            }

            set
            {
                loadContentFromUrl = value;
                ContentHtmlAttributes.Clear();
                Content = null;
            }
        }
    }
}