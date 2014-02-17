namespace Kendo.Mvc.UI
{
    public class NotificationPositionSettings
    {
        public NotificationPositionSettings()
        {
            Pinned = true;
            Bottom = "20";
            Right = "20";
        }

        public bool Pinned { get; set; }
        public string Top { get; set; }
        public string Left { get; set; }
        public string Bottom { get; set; }
        public string Right { get; set; }
    }
}