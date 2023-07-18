const fs = require("fs");

class Repository {
  constructor() {
    this.files = {};
    this.staging = {};
    this.commits = [];
  }
  addFile(filename) {
    const contents = fs.readFileSync(filename, "utf-8");
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

  generateHash(input) {
    let hash = 0,
      i,
      chr;
    if (input.length === 0) return hash;
    for (i = 0; i < input.length; i++) {
      chr = input.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  }

  commit(message) {
    if (Object.keys(this.staging).length === 0) {
      throw new Error("No changes to commit");
    }
    const snapshot = { ...this.staging };
    const timestamp = new Date().toISOString();
    const hash = this.generateHash(
      message + timestamp + JSON.stringify(snapshot)
    );
    this.commits.push({ hash, message, snapshot, timestamp });
    this.staging = {};

    // Create the .minigit directory if it doesn't already exist
    if (!fs.existsSync(".minigit")) {
      fs.mkdirSync(".minigit");
    }

    // Write the commit to a file
    fs.writeFileSync(
      `.minigit/commit_${hash}.json`,
      JSON.stringify({ hash, message, snapshot, timestamp }, null, 2)
    );
  }

  getHistory() {
    return this.commits.map(
      (commit, index) => `Commit ${index}: ${commit.message}`
    );
  }
}

const repo = new Repository();
repo.addFile("test.txt");
repo.stageFile("test.txt");
repo.commit("Initial commit");
console.log(repo.getHistory());
console.log(repo.modifyFile("test.txt", "Everything is great"));
console.log(repo.removeFile("test.txt"));
