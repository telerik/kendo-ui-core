namespace Kendo.Mvc.Examples.Models.Chart
{
    public class SunPositionItem
    {
        public string Time { get; set; }
        public double Altitude { get; set; }
        public double Azimuth { get; set; }

        public SunPositionItem(string time, double altitude, double azimuth)
        {
            Time = time;
            Altitude = altitude;
            Azimuth = azimuth;
        }
    }
}