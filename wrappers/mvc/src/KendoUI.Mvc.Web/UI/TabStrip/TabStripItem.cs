namespace KendoUI.Mvc.UI
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
                Guard.IsNotNullOrEmpty(value, "value");

                loadContentFromUrl = value;
                ContentHtmlAttributes.Clear();
                Content = null;
            }
        }
    }
}