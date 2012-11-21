namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    internal class ChartCategoryAxisSerializer : ChartAxisSerializerBase<int>
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
                .Add("field", axis.Member, () => axis.Categories == null && axis.Member != null)
                .Add("axisCrossingValue", axis.AxisCrossingValues, () => axis.AxisCrossingValues.Count() > 0)
                .Add("min", axis.Min.ToJavaScriptString(), () => axis.Min != null)
                .Add("max", axis.Max.ToJavaScriptString(), () => axis.Max != null)
                .Add("roundToBaseUnit", axis.RoundToBaseUnit, () => axis.RoundToBaseUnit.HasValue)
                .Add("justified", axis.Justified, () => axis.Justified.HasValue);

            if (axis.BaseUnit != null)
            {
                result.Add("baseUnit", axis.BaseUnit.ToString().ToLowerInvariant());
            }

            if (axis.BaseUnitStep.HasValue)
            {
                if (axis.BaseUnitStep > 0)
                {
                    result.Add("baseUnitStep", axis.BaseUnitStep);
                }
                else
                {
                    result.Add("baseUnitStep", "auto");
                }
            }

            if (axis.Categories != null)
            {
               result.Add("categories", SerializeCategories());
            }

            var autoBaseUnits = axis.AutoBaseUnitSteps.CreateSerializer().Serialize();
            if (autoBaseUnits.Count > 0)
            {
                result.Add("autoBaseUnitSteps", autoBaseUnits);
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
                    categories.Add(date.ToJavaScriptString());
                }

                return categories;
            }
            else
            {
                return axis.Categories;
            }
        }
    }
}