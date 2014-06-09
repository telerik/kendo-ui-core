namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGridDataSourceMeasure"/>.
    /// </summary>
    public class PivotGridDataSourceMeasureBuilder : IHideObjectMembers
    {
         private readonly PivotGridDataSourceMeasure measure;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotGridDataSourceMeasureBuilder"/> class.
        /// </summary>
        /// <param name="measure">The column</param>
        public PivotGridDataSourceMeasureBuilder(PivotGridDataSourceMeasure measure)
        {
            this.measure = measure;
        }

        /// <summary>
        /// Sets measure values.
        /// </summary>
        /// <param name="values">The measure values</param>
        public PivotGridDataSourceMeasureBuilder Values(string[] values)
        {
            measure.Values = values;

            return this;
        }

        /// <summary>
        /// Sets the axis of the measures.
        /// </summary>
        /// <param name="axis">The axis</param>
        public PivotGridDataSourceMeasureBuilder Axis(PivotGridDataSourceMeasureAxis axis)
        {
            measure.Axis = axis;

            return this;
        }
    }
}
