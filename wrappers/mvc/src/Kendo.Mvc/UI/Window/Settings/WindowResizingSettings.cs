namespace Kendo.Mvc.UI
{
    public class WindowResizingSettings
    {
        public WindowResizingSettings()
        {
            Enabled = false;
            MinHeight = int.MinValue;
            MinWidth = int.MinValue;
            MaxHeight = int.MinValue;
            MaxWidth = int.MinValue;
        }

        public bool Enabled { get; set; }
        public int MinWidth { get; set; }
        public int MinHeight { get; set; }
        public int MaxWidth { get; set; }
        public int MaxHeight { get; set; }
    }
}
