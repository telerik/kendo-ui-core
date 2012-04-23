

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Infrastructure;

    internal class ChartNumericAxisSerializer : ChartAxisSerializerBase
    {
        private readonly IChartNumericAxis axis;

        public ChartNumericAxisSerializer(IChartNumericAxis axis)
            : base(axis)
        {
            this.axis = axis;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("min", axis.Min, () => axis.Min.HasValue)
                .Add("max", axis.Max, () => axis.Max.HasValue)
                .Add("majorUnit", axis.MajorUnit, () => axis.MajorUnit.HasValue);

            return result;
        }
    }
}