namespace Telerik.Web.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Infrastructure;

    /// <summary>
    /// Creates items for the <see cref="DropDownItem" />.
    /// </summary>
    public class DropDownItemFactory : IHideObjectMembers
    {
        private readonly IList<DropDownItem> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="DropDownItemFactory"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public DropDownItemFactory(IList<DropDownItem> container)
        {
            Guard.IsNotNull(container, "container");

            this.container = container;
        }

        /// <summary>
        /// Defines a item.
        /// </summary>
        /// <returns></returns>
        public DropDownItemBuilder Add()
        {
            DropDownItem item = new DropDownItem();

            container.Add(item);

            return new DropDownItemBuilder(item);
        }
    }
}
