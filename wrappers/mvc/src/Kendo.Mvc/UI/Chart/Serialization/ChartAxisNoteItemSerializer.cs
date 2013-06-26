namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartAxisNoteItemSerializer<T> : ChartNoteSerializer
       where T : struct
    {
        private readonly ChartAxisNoteItem<T> note;

        public ChartAxisNoteItemSerializer(ChartAxisNoteItem<T> note)
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