namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Splitter.Panes"/>.
    /// </summary>
    public class SplitterPaneFactory : IHideObjectMembers
    {
        private readonly Splitter container;
        private readonly ViewContext viewContext;

        public SplitterPaneFactory(Splitter container, ViewContext viewContext)
        {

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
