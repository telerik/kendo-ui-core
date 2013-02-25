namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the chart target.
    /// </summary>
    public class ChartBulletTargetBuilder
    {
        private readonly ChartBulletTarget target;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBulletTargetBuilder" /> class.
        /// </summary>
        /// <param name="chartTarget">The chart target configuration.</param>
        public ChartBulletTargetBuilder(ChartBulletTarget chartTarget)
        {
            target = chartTarget;
        }

        /// <summary>
        /// Sets the target width.
        /// </summary>
        /// <param name="width">The target width.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Bullet(s => s.Current, s => s.Target)
        ///               .Target(target => target
        ///                   .Width(10)
        ///               );
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBulletTargetBuilder Width(int width)
        {
            target.Width = width;
            return this;
        }

        /// <summary>
        /// Sets the target border
        /// </summary>
        /// <param name="width">The target border width.</param>
        /// <param name="color">The target border color (CSS syntax).</param>
        /// <param name="dashType">The target border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Bullet(s => s.Current, s => s.Target)
        ///               .Target(target => target
        ///                    .Border(1, "Red", ChartDashType.Dot)
        ///                );
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBulletTargetBuilder Border(int width, string color, ChartDashType dashType)
        {
            target.Border = new ChartElementBorder(width, color, dashType);
            return this;
        }

        /// <summary>
        /// Configures the markers border
        /// </summary>
        /// <param name="configurator">The border configuration action</param>
        public ChartBulletTargetBuilder Border(Action<ChartBorderBuilder> configurator)
        {
            configurator(new ChartBorderBuilder(target.Border));
            return this;
        }

        /// <summary>
        /// Sets the color of the bullet chart target.
        /// </summary>
        /// <param name="color">The color of the bullet chart target.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Bullet(s => s.Current, s => s.Target)
        ///               .Target(target => target
        ///                    .Color("Red");
        ///                );
        ///             )
        ///             .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBulletTargetBuilder Color(string color)
        {
            target.Color = color;

            return this;
        }
    }
}