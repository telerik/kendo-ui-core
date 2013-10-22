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

            if (this.errorBars.Color.HasValue())
            {
                result["color"] = this.errorBars.Color;
            }

            if (this.errorBars.EndCaps.HasValue)
            {
                result["endCaps"] = this.errorBars.EndCaps;
            }

            var line = this.errorBars.Line.CreateSerializer().Serialize();
            if (line.Count > 0)
            {
                result.Add("line", line);
            }

            return result;
        }
    }
}
