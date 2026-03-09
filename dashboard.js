function goPage(page){
window.location.href = page;
}

document.querySelectorAll(".task-checkbox").forEach(box=>{
box.addEventListener("change",function(){

let text=this.nextElementSibling;

if(this.checked){
text.style.textDecoration="line-through";
text.style.color="#999";
}else{
text.style.textDecoration="none";
text.style.color="#000";
}

});
});