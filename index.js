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

  modifyFile(filename, newContents) {
    if (!this.files[filename]) {
      throw new Error(`File ${filename} does not exist`);
    }
    this.files[filename] = newContents;
  }

  stageFile(filename) {
    if (!this.files[filename]) {
      throw new Error(`File ${filename} does not exist`);
    }
    this.staging[filename] = this.files[filename];
    console.log(`${filename} is staged`);
  }

  unstageFile(filename) {
    if (this.staging[filename]) {
      delete this.staging[filename];
    }
  }

  commit(message) {
    const snapshot = { ...this.staging };
    this.commits.push({
      message,
      snapshot,
      timestamp: new Date().toISOString(),
    });
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
console.log(repo.modifyFile("file1", "Everything is great"));
console.log(repo.removeFile("file1"));
