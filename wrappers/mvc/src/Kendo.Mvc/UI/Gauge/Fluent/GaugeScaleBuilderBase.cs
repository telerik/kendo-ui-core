namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring scale.
    /// </summary>
    /// <typeparam name="TScale"></typeparam>
    /// <typeparam name="TScaleBuilder">The type of the series builder.</typeparam>
    /// <typeparam name="T"></typeparam>
    public abstract class GaugeScaleBuilderBase<TScale, TScaleBuilder, T> : IHideObjectMembers
        where TScaleBuilder : GaugeScaleBuilderBase<TScale, TScaleBuilder, T>
        where TScale : IGaugeScale<T>
        where T : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeScaleBuilderBase{TScale, TScaleBuilder, T}"/> class.
        /// </summary>
        /// <param name="scale">The scale.</param>
        protected GaugeScaleBuilderBase(TScale scale)
        {

            Scale = scale;
        }

        /// <summary>
        /// Gets or sets the scale.
        /// </summary>
        /// <value>The scale.</value>
        public TScale Scale
        {
            get;
            private set;
        }

        /// <summary>
        /// Configures the minor ticks.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("linearGauge")
        ///            .Scale(scale => scale
        ///                .MinorTicks(ticks => ticks
        ///                    .Visible(false)
        ///                )
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TScaleBuilder MinorTicks(Action<GaugeScaleTicksBuilder> configurator)
        {

            configurator(new GaugeScaleTicksBuilder(Scale.MinorTicks));
        
            return this as TScaleBuilder;
        }

        /// <summary>
        /// Configures the major ticks.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("linearGauge")
        ///            .Scale(scale => scale
        ///                .MajorTicks(ticks => ticks
        ///                    .Visible(false)
        ///                )
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TScaleBuilder MajorTicks(Action<GaugeScaleTicksBuilder> configurator)
        {

            configurator(new GaugeScaleTicksBuilder(Scale.MajorTicks));

            return this as TScaleBuilder;
        }

        /// <summary>
        /// Defines the ranges items.
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("linearGauge")
        ///            .Scale(scale => scale
        ///                 .Ranges.Add()
        ///                 .From(1)
        ///                 .To(2)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TScaleBuilder Ranges(Action<GaugeScaleRangesFactory<TScale, T>> configurator)
        {

            GaugeScaleRangesFactory<TScale, T> factory = new GaugeScaleRangesFactory<TScale, T>(Scale);

            configurator(factory);

            return this as TScaleBuilder;
        }

        /// <summary>
        /// Sets the scale major unit.
        /// </summary>
        /// <param name="majorUnit">The major unit.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("linearGauge")
        ///            .Scale(scale => sclae.MajorUnit(5))
        /// %&gt;
        /// </code>
        /// </example>
        public TScaleBuilder MajorUnit(int majorUnit)
        {
            Scale.MajorUnit = majorUnit;

            return this as TScaleBuilder;
        }

        /// <summary>
        /// Sets the scale minor unit.
        /// </summary>
        /// <param name="minorUnit">The minor unit.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("linearGauge")
        ///            .Scale(scale => sclae.MinorUnit(5))
        /// %&gt;
        /// </code>
        /// </example>
        public TScaleBuilder MinorUnit(int minorUnit)
        {
            Scale.MinorUnit = minorUnit;

            return this as TScaleBuilder;
        }

        /// <summary>
        /// Sets the scale min value.
        /// </summary>
        /// <param name="min">The min.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("linearGauge")
        ///            .Scale(scale => sclae.Min(-20))
        /// %&gt;
        /// </code>
        /// </example>
        public TScaleBuilder Min(T min)
        {
            Scale.Min = min;

            return this as TScaleBuilder;
        }

        /// <summary>
        /// Sets the scale max value.
        /// </summary>
        /// <param name="max">The max.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("linearGauge")
        ///            .Scale(scale => sclae.Max(20))
        /// %&gt;
        /// </code>
        /// </example>
        public TScaleBuilder Max(T max)
        {
            Scale.Max = max;

            return this as TScaleBuilder;
        }

        /// <summary>
        /// Sets the scale reverse.
        /// </summary>
        /// <param name="reverse">The scale reverse.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("linearGauge")
        ///            .Scale(scale => sclae.reverse(true))
        /// %&gt;
        /// </code>
        /// </example>
        public TScaleBuilder Reverse(bool reverse)
        {
            Scale.Reverse = reverse;

            return this as TScaleBuilder;
        }
    }
}