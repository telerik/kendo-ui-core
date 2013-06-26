namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using Infrastructure;

    /// <summary>
    /// Creates items for the <see cref="ChartAxisNotesFactory" />.
    /// </summary>
    public class ChartAxisNotesFactory<T> : IHideObjectMembers
        where T : struct
    {
        private readonly IList<ChartAxisNoteItem<T>> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNoteItemFactory"/> class.
        /// </summary>
        /// <param name="container">The contener of the item.</param>
        public ChartAxisNotesFactory(IList<ChartAxisNoteItem<T>> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a item.
        /// </summary>
        /// <returns></returns>
        public ChartAxisNoteItemBuilder<T> Add()
        {
            ChartAxisNoteItem<T> item = new ChartAxisNoteItem<T>();

            container.Add(item);

            return new ChartAxisNoteItemBuilder<T>(item);
        }
    }
}