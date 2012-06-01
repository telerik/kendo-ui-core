namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using Infrastructure;

    /// <summary>
    /// Creates items for the <see cref="DropDownListItem" />.
    /// </summary>
    public class DropDownItemFactory : IHideObjectMembers
    {
        private readonly IList<DropDownListItem> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="DropDownItemFactory"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public DropDownItemFactory(IList<DropDownListItem> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a item.
        /// </summary>
        /// <returns></returns>
        public DropDownItemBuilder Add()
        {
            DropDownListItem item = new DropDownListItem();

            container.Add(item);

            return new DropDownItemBuilder(item);
        }
    }
}
