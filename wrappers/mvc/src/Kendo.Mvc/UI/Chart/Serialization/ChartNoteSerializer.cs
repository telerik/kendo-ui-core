namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartNoteSerializer : IChartSerializer
    {
        private readonly ChartNote note;

        public ChartNoteSerializer(ChartNote note)
        {
            this.note = note;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("position", note.Position.ToString().ToCamelCase(), () => note.Position.HasValue);

            var labelData = note.Label.CreateSerializer().Serialize();
            if (labelData.Count > 0)
            {
                result.Add("label", labelData);
            }

            var iconData = note.Icon.CreateSerializer().Serialize();
            if (iconData.Count > 0)
            {
                result.Add("icon", labelData);
            }

            var lineData = note.Line.CreateSerializer().Serialize();
            if (lineData.Count > 0)
            {
                result.Add("line", lineData);
            }

            return result;
        }
    }
}