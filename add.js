// ADD PRODUCT
let addBtn= document.querySelector('#addModel')
addBtn.addEventListener('click',()=>{
contentClear('.add-section')
})

let firstImgInput= document.querySelector('#img')
firstImgInput.addEventListener('input',(e)=>{
document.querySelector('.img-place').innerHTML=`<img src='${e.target.value}'>`
})

let addImg= document.querySelector('.add-imgUrl')
let addImg1= document.querySelector('.add-imgUrl1')

addImg.addEventListener('click',(e)=>{
	e.preventDefault()
	let p = document.createElement('p')
	p.classList.add('extras')
	let input= document.createElement('input')
	input.classList.add('img_input')
	input.required=true
	input.placeholder='Img Url'
	let btn = document.createElement('span')
	btn.textContent='delete'
	btn.classList.add('delete-img')
	btn.addEventListener('click',(e)=>{
		e.preventDefault()
		btn.parentElement.remove()
	})
	addImg.before(p)
	p.append(input,btn)
	input.focus()
})
addImg1.addEventListener('click',(e)=>{
	e.preventDefault()
	let p = document.createElement('p')
	p.classList.add('extras')
	let input= document.createElement('input')
	input.classList.add('img_input1')
	input.required=true
	input.placeholder='Img Url'
	let btn = document.createElement('span')
	btn.textContent='delete'
	btn.classList.add('delete-img')
	btn.addEventListener('click',(e)=>{
		e.preventDefault()
		btn.parentElement.remove()
	})
	addImg1.before(p)
	p.append(input,btn)
})

// Cancel button
document.querySelector('#cancel_product').addEventListener('click',()=>{
	let extras= document.querySelectorAll('.extras')
let wrapper= document.querySelector('.img-wrap')
for(let i=0;i<extras.length;i++){
	wrapper.removeChild(extras[i])
}
document.querySelector('.img-place').innerHTML=`<div class="img">
<i class="fa-regular fa-image"></i>`
document.querySelector('#addProductForm').reset()
contentClear('.products-section')
})
// Submit button
document.querySelector('#addProductForm').addEventListener('submit',(e)=>{
e.preventDefault()
let imgUrls= document.querySelectorAll('.img_input')
let imgUrlArray=[]
for(let i=0;i<imgUrls.length;i++){
	imgUrlArray.push(imgUrls[i].value)
}
fetch('http://localhost:3000/products',{
	method:'POST',
	headers:{'Content-type':'application/json'},
	body:JSON.stringify(
		{
			title: document.querySelector('#product-name').value,
			description:document.querySelector('#product-desc').value,
			price:document.querySelector('#product-price').value,
			category:document.querySelector('#product-category').value,
			images:imgUrlArray,
			comment:[]
	
		}
	)
})
productsArray.push(
	{
		title: document.querySelector('#product-name').value,
		description:document.querySelector('#product-desc').value,
		price:document.querySelector('#product-price').value,
		category:document.querySelector('#product-category').value,
		images:imgUrlArray,
		comment:[]

	}
)
let extras= document.querySelectorAll('.extras')
let wrapper= document.querySelector('.img-wrap')
for(let i=0;i<extras.length;i++){
	wrapper.removeChild(extras[i])
}
document.querySelector('.img-place').innerHTML=`<div class="img">
<i class="fa-regular fa-image"></i>`


document.querySelector('#addProductForm').reset()
let res=confirm('do you want to reload the page')
if(res){
	window.location.reload()
}
contentClear('.products-section')
})
