class Repository {
  constructor() {
    this.files = {};
    this.staging = {};
    this.commits = [];
  }
  addFile(filename, contents) {
    this.files[filename] = contents;
    console.log(`files name: ${filename} and content: ${contents}`);
  }

  stageFile(filename) {
    if (!this.files[filename]) {
      throw new Error(`File ${filename} does not exist`);
    }
    this.staging[filename] = this.files[filename];
    console.log(`${filename} is staged`);
  }
}

const repo = new Repository();
repo.addFile("file1", "Hello World");
repo.stageFile("file1");
