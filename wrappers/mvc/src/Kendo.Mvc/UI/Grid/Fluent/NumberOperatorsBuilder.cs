namespace Kendo.Mvc.UI.Fluent
{
    public class NumberOperatorsBuilder : IHideObjectMembers
    {
        private readonly NumberOperators numbers;

        public NumberOperatorsBuilder(NumberOperators operators)
        {
            this.numbers = operators;
        }

        public NumberOperatorsBuilder Clear()
        {
            numbers.Operators.Clear();

            return this;
        }

        public NumberOperatorsBuilder IsEqualTo(string message)
        {
            numbers.Operators["eq"] = message;

            return this;
        }

        public NumberOperatorsBuilder IsNotEqualTo(string message)
        {
            numbers.Operators["neq"] = message;

            return this;
        }

        public NumberOperatorsBuilder IsGreaterThanOrEqualTo(string message)
        {
            numbers.Operators["gte"] = message;

            return this;
        }

        public NumberOperatorsBuilder IsGreaterThan(string message)
        {
            numbers.Operators["gt"] = message;

            return this;
        }

        public NumberOperatorsBuilder IsLessThanOrEqualTo(string message)
        {
            numbers.Operators["lte"] = message;

            return this;
        }

        public NumberOperatorsBuilder IsLessThan(string message)
        {
            numbers.Operators["lt"] = message;

            return this;
        }
    }
}