namespace Kendo.Mvc.UI
{
    public class ChartAreaLine : ChartLineBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaLine" /> class.
        /// </summary>
        public ChartAreaLine(int width, string color, ChartDashType dashType, bool visible)
            : base(width, color, dashType, visible)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaLine" /> class.
        /// </summary>
        public ChartAreaLine()
        {
        }

        /// <summary>
        /// The style of the area.
        /// </summary>
        public ChartAreaStyle Style
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartAreaLineSerializer(this);
        }
    }
}