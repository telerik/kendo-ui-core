namespace Kendo.Mvc.UI
{
    public class NotificationPositionSettings
    {
        public NotificationPositionSettings()
        {
            Pinned = true;
            Bottom = 20;
            Right = 20;
            Top = int.MinValue;
            Left = int.MinValue;
        }

        public bool Pinned { get; set; }
        public int Top { get; set; }
        public int Left { get; set; }
        public int Bottom { get; set; }
        public int Right { get; set; }
    }
}