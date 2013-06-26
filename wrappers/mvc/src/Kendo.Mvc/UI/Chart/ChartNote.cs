namespace Kendo.Mvc.UI
{
    public class ChartNote
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNote" /> class.
        /// </summary>
        public ChartNote()
        {
            Icon = new ChartMarkers();
            Label = new ChartNoteLabel();
            Line = new ChartNoteLine();
        }

        /// <summary>
        /// Gets or sets the icon.
        /// </summary>
        public ChartMarkers Icon
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label.
        /// </summary>
        public ChartNoteLabel Label
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the line.
        /// </summary>
        public ChartNoteLine Line
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the note position.
        /// </summary>
        public ChartNotePosition? Position
        {
            get;
            set;
        }

        public virtual IChartSerializer CreateSerializer()
        {
            return new ChartNoteSerializer(this);
        }
    }
}