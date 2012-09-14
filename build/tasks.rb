class MergeTask < Rake::FileTask
    def execute(args=nil)
        File.open(name, 'w') do |output|
            puts "Merge\n\t#{prerequisites.join("\n\t")} \nto #{name}"

            prerequisites.each do |src|
                File.open(src, 'r:bom|utf-8') do |file|
                    output.write file.read
                end
            end
        end
    end
end

def merge(*args, &block)
    MergeTask.define_task(*args, &block)
end

# Copy file when it is modified
def cp_file(*args)
    file *args do |t|
        cp t.prerequisites[0], t.name
    end
end

# Copy files when they are modified
def cp_files(files)
    source = FileList[files.values[0]]

    directory = files.keys[0]

    destination = source.pathmap("#{directory}/%f")

    destination.each_with_index do |f, index|
        cp_file f => source[index]
    end
end
