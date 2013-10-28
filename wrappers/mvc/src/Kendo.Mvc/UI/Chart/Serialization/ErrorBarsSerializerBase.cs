namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using System.Collections.Generic;

    internal class ErrorBarsSerializerBase<TErrorBars> : IChartSerializer
        where TErrorBars: ErrorBarsBase
    {
        protected readonly TErrorBars errorBars;

        public ErrorBarsSerializerBase(TErrorBars errorBars)
        {
            this.errorBars = errorBars;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            if (errorBars.Color.HasValue())
            {
                result["color"] = errorBars.Color;
            }

            if (errorBars.EndCaps.HasValue)
            {
                result["endCaps"] = errorBars.EndCaps;
            }

            var line = errorBars.Line.CreateSerializer().Serialize();
            if (line.Count > 0)
            {
                result.Add("line", line);
            }

            return result;
        }
    }
}
