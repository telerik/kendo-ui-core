require 'zip/zip'

class ZipTask < Rake::FileTask
    include Rake::DSL

    def execute(args=nil)

        dir = name.pathmap('%d/%n')

        rm_rf name

        Zip::ZipFile.open(name, Zip::ZipFile::CREATE) do |file|
            Dir[File.join(dir, '**', '*')].each do |src|
                entry = src.sub(File.join(dir, File::SEPARATOR), "")
                file.add entry, src
            end
        end
    end
end

def zip(*args, &block)
    ZipTask.define_task(*args, &block)
end
