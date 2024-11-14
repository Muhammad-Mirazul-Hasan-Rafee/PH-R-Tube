// 1. Fetch , Load and Show Categories on html

// createLoadCategories
const loadCategories = () => {
  // fetch data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error));

};

const loadVideos = () => {
  // fetch data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error));
};


const displayVideos = (videos) => {
  const videoContainer = document.getElementById('videos');
  videos.forEach(video => {
    // create card
    const card = document.createElement('div');
    card.classList = 'card card-compact';
    card.innerHTML = `

         <figure class="h-[200px]">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
  </figure>
  <div class="px-0 py-2 flex gap-2">
      <div>

         <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="">

      </div>
      <div>
        <h2 class="font-bold">${video.title}</h2>
      <div class="flex items-center gap-2">
      <p class="text-gray-400">${video.authors[0].profile_name}</p>
      <img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="">
      </div
      <p></p>
  
      </div>

  </div>
        `;

    videoContainer.appendChild(card);

  });

}
// createDisplayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('categories');
  // add data in html
  categories.forEach((item) => {

    console.log(item);
    // create a button
    const button = document.createElement('button');
    button.classList = 'btn';
    button.innerText = item.category;

    // add button to category container
    categoryContainer.appendChild(button);

  });

};



loadCategories();
loadVideos();
