namespace Kendo.Mvc.UI.Fluent
{
    public class DateOperatorsBuilder : IHideObjectMembers
    {
        private readonly DateOperators numbers;

        public DateOperatorsBuilder(DateOperators operators)
        {
            this.numbers = operators;
        }

        public DateOperatorsBuilder Clear()
        {
            numbers.Operators.Clear();

            return this;
        }

        public DateOperatorsBuilder IsEqualTo(string message)
        {
            numbers.Operators["eq"] = message;

            return this;
        }

        public DateOperatorsBuilder IsNotEqualTo(string message)
        {
            numbers.Operators["neq"] = message;

            return this;
        }

        public DateOperatorsBuilder IsGreaterThanOrEqualTo(string message)
        {
            numbers.Operators["gte"] = message;

            return this;
        }

        public DateOperatorsBuilder IsGreaterThan(string message)
        {
            numbers.Operators["gt"] = message;

            return this;
        }

        public DateOperatorsBuilder IsLessThanOrEqualTo(string message)
        {
            numbers.Operators["lte"] = message;

            return this;
        }

        public DateOperatorsBuilder IsLessThan(string message)
        {
            numbers.Operators["lt"] = message;

            return this;
        }
    }
}