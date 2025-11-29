// backend/manualScrape.js
const mongoose = require('mongoose');
const Scholarship = require('./models/scholarship');
const scrapeScholarshipsCom = require('./scrapers/scholarshipScraper'); 
// Make sure this filename is correct
require('dotenv').config();

const runScraper = async () => {
  try {
    // 1. Connect to the database
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB.');

    // 2. Run the scraper function
    console.log('Starting the scraper... this may take a few minutes.');
    const scholarships = await scrapeScholarshipsCom();
    console.log(`Scraper finished, found ${scholarships.length} potential scholarships.`);

    if (scholarships.length === 0) {
      console.log('No scholarships found. Exiting.');
      return;
    }

    // 3. Clear old data and save new data
    console.log('Deleting old scholarships from the database...');
    await Scholarship.deleteMany({});
    console.log('Saving new scholarships to the database...');
    await Scholarship.insertMany(scholarships);
    console.log(`Successfully saved ${scholarships.length} new scholarships!`);

  } catch (error) {
    console.error('An error occurred during the scraping process:', error);
  } finally {
    // 4. Disconnect from the database
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB.');
  }
};

// Run the entire process
runScraper();