namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Xunit;

    public class DependencyInjectionContainerTests
    {
        private readonly DependencyInjectionContainer container;

        public DependencyInjectionContainerTests()
        {
            container = new DependencyInjectionContainer();
        }

        [Fact]
        public void Should_resolve_registered()
        {
            container.Register<IFoo1>(() => new Foo());

            Assert.IsType<Foo>(container.Resolve<IFoo1>());
        }

        [Fact]
        public void Should_return_null_when_dependency_is_not_registered()
        {
            Assert.Null(container.Resolve<IFoo1>());
        }

        [Fact]
        public void Should_resolve_inner_dependencies()
        {
            container.Register<IFoo1>(() => new Foo());
            container.Register<IBar, IFoo1>((foo) => new Bar(foo));

            var result = container.Resolve<IBar>();
            Assert.IsType<Bar>(result);
            Assert.IsType<Foo>(result.Foo1);
        }        
        
        [Fact]
        public void Should_resolve_inner_dependencies_with_two_arguments()
        {
            container.Register<IFoo1>(() => new Foo());
            container.Register<IFoo2>(() => new Foo());
            container.Register<IBar, IFoo1, IFoo2>((foo1, foo2) => new Bar(foo1, foo2));

            var result = container.Resolve<IBar>();
            Assert.IsType<Bar>(result);
            Assert.IsType<Foo>(result.Foo1);
            Assert.NotNull(result.Foo1);
            Assert.IsType<Foo>(result.Foo2);
            Assert.NotNull(result.Foo2);
        }        
        
        [Fact]
        public void Should_resolve_inner_dependencies_with_three_arguments()
        {
            container.Register<IFoo1>(() => new Foo());
            container.Register<IFoo2>(() => new Foo());
            container.Register<IFoo3>(() => new Foo());
            
            container.Register<IBar, IFoo1, IFoo2, IFoo3>((foo1, foo2, foo3) => new Bar(foo1, foo2, foo3));

            var result = container.Resolve<IBar>();
            Assert.IsType<Bar>(result);
            Assert.IsType<Foo>(result.Foo1);
            Assert.NotNull(result.Foo1);
            Assert.IsType<Foo>(result.Foo2);
            Assert.NotNull(result.Foo2);
            Assert.IsType<Foo>(result.Foo3);
            Assert.NotNull(result.Foo3);
        }        
        
        [Fact]
        public void Should_resolve_inner_dependencies_with_four_arguments()
        {
            container.Register<IFoo1>(() => new Foo());
            container.Register<IFoo2>(() => new Foo());
            container.Register<IFoo3>(() => new Foo());
            container.Register<IFoo4>(() => new Foo());
            
            container.Register<IBar, IFoo1, IFoo2, IFoo3, IFoo4>((foo1, foo2, foo3, foo4) => new Bar(foo1, foo2, foo3, foo4));

            var result = container.Resolve<IBar>();
            Assert.IsType<Bar>(result);
            Assert.IsType<Foo>(result.Foo1);
            Assert.NotNull(result.Foo1);
            Assert.IsType<Foo>(result.Foo2);
            Assert.NotNull(result.Foo2);
            Assert.IsType<Foo>(result.Foo3);
            Assert.NotNull(result.Foo3);
            Assert.IsType<Foo>(result.Foo4);
            Assert.NotNull(result.Foo4);
        }

        [Fact]
        public void Should_allow_explicit_depdendency_resolution()
        {
            container.Register<IFoo1>(() => new Foo());

            container.Register<IBar>(c => new Bar(c.Resolve<IFoo1>()));

            var result = container.Resolve<IBar>();
            Assert.IsType<Bar>(result);
            Assert.IsType<Foo>(result.Foo1);
            Assert.NotNull(result.Foo1);
        }

        interface IFoo1
        {
        }        
        interface IFoo2
        {
        }        
        
        interface IFoo3
        {
        }        
        
        interface IFoo4
        {
        }        
        
        class Foo : IFoo1, IFoo2, IFoo3, IFoo4
        {
        }

        interface IBar
        {
            IFoo1 Foo1 { get; }
            IFoo2 Foo2 { get; }
            IFoo3 Foo3 { get; }
            IFoo4 Foo4 { get; }
        }

        class Bar : IBar
        {
            public IFoo1 Foo1
            {
                get;
                private set;
            }
            public IFoo2 Foo2
            {
                get;
                private set;
            }
            public IFoo3 Foo3
            {
                get;
                private set;
            }
            
            public IFoo4 Foo4
            {
                get;
                private set;
            }

            
            public Bar(IFoo1 foo1, IFoo2 foo2, IFoo3 foo3, IFoo4 foo4)
            {
                this.Foo1 = foo1;
                this.Foo2 = foo2;
                this.Foo3 = foo3;
                this.Foo4 = foo4;
            }

            public Bar(IFoo1 foo1, IFoo2 foo2, IFoo3 foo3)
                : this(foo1, foo2, foo3, null)
            {
            }

            public Bar(IFoo1 foo1, IFoo2 foo2)
                : this(foo1, foo2, null)
            {
                this.Foo1 = foo1;
            }            
            
            public Bar(IFoo1 foo1) : this(foo1, null, null)
            {
            }
            
        }

    }
}
