namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using Extensions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSourceSchemaCube"/> Measures.
    /// </summary>
    public class PivotAjaxDataSourceSchemaCubeMeasureFactory<TModel>
        where TModel : class
    {
        protected readonly IList<PivotDataSourceSchemaMeasureDescriptor> measures;

        public PivotAjaxDataSourceSchemaCubeMeasureFactory(IList<PivotDataSourceSchemaMeasureDescriptor> measures)
        {
            this.measures = measures;
        }

        /// <summary>
        /// Defines a PivotGrid DataSource Cube Measure.
        /// </summary>
        /// <param name="measure">The measure</param>
        public PivotAjaxDataSourceSchemaCubeMeasureBuilder<TModel> Add(string measure)
        {
            var descriptor = new PivotDataSourceSchemaMeasureDescriptor { Measure = measure };

            measures.Add(descriptor);

            return new PivotAjaxDataSourceSchemaCubeMeasureBuilder<TModel>(descriptor);
        }
    }
}
