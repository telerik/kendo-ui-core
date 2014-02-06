namespace Kendo.Mvc.UI.Html
{
    using System.Web.Mvc;
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    public class SliderHtmlBuilder<T>: ISliderHtmlBuilder  where T : struct, IComparable
    {
        public SliderHtmlBuilder(Slider<T> component)
        {
            Component = component;
        }

        public Slider<T> Component
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            Func<object, T?> converter = val =>
            {
                return ((T)Convert.ChangeType(val, typeof(T)));
            };

            string value = Component.GetAttemptedValue();
            if (value == null)
            {
                T? result = Component.GetValue(converter);

                if (!result.HasValue)
                {
                    result = Component.Min;
                }

                value = "{0}".FormatWith(result);
            }

            if (!Component.LargeStep.HasValue)
            {
                Component.LargeStep = (T)Convert.ChangeType(5, typeof(T));
                if (Component.LargeStep.Value.CompareTo(Component.SmallStep) < 0)
                {
                    Component.LargeStep = Component.SmallStep;
                }
            }

            var defaultOptions = new Dictionary<string, object>();
            FluentDictionary.For(defaultOptions)
                .Add("type", "range")
                .Add("name", Component.Name)
                .Add("id", Component.Id)
                .Add("step", Component.SmallStep, () => Component.SmallStep.HasValue)
                .Add("min", Component.Min, () => Component.Min.HasValue)
                .Add("max", Component.Max, () => Component.Max.HasValue)
                .Add("value", value, () => value.HasValue());

            return new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(defaultOptions)
                   .Attributes(Component.GetUnobtrusiveValidationAttributes())
                   .Attributes(Component.HtmlAttributes);
        }
    }
}