namespace Kendo.Mvc.Examples.Models
{
    public class WindDataItem
    {
        public int Dir { get; set; }
        public string DirText { get; set; }
        public string Category { get; set; }
        public double Frequency { get; set; }

        public WindDataItem(int dir, string dirText, string category, double frequency)
        {
            Dir = dir;
            DirText = dirText;
            Category = category;
            Frequency = frequency;
        }
    }
}