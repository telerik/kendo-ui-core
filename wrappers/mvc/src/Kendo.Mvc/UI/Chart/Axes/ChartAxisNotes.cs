using System.Collections.Generic;
namespace Kendo.Mvc.UI
{
    public class ChartAxisNotes<T> : ChartNote
        where T : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisNotes" /> class.
        /// </summary>
        public ChartAxisNotes()
        {
            Icon = new ChartMarkers();
            Label = new ChartNoteLabel();
            Line = new ChartNoteLine();
            Items = new List<ChartAxisNoteItem<T>>();
        }
        /// <summary>
        /// Gets or sets the note position.
        /// </summary>
        public IList<ChartAxisNoteItem<T>> Items
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartAxisNoteSerializer<T>(this);
        }
    }
}