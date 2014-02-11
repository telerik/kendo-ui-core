namespace Kendo.Mvc.UI
{
    public class SortableCursorOffset
    {
        public SortableCursorOffset()
        {
            Top = int.MinValue;
            Left = int.MinValue;
        }

        public int Top { get; set; }
        public int Left { get; set; }
    }
}