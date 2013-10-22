namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public class ErrorBarsBuilderBase<TBuilder, TErrorBars> : IHideObjectMembers
        where TBuilder : ErrorBarsBuilderBase<TBuilder, TErrorBars>
        where TErrorBars: ErrorBarsBase        
    {
        protected readonly TErrorBars errorBars;

        /// <summary>
        /// Initializes a new instance of the <see cref="ErrorBarsBuilderBase{TBuilder}" /> class.
        /// </summary>
        /// <param name="errorBars">The ErrorBars configuration.</param>
        public ErrorBarsBuilderBase(TErrorBars errorBars)
        {
            this.errorBars = errorBars;
        }

        public TBuilder Color(string color)
        {
            errorBars.Color = color;

            return this as TBuilder;
        }

        public TBuilder EndCaps(bool endCaps)
        {
            errorBars.EndCaps = endCaps;

            return this as TBuilder;
        }

        public TBuilder Line(int width, string color, ChartDashType dashType)
        {
            errorBars.Line.Width = width;
            errorBars.Line.Color = color;
            errorBars.Line.DashType = dashType;

            return this as TBuilder;
        }

        public TBuilder Line(Action<ChartLineBuilderBase> configurator)
        {
            configurator(new ChartLineBuilderBase(errorBars.Line));

            return this as TBuilder;
        }
    }
}
