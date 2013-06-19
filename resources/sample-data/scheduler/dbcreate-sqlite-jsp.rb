#!/usr/bin/ruby
require 'csv'

# Switch to CRLF in output
$/ = "\r\n"

YEARS_TO_ADD = Time.now.year - 2009

puts %Q{
    DROP TABLE Meetings;

    CREATE TABLE Meetings (
        [MeetingID] INTEGER PRIMARY KEY AUTOINCREMENT,
        [Start] INT NOT NULL,
        [End] INT NOT NULL,
        [Title] TEXT,
        [Description] TEXT,
        [Recurrence] TEXT,
        [IsAllDay] INT NOT NULL,
        [RoomID] INT
    );

    DROP TABLE MeetingAtendee;

    CREATE TABLE MeetingAtendee (
        [MeetingID] INTEGER,
        [AtendeeID] INTEGER
    );

    DROP TABLE Tasks;

    CREATE TABLE Tasks (
        [TaskID] INTEGER PRIMARY KEY AUTOINCREMENT,
        [Start] INT NOT NULL,
        [End] INT NOT NULL,
        [Title] TEXT,
        [Description] TEXT,
        [Recurrence] TEXT,
        [IsAllDay] INT NOT NULL,
        [OwnerID] INT
    );


    BEGIN TRANSACTION;
}

CSV.foreach('meeting.csv', :headers => true) do |row|
    start_date = DateTime.iso8601(row['Start'])
    end_date = DateTime.iso8601(row['End'])

    puts %Q{
    INSERT INTO Meetings
        ([MeetingID], [Start], [End], [Title], [Description], [Recurrence], [IsAllDay], [RoomID])
    VALUES
        (#{row['MeetingID']}, #{start_date.to_time.to_i * 1000}, #{end_date.to_time.to_i * 1000}, "#{row['Title']}", "#{row['Description']}", "#{row['Recurrence']}", #{row['IsAllDay'] == 'True' ? 1 : 0}, #{row['RoomID']});
    }
end

CSV.foreach('task.csv', :headers => true) do |row|
    start_date = DateTime.iso8601(row['Start'])
    end_date = DateTime.iso8601(row['End'])

    puts %Q{
    INSERT INTO Tasks
        ([TaskID], [Start], [End], [Title], [Description], [Recurrence], [IsAllDay], [OwnerID])
    VALUES
        (#{row['TaskID']}, #{start_date.to_time.to_i * 1000}, #{end_date.to_time.to_i * 1000}, "#{row['Title']}", "#{row['Description']}", "#{row['Recurrence']}", #{row['IsAllDay'] == 'True' ? 1 : 0}, #{row['OwnerID']});
    }
end

CSV.foreach('meeting-atendee.csv', :headers => true) do |row|
    puts %Q{
    INSERT INTO MeetingAtendee
        ([MeetingID], [AtendeeID])
    VALUES
        (#{row['MeetingID']}, #{row['AtendeeID']});
    }
end

puts %Q{
    COMMIT TRANSACTION;
}
