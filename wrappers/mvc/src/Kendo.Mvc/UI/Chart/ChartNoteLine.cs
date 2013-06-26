namespace Kendo.Mvc.UI
{
    public class ChartNoteLine
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNoteLine" /> class.
        /// </summary>
        public ChartNoteLine()
        {
        }

        /// <summary>
        /// Defines the width of the line.
        /// </summary>
        public int? Width
        {
            get;
            set;
        }

        /// <summary>
        /// Defines the color of the line.
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Defines the length of the line.
        /// </summary>
        public int? Length
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartNoteLineSerializer(this);
        }
    }
}