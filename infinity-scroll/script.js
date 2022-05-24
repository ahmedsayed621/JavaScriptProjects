const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = [];
let ready = false;
let imagesLoaded=0;
let totalImages = 0;


const count = 30;
const apiKey='Key'

//unsplash API
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
//helper function
function setAttributes(element,attributes){
     for(const key in attributes){
         element.setAttribute(key,attributes[key])
     }
}

//check if all image were loaded
function imageLoaded(){
    console.log('image loaded')
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
    }
}


//display photos & add dom
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    //run function for each object in array
    photosArray.forEach((photo) =>{

        //create <a> to link unsplash links
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        // setAttributes(item,{
        //     href:photo.links.html,
        //     target:'_blank'
        // })
        //create <img> for a photo
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description)
        img.setAttribute('title',photo.alt_description)
        // setAttributes(img,{
        //     src:photo.urls.regular,
        //     alt:photo.alt_description,
        //     title:photo.alt_description
        // })

        img.addEventListener('load',imageLoded)
        //put <img> inside <a> , hen put both inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
    } );
}


//get photos from unsplash
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        

    }catch(error){

    }
}

//scroll
window.addEventListener('scroll',()=>
{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && ready)
    {
        ready=false;
        getPhotos();
       
    }
})

getPhotos();