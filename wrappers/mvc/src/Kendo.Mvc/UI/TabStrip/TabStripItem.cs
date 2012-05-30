namespace Kendo.Mvc.UI
{
    using Infrastructure;

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