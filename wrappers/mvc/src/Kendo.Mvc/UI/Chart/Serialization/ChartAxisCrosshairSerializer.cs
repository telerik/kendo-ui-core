namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartAxisCrosshairSerializer : ChartLineBaseSerializer
    {
        private readonly ChartAxisCrosshair crosshair;

        public ChartAxisCrosshairSerializer(ChartAxisCrosshair crosshair)
            : base(crosshair)
        {
            this.crosshair = crosshair;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            var tooltip = crosshair.Tooltip.CreateSerializer().Serialize();
            if (tooltip.Keys.Count > 0)
            {
                result.Add("tooltip", tooltip);
            }

            return result;
        }
    }
}