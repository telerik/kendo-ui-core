namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo TabStrip for ASP.NET MVC
    /// </summary>
    public class TabStripItemFactory : IHideObjectMembers
    {
        private readonly INavigationItemContainer<TabStripItem> container;
        private readonly ViewContext viewContext;

        public TabStripItemFactory(INavigationItemContainer<TabStripItem> container, ViewContext viewContext)
        {

            this.container = container;
            this.viewContext = viewContext;
        }

        public virtual TabStripItemBuilder Add()
        {
            var item = new TabStripItem();

            container.Items.Add(item);

            return new TabStripItemBuilder(item, viewContext);
        }
    }
}