var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");

var bookmarks = []

if(localStorage.getItem("bookmarks") != null){
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmark();
}

function addBookmark(){
  var bookmark = {
      name: siteNameInput.value,
      URL: siteURLInput.value,
  }
  
  if (isValidURL(siteURLInput.value)) {
    bookmarks.push(bookmark);
  } else {
    alert("Invalid URL");
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

  displayBookmark();
  clearBookmark();
}

function isValidURL(url){
  var urlPattern = /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\.[a-zA-Z]{2,})?(\.[a-zA-Z]{2,})?\/?([^\s]*)?$/;
  return urlPattern.test(url);
}

function displayBookmark(){
  var cartoona = ""
  for(i = 0 ; i < bookmarks.length ; i++){
      cartoona += `
      <tr>
      <td>${i}</td>
      <td>${bookmarks[i].name}</td>
      <td>
          <button onclick="visitBookmark('${bookmarks[i].URL}')" class="btn btn-warning text-white"><i class="fa-solid fa-eye pe-2"></i> Visit</button>
      </td>
      <td>
          <button onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button>
      </td>
      </tr>`
  }
  document.getElementById("tBody").innerHTML = cartoona;
}

function clearBookmark(){
  siteNameInput.value = ""
  siteURLInput.value = ""
}

function visitBookmark(url){
  if (!url.includes('://')) {
    url = 'https://' + url;
  }
  window.open(url, "_blank");
}

function deleteBookmark(index){
  const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success mx-2",
          cancelButton: "btn btn-danger mx-2"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            bookmarks.splice(index, 1);
            displayBookmark();
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your product is safe :)",
            icon: "error"
          });
        }
      });
}

