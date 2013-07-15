namespace Kendo.Mvc.UI
{
    public class ChartAxisNoteItem : ChartNote
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
        public object Value
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartAxisNoteItemSerializer(this);
        }
    }
}