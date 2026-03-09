class NotificationHashTable{

constructor(){
this.table={}
}

hash(key){
let hash=0
for(let i=0;i<key.length;i++){
hash=(hash+key.charCodeAt(i))%1000
}
return "notif_"+hash
}

store(id,notification){
let key=this.hash(id)
this.table[key]={id,...notification,timestamp:Date.now()}
}

delete(id){
let key=this.hash(id)

if(this.table[key]){
delete this.table[key]
return true
}

return false
}

getAll(){
return Object.values(this.table)
}

}

const notifHash=new NotificationHashTable()

notifHash.store("notif_1",{title:"Assignment",message:"Math assignment",read:false})
notifHash.store("notif_2",{title:"Quiz",message:"Physics quiz",read:false})
notifHash.store("notif_3",{title:"Timetable",message:"Updated timetable",read:true})


function markRead(btn){

let card=btn.parentElement
card.classList.remove("unread")

btn.remove()

}


function testHashing(){

let start=performance.now()

for(let i=1;i<=1000;i++){

notifHash.store("test_"+i,{
title:"Test "+i,
message:"Demo"
})

}

let end=performance.now()

alert("Stored 1000 notifications in "+(end-start).toFixed(2)+" ms using hashing O(1)")

}


function testBinarySearch(){

let arr=[]

for(let i=1;i<=100;i++){
arr.push({title:"Item "+i,value:i})
}

let target="Item 50"

let left=0
let right=arr.length-1
let result=null

while(left<=right){

let mid=Math.floor((left+right)/2)

if(arr[mid].title===target){
result=arr[mid]
break
}

else if(arr[mid].title<target)
left=mid+1

else
right=mid-1

}

alert("Binary Search Found: "+result.title)

}


function testAddDelete(){

let id="demo_"+Date.now()

notifHash.store(id,{
title:"Demo",
message:"Added"
})

alert("Notification Added!")

setTimeout(function(){

notifHash.delete(id)

alert("Notification Deleted!")

},1000)

}