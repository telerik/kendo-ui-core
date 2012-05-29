namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring child tabstrip items.
    /// </summary>
    public class TabStripItemBuilder : ContentNavigationItemBuilder<TabStripItem, TabStripItemBuilder>, IHideObjectMembers
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="TabStripItemBuilder"/> class.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <param name="viewContext">The context of the View.</param>
        public TabStripItemBuilder(TabStripItem item, ViewContext viewContext)
            : base(item, viewContext)
        {
        }
    }
}