namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring numeric axis.
    /// </summary>
    public class ChartDateAxisBuilder : ChartAxisBuilderBase<IChartDateAxis, DateTime, ChartDateAxisBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartDateAxisBuilder"/> class.
        /// </summary>
        /// <param name="axis">The axis.</param>
        public ChartDateAxisBuilder(IChartDateAxis axis)
            : base(axis)
        {
        }

        /// <summary>
        /// Sets the date axis base unit.
        /// </summary>
        /// <param name="baseUnit">
        /// The date axis base unit
        /// </param>
        public ChartDateAxisBuilder BaseUnit(ChartAxisBaseUnit baseUnit)
        {
            Axis.BaseUnit = baseUnit;

            return this;
        }

        /// <summary>
        /// Sets the start date of the axis.
        /// </summary>
        /// <param name="min">The start date of the axis.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .XAxis(a => a.Date().Min(DateTime.Parse("2012/01/01")))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartDateAxisBuilder Min(DateTime min)
        {
            Axis.Min = min;

            return this;
        }

        /// <summary>
        /// Sets the end date of the axis.
        /// </summary>
        /// <param name="max">The end date of the axis.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .XAxis(a => a.Date().Max(DateTime.Parse("2012/01/01")))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartDateAxisBuilder Max(DateTime max)
        {
            Axis.Max = max;

            return this;
        }

        /// <summary>
        /// Sets the interval between major divisions in base units.
        /// </summary>
        /// <param name="majorUnit">The interval between major divisions in base units.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .XAxis(a => a.Date().BaseUnit(ChartAxisBaseUnit.Months).MajorUnit(4))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartDateAxisBuilder MajorUnit(double majorUnit)
        {
            Axis.MajorUnit = majorUnit;

            return this;
        }

        /// <summary>
        /// Sets the interval between minor divisions in base units.
        /// It defaults to 1/5th of the majorUnit
        /// </summary>
        /// <param name="minorUnit">The interval between minor divisions in base units.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .XAxis(a => a.Date().BaseUnit(ChartAxisBaseUnit.Days).MajorUnit(4).MinorUnit(2))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartDateAxisBuilder MinorUnit(double minorUnit)
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
        ///            .XAxis(axis => axis.Date().AxisCrossingValue(DateTime.Parse("2012/01/01")))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartDateAxisBuilder AxisCrossingValue(DateTime axisCrossingValue)
        {
            Axis.AxisCrossingValues = new DateTime[] { axisCrossingValue };

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
        ///            .CategoryAxis(axis => axis.Date().AxisCrossingValue(DateTime.Parse("2012/01/01"), DateTime.Parse("2012/01/10")))
        ///            .ValueAxis(axis => axis.Numeric().Title("Axis 1"))
        ///            .ValueAxis(axis => axis.Numeric("secondary").Title("Axis 2"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartDateAxisBuilder AxisCrossingValue(params DateTime[] axisCrossingValues)
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
        ///            .CategoryAxis(axis => axis.Date().AxisCrossingValue(new DateTime[] {
        ///                DateTime.Parse("2012/01/01"), DateTime.Parse("2012/01/10")
        ///            }))
        ///            .ValueAxis(axis => axis.Numeric().Title("Axis 1"))
        ///            .ValueAxis(axis => axis.Numeric("secondary").Title("Axis 2"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartDateAxisBuilder AxisCrossingValue(IEnumerable<DateTime> axisCrossingValues)
        {
            Axis.AxisCrossingValues = axisCrossingValues;

            return this;
        }

        /// <summary>
        /// Configures the axis labels.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .XAxis(axis => axis
        ///                .Date()
        ///                .Labels(labels => labels
        ///                    .Culture(new CultureInfo("es-ES")
        ///                    .Visible(true)
        ///                )
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartDateAxisBuilder Labels(Action<ChartDateAxisLabelsBuilder> configurator)
        {
            configurator(new ChartDateAxisLabelsBuilder(Axis.Labels));

            return this;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override ChartDateAxisBuilder Labels(Action<ChartAxisLabelsBuilder> configurator)
        {
            return this;
        }
    }
}
