namespace Kendo.Mvc.Examples.Models
{
    public class DownloadSpeed
    {
        public DownloadSpeed()
        {
        }

        public DownloadSpeed(int wf, int wt, int of, int ot, string day)
        {
            this.WiFiFrom = wf;
            this.WiFiTo = wt;
            this.OpticalFrom = of;
            this.OpticalTo = ot;
            this.Day = day;
        }

        public int WiFiFrom { get; set; }
        public int WiFiTo { get; set; }
        public int OpticalFrom { get; set; }
        public int OpticalTo { get; set; }
        public string Day { get; set; }
    }
}