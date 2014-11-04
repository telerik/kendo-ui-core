namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Column for ASP.NET MVC
    /// </summary>
    public class TreeListColumnCommandFactory<T> : IHideObjectMembers where T : class
    {
        private readonly List<TreeListColumnCommand> container;

        public TreeListColumnCommandFactory(List<TreeListColumnCommand> container)
        {
            this.container = container;
        }

        public virtual TreeListColumnCommandBuilder<T> Add()
        {
            var item = new TreeListColumnCommand();

            container.Add(item);

            return new TreeListColumnCommandBuilder<T>(item);
        }
    }
}

