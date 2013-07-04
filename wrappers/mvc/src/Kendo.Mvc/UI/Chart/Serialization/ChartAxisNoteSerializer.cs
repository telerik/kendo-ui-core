namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

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

            if (note.Data.Count > 0)
            {
                var dataList = new List<IDictionary<string, object>>();

                foreach (var item in note.Data)
                {
                    dataList.Add(item.CreateSerializer().Serialize());
                }

                result.Add("data", dataList);
            }

            return result;
        }
    }
}