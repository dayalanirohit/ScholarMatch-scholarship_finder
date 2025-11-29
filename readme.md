<a id="readme-top"></a>
<br />
<div align="center">
  <h3 align="center">ScholarMatch</h3>
  <p align="center">
    A user-friendly platform to discover and track scholarships from multiple sources in one place. Simplify your scholarship search with personalized filters and timely alerts.
    <br />
    <a href="https://github.com/ArshChand/Scholarship_Finder"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://scholarship-finder-frontend-vm6f.onrender.com/login">View Demo</a>
    ·
    <a href="https://github.com/ArshChand/Scholarship_Finder/issues/new?template=bug_report.md&labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/ArshChand/Scholarship_Finder/issues/new?template=feature_request.md&labels=enhancement">Request Feature</a>
  </p>
</div>

---
## Developer Contacts

**Bhavya Bharti** - [GitHub](https://github.com/bhavyabhart)

**Arsh Chand** - [GitHub](https://github.com/ArshChand)  

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

## About The Project

Scholarship Finder is a comprehensive web application that simplifies the scholarship search process by aggregating listings from multiple trusted sources into a single, easy-to-use platform. It helps students filter scholarships based on eligibility criteria, deadlines, and preferences, making the application process more efficient and targeted.

Users can register and log in to save scholarships, set preferences, and receive personalized recommendations. The backend scraper continuously updates scholarship data to keep listings fresh.

This project is ideal for students looking to maximize scholarship opportunities without spending hours scouring numerous websites.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Built With

- **Frontend:** React.js, 
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Scraping:** Axios, Puppeteer
- **Authentication:** JWT  
- **Deployment:** Render

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or above)
- MongoDB Atlas account or local MongoDB instance 

### Installation

1. Clone the repo

```bash
git clone
cd Scholarship_Finder
   ```

2. Setup Frontend

  ```bash
  cd Frontend
  npm install
  npm start
  ```

3. Setup Backend

  ```bash
  cd ../Backend
  npm install
  node server.js
  
  ```

4. Create a .env file in the /Backend directory with the following:

  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=5000
  HEADLESS=true
  
  ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

- Browse and search for scholarships from trusted sources in one platform
- Filter scholarships by  deadline, GPA, and other criteria
- My scholarships after logging in for easy reference
- Deadline pop up reminder

### Manual Scraper Trigger
Currently, to update the scholarship listings, you need to manually trigger the scraper by visiting this endpoint in your browser:

```bash
http://localhost:5000/api/scholarships/fetch
```

This will run the scraper and update the database with the latest scholarships.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Roadmap

Planned features and enhancements:

-  Add advanced filters such as location, field of study
-  Automate scrapers to update data daily or weekly
-  Email notifications for deadlines and saved scholarships
-  Admin dashboard to manage sources and monitor scraper performance
-  Improve mobile responsiveness and UI/UX

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contributing

Contributions are welcome and appreciated! To contribute:

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to your branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request to the main repo

Please follow the existing code style and include meaningful commit messages.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<p align="right">(<a href="#readme-top">back to top</a>)</p>
