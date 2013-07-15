namespace Kendo.Mvc.Examples.Models
{
    public class GrandSlam
    {
        public GrandSlam()
        {
        }

        public GrandSlam(int year, int win, int loss, string extremum = null)
        {
            Year = year;
            Win = win;
            Loss = loss;
            Extremum = extremum;
        }

        public int Year { get; set; }
        public int Win { get; set; }
        public int Loss { get; set; }
        public string Extremum { get; set; }
    }
}