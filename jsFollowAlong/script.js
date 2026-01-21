// console.log("hello");
// get a single element from its id (this is why id’s must be unique!)
// document.getElementById(“myID”);

	// get an array of all the elements in a given class
// document.getElementsByClassName(“myClass”);

	// get an array of all the elements with a given tag (e.g., all the h2 elements)
// document.getElementsByTagName(“h2”);

let listItems = document.getElementsByTagName("li");
for (let i = 0; i < listItems.length; i++) {
    console.log(listItems.length);
}