const toggleBtn = document.getElementById('toggle-btn');
const navMenu = document.querySelector('.nav-menu ul');

toggleBtn.addEventListener('click', () => {
  navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
});

let cardsWrapperElement = document.getElementById("cards-wrapper");
const fetchApiForCarousel = async () => {
  try {
    const response = await fetch("https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=10&pageNo=1&keyWord=&category=&isPending=false");
    const product = await response.json();

    // Create a new array to hold the chunks of cards per slide
    let chunks = [];

    // Loop through the array of job postings and group them into chunks of 3 cards
    let currentChunk = [];
    product.data.forEach((job, index) => {
      currentChunk.push(`
        <div class="card card-body">
          <div class="first">
            <div class="company-details">
              <p>${job.companyName} </p>
              <p>${job.designation || "Anonymous"}</p>
              <p>${job.payRangeStart} - ${job.payRangeEnd} </p>
            </div>
            <div class="company-logo">
              <img src="monly.png" alt="Company Logo" />
            </div>
          </div>
          <div class="second">
            <p>${job.city}</p>
            <p>${job.views} views</p>
          </div>
          <div class="third">
            <p>${job.createdAt} </p>
            <p>Posted By ${job.user.userName}</p>
          </div>
        </div>
      `);

      // When 3 cards are collected, add the chunk to the chunks array and reset
      if (currentChunk.length === 3 || index === product.data.length - 1) {
        chunks.push(currentChunk.join(''));
        currentChunk = [];
      }
    });

    // Add the chunks to the carousel
    let carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = '';  // Clear existing slides
    chunks.forEach((chunk, index) => {
      const slideClass = index === 0 ? 'carousel-item active' : 'carousel-item';  // Make the first slide active
      carouselInner.innerHTML += `
        <div class="${slideClass}">
          <div class="cards-wrapper">
            ${chunk}
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    cardsWrapperElement.innerHTML = "<p>Error fetching job postings.</p>";
  }
};

fetchApiForCarousel();

// Set carousel to change every 2 seconds


let stepBoxParentElement = document.getElementById("stepBoxParent");

let fetchApiForStepBox = async () => {
  try {
    let response = await fetch("https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=10&pageNo=1&keyWord=&category=&isPending=false");
    let fetchedData = await response.json();
    fetchedData.data.forEach((element) => {
      stepBoxParentElement.innerHTML +=
      `<div class="stepBox">
        <i class="fa-solid fa-user"></i>
        <p>${element.category.name}</p>
        <p>${element.category.postCounts}</p>
      </div>`
    })

  }
  catch (error) {
    console.log("error")
  }
}
fetchApiForStepBox();
