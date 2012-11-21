namespace Kendo.Mvc.UI
{
    using System;

    public class ChartAxisBaseUnitSteps
    {
        /// <summary>
        /// The discrete baseUnitStep values when baseUnit is set to Minutes and
        /// baseUnitStep is set to Auto.
        /// </summary>
        public int[] Minutes
        {
            get;
            set;
        }

        /// <summary>
        /// The discrete baseUnitStep values when baseUnit is set to Hours and
        /// baseUnitStep is set to Auto.
        /// </summary>
        public int[] Hours
        {
            get;
            set;
        }

        /// <summary>
        /// The discrete baseUnitStep values when baseUnit is set to Minutes and
        /// baseUnitStep is set to Auto.
        /// </summary>
        public int[] Days
        {
            get;
            set;
        }

        /// <summary>
        /// The discrete baseUnitStep values when baseUnit is set to Weeks and
        /// baseUnitStep is set to Auto.
        /// </summary>
        public int[] Weeks
        {
            get;
            set;
        }

        /// <summary>
        /// The discrete baseUnitStep values when baseUnit is set to Months and
        /// baseUnitStep is set to Auto.
        /// </summary>
        public int[] Months
        {
            get;
            set;
        }

        /// <summary>
        /// The discrete baseUnitStep values when baseUnit is set to Years and
        /// baseUnitStep is set to Auto.
        /// </summary>
        public int[] Years
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartAxisBaseUnitStepsSerializer(this);
        }
    }
}