namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public class WindowButtons : IWindowButtonsContainer
    {
        private IList<IWindowButton> container;

        public WindowButtons()
        {
            container = new List<IWindowButton>();
        }

        public IList<IWindowButton> Container
        {
            get 
            {
                return this.container;
            }
        }
    }
}
