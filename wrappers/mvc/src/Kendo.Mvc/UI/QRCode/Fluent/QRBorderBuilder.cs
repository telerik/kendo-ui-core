namespace Kendo.Mvc.UI.Fluent
{
    public class QRBorderBuilder: IHideObjectMembers
    {        
        private readonly QRBorder border;

        public QRBorderBuilder(QRBorder border)
        {
            this.border = border;
        }


        public QRBorderBuilder Width(int width)
        {
            border.Width = width;

            return this;
        }

        public QRBorderBuilder Color(string color)
        {
            border.Color = color;

            return this;
        }
    }
}
