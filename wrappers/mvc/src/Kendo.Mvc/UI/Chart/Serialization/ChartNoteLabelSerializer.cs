namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    internal class ChartNoteLabelSerializer : ChartLabelsBase
    {
        private readonly ChartNoteLabel label;

        public ChartNoteLabelSerializer(ChartNoteLabel label)
            : base(label)
        {
            this.label = label;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("position", label.Position.ToString().ToCamelCase(), () => label.Position.HasValue)
                .Add("text", label.Text, () => label.Text.HasValue());

            return result;
        }
    }
}