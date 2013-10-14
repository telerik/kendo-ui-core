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
        /// The style of the area.
        /// </summary>
        public ChartAreaStyle Style
        {
            get;
            set;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLine" /> class.
        /// </summary>
        public ChartAreaLine()
        {
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartAreaLineSerializer(this);
        }
    }
}