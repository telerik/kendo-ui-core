namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using Infrastructure;

    /// <summary>
    /// Creates items for the <see cref="ChartAxisNotesFactory" />.
    /// </summary>
    public class ChartAxisNotesFactory : IHideObjectMembers
    {
        private readonly IList<ChartAxisNoteItem> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNoteItemFactory"/> class.
        /// </summary>
        /// <param name="container">The contener of the item.</param>
        public ChartAxisNotesFactory(IList<ChartAxisNoteItem> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a item.
        /// </summary>
        /// <returns></returns>
        public ChartAxisNoteItemBuilder Add()
        {
            ChartAxisNoteItem item = new ChartAxisNoteItem();

            container.Add(item);

            return new ChartAxisNoteItemBuilder(item);
        }
    }
}