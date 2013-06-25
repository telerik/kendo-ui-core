namespace Kendo.Mvc.Examples.Models
{
    public class ElectricityProduction
    {
        public ElectricityProduction()
        {
        }

        public ElectricityProduction(string year, int solar, int hydro, int wind, int nuclear)
        {
            Year = year;
            Solar = solar;
            Hydro = hydro;
            Wind = wind;
            Nuclear = nuclear;
        }

        public string Year { get; set; }
        public int Solar { get; set; }
        public int Nuclear { get; set; }
        public int Hydro { get; set; }
        public int Wind { get; set; }
    }
}