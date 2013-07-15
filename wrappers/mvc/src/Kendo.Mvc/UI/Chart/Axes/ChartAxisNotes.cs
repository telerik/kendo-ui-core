using System.Collections.Generic;
namespace Kendo.Mvc.UI
{
    public class ChartAxisNotes : ChartNote
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisNotes" /> class.
        /// </summary>
        public ChartAxisNotes()
        {
            Icon = new ChartMarkers();
            Label = new ChartNoteLabel();
            Line = new ChartNoteLine();
            Data = new List<ChartAxisNoteItem>();
        }
        /// <summary>
        /// Gets or sets the note position.
        /// </summary>
        public IList<ChartAxisNoteItem> Data
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartAxisNoteSerializer(this);
        }
    }
}