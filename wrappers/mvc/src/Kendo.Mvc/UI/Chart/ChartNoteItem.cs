namespace Kendo.Mvc.UI
{
    public class ChartNoteItem : ChartNote
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNoteItem" /> class.
        /// </summary>
        public ChartNoteItem()
        {
        }

        /// <summary>
        /// Gets or sets the note value.
        /// </summary>
        public double? Value
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartNoteItemSerializer(this);
        }
    }
}