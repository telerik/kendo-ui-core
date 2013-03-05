namespace Kendo.Mvc.Examples.Models
{
    public class SocialBenefits
    {
        public SocialBenefits()
        {
        }

        public SocialBenefits(SocialBenefitType type, double value)
        {
            Type = type;
            Value = value;
        }

        public SocialBenefitType Type { get; set; }
        public double Value { get; set; }
    }
}