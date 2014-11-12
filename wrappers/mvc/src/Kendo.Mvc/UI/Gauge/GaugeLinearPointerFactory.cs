using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class GaugeLinearPointerFactory : IHideObjectMembers
    {
        private readonly LinearGauge container;

        public GaugeLinearPointerFactory(LinearGauge gaugeContainer)
        {
            container = gaugeContainer;
        }

        public GaugeLinearPointerBuilder Add()
        {
            var pointer = new GaugeLinearPointer();

            container.Pointers.Add(pointer);

            return new GaugeLinearPointerBuilder(pointer);
        }
    }
}
