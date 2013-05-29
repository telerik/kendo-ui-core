namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo MobileSplitView for ASP.NET MVC
    /// </summary>
    public class MobileSplitViewPaneFactory : IHideObjectMembers
    {
        private readonly List<MobileSplitViewPane> container;

        public MobileSplitViewPaneFactory(List<MobileSplitViewPane> container)
        {
            this.container = container;
        }

        public virtual MobileSplitViewPaneBuilder Add()
        {
            var item = new MobileSplitViewPane();

            container.Add(item);

            return new MobileSplitViewPaneBuilder(item);
        }
    }
}

