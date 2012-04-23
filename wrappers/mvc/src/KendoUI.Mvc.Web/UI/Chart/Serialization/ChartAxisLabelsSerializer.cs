

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Infrastructure;

    internal class ChartAxisLabelsSerializer : ChartLabelsBase
    {
        private readonly ChartAxisLabels axisLabels;

        public ChartAxisLabelsSerializer(ChartAxisLabels axisLabels)
            : base(axisLabels)
        {
            this.axisLabels = axisLabels;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("mirror", axisLabels.Mirror, () => axisLabels.Mirror.HasValue)
                .Add("step", axisLabels.Step, () => axisLabels.Step.HasValue);

            return result;
        }
    }
}