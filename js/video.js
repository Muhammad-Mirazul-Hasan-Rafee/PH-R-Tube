// Time function 
function getTimeString(time){
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond/60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName('category-btn');
  for(let btn of buttons){
    btn.classList.remove("active");
  }

};
// 1. Fetch , Load and Show Categories on html
// createLoadCategories
const loadCategories = () => {
  // fetch data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error));

};

const loadDetails = async (videoId) => {
  const uri = ` https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);

};
const displayDetails = (video) =>{
  const detailsContainer = document.getElementById('modal-content');

  detailsContainer.innerHTML = `
  <img src=${video.thumbnail} alt="">
  <p>${video.description}</p>
  
  `;
  // one way to show modal :
  // document.getElementById('showModalData').click();

  // second way to show modal :
  document.getElementById('customModal').showModal();




};

const loadVideos = (searchText = "") => {
  
  // fetch data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error));
};

const loadCategoryVideos = (id) => {
  //  alert(id);
   fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
   .then(res => res.json())
   .then(data => {
    // active class remove
    removeActiveClass();

    // active class add
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add(`active`);
    displayVideos(data.category);})
   .catch((error) => console.log(error));
};

const displayVideos = (videos) => {

  const videoContainer = document.getElementById('videos');
   videoContainer.innerHTML = "";

   if(videos.length == 0){
    videoContainer.classList.remove('grid');
    videoContainer.innerHTML = `
    <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
       <img src="assets/Icon.png" alt="">
       <h2 class="text-center text-xl font-bold">Nothing Exists here!</h2>
    </div>
    `;
    return;
   }
   else{
    videoContainer.classList.add('grid');
   }
  videos.forEach(video => {

    // create card
    const card = document.createElement('div');
    card.classList = 'card card-compact';
    card.innerHTML = `
  <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0 ? "" : `<span class="absolute text-xs right-2 bottom-2 text-white bg-black rounded p-1">${getTimeString(video.others.posted_date)}</span>`
      }    
  </figure>
  <div class="px-0 py-2 flex gap-2">
      <div>
         <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="">
      </div>
      <div>
        <h2 class="font-bold">${video.title}</h2>
      <div class="flex items-center gap-2">
      <p class="text-gray-400">${video.authors[0].profile_name}</p>

      ${video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="">` : ""}  
      </div
      <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
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
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
    ${item.category}</button>  
    `;
    // add button to category container
    categoryContainer.appendChild(buttonContainer);

  });
};

document.getElementById('search-input').addEventListener("keyup" , (event) =>{
  loadVideos(event.target.value);


});


loadCategories();
loadVideos();
