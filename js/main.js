var inputName = document.getElementById("productName");
var inputPrice = document.getElementById("productPrice");
var inputType = document.getElementById("productType");
var inputDescription = document.getElementById("productDescription");
var inputImage = document.getElementById("productImage");
var addButton = document.getElementById("addButton");
var updateButton = document.getElementById("updateButton");
var inputSearch = document.getElementById("searchId");
var tableBody = document.getElementById("tableBody");
var nameAlert = document.getElementById("nameAlert");
var priceAlert = document.getElementById("priceAlert");
var typeAlert = document.getElementById("typeAlert");
var descriptionAlert = document.getElementById("descriptionAlert");
var currentEditIndex = -1;
var productList = [];
if(localStorage.getItem("products") != null){
    productList = JSON.parse(localStorage.getItem("products"));
    display();
}

//file reader
function addProduct(){
    if (!validateName() || !validatePrice() || !validateType() || !validateDescription()) {
        return;  // Stop if any validation fails
    }
    var file = inputImage.files[0]; 
    if(file){
        var reader = new FileReader(); // to insert image
        reader.onload = function(e){
            var product = {
                name : inputName.value,
                price : inputPrice.value,
                type : inputType.value,
                description : inputDescription.value,
                image : e.target.result,
            };
            productList.push(product);
            localStorage.setItem("products",JSON.stringify(productList));
            clearForm();
            console.log(productList);
            display();
        }
        reader.readAsDataURL(file);
    }
    else {
        alert("Please select an image!");
    }
}
//no file reader, shows only path
// function addProduct(){
//     var product = {
//                 name : inputName.value,
//                 price : inputPrice.value,
//                 type : inputType.value,
//                 description : inputDescription.value,
//                 image : inputImage.files[0]? URL.createObjectURL(inputImage.files[0]): "",
//             };
//             productList.push(product);
//             localStorage.setItem("products",JSON.stringify(productList));
//             clearForm();
//             console.log(productList);
//             display();
// }

function clearForm(){
    inputName.value = "";
    inputPrice.value ="";
    inputType.value = "";
    inputDescription.value = "";
    inputImage.value = "";
}

function display(){
    var displayBox = "";
    for(i = 0; i < productList.length; i++){
        displayBox +=`<tr>
                    <th scope="col">${i+1}</th>
                    <th scope="col">${productList[i].name}</th>
                    <th scope="col">${productList[i].price}</th>
                    <th scope="col">${productList[i].type}</th>
                    <th scope="col">${productList[i].description}</th>
                    <th scope="col"><img src="${productList[i].image}" alt="Product Image" style="width: 50px; height: 50px;"></th>
                    <th scope="col">
                    <button class="btn btn-info" onclick="editProduct(${i})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                    </th>
                    </tr>`;
    }
    tableBody.innerHTML = displayBox;
}

function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem('products',JSON.stringify(productList));
    display();
}

function editProduct(index){
    currentEditIndex = index;
    inputName.value = productList[index].name;
    inputPrice.value = productList[index].price;
    inputType.value = productList[index].type;
    inputDescription.value = productList[index].description;
    // inputImage.value = productList[index].image;

    updateButton.classList.remove('d-none');
    addButton.classList.add('d-none');
}

function updateProduct(){
    if (currentEditIndex === -1 || !validateName() || !validatePrice() || !validateType() || !validateDescription()) {
        return;  // validation
    }
    var file = inputImage.files[0];
    if(file){
        var reader = new FileReader();
        reader.onload = function(e) {
            productList[currentEditIndex] = {
                name: inputName.value,
                price: inputPrice.value,
                type: inputType.value,
                description: inputDescription.value,
                image: e.target.result
            };
        localStorage.setItem('products', JSON.stringify(productList));
        clearForm();
        display();
        addButton.classList.remove('d-none');
        updateButton.classList.add('d-none');
        currentEditIndex = -1;
            }
            reader.readAsDataURL(file);
        }
        else {
            productList[currentEditIndex] = {
            name: inputName.value,
            price: inputPrice.value,
            type: inputType.value,
            description: inputDescription.value,
            image: productList[currentEditIndex].image
        };
        localStorage.setItem("products", JSON.stringify(productList));
        clearForm();
        display();
        addButton.classList.remove('d-none');
        updateButton.classList.add('d-none');
        currentEditIndex = -1;
        }
}

function searchProduct(){
    var searchTerm = inputSearch.value;
    var displayBox = "";
    for(var i=0 ; i < productList.length ; i++){
        if(
            productList[i].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            productList[i].price.toLowerCase().includes(searchTerm.toLowerCase()) ||
            productList[i].type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            productList[i].description.toLowerCase().includes(searchTerm.toLowerCase())
        ){
            displayBox +=`<tr>
                    <th scope="col">${i+1}</th>
                    <th scope="col">${productList[i].name}</th>
                    <th scope="col">${productList[i].price}</th>
                    <th scope="col">${productList[i].type}</th>
                    <th scope="col">${productList[i].description}</th>
                    <th scope="col"><img src="${productList[i].image}" alt="Product Image" style="width: 50px; height: 50px;"></th>
                    <th scope="col">
                    <button class="btn btn-info" onclick="editProduct(${i})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                    </th>
                    </tr>`;
        }
    }
    tableBody.innerHTML = displayBox;
}

