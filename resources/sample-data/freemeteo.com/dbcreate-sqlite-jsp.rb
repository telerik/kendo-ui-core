#!/usr/bin/ruby
require 'csv'

# Switch to CRLF in output
$/ = "\r\n"

SRC_DATE_FORMAT = '%d/%m/%Y'

puts %Q{
    CREATE TABLE Weather (
        [ID] INTEGER PRIMARY KEY AUTOINCREMENT,
        [Station] VARCHAR(255) NOT NULL,
        [Date] INT NOT NULL,
        [TMax] DECIMAL(5,2) NOT NULL,
        [TMin] DECIMAL(5,2) NOT NULL,
        [Wind] DECIMAL(5,2) NOT NULL,
        [Gust] DECIMAL(5,2) NULL,
        [Rain] DECIMAL(5,2) NOT NULL,
        [Snow] DECIMAL(5,2) NULL,
        [Events] VARCHAR(255) NULL
    );

    BEGIN TRANSACTION;
}

CSV.foreach('sofia.csv', :headers => true) do |row|
    date = DateTime.strptime("#{row['Date']} #{row['Time']}", SRC_DATE_FORMAT)

    puts %Q{
    INSERT INTO Weather
        ([Station], [Date], [TMax], [TMin], [Wind], [Gust], [Rain], [Snow], [Events])
    VALUES
        ('SOFIA', #{date.to_time.to_i * 1000}, #{row['TMax']}, #{row['TMin']}, #{row['Wind']}, #{row['Gust']}, #{row['Rain']}, #{row['Snow']}, '#{row['Events']}');
    }
end

puts %Q{
    COMMIT TRANSACTION;
}
