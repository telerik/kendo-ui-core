namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public class QRCodeBuilder : WidgetBuilderBase<QRCode, QRCodeBuilder>, IHideObjectMembers
    {        
        public QRCodeBuilder(QRCode component):
            base(component)
        {
        }

        public QRCodeBuilder Background(string color)
        {
            Component.Background = color;

            return this;
        }

        public QRCodeBuilder Border(Action<QRBorderBuilder> configurator)
        {
            configurator(new QRBorderBuilder(Component.Border));

            return this;
        }

        public QRCodeBuilder DarkModuleColor(string color)
        {
            Component.DarkModuleColor = color;

            return this;
        }

        public QRCodeBuilder ErrorCorrectionLevel(QRErrorCorrectionLevel errorCorrectionLevel)
        {
            Component.ErrorCorrectionLevel = errorCorrectionLevel;

            return this;
        }

        public QRCodeBuilder Size(int size)
        {
            Component.Size = size;

            return this;
        }

        public QRCodeBuilder Value(string value)
        {
            Component.Value = value;

            return this;
        }
    }
}
