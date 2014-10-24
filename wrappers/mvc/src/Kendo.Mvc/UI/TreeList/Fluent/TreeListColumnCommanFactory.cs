namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Column for ASP.NET MVC
    /// </summary>
    public class TreeListColumnCommanFactory : IHideObjectMembers
    {
        private readonly List<TreeListColumnComman> container;

        public TreeListColumnCommanFactory(List<TreeListColumnComman> container)
        {
            this.container = container;
        }

        public virtual TreeListColumnCommanBuilder Add()
        {
            var item = new TreeListColumnComman();

            container.Add(item);

            return new TreeListColumnCommanBuilder(item);
        }
    }
}

