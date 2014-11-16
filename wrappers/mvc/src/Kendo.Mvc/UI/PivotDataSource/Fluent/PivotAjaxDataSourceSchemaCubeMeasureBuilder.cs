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
    public class PivotAjaxDataSourceSchemaCubeMeasureBuilder<TModel>
        where TModel : class
    {
        protected readonly PivotDataSourceSchemaMeasureDescriptor measure;

        public PivotAjaxDataSourceSchemaCubeMeasureBuilder(PivotDataSourceSchemaMeasureDescriptor measure)
        {
            this.measure = measure;
        }

        /// <summary>
        /// Describes a measure field
        /// </summary>
        /// <typeparam name="TValue">Field type</typeparam>
        /// <param name="expression">Member access expression which describes the field</param>
        public PivotAjaxDataSourceSchemaCubeMeasureBuilder<TModel> Field<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            measure.Field = expression.MemberWithoutInstance();
            
            return this;
        }

        /// <summary>
        /// Describes a measure field
        /// </summary>
        /// <param name="member">The member name for the measure.</param>
        public PivotAjaxDataSourceSchemaCubeMeasureBuilder<TModel> Field(string member)
        {
            measure.Field = member;

            return this;
        }

        /// <summary>
        /// Describes a caption of the measure.
        /// </summary>
        /// <param name="caption">The caption for the measure.</param>
        public PivotAjaxDataSourceSchemaCubeMeasureBuilder<TModel> Caption(string caption)
        {
            measure.Caption = caption;

            return this;
        }

        /// <summary>
        /// Describes a format of the measure.
        /// </summary>
        /// <param name="format">The format for the measure.</param>
        public PivotAjaxDataSourceSchemaCubeMeasureBuilder<TModel> Format(string format)
        {
            measure.Format = format;

            return this;
        }

        /// <summary>
        /// Sets Aggregate option
        /// </summary>
        /// <param name="aggregate">Aggregate option</param>
        public virtual PivotAjaxDataSourceSchemaCubeMeasureBuilder<TModel> Aggregate(string aggregate)
        {
            measure.Aggregate.HandlerName = aggregate;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return the aggregate.
        /// </summary>
        public virtual PivotAjaxDataSourceSchemaCubeMeasureBuilder<TModel> Aggregate(Func<object, object> handler)
        {
            measure.Aggregate.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets a built-in Aggregate option
        /// </summary>
        /// <param name="aggregate">Aggregate option</param>
        public virtual PivotAjaxDataSourceSchemaCubeMeasureBuilder<TModel> AggregateName(string aggregateName)
        {
            measure.AggregateName = aggregateName;

            return this;
        }

        /// <summary>
        /// Sets Result option
        /// </summary>
        /// <param name="result">Result option</param>
        public virtual PivotAjaxDataSourceSchemaCubeMeasureBuilder<TModel> Result(string result)
        {
            measure.Result.HandlerName = result;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return the result value.
        /// </summary>
        public virtual PivotAjaxDataSourceSchemaCubeMeasureBuilder<TModel> Result(Func<object, object> handler)
        {
            measure.Result.TemplateDelegate = handler;

            return this;
        }
    }
}
