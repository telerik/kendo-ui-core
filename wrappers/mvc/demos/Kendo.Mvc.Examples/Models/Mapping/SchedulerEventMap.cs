namespace Kendo.Mvc.Examples.Models.Mapping
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;
    using Kendo.Mvc.UI;

    public class SchedulerEventMap : EntityTypeConfiguration<SchedulerEvent>
    {
        public SchedulerEventMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.Title)
                .IsRequired();

            // Table & Column Mappings
            this.ToTable("SchedulerEvents");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Title).HasColumnName("Title");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.AllDayEvent).HasColumnName("AllDayEvent");
            this.Property(t => t.Start).HasColumnName("Start");
            this.Property(t => t.End).HasColumnName("End");
        }
    }
}
