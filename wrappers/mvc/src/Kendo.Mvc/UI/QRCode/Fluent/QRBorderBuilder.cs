namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="QRBorder"/>.
    /// </summary>
    public class QRBorderBuilder: IHideObjectMembers
    {        
        private readonly QRBorder border;

        /// <summary>
        /// Initializes a new instance of the <see cref="QRBorderBuilder" /> class.
        /// </summary>
        /// <param name="border">The qr code border.</param>
        public QRBorderBuilder(QRBorder border)
        {
            this.border = border;
        }

        /// <summary>
        /// Sets the border width.
        /// </summary>
        /// <param name="width">The border width.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Border(border =&gt; border.Width(5))
        /// )
        /// </code>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Border(border =&gt; border.Width(5))
        /// %&gt;
        /// </code>
        /// </example>
        public QRBorderBuilder Width(int width)
        {
            border.Width = width;

            return this;
        }

        /// <summary>
        /// Sets the border color.
        /// </summary>
        /// <param name="color">The border color.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Border(border =&gt; border.Color(&quot;black&quot;))
        /// )
        /// </code>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Border(border =&gt; border.Color(&quot;black&quot;))
        /// %&gt;
        /// </code>
        /// </example>
        public QRBorderBuilder Color(string color)
        {
            border.Color = color;

            return this;
        }
    }
}
