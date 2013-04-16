namespace Kendo.Mvc.UI
{
    public class WindowPositionSettings
    {
        public WindowPositionSettings()
        {
            Top = int.MinValue;
            Left = int.MinValue;
        }

        public int Top { get; set; }
        public int Left { get; set; }
    }
}