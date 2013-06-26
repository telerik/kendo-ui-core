namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Infrastructure;

    internal class ChartNumericAxisSerializer : ChartAxisSerializerBase<double>
    {
        private readonly IChartNumericAxis axis;

        public ChartNumericAxisSerializer(IChartNumericAxis axis)
            : base(axis)
        {
            this.axis = axis;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("axisCrossingValue", axis.AxisCrossingValues, () => axis.AxisCrossingValues.Count() > 0)
                .Add("min", axis.Min, () => axis.Min.HasValue)
                .Add("max", axis.Max, () => axis.Max.HasValue)
                .Add("majorUnit", axis.MajorUnit, () => axis.MajorUnit.HasValue)
                .Add("minorUnit", axis.MinorUnit, () => axis.MinorUnit.HasValue);


            var notes = axis.Notes.CreateSerializer().Serialize();
            if (notes.Count > 0)
            {
                result.Add("notes", notes);
            }

            return result;
        }
    }
}