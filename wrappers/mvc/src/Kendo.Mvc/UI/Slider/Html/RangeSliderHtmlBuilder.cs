namespace Kendo.Mvc.UI.Html
{
    using System.Web.Mvc;
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    public class RangeSliderHtmlBuilder<T> : IRangeSliderHtmlBuilder  where T : struct, IComparable
    {
        public RangeSliderHtmlBuilder(RangeSlider<T> component)
        {
            Component = component;
        }

        public RangeSlider<T> Component
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            if (!Component.SelectionStart.HasValue)
            {
                Component.SelectionStart = Component.Min;
            }

            if (!Component.SelectionEnd.HasValue)
            {
                Component.SelectionEnd = Component.Max;
            }

            if (!Component.LargeStep.HasValue)
            {
                Component.LargeStep = (T)Convert.ChangeType(5, typeof(T));
                if (Component.LargeStep.Value.CompareTo(Component.SmallStep) < 0)
                {
                    Component.LargeStep = Component.SmallStep;
                }
            }

            var div = new HtmlElement("div")
                        .Attributes(new { id = Component.Id })
                        .Attributes(Component.GetUnobtrusiveValidationAttributes())
                        .Attributes(Component.HtmlAttributes);

            var defaultOptions = new Dictionary<string, object>();
            FluentDictionary.For(defaultOptions)
                .Add("type", "range")
                .Add("step", Component.SmallStep, () => Component.SmallStep.HasValue)
                .Add("min", Component.Min, () => Component.Min.HasValue)
                .Add("max", Component.Max, () => Component.Max.HasValue);

            var firstInputOptions = new Dictionary<string, object>(defaultOptions);
            FluentDictionary.For(firstInputOptions)
                .Add("name ", string.Format("{0}[0]", Component.Name))
                .Add("value", Component.GetValue("{0}[0]".FormatWith(Component.Name), Component.SelectionStart), () => Component.SelectionStart.HasValue);

            var secondInputOptions = new Dictionary<string, object>(defaultOptions);
            FluentDictionary.For(secondInputOptions)
                .Add("name ", string.Format("{0}[1]", Component.Name))
                .Add("value", Component.GetValue("{0}[1]".FormatWith(Component.Name), Component.SelectionEnd), () => Component.SelectionEnd.HasValue);

            new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(firstInputOptions)
                   .AppendTo(div);

            new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(secondInputOptions)
                   .AppendTo(div);

            return div;
        }
    }
}