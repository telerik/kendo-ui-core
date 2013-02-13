namespace Kendo.Mvc.UI
{
    public class ChartLine : ChartLineBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLine" /> class.
        /// </summary>
        public ChartLine(int width, string color, ChartDashType dashType, bool visible)
            : base(width, color, dashType, visible)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLine" /> class.
        /// </summary>
        public ChartLine()
        {
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartLineSerializer(this);
        }
    }
}