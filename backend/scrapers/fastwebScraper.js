// backend/scrapers/fastwebScraper.js
const puppeteer = require('puppeteer');

async function scrapeFastweb() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com/scholarships');

  await page.waitForSelector('.scholarship-card'); // wait for JS to load content

  const scholarships = await page.evaluate(() => {
    const elements = document.querySelectorAll('.scholarship-card');
    return Array.from(elements).map(card => ({
      title: card.querySelector('.title')?.innerText,
      amount: card.querySelector('.amount')?.innerText,
      deadline: card.querySelector('.deadline')?.innerText,
      applicationLink: card.querySelector('a')?.href,
      source: 'Fastweb'
    }));
  });

  await browser.close();
  return scholarships;
}

module.exports = scrapeFastweb;