namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using Kendo.Mvc.Infrastructure;

    internal class ChartCategoryAxisSerializer : ChartAxisSerializerBase
    {
        private readonly IChartCategoryAxis axis;

        public ChartCategoryAxisSerializer(IChartCategoryAxis axis)
            : base(axis)
        {
            this.axis = axis;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();
            FluentDictionary.For(result)
                .Add("type", axis.Type.ToString(), () => axis.Type != null)
                .Add("categories", SerializeCategories(), () => axis.Categories != null)
                .Add("field", axis.Member, () => axis.Categories == null && axis.Member != null)
                .Add("min", FormatDate(axis.Min), () => axis.Min != null)
                .Add("max", FormatDate(axis.Max), () => axis.Max != null);

            if (axis.BaseUnit != null) {
                result.Add("baseUnit", axis.BaseUnit.ToString().ToLowerInvariant());
            }

            return result;
        }

        private IEnumerable SerializeCategories()
        {
            if (axis.Type == ChartCategoryAxisType.Date)
            {
                var categories = new List<string>();
                foreach (DateTime? date in axis.Categories)
                {
                    categories.Add(FormatDate(date));
                }

                return categories;
            }
            else
            {
                return axis.Categories;
            }
        }
        
        private string FormatDate(DateTime? date)
        {
            return date.HasValue ?
                date.Value.ToString("yyyy/MM/dd HH:mm:ss", CultureInfo.InvariantCulture) :
                string.Empty;
        }
    }
}
