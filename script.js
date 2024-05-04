let sideBarNavbar= document.querySelector('.navbar')
let categories = document.querySelector('.category-btn')
let chevronDown = document.querySelector('.categories i')
let open = true
const bgWrap= document.querySelector('#bg-wrap')
categories.addEventListener('click', ()=>{
	if(open){
		chevronDown.classList.remove('fa-chevron-down')
		chevronDown.classList.add('fa-chevron-up')
		document.querySelector('.category-dropdown').classList.add('open')
		open=false
	}else{
		chevronDown.classList.add('fa-chevron-down')
		chevronDown.classList.remove('fa-chevron-up')
		document.querySelector('.category-dropdown').classList.remove('open')
		open=true
	}
	
})


function contentClear(content){
	let children=document.querySelector('.content').children
	let onContent= document.querySelector(content)
	for(let i=0;i<children.length;i++){
		if(children[i] !==onContent){
		children[i].classList.add('dnone')
		}else{
			if(children[i].classList.contains('dnone')){
				children[i].classList.remove('dnone')
			}
		}
	}
	
}
contentClear('.dashbord-section')
navClick('.nav-dashbord')
function navClick(element){
let clicked= document.querySelector(element)

for(let i=0;i<sideBarNavbar.children.length;i++){
	if(clicked ==sideBarNavbar.children[i]){
		sideBarNavbar.children[i].classList.add('onContent')
		}else{
			if(sideBarNavbar.children[i].classList.contains('onContent')){
				sideBarNavbar.children[i].classList.remove('onContent')
			}
		}
}

}


sideBarNavbar.addEventListener('click',(e)=>{
	if(e.target.classList.contains('nav-dashbord')){
		contentClear('.dashbord-section')
		navClick('.nav-dashbord')
	}else if(e.target.classList.contains('nav-products')){
		contentClear('.products-section')
		navClick('.nav-products')

	}else if(e.target.classList.contains('nav-order')){
		contentClear('.orders-section')
		navClick('.nav-order')

	}
})



const accountBtn = document.querySelector('#account')
const accountModel= document.querySelector('.admin-model')
accountBtn.onclick=()=>{
	bgWrap.style.display='block'
	accountModel.style.display='flex'
}
bgWrap.onclick=()=>{
	bgWrap.style.display='none'
	accountModel.style.display='none'
}