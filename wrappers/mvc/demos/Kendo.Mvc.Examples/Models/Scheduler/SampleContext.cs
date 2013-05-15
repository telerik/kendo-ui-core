namespace Kendo.Mvc.Examples.Models.Scheduler
{
    using System.Data.Entity;
    using Kendo.Mvc.Examples.Models.Mapping;
    using Kendo.Mvc.UI;

    public partial class SampleContext<T> : DbContext
        where T : class, ISchedulerEvent
    {
        static SampleContext()
        {
            Database.SetInitializer<SampleContext<T>>(null);
        }

        public SampleContext()
            : base("Name=SampleContext")
        {
        }

        public DbSet<T> SchedulerEvents { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new SchedulerEventMap());
        }
    }
}
