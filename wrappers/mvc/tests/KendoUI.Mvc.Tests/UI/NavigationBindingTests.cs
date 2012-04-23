namespace KendoUI.Mvc.UI.Tests
{

    public class NavigationBindingTests
    {
        private readonly NavigationBindingTestDouble binding;

        public NavigationBindingTests()
        {
            binding = new NavigationBindingTestDouble();
        }
    }

    public class NavigationBindingTestDouble : NavigationBinding<NavigationItemTestDouble, TestObject> 
    {   }
}
