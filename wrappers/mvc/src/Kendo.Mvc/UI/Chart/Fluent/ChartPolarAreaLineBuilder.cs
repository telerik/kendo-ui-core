using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class ChartPolarAreaLineBuilder: ChartLineBuilderBase
    {
        private readonly ChartPolarAreaLine line;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarAreaLineBuilder" /> class.
        /// </summary>
        /// <param name="line">The chart line.</param>
        public ChartPolarAreaLineBuilder(ChartPolarAreaLine line)
            : base(line)
        {
            this.line = line;
        }

        /// <summary>
        /// Configures the line style for polar area series.
        /// </summary>
        /// <param name="style">The style. The default is normal.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .PolarArea(s => s.Sales)
        ///                .Line(line => line.Style(ChartPolarAreaStyle.Smooth))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartPolarAreaLineBuilder Style(ChartPolarAreaStyle style)
        {
            line.Style = style;

            return this;
        }

    }
}
