namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Gantt for ASP.NET MVC
    /// </summary>
    public class GanttColumnFactory : IHideObjectMembers
    {
        private readonly List<GanttColumn> container;

        public GanttColumnFactory(List<GanttColumn> container)
        {
            this.container = container;
        }

        public virtual GanttColumnBuilder Add()
        {
            var item = new GanttColumn();

            container.Add(item);

            return new GanttColumnBuilder(item);
        }
    }
}

