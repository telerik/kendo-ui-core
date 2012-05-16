namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;

    /// <summary>
    /// Defines the fluent interface for configuring numeric axis.
    /// </summary>
    public class ChartNumericAxisBuilder : ChartAxisBuilderBase<IChartNumericAxis, ChartNumericAxisBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNumericAxisBuilder"/> class.
        /// </summary>
        /// <param name="axis">The axis.</param>
        public ChartNumericAxisBuilder(IChartNumericAxis axis)
            : base(axis)
        {
        }

        /// <summary>
        /// Sets the axis minimum value.
        /// </summary>
        /// <param name="min">The axis minimum value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .ValueAxis(a => a.Numeric().Min(4))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNumericAxisBuilder Min(double min)
        {
            Axis.Min = min;

            return this;
        }

        /// <summary>
        /// Sets the axis maximum value.
        /// </summary>
        /// <param name="max">The axis maximum value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .ValueAxis(a => a.Numeric().Max(4))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNumericAxisBuilder Max(double max)
        {
            Axis.Max = max;

            return this;
        }

        /// <summary>
        /// Sets the interval between major divisions.
        /// </summary>
        /// <param name="majorUnit">The interval between major divisions.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .ValueAxis(a => a.Numeric().MajorUnit(4))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNumericAxisBuilder MajorUnit(double majorUnit)
        {
            Axis.MajorUnit = majorUnit;

            return this;
        }
    }
}