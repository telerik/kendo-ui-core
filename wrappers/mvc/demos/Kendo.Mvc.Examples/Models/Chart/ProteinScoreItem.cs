namespace Kendo.Mvc.Examples.Models
{
    public class ProteinScoreItem
    {
        public string Name { get; set; }
        public string Abbr { get; set; }
        public int Score { get; set; }

        public ProteinScoreItem(string name, string abbr, int score)
        {
            Name = name;
            Abbr = abbr;
            Score = score;
        }
    }
}