namespace Kendo.Mvc.UI.Html
{
    using System.Web.Mvc;
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

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
            var defaultOptions = new Dictionary<string, object>();
            FluentDictionary.For(defaultOptions)
                .Add("type", "range")
                .Add("name", Component.Name)
                .Add("id", Component.Id)
                .Add("step", Component.SmallStep, () => Component.SmallStep.HasValue)
                .Add("min", Component.Min, () => Component.Min.HasValue)
                .Add("max", Component.Max, () => Component.Max.HasValue)
                .Add("value", Component.Value, () => Component.Value.HasValue);

            return new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(defaultOptions)
                   .Attributes(Component.HtmlAttributes)
                   .Attributes(Component.GetUnobtrusiveValidationAttributes());
        }
    }
}