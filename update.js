// DELETE
function deleteItem(id){
	fetch(`http://localhost:3000/products/${id}`,{
		method:'DELETE'
	}).then((res)=>res.json()).then(res=>{
		productsArray = productsArray.filter(el=>el.id!=res.id)
		writeToProducts()
	}
		)
	
}




// UPDATE PRODUCT

let nameProduct =document.querySelector('#product-name1')
let descProduct = document.querySelector('#product-desc1')
let priceProduct= document.querySelector('#product-price1')
let categoryProduct=document.querySelector('#product-category1')
let productID;
function editItem(id){
	productID=id
contentClear('.update-section')
fetch(`http://localhost:3000/products/${id}`).then(res=>res.json()).then(res=>{
	nameProduct.value=res.title,
	descProduct.value=res.description,
	priceProduct.value=res.price,
	categoryProduct.value=res.category
	console.log(res.images);
	res.images.forEach((el,index)=>{
		if(index==0){
			document.querySelector('#img1').value=el
			document.querySelector('.img-place1').innerHTML=`<img src='${el}'>`

		}else{
			let p = document.createElement('p')
			p.classList.add('extras1')
			let input= document.createElement('input')
			input.classList.add('img_input1')
			input.required=true
			input.placeholder='Img Url'
			input.value= el
			input.focus()
			let btn = document.createElement('span')
			btn.textContent='delete'
			btn.classList.add('delete-img')
			btn.addEventListener('click',(e)=>{
				e.preventDefault()
				btn.parentElement.remove()
			})
			p.append(input,btn)
			document.querySelector('.add-imgUrl1').before(p)
		
		}
	})


})
}


document.querySelector('#updateProductForm').addEventListener('submit',(e)=>{
		e.preventDefault()
		let imgUrls= document.querySelectorAll('.img_input1')
		let imgUrlArray=[]
		for(let i=0;i<imgUrls.length;i++){
			imgUrlArray.push(imgUrls[i].value)
	}
fetch(`http://localhost:3000/products/${productID}`,{
	method:'PATCH',
	headers:{'Content-type':'application/json'},
	body:JSON.stringify(
		{
				title:nameProduct.value,
			description:descProduct.value,
			price:priceProduct.value,
			category:categoryProduct.value,
			images:imgUrlArray,
			comment:[]
	
		}
	)
})
let extras= document.querySelectorAll('.extras1')
let wrapper= document.querySelector('.img-wrap1')
for(let i=0;i<extras.length;i++){
		wrapper.removeChild(extras[i])
}
document.querySelector('.img-place1').innerHTML=`<div class="img">
<i class="fa-regular fa-image"></i>`


document.querySelector('#updateProductForm').reset()
let res =confirm('do you want to reload the page')
if(res){
	window.location.reload()
}
contentClear('.products-section')
// window.location.reload()
})


// fetch(`http://localhost:3000/products/${id}`,{
// 	method:'PATCH',
// 	headers:{
// 		'Content-type':'application/json'
// 	},
// 	body:JSON.stringify({
// 		title:nameProduct.value,
// 		description:descProduct.value,
// 		price:priceProduct.value,
// 		category:categoryProduct.value,
// 		images:[],
// 		comment:[]
// 	})
// })