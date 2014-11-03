namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Gantt for ASP.NET MVC
    /// </summary>
    public class GanttToolbarFactory : IHideObjectMembers
    {
        private readonly List<GanttToolbar> container;

        public GanttToolbarFactory(List<GanttToolbar> container)
        {
            this.container = container;
        }

        public virtual GanttToolbarBuilder Add()
        {
            var item = new GanttToolbar();

            container.Add(item);

            return new GanttToolbarBuilder(item);
        }
    }
}

