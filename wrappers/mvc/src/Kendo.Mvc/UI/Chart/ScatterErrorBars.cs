namespace Kendo.Mvc.UI
{
    public class ScatterErrorBars : ErrorBarsBase
    {
        /// <summary>
        /// Gets or sets the error bars X value.
        /// </summary>
        public object XValue 
        { 
            get; 
            set;
        }

        /// <summary>
        /// Gets or sets the error bars Y value.
        /// </summary>
        public object YValue
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ScatterErrorBarsSerializer(this);
        }
    }
}
