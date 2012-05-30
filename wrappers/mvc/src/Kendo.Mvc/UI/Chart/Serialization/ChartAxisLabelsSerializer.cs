namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

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
                .Add("step", axisLabels.Step, () => axisLabels.Step.HasValue)
                .Add("skip", axisLabels.Skip, () => axisLabels.Skip.HasValue);

            return result;
        }
    }
}