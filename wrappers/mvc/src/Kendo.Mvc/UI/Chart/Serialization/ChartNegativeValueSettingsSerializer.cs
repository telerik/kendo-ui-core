namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartNegativeValueSettingsSerializer : IChartSerializer
    {
        private readonly ChartNegativeValueSettings settings;

        public ChartNegativeValueSettingsSerializer(ChartNegativeValueSettings settings)
        {
            this.settings = settings;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("color", settings.Color, () => settings.Color != null)
                .Add("visible", settings.Visible, () => settings.Visible.HasValue);

            return result;
        }
    }
}