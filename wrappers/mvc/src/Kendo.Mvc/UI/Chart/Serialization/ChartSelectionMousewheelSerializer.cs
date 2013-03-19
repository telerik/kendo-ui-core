namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartSelectionMousewheelSerializer : IChartSerializer
    {
        private readonly ChartSelectionMousewheel mousewheel;

        public ChartSelectionMousewheelSerializer(ChartSelectionMousewheel mousewheel)
        {
            this.mousewheel = mousewheel;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("reverse", mousewheel.Reverse, () => mousewheel.Reverse.HasValue)
                .Add("zoom", mousewheel.Zoom.ToString().ToLowerInvariant(), () => mousewheel.Zoom.HasValue);

            return result;
        }
    }
}