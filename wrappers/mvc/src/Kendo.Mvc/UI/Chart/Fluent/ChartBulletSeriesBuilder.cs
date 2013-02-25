namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring bullet series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartBulletSeriesBuilder<T> where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBulletSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartBulletSeriesBuilder(IChartBulletSeries series)
        {
            Series = series;
        }

        /// <summary>
        /// Gets or sets the series.
        /// </summary>
        /// <value>The series.</value>
        public IChartBulletSeries Series
        {
            get;
            private set;
        }

        /// <summary>
        /// Set distance between category clusters. 
        /// <param name="gap">
        /// A value of 1 means that there is a total of 1 bullet width / vertical bullet height between categories.
        /// The distance is distributed evenly on each side.
        /// The default value is 1.5
        /// </param>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .Series(series => series.Bullet(s => s.Current, s => s.Target).Gap(1))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBulletSeriesBuilder<T> Gap(double gap)
        {
            Series.Gap = gap;

            return this;
        }

        /// <summary>
        /// Sets a value indicating the distance between bullets / categories.
        /// </summary>
        /// <param name="spacing">
        /// Value of 1 means that the distance between bullets is equal to their width.
        /// The default value is 0
        /// </param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .Series(series => series.Bullet(s => s.Current, s => s.Target).Spacing(1))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBulletSeriesBuilder<T> Spacing(double spacing)
        {
            Series.Spacing = spacing;

            return this;
        }

        /// <summary>
        /// Sets the bullets border.
        /// </summary>
        /// <param name="width">The bullets border width.</param>
        /// <param name="color">The bullets border color (CSS syntax).</param>
        /// <param name="dashType">The bullets border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series.Bullet(s => s.Current, s => s.Target).Border("1", "#000", ChartDashType.Dot))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBulletSeriesBuilder<T> Border(int width, string color, ChartDashType dashType)
        {
            Series.Border = new ChartElementBorder(width, color, dashType);

            return this;
        }

        /// <summary>
        /// Sets the bullet effects overlay
        /// </summary>
        /// <param name="overlay">The bullet effects overlay. The default is ChartBarSeriesOverlay.Glass</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series.Bullet(s => s.Current, s => s.Target).Overlay(ChartBarSeriesOverlay.None))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBulletSeriesBuilder<T> Overlay(ChartBarSeriesOverlay overlay)
        {
            Series.Overlay = overlay;

            return this;
        }

        /// <summary>
        /// Sets the series title displayed in the legend.
        /// </summary>
        /// <param name="text">The title.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .Series(series => series.Bullet(s => s.Current, s => s.Target).Name("Sales"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBulletSeriesBuilder<T> Name(string name)
        {
            Series.Name = name;

            return this;
        }
        
        /// <summary>
        /// Sets the series opacity.
        /// </summary>
        /// <param name="opacity">
        /// The series opacity in the range from 0 (transparent) to 1 (opaque).
        /// The default value is 1.
        /// </param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .Series(series => series.Bullet(s => s.Current, s => s.Target).Opacity(0.5))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBulletSeriesBuilder<T> Opacity(double opacity)
        {
            Series.Opacity = opacity;

            return this;
        }

        /// <summary>
        /// Sets the bullet fill color
        /// </summary>
        /// <param name="color">The bar bullet color (CSS syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series.Bullet(s => s.Current, s => s.Target).Color("Red"))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBulletSeriesBuilder<T> Color(string color)
        {
            Series.Color = color;

            return this;
        }

        /// <summary>
        /// Configure the data point tooltip for the series.
        /// </summary>
        /// <param name="configurator">Use the configurator to set data tooltip options.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Bullet(s => s.Current, s => s.Target)
        ///                .Tooltip(tooltip =>
        ///                {
        ///                    tooltip.Visible(true).Format("{0:C}");
        ///                })
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBulletSeriesBuilder<T> Tooltip(Action<ChartTooltipBuilder> configurator)
        {
            configurator(new ChartTooltipBuilder(Series.Tooltip));

            return this;
        }

        /// <summary>
        /// Sets the data point tooltip visibility.
        /// </summary>
        /// <param name="visible">
        /// A value indicating if the data point tooltip should be displayed.
        /// The tooltip is not visible by default.
        /// </param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Bullet(s => s.Current, s => s.Target).Tooltip(true))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBulletSeriesBuilder<T> Tooltip(bool visible)
        {
            Series.Tooltip.Visible = visible;

            return this;
        }

        /// <summary>
        /// Sets the axis name to use for this series.
        /// </summary>
        /// <param name="axis">The axis name for this series.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .Series(series => series.Bullet(s => s.Current, s => s.Target).Name("Sales").Axis("secondary"))
        ///            .ValueAxis(axis => axis.Numeric())
        ///            .ValueAxis(axis => axis.Numeric("secondary"))
        ///            .CategoryAxis(axis => axis.AxisCrossingValue(0, 10))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBulletSeriesBuilder<T> Axis(string axis)
        {
            Series.Axis = axis;

            return this;
        }

        /// <summary>
        /// Configure the data point tooltip for the series.
        /// </summary>
        /// <param name="configurator">Use the configurator to set data tooltip options.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Bullet(s => s.Current, s => s.Target)
        ///                .Tooltip(tooltip =>
        ///                {
        ///                    tooltip.Visible(true).Format("{0:C}");
        ///                })
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBulletSeriesBuilder<T> Target(Action<ChartBulletTargetBuilder> configurator)
        {
            configurator(new ChartBulletTargetBuilder(Series.Target));

            return this;
        }
    }
}