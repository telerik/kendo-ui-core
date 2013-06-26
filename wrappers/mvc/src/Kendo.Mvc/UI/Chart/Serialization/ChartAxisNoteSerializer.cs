namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartAxisNoteSerializer<T> : ChartNoteSerializer
        where T : struct
    {
        private readonly ChartAxisNotes<T> note;

        public ChartAxisNoteSerializer(ChartAxisNotes<T> note)
            : base(note)
        {
            this.note = note;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            if (note.Items.Count > 0)
            {
                var dataList = new List<IDictionary<string, object>>();

                foreach (var item in note.Items)
                {
                    dataList.Add(item.CreateSerializer().Serialize());
                }

                result.Add("items", dataList);
            }

            return result;
        }
    }
}