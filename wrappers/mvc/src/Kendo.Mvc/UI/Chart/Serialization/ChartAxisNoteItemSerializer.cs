namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartAxisNoteItemSerializer : ChartNoteSerializer
    {
        private readonly ChartAxisNoteItem note;

        public ChartAxisNoteItemSerializer(ChartAxisNoteItem note)
            : base(note)
        {
            this.note = note;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("value", note.Value, () => note.Value != null);

            return result;
        }
    }
}