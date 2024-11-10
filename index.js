const jobListingsContainer = document.querySelector(".jobListingsContainer");
const filters = document.querySelector(".filters");
const filtersContainer = document.querySelector(".filterContainer");
const jobListingsFragment = document.createDocumentFragment();
let appliedFilters = [];

const jobData = [
  {
    id: 1,
    company: "Photosnap",
    logo: "./images/photosnap.svg",
    new: true,
    featured: true,
    position: "Senior Frontend Developer",
    role: "Frontend",
    level: "Senior",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["HTML", "CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 2,
    company: "Manage",
    logo: "./images/manage.svg",
    new: true,
    featured: true,
    position: "Fullstack Developer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1d ago",
    contract: "Part Time",
    location: "Remote",
    languages: ["Python"],
    tools: ["React"],
  },
  {
    id: 3,
    company: "Account",
    logo: "./images/account.svg",
    new: true,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2d ago",
    contract: "Part Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
  {
    id: 4,
    company: "MyHome",
    logo: "./images/myhome.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "5d ago",
    contract: "Contract",
    location: "USA Only",
    languages: ["CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 5,
    company: "Loop Studios",
    logo: "./images/loop-studios.svg",
    new: false,
    featured: false,
    position: "Software Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Ruby"],
    tools: ["Sass"],
  },
  {
    id: 6,
    company: "FaceIt",
    logo: "./images/faceit.svg",
    new: false,
    featured: false,
    position: "Junior Backend Developer",
    role: "Backend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "UK Only",
    languages: ["Ruby"],
    tools: ["RoR"],
  },
  {
    id: 7,
    company: "Shortly",
    logo: "./images/shortly.svg",
    new: false,
    featured: false,
    position: "Junior Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["HTML", "JavaScript"],
    tools: ["Sass"],
  },
  {
    id: 8,
    company: "Insure",
    logo: "./images/insure.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["Vue", "Sass"],
  },
  {
    id: 9,
    company: "Eyecam Co.",
    logo: "./images/eyecam-co.svg",
    new: false,
    featured: false,
    position: "Full Stack Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "3w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Python"],
    tools: ["Django"],
  },
  {
    id: 10,
    company: "The Air Filter Company",
    logo: "./images/the-air-filter-company.svg",
    new: false,
    featured: false,
    position: "Front-end Dev",
    role: "Frontend",
    level: "Junior",
    postedAt: "1mo ago",
    contract: "Part Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
];

const renderJobList = (data) => {
  jobListingsContainer.innerHTML = data.map(createJobListingCard).join("");
};

const renderFiltersList = (data) => {
  filters.innerHTML = data.map(createFilterTab).join("");
};

const createJobListingCard = (data) => {
  const skills = data.languages.concat(data.tools);

  return `<div class="jobListingsCard" data-role=${data.role} data-level=${data.level} data-languages=${data.languages} data-tools=${
    data.tools
  }>
            <div>
            <div class="companyLogo"><img src=${data.logo} alt=${data.logo} /></div>
            <div class="jobDesc">
                <div class="jobType">
                <p>${data.company}</p>
                ${
                  data.new
                    ? `<div>
                      <p>NEW!</p>
                    </div>`
                    : ""
                }
                ${
                  data.featured
                    ? `<div>
                      <p>FEATURED!</p>
                    </div>`
                    : ""
                }
                </div>
                <h3 class="position">${data.position}</h3>
                <ul class="jobTimeInfo">
                <li>${data.postedAt}</li>
                <li>${data.contract}</li>
                <li>${data.location}</li>
                </ul>
            </div>
            </div>
            <hr />
            <div class="skills">
            <div class="skillTab"><p>${data.role}</p></div>
            <div class="skillTab"><p>${data.level}</p></div>
            ${skills.map((skill) => `<div class="skillTab"><p>${skill}</p></div>`).join("")}
            </div>
        </div>`;
};

const createFilterTab = (filter) => {
  return `<div class="filterTab">
            <p>${filter}</p>
            <div class="removeIcon"><img src="./images/icon-remove.svg" alt="icon remove" /></div>
          </div>`;
};

renderJobList(jobData);

const filterJobs = (appliedFilters) => {
  const jobListingCards = document.querySelectorAll(".jobListingsCard");
  jobListingCards.forEach((card) => {
    const cardDataAttributes = Object.entries(card.dataset)
      .map(([key, value]) => {
        if (key === "tools" || key === "languages") {
          return value.split(",");
        }
        return value;
      })
      .flat();
    const isVisible = appliedFilters.every((filter) => cardDataAttributes.includes(filter));
    card.style.display = isVisible ? (window.matchMedia("(min-width: 750px)")?.matches ? "flex" : "block") : "none";
  });

  // Toggle filter container visibility
};

const toggleClearFilterButton = () => {
  if (!filtersContainer.classList.contains("invisible")) {
    document.querySelector(".clearFilter")?.addEventListener("click", () => applyFilter("", "clear"));
  }
};

const applyFilter = (filterName, type) => {
  if (type === "add" && !appliedFilters.includes(filterName)) {
    appliedFilters.push(filterName);
  } else if (type === "remove") {
    appliedFilters = appliedFilters.filter((filter) => filter !== filterName);
  } else if (type === "clear") {
    appliedFilters = [];
  }
  filtersContainer.classList.toggle("invisible", appliedFilters?.length === 0);
  renderFiltersList(appliedFilters);
  filterJobs(appliedFilters);
  toggleClearFilterButton();
};

// Event delegation for dynamically added skill tabs
jobListingsContainer.addEventListener("click", (e) => {
  if (e.target.closest(".skillTab")) {
    const filterName = e.target.innerText;
    applyFilter(filterName, "add");
  }
});

// Event delegation for remove filter buttons
filters.addEventListener("click", (e) => {
  if (e.target.closest(".removeIcon")) {
    const filterName = e.target.parentElement.previousElementSibling.textContent;
    applyFilter(filterName, "remove");
  }
});

window.addEventListener("resize", () => {
  const jobListingCards = document.querySelectorAll(".jobListingsCard");
  jobListingCards.forEach((card) => {
    card.style.display = window.matchMedia("(min-width: 750px)")?.matches ? "flex" : "block";
  });
});
// Initial render of job data
renderJobList(jobData);
