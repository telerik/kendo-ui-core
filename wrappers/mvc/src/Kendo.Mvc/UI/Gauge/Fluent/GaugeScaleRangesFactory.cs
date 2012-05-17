namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Creates scale ranges for the <see cref="GaugeScaleRangesFactory{TScale}" />.
    /// </summary>
    public class GaugeScaleRangesFactory<TScale> : IHideObjectMembers
        where TScale : IGaugeScale
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeScaleRangesFactory{TScale}"/> class.
        /// </summary>
        /// <param name="scale">The scale.</param>
        public GaugeScaleRangesFactory(TScale scale)
        {
            Guard.IsNotNull(scale, "scale");

            Scale = scale;
        }

        /// <summary>
        /// The gauge scale
        /// </summary>
        private TScale Scale
        {
            get;
            set;
        }

        /// <summary>
        /// Defines a item.
        /// </summary>
        /// <returns></returns>
        public GaugeScaleRangesBuilder Add()
        {
            GaugeScaleRanges item = new GaugeScaleRanges();

            Scale.Ranges.Add(item);

            return new GaugeScaleRangesBuilder(item);
        }
    }
}