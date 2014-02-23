namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartLogarithmicAxisSerializer: ChartNumericAxisSerializer
    {
        public ChartLogarithmicAxisSerializer(IChartNumericAxis axis)
            : base(axis)
        {
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();
            result["type"] = "log";

            return result;
        }
    }
}
