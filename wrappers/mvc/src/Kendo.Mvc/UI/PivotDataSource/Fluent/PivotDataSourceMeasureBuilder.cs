namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSourceMeasure"/>.
    /// </summary>
    public class PivotDataSourceMeasureBuilder : IHideObjectMembers
    {
         private readonly PivotDataSourceMeasure measure;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotDataSourceMeasureBuilder"/> class.
        /// </summary>
        /// <param name="measure">The column</param>
        public PivotDataSourceMeasureBuilder(PivotDataSourceMeasure measure)
        {
            this.measure = measure;
        }

        /// <summary>
        /// Sets measure values.
        /// </summary>
        /// <param name="values">The measure values</param>
        public PivotDataSourceMeasureBuilder Values(params string[] values)
        {
            measure.Values = values.Select(value => new PivotDataSourceMeasureDescriptor { Name = value });

            return this;
        }

        /// <summary>
        /// Sets measure values.
        /// </summary>
        /// <param name="values">The measure values</param>
        public PivotDataSourceMeasureBuilder Values(Action<PivotDataSourceMeasureDescriptorFactory> addAction)
        {
            var items = new List<PivotDataSourceMeasureDescriptor>();

            addAction(new PivotDataSourceMeasureDescriptorFactory(items));

            measure.Values = items;

            return this;
        }

        /// <summary>
        /// Sets the axis of the measures.
        /// </summary>
        /// <param name="axis">The axis</param>
        public PivotDataSourceMeasureBuilder Axis(PivotDataSourceMeasureAxis axis)
        {
            measure.Axis = axis;

            return this;
        }
    }
}
