namespace Kendo.Mvc.UI
{
    public class ChartNoteLabel : ChartLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNoteLabel" /> class.
        /// </summary>
        public ChartNoteLabel()
        {
        }

        /// <summary>
        /// Gets or sets the label position.
        /// </summary>
        public ChartNoteLabelPosition? Position
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label text.
        /// </summary>
        public string Text
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartNoteLabelSerializer(this);
        }
    }
}