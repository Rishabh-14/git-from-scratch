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

  removeFile(filename) {
    if (this.files[filename]) {
      delete this.files[filename];
      console.log("file deleted from repo");
    }
    if (this.staging[filename]) {
      delete this.staging[filename];
      console.log("File deleted from staging area");
    }
  }

  stageFile(filename) {
    if (!this.files[filename]) {
      throw new Error(`File ${filename} does not exist`);
    }
    this.staging[filename] = this.files[filename];
    console.log(`${filename} is staged`);
  }

  commit(message) {
    const snapshot = { ...this.staging };
    this.commits.push({ message, snapshot });
    this.staging = {};
  }

  getHistory() {
    return this.commits.map(
      (commit, index) => `Commit ${index}: ${commit.message}`
    );
  }
}

const repo = new Repository();
repo.addFile("file1", "Hello World");
repo.stageFile("file1");
repo.commit("Initial commit");
console.log(repo.getHistory());
console.log(repo.removeFile("file1"));
