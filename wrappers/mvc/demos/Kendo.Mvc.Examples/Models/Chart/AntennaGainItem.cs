namespace Kendo.Mvc.Examples.Models.Chart
{
    public class AntennaGainItem
    {
        public double Azimuth { get; set; }
        public double Gain { get; set; }

        public AntennaGainItem(double azimuth, double gain)
        {
            Azimuth = azimuth;
            Gain = gain;
        }
    }
}