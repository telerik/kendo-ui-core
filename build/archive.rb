require 'zip/zip'

class ZipTask < Rake::FileTask
    include Rake::DSL

    def execute(args=nil)

        dir = name.pathmap('%d/%n')

        rm_rf name

        Zip::ZipFile.open(name, Zip::ZipFile::CREATE) do |file|
            $stderr.puts "Archive "
            Dir[File.join(dir, '**', '*')].each do |src|
                entry = src.sub(File.join(dir, File::SEPARATOR), "")
                $stderr.puts "\t#{entry}"
                file.add entry, src
            end
            $stderr.puts "to #{name}"
        end
    end
end

def zip(*args, &block)
    ZipTask.define_task(*args, &block)
end
