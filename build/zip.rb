require 'zip/zip'

class ZipTask < Rake::FileTask
    include Rake::DSL

    def out_of_date?(stamp)
        dir = name.pathmap('%d/%n')
        FileList["#{dir}/**/*"].any? { |n| application[n, @scope].timestamp > stamp }
    end

    def execute(args=nil)

        dir = name.pathmap('%d/%n')

        rm_rf name, :verbose => false

        $stderr.puts("Creating #{name}") if VERBOSE

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
