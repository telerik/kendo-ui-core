using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class GaugeRadialPointerFactory : IHideObjectMembers
    {
        private readonly RadialGauge container;

        public GaugeRadialPointerFactory(RadialGauge gaugeContainer)
        {
            container = gaugeContainer;
        }

        public GaugeRadialPointerBuilder Add()
        {
            var pointer = new GaugeRadialPointer();

            container.Pointers.Add(pointer);

            return new GaugeRadialPointerBuilder(pointer);
        }
    }
}
