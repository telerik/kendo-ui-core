namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;

    using Infrastructure;

    public class PanelBarItemFactory : IHideObjectMembers
    {
        private readonly INavigationItemContainer<PanelBarItem> container;
        private readonly ViewContext viewContext;

        public PanelBarItemFactory(INavigationItemContainer<PanelBarItem> container, ViewContext viewContext)
        {

            this.container = container;
            this.viewContext = viewContext;
        }

        public virtual PanelBarItemBuilder Add()
        {
            PanelBarItem item = new PanelBarItem();

            container.Items.Add(item);

            return new PanelBarItemBuilder(item, viewContext);
        }
    }
}