namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents settings for bubbles representing negative values
    /// </summary>
    public class ChartNegativeValueSettings
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNegativeValueSettings" /> class.
        /// </summary>
        public ChartNegativeValueSettings()
        {
        }

        /// <summary>
        /// Gets or sets the negative value bubbles color.
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the markers visibility.
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new ChartNegativeValueSettingsSerializer(this);
        }
    }
}