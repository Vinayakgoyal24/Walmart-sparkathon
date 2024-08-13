const fs = require("fs");
const csvParser = require("csv-parser");
const { MongoClient } = require("mongodb");
const chokidar = require("chokidar");

async function startCsvWatcher(uri, dbName, collectionName, csvFilePath) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log("Connected to MongoDB");

  async function updateMongoDB() {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.deleteMany({});

    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", async (row) => {
        await collection.insertOne(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed and MongoDB updated");
      })
      .on("error", (error) => {
        console.error("Error processing CSV file:", error);
      });
  }

  function watchCsvFile() {
    const watcher = chokidar.watch(csvFilePath, {
      persistent: true,
      ignoreInitial: false,
      usePolling: true,
    });

    watcher.on("change", () => {
      console.log("CSV file has changed. Updating MongoDB...");
      updateMongoDB();
    });

    console.log("Watching for changes in the CSV file...");
  }

  await updateMongoDB(); // Initial load of the CSV file into MongoDB
  watchCsvFile(); // Watch for further changes

  process.on("SIGINT", async () => {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  });
}

module.exports = startCsvWatcher;
