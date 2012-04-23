

namespace KendoUI.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using KendoUI.Mvc.UI;

    /// <summary>
    /// Creates value axis for the <see cref="Chart{TModel}" />.
    /// </summary>
    /// <typeparam name="TModel">The type of the data item to which the chart is bound to</typeparam>
    public class ChartXYAxisFactory<TModel> : ChartValueAxisFactory<TModel>, IHideObjectMembers
        where TModel : class
    {
        private ChartNumericAxisBuilder _legacyBuilder;
        private ChartNumericAxisBuilder LegacyBuilder
        {
            get
            {
                if (_legacyBuilder == null)
                {
                    _legacyBuilder = Numeric();
                }

                return _legacyBuilder;
            }
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartValueAxisFactory{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public ChartXYAxisFactory(Chart<TModel> container, IList<IChartValueAxis> axes)
            : base(container, axes)
        {
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder MinorTickSize(int minorTickSize)
        {
            LegacyBuilder.MinorTickSize(minorTickSize);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder MajorTickSize(int majorTickSize)
        {
            LegacyBuilder.MajorTickSize(majorTickSize);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder MajorTickType(ChartAxisTickType majorTickType)
        {
            LegacyBuilder.MajorTickType(majorTickType);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder MinorTickType(ChartAxisTickType minorTickType)
        {
            LegacyBuilder.MinorTickType(minorTickType);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder MajorGridLines(Action<ChartLineBuilder> configurator)
        {
            LegacyBuilder.MajorGridLines(configurator);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder MajorGridLines(int width, string color, ChartDashType dashType)
        {
            LegacyBuilder.MajorGridLines(width, color, dashType);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder MinorGridLines(Action<ChartLineBuilder> configurator)
        {
            LegacyBuilder.MinorGridLines(configurator);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder MinorGridLines(int width, string color, ChartDashType dashType)
        {
            LegacyBuilder.MinorGridLines(width, color, dashType);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder Line(Action<ChartLineBuilder> configurator)
        {
            LegacyBuilder.Line(configurator);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder Line(int width, string color, ChartDashType dashType)
        {
            LegacyBuilder.Line(width, color, dashType);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder AxisCrossingValue(double axisCrossingValue)
        {
            LegacyBuilder.AxisCrossingValue(axisCrossingValue);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder AxisCrossingValue(params double[] axisCrossingValues)
        {
            LegacyBuilder.AxisCrossingValue(axisCrossingValues);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder AxisCrossingValue(IEnumerable<double> axisCrossingValues)
        {
            LegacyBuilder.AxisCrossingValue(axisCrossingValues);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder Labels(Action<ChartAxisLabelsBuilder> configurator)
        {
            LegacyBuilder.Labels(configurator);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder Labels(bool visible)
        {
            LegacyBuilder.Labels(visible);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder PlotBands(Action<ChartAxisPlotBandsFactory<IChartNumericAxis>> configurator)
        {
            LegacyBuilder.PlotBands(configurator);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder Title(Action<ChartAxisTitleBuilder> configurator)
        {
            LegacyBuilder.Title(configurator);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder Title(string title)
        {
            LegacyBuilder.Title(title);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder Color(string color)
        {
            LegacyBuilder.Color(color);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder Min(double min)
        {
            LegacyBuilder.Min(min);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder Max(double max)
        {
            LegacyBuilder.Max(max);

            return LegacyBuilder;
        }

        /// <summary>
        /// Obsolete. Use the Numeric method to define options for numeric X/Y axis.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        [Obsolete("Obsolete. Use the Numeric method to define options for numeric X/Y axis.")]
        public ChartNumericAxisBuilder MajorUnit(double majorUnit)
        {
            LegacyBuilder.MajorUnit(majorUnit);

            return LegacyBuilder;
        }
    }
}
