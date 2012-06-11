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

            if (axisLabels.Culture != null)
            {
                result.Add("culture", axisLabels.Culture.Name);
            }

            var dateFormatsData = axisLabels.DateFormats.CreateSerializer().Serialize();
            if (dateFormatsData.Keys.Count > 0)
            {
                result.Add("dateFormats", dateFormatsData);
            }

            return result;
        }
    }
}