function validateName() {
    var regex = /^[A-Z][a-z]{3,8}$/;  // Starts with capital, 4-9 letters total
    var text = inputName.value;
    if (regex.test(text)) {
        nameAlert.classList.add('d-none');
        inputName.classList.add('is-valid');
        inputName.classList.remove('is-invalid');
        return true;
    } else {
        nameAlert.classList.remove('d-none');
        inputName.classList.add('is-invalid');
        inputName.classList.remove('is-valid');
        return false;
    }
}

function validatePrice() {
    var regex = /^\d+(\.\d{1,2})?$/;  // Numbers with optional decimal (up to 2 places)
    var text = inputPrice.value;
    if (regex.test(text)) {
        priceAlert.classList.add('d-none');
        inputPrice.classList.add('is-valid');
        inputPrice.classList.remove('is-invalid');
        return true;
    } else {
        priceAlert.classList.remove('d-none');
        inputPrice.classList.add('is-invalid');
        inputPrice.classList.remove('is-valid');
        return false;
    }
}

function validateType() {
    var regex = /^[A-Z][a-z]{3,8}$/; // Starts with capital, 4-9 letters
    var text = inputType.value;
    if (regex.test(text)) {
        typeAlert.classList.add('d-none');
        inputType.classList.add('is-valid');
        inputType.classList.remove('is-invalid');
        return true;
    } else {
        typeAlert.classList.remove('d-none');
        inputType.classList.add('is-invalid');
        inputType.classList.remove('is-valid');
        return false;
    }
}

function validateDescription() {
    var regex = /^[a-zA-Z0-9\s\.,!?'"-]+$/;  // Letters, numbers, spaces, punctuation
    var text = inputDescription.value;
    if (regex.test(text)) {
        descriptionAlert.classList.add('d-none');
        inputDescription.classList.add('is-valid');
        inputDescription.classList.remove('is-invalid');
        return true;
    } else {
        descriptionAlert.classList.remove('d-none');
        inputDescription.classList.add('is-invalid');
        inputDescription.classList.remove('is-valid');
        return false;
    }
}

// function validateInputs(){
//     var isValid = true;
//     var nameRegex = /^[a-zA-Z\s\-']+$/;
//     var priceRegex = /^\d+(\.\d{1,2})?$/;
//     var typeRegex = /^[a-zA-Z\s\-']+$/;
//     var descRegex = /^[a-zA-Z0-9\s\.,!?'"-]+$/;
    
//     if(nameRegex.test(inputName)){
//         nameError.classList.add('d-none');
//         inputName.classList.add('is-valid');
//         inputName.classList.remove('is-invalid');
//         return true
//     }
//     else{
//         nameError.classList.remove('d-none');
//         inputName.classList.add('is-invalid');
//         inputName.classList.remove('is-valid');
//         return false
//     }
// }

// function validateInputs() {
//     var isValid = true;
//     var nameRegex = /^[a-zA-Z\s\-']+$/;
//     var priceRegex = /^\d+(\.\d{1,2})?$/;
//     var typeRegex = /^[a-zA-Z\s\-']+$/;
//     var descRegex = /^[a-zA-Z0-9\s\.,!?'"-]+$/;

//     clearAllErrors();
//     // Validate name
//     if (!inputName.value.trim()) {
//         setError('nameError', 'Product Name is required.');
//         isValid = false;
//     } else if (!nameRegex.test(inputName.value.trim())) {
//         setError('nameError', 'Product Name must contain only letters, spaces, hyphens, or apostrophes.');
//         isValid = false;
//     }
//     // Validate price
//     if (!inputPrice.value.trim()) {
//         setError('priceError', 'Product Price is required.');
//         isValid = false;
//     } else if (!priceRegex.test(inputPrice.value.trim())) {
//         setError('priceError', 'Product Price must be a valid number (e.g., 99.99).');
//         isValid = false;
//     }
//     // Validate type
//     if (!inputType.value.trim()) {
//         setError('typeError', 'Product Type is required.');
//         isValid = false;
//     } else if (!typeRegex.test(inputType.value.trim())) {
//         setError('typeError', 'Product Type must contain only letters, spaces, hyphens, or apostrophes.');
//         isValid = false;
//     }
//     // Validate description
//     if (!inputDescription.value.trim()) {
//         setError('descError', 'Product Description is required.');
//         isValid = false;
//     } else if (!descRegex.test(inputDescription.value.trim())) {
//         setError('descError', 'Product Description must contain only letters, numbers, spaces, and basic punctuation.');
//         isValid = false;
//     }
//     return isValid;
// }

// Helper function to set error messages
// function setError(errorId, message) {
//     var errorDiv = document.getElementById(errorId);
//     errorDiv.textContent = message;
//     errorDiv.style.display = 'block';
// }

// // Helper function to clear a specific error
// function clearError(errorId) {
//     var errorDiv = document.getElementById(errorId);
//     errorDiv.textContent = '';
//     errorDiv.style.display = 'none';
// }

// // Helper function to clear all errors
// function clearAllErrors() {
//     clearError('nameError');
//     clearError('priceError');
//     clearError('typeError');
//     clearError('descError');
//     clearError('imageError');
// }

