using System.Collections.Generic;
using System;
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring numeric axis.
    /// </summary>
    public class ChartNumericAxisBuilder : ChartAxisBuilderBase<IChartNumericAxis, double, ChartNumericAxisBuilder>
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
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .ValueAxis(a => a.Numeric().Min(4))
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
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .ValueAxis(a => a.Numeric().Max(4))
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
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .ValueAxis(a => a.Numeric().MajorUnit(4))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNumericAxisBuilder MajorUnit(double majorUnit)
        {
            Axis.MajorUnit = majorUnit;

            return this;
        }

        /// <summary>
        /// Sets the interval between minor divisions.
        /// It defaults to MajorUnit / 5.
        /// </summary>
        /// <param name="minorUnit">The interval between minor divisions.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .ValueAxis(a => a.Numeric()
        ///                 .MajorUnit(4)
        ///                 .MinorUnit(2)
        ///                 .MinorTicks(mt => mt.Visible(true))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNumericAxisBuilder MinorUnit(double minorUnit)
        {
            Axis.MinorUnit = minorUnit;

            return this;
        }

        /// <summary>
        /// Sets value at which the first perpendicular axis crosses this axis.
        /// </summary>
        /// <param name="axisCrossingValue">The value at which the first perpendicular axis crosses this axis.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .ValueAxis(axis => axis.AxisCrossingValue(4))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNumericAxisBuilder AxisCrossingValue(double axisCrossingValue)
        {
            Axis.AxisCrossingValues = new double[] { axisCrossingValue };

            return this;
        }

        /// <summary>
        /// Sets value at which perpendicular axes cross this axis.
        /// </summary>
        /// <param name="axisCrossingValues">The values at which perpendicular axes cross this axis.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .XAxis(axis => axis.Numeric().AxisCrossingValue(0, 10))
        ///            .YAxis(axis => axis.Numeric().Title("Axis 1"))
        ///            .YAxis(axis => axis.Numeric("secondary").Title("Axis 2"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNumericAxisBuilder AxisCrossingValue(params double[] axisCrossingValues)
        {
            Axis.AxisCrossingValues = axisCrossingValues;

            return this;
        }

        /// <summary>
        /// Sets value at which perpendicular axes cross this axis.
        /// </summary>
        /// <param name="axisCrossingValues">The values at which perpendicular axes cross this axis.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .XAxis(axis => axis.Numeric().AxisCrossingValue(new double[] { 0, 10 }))
        ///            .YAxis(axis => axis.Numeric().Title("Axis 1"))
        ///            .YAxis(axis => axis.Numeric("secondary").Title("Axis 2"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNumericAxisBuilder AxisCrossingValue(IEnumerable<double> axisCrossingValues)
        {
            Axis.AxisCrossingValues = axisCrossingValues;

            return this;
        }

        /// <summary>
        /// Defines the items.
        /// </summary>
        /// <param name="Items">The items of the notes.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ValueAxis(a => a.Numeric()
        ///               .Note(note => note
        ///                    .Data(data =>
        ///                    {
        ///                        data.Add().Value(1);
        ///                        data.Add().Value(2);
        ///                    })
        ///               )
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example> 
        /// </code>
        /// </example>
        public ChartNumericAxisBuilder Notes(Action<ChartAxisNotesBuilder> configurator)
        {
            var factory = new ChartAxisNotesBuilder(Axis.Notes);

            configurator(factory);

            return this;
        }
    }
}