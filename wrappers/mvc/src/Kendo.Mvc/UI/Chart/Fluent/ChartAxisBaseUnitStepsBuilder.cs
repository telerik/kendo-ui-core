namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartAxisBaseUnitStepsBuilder"/>.
    /// </summary>
    public class ChartAxisBaseUnitStepsBuilder : IHideObjectMembers
    {
        private readonly ChartAxisBaseUnitSteps baseUnitSteps;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisBaseUnitStepsBuilder" /> class.
        /// </summary>
        /// <param name="baseUnitSteps">The axis base unit steps.</param>
        public ChartAxisBaseUnitStepsBuilder(ChartAxisBaseUnitSteps baseUnitSteps)
        {
            this.baseUnitSteps = baseUnitSteps;
        }

        /// <summary>
        /// The discrete BaseUnitStep values when BaseUnit is set to Minutes and
        /// BaseUnitStep is set to 0 (auto).
        /// </summary>
        /// <param name="steps">The discrete steps when BaseUnit is set to Minutes.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///     .Name("chart")
        ///     .Title("Units sold")
        ///     .Series(series => {
        ///         series
        ///             .Column(new int[] { 20, 40, 45, 30, 50 });
        ///     })
        ///     .CategoryAxis(axis => axis
        ///         .Date()
        ///         .BaseUnit(ChartAxisBaseUnit.Fit)
        ///         .AutoBaseUnitSteps(steps => steps.Minutes(1, 2))
        ///     )
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisBaseUnitStepsBuilder Minutes(params int[] steps)
        {
            baseUnitSteps.Minutes = steps;

            return this;
        }

        /// <summary>
        /// The discrete BaseUnitStep values when BaseUnit is set to Hours and
        /// BaseUnitStep is set to 0 (auto).
        /// </summary>
        /// <param name="steps">The discrete steps when BaseUnit is set to Hours.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///     .Name("chart")
        ///     .Title("Units sold")
        ///     .Series(series => {
        ///         series
        ///             .Column(new int[] { 20, 40, 45, 30, 50 });
        ///     })
        ///     .CategoryAxis(axis => axis
        ///         .Date()
        ///         .BaseUnit(ChartAxisBaseUnit.Fit)
        ///         .AutoBaseUnitSteps(steps => steps.Hours(1, 2))
        ///     )
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisBaseUnitStepsBuilder Hours(params int[] steps)
        {
            baseUnitSteps.Hours = steps;

            return this;
        }

        /// <summary>
        /// The discrete BaseUnitStep values when BaseUnit is set to Days and
        /// BaseUnitStep is set to 0 (auto).
        /// </summary>
        /// <param name="steps">The discrete steps when BaseUnit is set to Days.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///     .Name("chart")
        ///     .Title("Units sold")
        ///     .Series(series => {
        ///         series
        ///             .Column(new int[] { 20, 40, 45, 30, 50 });
        ///     })
        ///     .CategoryAxis(axis => axis
        ///         .Date()
        ///         .BaseUnit(ChartAxisBaseUnit.Fit)
        ///         .AutoBaseUnitSteps(steps => steps.Days(1, 2))
        ///     )
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisBaseUnitStepsBuilder Days(params int[] steps)
        {
            baseUnitSteps.Days = steps;

            return this;
        }

        /// <summary>
        /// The discrete BaseUnitStep values when BaseUnit is set to Weeks and
        /// BaseUnitStep is set to 0 (auto).
        /// </summary>
        /// <param name="steps">The discrete steps when BaseUnit is set to Weeks.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///     .Name("chart")
        ///     .Title("Units sold")
        ///     .Series(series => {
        ///         series
        ///             .Column(new int[] { 20, 40, 45, 30, 50 });
        ///     })
        ///     .CategoryAxis(axis => axis
        ///         .Date()
        ///         .BaseUnit(ChartAxisBaseUnit.Fit)
        ///         .AutoBaseUnitSteps(steps => steps.Weeks(1, 2))
        ///     )
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisBaseUnitStepsBuilder Weeks(params int[] steps)
        {
            baseUnitSteps.Weeks = steps;

            return this;
        }

        /// <summary>
        /// The discrete BaseUnitStep values when BaseUnit is set to Months and
        /// BaseUnitStep is set to 0 (auto).
        /// </summary>
        /// <param name="steps">The discrete steps when BaseUnit is set to Months.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///     .Name("chart")
        ///     .Title("Units sold")
        ///     .Series(series => {
        ///         series
        ///             .Column(new int[] { 20, 40, 45, 30, 50 });
        ///     })
        ///     .CategoryAxis(axis => axis
        ///         .Date()
        ///         .BaseUnit(ChartAxisBaseUnit.Fit)
        ///         .AutoBaseUnitSteps(steps => steps.Months(1, 2))
        ///     )
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisBaseUnitStepsBuilder Months(params int[] steps)
        {
            baseUnitSteps.Months = steps;

            return this;
        }

        /// <summary>
        /// The discrete BaseUnitStep values when BaseUnit is set to Years and
        /// BaseUnitStep is set to 0 (auto).
        /// </summary>
        /// <param name="steps">The discrete steps when BaseUnit is set to Years.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///     .Name("chart")
        ///     .Title("Units sold")
        ///     .Series(series => {
        ///         series
        ///             .Column(new int[] { 20, 40, 45, 30, 50 });
        ///     })
        ///     .CategoryAxis(axis => axis
        ///         .Date()
        ///         .BaseUnit(ChartAxisBaseUnit.Fit)
        ///         .AutoBaseUnitSteps(steps => steps.Years(1, 2))
        ///     )
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisBaseUnitStepsBuilder Years(params int[] steps)
        {
            baseUnitSteps.Years = steps;

            return this;
        }
    }
}