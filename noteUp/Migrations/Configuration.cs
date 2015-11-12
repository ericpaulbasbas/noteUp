namespace noteUp.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using noteUp.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<noteUp.Models.noteUpContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "WebApi.Models.NotesContext";
        }

        protected override void Seed(noteUp.Models.noteUpContext context)
        {
            context.Notes.AddOrUpdate(x => x.Id,
                new Note()
                {
                    Title = "Note 1",
                    Body = "This is a note by Eric"
                },
                new Note()
                {
                    Title = "Note 2",
                    Body = "This is a note by Paul"
                }
            );
        }
    }
}
