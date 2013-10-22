namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using System.Collections.Generic;

    internal class CategoricalErrorBarsSerializer: ErrorBarsSerializerBase<CategoricalErrorBars>
    {
        public CategoricalErrorBarsSerializer(CategoricalErrorBars errorBars)
            : base(errorBars)
        {
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            if (this.errorBars.Value != null)
            {
                result["value"] = this.errorBars.Value;
            }

            return result;
        }
    }
}
