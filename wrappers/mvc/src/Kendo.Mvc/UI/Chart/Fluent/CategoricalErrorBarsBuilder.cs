namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public class CategoricalErrorBarsBuilder : 
        ErrorBarsBuilderBase<CategoricalErrorBarsBuilder, CategoricalErrorBars>
    {
        public CategoricalErrorBarsBuilder(CategoricalErrorBars errorBars)
            : base(errorBars)
        {
        }

        public CategoricalErrorBarsBuilder Value(string value)
        {            
            errorBars.Value = value;

            return this;
        }

        public CategoricalErrorBarsBuilder Value(double value)
        {
            errorBars.Value = value;

            return this;
        }

        public CategoricalErrorBarsBuilder Value(double lowValue, double highValue)
        {
            errorBars.Value = new double[] { lowValue, highValue };

            return this;
        }

        public CategoricalErrorBarsBuilder Value(Func<object, object> inlineCodeBlock)
        {
            errorBars.Value = new ClientHandlerDescriptor { TemplateDelegate = inlineCodeBlock };

            return this;
        } 
    }
}
