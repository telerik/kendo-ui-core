namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartSpacingSerializer : IChartSerializer
    {
        private readonly ChartSpacing spacing;

        public ChartSpacingSerializer(ChartSpacing spacing)
        {
            this.spacing = spacing;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("top", spacing.Top, () => spacing.Top.HasValue)
                .Add("right", spacing.Right, () => spacing.Right.HasValue)
                .Add("bottom", spacing.Bottom, () => spacing.Bottom.HasValue)
                .Add("left", spacing.Left, () => spacing.Left.HasValue);

            return result;
        }
    }
}