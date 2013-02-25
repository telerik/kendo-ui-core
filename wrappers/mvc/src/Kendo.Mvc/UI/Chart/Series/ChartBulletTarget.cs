namespace Kendo.Mvc.UI
{
    public class ChartBulletTarget
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBulletTarget" /> class.
        /// </summary>
        public ChartBulletTarget()
        {
            Border = new ChartElementBorder();
        }

        /// <summary>
        /// Gets or sets the target width.
        /// </summary>
        public int? Width
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the markers color.
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the markers border.
        /// </summary>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartBulletTargetSerializer(this);
        }
    }
}