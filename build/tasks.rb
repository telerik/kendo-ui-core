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

def file_merge(*args, &block)
    MergeTask.define_task(*args, &block)
end

# Copy file when it is modified
def file_copy(*args)
    file *args do |t|
        dir = t.name.pathmap('%d')
        mkdir_p dir unless Dir.exists?(dir)

        cp t.prerequisites[0], t.name
    end
end

# Copy files when they are modified
def files(files)
    source = FileList[files.values[0]]

    directory = files.keys[0]

    destination = source.pathmap("#{directory}/%f")

    destination.each_with_index do |f, index|
        file_copy f => source[index]
    end
end

def tree(directories)
    source = FileList[directories.values[0]]

    dir = directories.keys[0]

    destination = source.pathmap("#{dir}/%-1d/%f")

    file dir => destination

    destination.each_with_index do |f, index|
        file_copy f => source[index]
    end
end
