namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using System.Collections.Generic;

    internal class ScatterErrorBarsSerializer: ErrorBarsSerializerBase<ScatterErrorBars>
    {

        public ScatterErrorBarsSerializer(ScatterErrorBars errorBars)
            : base(errorBars)
        {
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            if (this.errorBars.XValue != null)
            {
                result["xValue"] = this.errorBars.XValue;
            }

            if (this.errorBars.YValue != null)
            {
                result["yValue"] = this.errorBars.YValue;
            }

            return result;
        }
    }
}
