

namespace KendoUI.Mvc.UI
{
    using System.Web.Mvc;

    using Infrastructure;

    public class MenuItemFactory : IHideObjectMembers
    {
        private readonly INavigationItemContainer<MenuItem> container;
        private readonly ViewContext viewContext;

        public MenuItemFactory(INavigationItemContainer<MenuItem> container, ViewContext viewContext)
        {
            Guard.IsNotNull(container, "container");
            Guard.IsNotNull(viewContext, "viewContext");

            this.container = container;
            this.viewContext = viewContext;
        }

        public MenuItemBuilder Add()
        {
            MenuItem item = new MenuItem();

            container.Items.Add(item);

            return new MenuItemBuilder(item, viewContext);
        }
    }
}