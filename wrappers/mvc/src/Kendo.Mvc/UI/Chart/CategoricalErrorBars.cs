namespace Kendo.Mvc.UI
{
    public class CategoricalErrorBars : ErrorBarsBase
    {
        /// <summary>
        /// Gets or sets the error bars value.
        /// </summary>
        public object Value
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new CategoricalErrorBarsSerializer(this);
        }
    }
}
