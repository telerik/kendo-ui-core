namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartPieConnectorsSerializer : IChartSerializer
    {
        private readonly ChartPieConnectors pieConnectors;

        public ChartPieConnectorsSerializer(ChartPieConnectors pieConnectors)
        {
            this.pieConnectors = pieConnectors;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("width", pieConnectors.Width, () => pieConnectors.Width.HasValue)
                .Add("color", pieConnectors.Color, () => pieConnectors.Color.HasValue())
                .Add("padding", pieConnectors.Padding, () => pieConnectors.Padding.HasValue);

            return result;
        }
    }
}