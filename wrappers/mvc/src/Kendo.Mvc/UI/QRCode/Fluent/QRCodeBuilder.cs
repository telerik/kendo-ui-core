namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="QRCode"/> component.
    /// </summary>
    public class QRCodeBuilder : WidgetBuilderBase<QRCode, QRCodeBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="QRCodeBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public QRCodeBuilder(QRCode component):
            base(component)
        {
        }

        /// <summary>
        /// Sets the background color of the QR code.
        /// </summary>
        /// <param name="color">The QR code background color.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Background(&quot;red&quot;)
        /// )
        /// </code>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Background(&quot;red&quot;)
        /// %&gt;
        /// </code>
        /// </example>
        public QRCodeBuilder Background(string color)
        {
            Component.Background = color;

            return this;
        }

        /// <summary>
        /// Sets the border width and color of the QR code.
        /// </summary>
        /// <param name="color">The QR code border color.</param>
        /// <param name="width">The QR code border width.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Border(&quot;black&quot;, 5)
        /// )
        /// </code>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Border(&quot;black&quot;, 5)
        /// %&gt;
        /// </code>
        /// </example>
        public QRCodeBuilder Border(string color, int width)
        {
            Component.Border.Color = color;
            Component.Border.Width = width;

            return this;
        }

        /// <summary>
        /// Sets the border configuration of the QRCode.
        /// </summary>
        /// <param name="configurator">The lambda which configures the border.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Border(border =&gt;
        ///         // configure the border
        ///         border
        ///             .Color(&quot;black&quot;)
        ///             .Width(5)
        ///     )
        /// )
        /// </code>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Border(border =&gt;
        ///         // configure the border
        ///         border
        ///             .Color(&quot;black&quot;)
        ///             .Width(5)
        ///     )
        /// %&gt;
        /// </code>
        /// </example>
        public QRCodeBuilder Border(Action<QRBorderBuilder> configurator)
        {
            configurator(new QRBorderBuilder(Component.Border));

            return this;
        }

        /// <summary>
        /// Sets the color of the QR code.
        /// </summary>
        /// <param name="color">The QR code color.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Color(&quot;blue&quot;)
        /// )
        /// </code>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Color(&quot;blue&quot;)
        /// %&gt;
        /// </code>
        /// </example>
        public QRCodeBuilder Color(string color)
        {
            Component.Color = color;

            return this;
        }

        /// <summary>
        /// Sets the error correction level of the QR code.
        /// </summary>
        /// <param name="errorCorrectionLevel">The QR code error correction level.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .ErrorCorrectionLevel(QRErrorCorrectionLevel.Q)
        /// )
        /// </code>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .ErrorCorrectionLevel(QRErrorCorrectionLevel.Q)
        /// %&gt;
        /// </code>
        /// </example>
        public QRCodeBuilder ErrorCorrectionLevel(QRErrorCorrectionLevel errorCorrectionLevel)
        {
            Component.ErrorCorrectionLevel = errorCorrectionLevel;

            return this;
        }


        /// <summary>
        /// Sets the size of the QR code.
        /// </summary>
        /// <param name="size">The QR code size.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Size(170)
        /// )
        /// </code>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Size(170)
        /// %&gt;
        /// </code>
        /// </example>
        public QRCodeBuilder Size(int size)
        {
            Component.Size = size;

            return this;
        }

        /// <summary>
        /// Sets the value of the QR code.
        /// </summary>
        /// <param name="value">The QR value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Value(&quot;Hello world&quot;)
        /// )
        /// </code>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().QRCode()
        ///     .Name(&quot;qrCode&quot;)
        ///     .Value(&quot;Hello world&quot;)
        /// %&gt;
        /// </code>
        /// </example>
        public QRCodeBuilder Value(string value)
        {
            Component.Value = value;

            return this;
        }
    }
}
