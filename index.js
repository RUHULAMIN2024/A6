
const allPostContainer= document.getElementById("allPostContainer")
const latestPostcontainer= document.getElementById("latestPostcontainer")
const countSum= document.getElementById("countSum")
const viewCountContainer= document.getElementById("viewCountContainer")
const searchBtn= document.getElementById("searchBtn");




const allPost = async() =>{
    const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await response.json();

    data.posts.forEach(element => {
        let status=null;
        if(element.isActive){
            status="images/status1.png"
        }else{
            status="images/status2.png"
        }
        const div = document.createElement("div");
        div.innerHTML=`
        <div class="flex flex-col md:flex-row mt-8 gap-5 bg-[#f7f8f8] p-5 md:p-8 rounded-3xl">
        <div>
            <div class="w-[72px] h-[72px]  relative bg-white">
                <img class="rounded-xl" src="${element['image']}" alt="">
                <img class="absolute top-0 right-0" src="${status}" alt="">
            </div>
        </div>
        <div>
            <div class="text-sm">
                <span class="mr-8"># ${element['category']}</span>
                <span>Author : ${element.author.name}</span>
            </div>
            <h3 class="font-bold mt-2 text-xl">${element['title']}</h3>
            <p class="py-4 border-b-2 border-dashed">${element['description']}</p>
                <div class="flex mt-4 justify-between">
                    <div class="flex space-x-7">
                        <div class="flex">
                            <img class="mr-2" src="images/icon1.png" alt="">
                            <span>${element['comment_count']}</span>
                        </div>
                        <div class="flex">
                            <img class="mr-2" src="images/icon2.png" alt="">
                            <span>${element['view_count']}</span>
                        </div>
                        <div class="flex">
                            <img class="mr-2" src="images/icon3.png" alt="">
                            <span>${element['posted_time']} Min</span>
                        </div>
                    </div>
                    <div>
                        <img class="cursor-pointer" onclick="viewCount('${element.title}', '${element.view_count}')" src="images/mesege.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        `;
        allPostContainer.appendChild(div)

        

    });
}

allPost();


searchBtn.addEventListener('click', function(){

    const loading= document.getElementById('loading')
        loading.classList.remove('hidden')
    
        setTimeout(()=>{loading.classList.add('hidden')},2000)


    const inputValue= document.getElementById("inputValue").value;
    allPostContainer.innerText='';
    if(inputValue.length===0){
        alert('Please type a category')
    }
    
    const allPost = async(inputValue) =>{
        const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputValue}`);
        const data = await response.json();
    

        data.posts.forEach(element => {
            let status=null;
            if(element.isActive){
                status="images/status1.png"
            }else{
                status="images/status2.png"
            }
            const div = document.createElement("div");
            div.innerHTML=`
            <div class="flex flex-col md:flex-row mt-8 gap-5 bg-[#f7f8f8] p-5 md:p-8 rounded-3xl">
            <div>
                <div class="w-[72px] h-[72px]  relative bg-white">
                    <img class="rounded-xl" src="${element['image']}" alt="">
                    <img class="absolute top-0 right-0" src="${status}" alt="">
                </div>
            </div>
            <div>
                <div class="text-sm">
                    <span class="mr-8"># ${element['category']}</span>
                    <span>Author : ${element.author.name}</span>
                </div>
                <h3 class="font-bold mt-2 text-xl">${element['title']}</h3>
                <p class="py-4 border-b-2 border-dashed">${element['description']}</p>
                    <div class="flex mt-4 justify-between">
                        <div class="flex space-x-7">
                            <div class="flex">
                                <img class="mr-2" src="images/icon1.png" alt="">
                                <span>${element['comment_count']}</span>
                            </div>
                            <div class="flex">
                                <img class="mr-2" src="images/icon2.png" alt="">
                                <span>${element['view_count']}</span>
                            </div>
                            <div class="flex">
                                <img class="mr-2" src="images/icon3.png" alt="">
                                <span>${element['posted_time']} Min</span>
                            </div>
                        </div>
                        <div>
                            <img class="cursor-pointer" onclick="viewCount('${element.title}', '${element.view_count}')" src="images/mesege.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            `;
            allPostContainer.appendChild(div)
    
            
    
        });
    }

    allPost(inputValue)
    

})

const latestPost = async() =>{
    const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await response.json();

    let designation=null;
    
    data.forEach(element => {
        if(element.author.designation){
            designation=element.author.designation;
        }else{
            designation='unknown';
        }

        let postDate= element.author.posted_date? element.author.posted_date: 'No Publish Date';


        const div = document.createElement("div");
        div.innerHTML=`
        <div class="card md:w-96 bg-base-100 border shadow-xl">
            <figure class="px-10 pt-10">
                <img src="${element['cover_image']}" class="rounded-xl" />
            </figure>
            <div class="card-body">
                <div class="flex">
                    <img class="mr-3" src="images/frame.png" alt="">
                    <p>${postDate}</p>
                </div>
                <h2 class="card-title font-extrabold">${element['title']}</h2>
                <p>${element['description']}</p>
                <div class="flex">
                    <div class="w-[45px] h-[45px] mr-3">
                        <img class="rounded-full" src="${element['profile_image']}" alt="">
                    </div>
                    <div>
                        <p>${element.author.name} </p>
                        <p class="text-sm">${designation} </p>
                    </div>
                </div>
            </div>
        </div>
        `;
        latestPostcontainer.appendChild(div)
    });
}

latestPost();

let count =0;
function viewCount(title,view){

count+=1;
countSum.innerText=count;
const div=document.createElement('div');
div.innerHTML=`
    <div class="flex bg-white rounded-xl p-4 mt-3 items-center justify-between">
        <div class="w-[85%]">
            <p>${title}</p>
        </div>
        <div class="flex space-x-2">
            <img class="mr-2" src="images/icon2.png" alt="">
            <span>${view}</span>
        </div>
    </div>
`
viewCountContainer.appendChild(div)

}



