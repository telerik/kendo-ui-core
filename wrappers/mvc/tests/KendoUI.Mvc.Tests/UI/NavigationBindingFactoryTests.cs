namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections;
    using Xunit;

    public class NavigationBindingFactoryTests
    {
        private readonly NavigationBindingFactoryTestsDouble factory;

        public NavigationBindingFactoryTests()
        {
            factory = new NavigationBindingFactoryTestsDouble();
        }

        [Fact]
        public void For_should_create_navigationBinding_for_TestObject()
        {
            Func<TestObject, IEnumerable> func = o => o.childObjects;
            Action<NavigationItemTestDouble, TestObject> action = (i, o) => { i.Text = o.Text; };
            factory.For<TestObject>(binding => binding.Children(func).ItemDataBound(action));

            Assert.Equal(1, factory.container.Count);
        }
    }

    public class NavigationBindingFactoryTestsDouble : NavigationBindingFactory<NavigationItemTestDouble> 
    {
        
    }
}
