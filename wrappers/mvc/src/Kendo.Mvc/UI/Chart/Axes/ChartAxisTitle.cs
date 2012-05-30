namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the chart axis title
    /// </summary>
    public class ChartAxisTitle
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisTitle" /> class.
        /// </summary>
        public ChartAxisTitle()
        {
            Margin = new ChartSpacing();
            Padding = new ChartSpacing();
            Border = new ChartElementBorder();
        }

        /// <summary>
        /// Gets or sets the axis title text.
        /// </summary>
        public string Text
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the axis title font.
        /// </summary>
        /// <value>
        /// Specify a font in CSS format. For example "16px Arial,Helvetica,sans-serif".
        /// </value>
        public string Font
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the axis title position.
        /// </summary>
        /// <remarks>
        /// The default value is <see cref="ChartAxisTitlePosition.Center"/>
        /// </remarks>
        public ChartAxisTitlePosition? Position
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the axis title margin
        /// </summary>
        public ChartSpacing Margin
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the axis title background color
        /// </summary>
        public string Background
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the axis title text color
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the axis title padding
        /// </summary>
        public ChartSpacing Padding
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the axis title border
        /// </summary>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the axis title opacity.
        /// </summary>
        /// <value>
        /// The axis title opacity.
        /// </value>
        public double? Opacity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the axis title rrotation.
        /// </summary>
        /// <value>
        /// The label opacity.
        /// </value>
        public double? Rotation
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new ChartAxisTitleSerializer(this);
        }
    }
}