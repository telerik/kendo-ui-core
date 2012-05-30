namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the options of the pie chart connectors
    /// </summary>
    public class ChartPieConnectors
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPieConnectors" /> class.
        /// </summary>
        public ChartPieConnectors()
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
        /// Defines the padding of the line.
        /// </summary>
        public int? Padding
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new ChartPieConnectorsSerializer(this);
        }
    }
}