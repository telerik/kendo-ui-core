namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents chart element spacing
    /// </summary>
    public class ChartSpacing
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartSpacing" /> class.
        /// </summary>
        /// <param name="margin">The spacing to be applied in all directions.</param>
        public ChartSpacing(int? margin)
        {
            Top = margin;
            Right = margin;
            Bottom = margin;
            Left = margin;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartSpacing" /> class.
        /// </summary>
        public ChartSpacing()
        {
        }

        /// <summary>
        /// Gets or sets the top spacing.
        /// </summary>
        public int? Top
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the right spacing.
        /// </summary>
        public int? Right
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the bottom spacing.
        /// </summary>
        public int? Bottom
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the left spacing.
        /// </summary>
        public int? Left
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new ChartSpacingSerializer(this);
        }
    }
}