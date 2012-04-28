namespace KendoUI.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using KendoUI.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Splitter.Panes"/>.
    /// </summary>
    public class SplitterPaneFactory : IHideObjectMembers
    {
        private readonly Splitter container;
        private readonly ViewContext viewContext;

        public SplitterPaneFactory(Splitter container, ViewContext viewContext)
        {
            Guard.IsNotNull(container, "container");
            Guard.IsNotNull(viewContext, "viewContext");

            this.container = container;
            this.viewContext = viewContext;
        }

        public virtual SplitterPaneBuilder Add()
        {
            SplitterPane item = new SplitterPane();

            container.Panes.Add(item);

            return new SplitterPaneBuilder(item, viewContext);
        }
    }
}
