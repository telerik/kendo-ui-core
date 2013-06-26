namespace Kendo.Mvc.UI
{
    public class ChartAxisNoteItem<T> : ChartNote
        where T : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisNoteItem" /> class.
        /// </summary>
        public ChartAxisNoteItem()
        {
        }

        /// <summary>
        /// Gets or sets the note value.
        /// </summary>
        public T? Value
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartAxisNoteItemSerializer<T>(this);
        }
    }
}