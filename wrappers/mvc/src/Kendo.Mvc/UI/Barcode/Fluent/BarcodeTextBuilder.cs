using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class BarcodeTextBuilder
    {
        private BarcodeTextElement text;

        public BarcodeTextBuilder(BarcodeTextElement text)
        {
            this.text = text;
        }

        public BarcodeTextBuilder Margin(int margin)
        {
            text.Margin.Top = text.Margin.Bottom = text.Margin.Left = text.Margin.Right = margin;

            return this;
        }

        public BarcodeTextBuilder Margin(Action<BarcodeSpacingBuilder> configurator) 
        {
            configurator(new BarcodeSpacingBuilder(text.Margin));
            return this;
        }

        public BarcodeTextBuilder Color(string color)
        {
            text.Color = color;
            return this;
        }

        public BarcodeTextBuilder Font(string font)
        {
            text.Font = font;
            return this;
        }

        public BarcodeTextBuilder Visible(bool isVisible)
        {
            text.Visible = isVisible;
            return this;
        }
    }
}
