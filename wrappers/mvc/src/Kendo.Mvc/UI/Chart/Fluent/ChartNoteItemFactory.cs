namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using Infrastructure;

    /// <summary>
    /// Creates items for the <see cref="ChartNoteItemFactory" />.
    /// </summary>
    public class ChartNoteItemFactory : IHideObjectMembers
    {
        private readonly IList<ChartNoteItem> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNoteItemFactory"/> class.
        /// </summary>
        /// <param name="container">The contener of the item.</param>
        public ChartNoteItemFactory(IList<ChartNoteItem> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a item.
        /// </summary>
        /// <returns></returns>
        public ChartNoteItemBuilder Add()
        {
            ChartNoteItem item = new ChartNoteItem();

            container.Add(item);

            return new ChartNoteItemBuilder(item);
        }
    }
}
