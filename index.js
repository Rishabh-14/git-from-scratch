class Repository {
  constructor() {
    this.files = {};
    this.staging = {};
    this.commits = [];
  }
  addFile(fileName, contents) {
    this.files[fileName] = contents;
    console.log(`files name: ${fileName} and content: ${contents}`);
  }
}

const repo = new Repository();
repo.addFile("file1", "Hello World");
