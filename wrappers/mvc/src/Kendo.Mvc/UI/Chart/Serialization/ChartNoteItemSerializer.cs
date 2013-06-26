namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartNoteItemSerializer : ChartNoteSerializer
    {
        private readonly ChartNoteItem note;

        public ChartNoteItemSerializer(ChartNoteItem note)
            : base(note)
        {
            this.note = note;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("value", note.Value, () => note.Value.HasValue);

            return result;
        }
    }
}