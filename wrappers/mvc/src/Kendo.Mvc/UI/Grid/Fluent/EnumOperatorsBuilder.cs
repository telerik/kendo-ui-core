namespace Kendo.Mvc.UI.Fluent
{
    public class EnumOperatorsBuilder : IHideObjectMembers
    {
        private readonly EnumOperators enums;

        public EnumOperatorsBuilder(EnumOperators operators)
        {
            this.enums = operators;
        }

        public EnumOperatorsBuilder Clear()
        {
            enums.Operators.Clear();

            return this;
        }

        public EnumOperatorsBuilder IsEqualTo(string message)
        {
            enums.Operators["eq"] = message;

            return this;
        }

        public EnumOperatorsBuilder IsNotEqualTo(string message)
        {
            enums.Operators["neq"] = message;

            return this;
        }       
    }
}