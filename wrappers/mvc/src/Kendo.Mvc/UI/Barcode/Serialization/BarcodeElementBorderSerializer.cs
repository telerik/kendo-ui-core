namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    internal class BarcodeElementBorderSerializer : IChartSerializer
    {
        private readonly BarcodeElementBorder border;

        public BarcodeElementBorderSerializer(BarcodeElementBorder border)
        {
            this.border = border;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("width", border.Width, () => border.Width.HasValue)
                .Add("dashType", border.DashType.ToString().ToLowerInvariant(), () => border.DashType.HasValue)
                .Add("color", border.Color, () => border.Color.HasValue());

            return result;
        }
    }
}
