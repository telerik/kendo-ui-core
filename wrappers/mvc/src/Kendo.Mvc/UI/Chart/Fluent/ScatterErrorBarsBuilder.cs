namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public class ScatterErrorBarsBuilder :
        ErrorBarsBuilderBase<ScatterErrorBarsBuilder, ScatterErrorBars>
    {
        public ScatterErrorBarsBuilder(ScatterErrorBars errorBars)
            : base(errorBars)
        {
        }

        public ScatterErrorBarsBuilder XValue(string xValue)
        {
            errorBars.XValue = xValue;

            return this;
        }

        public ScatterErrorBarsBuilder XValue(double xValue)
        {
            errorBars.XValue = xValue;

            return this;
        }

        public ScatterErrorBarsBuilder XValue(double xLowValue, double xHighValue)
        {
            errorBars.XValue = new double[] { xLowValue, xHighValue };

            return this;
        }

        public ScatterErrorBarsBuilder XValue(Func<object, object> inlineCodeBlock)
        {
            errorBars.XValue = new ClientHandlerDescriptor { TemplateDelegate = inlineCodeBlock };

            return this;
        }

        public ScatterErrorBarsBuilder YValue(string yValue)
        {
            errorBars.YValue = yValue;

            return this;
        }

        public ScatterErrorBarsBuilder YValue(double yValue)
        {
            errorBars.YValue = yValue;

            return this;
        }

        public ScatterErrorBarsBuilder YValue(double yLowValue, double yHighValue)
        {
            errorBars.YValue = new double[] { yLowValue, yHighValue };

            return this;
        }

        public ScatterErrorBarsBuilder YValue(Func<object, object> inlineCodeBlock)
        {
            errorBars.YValue = new ClientHandlerDescriptor { TemplateDelegate = inlineCodeBlock };

            return this;
        }
    }
}

