
fetch(
  "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    
    const originalData = data;
    
    populateTable(data);
    
    function populateTable(data) {
      const tableBody = document.getElementById("student-table-body");
      tableBody.innerHTML = "";
      data.forEach((student) => {
        const row = document.createElement("tr");
        
        const nameColumn = document.createElement("td");
        const imgWrapper = document.createElement("div");
        const img = document.createElement("img");
        img.src = student.image;
        const fullName = `${student.first_name} ${student.last_name}`;
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(document.createTextNode(fullName));
        nameColumn.appendChild(imgWrapper);
        row.appendChild(nameColumn);
        
        const emailColumn = document.createElement("td");
        emailColumn.innerText = student.email;
        row.appendChild(emailColumn);
       
        const marksColumn = document.createElement("td");
        marksColumn.innerText = student.marks;
        row.appendChild(marksColumn);
       
        const passingColumn = document.createElement("td");
        passingColumn.innerText = student.passing ? "Passing" : "Failed";
        row.appendChild(passingColumn);
       
        const classColumn = document.createElement("td");
        classColumn.innerText = student.class;
        row.appendChild(classColumn);
        
        const genderColumn = document.createElement("td");
        genderColumn.innerText = student.gender;
        row.appendChild(genderColumn);
        tableBody.appendChild(row);
      });
    }


    function handleSearch() {
      const searchText = document.getElementById("search").value.toLowerCase();
      const filteredData = originalData.filter(
        (student) =>
          student.first_name.toLowerCase().includes(searchText) ||
          student.last_name.toLowerCase().includes(searchText) ||
          student.email.toLowerCase().includes(searchText)
      );
      populateTable(filteredData);
    }

   
    function sortByFullNameAsc() {
      const sortedData = originalData.sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );
      populateTable(sortedData);
    }
    function sortByFullNameDesc() {
      const sortedData = originalData.sort((a, b) =>
        b.first_name.localeCompare(a.first_name)
      );
      populateTable(sortedData);
    }
    function sortByMarks() {
      const sortedData = originalData.sort((a, b) => a.marks - b.marks);
      populateTable(sortedData);
    }
    function sortByPassing() {
      const sortedData = originalData.filter((student) => student.passing);
      populateTable(sortedData);
    }
    function sortByClass() {
      const sortedData = originalData.sort((a, b) => a.class - b.class);
      populateTable(sortedData);
    }
    function sortByGender() {
      const maleData = originalData.filter(
        (student) => student.gender === "male"
      );
      const femaleData = originalData.filter(
        (student) => student.gender === "female"
      );
      populateTable(maleData);
      const table = document.getElementById("student-table");
      const femaleTable = table.cloneNode();
      femaleTable.id = "female-student-table";
      populateTable(femaleData);
      table.parentNode.insertBefore(femaleTable, table.nextSibling);
    }

    
    document
      .getElementById("btn-sort-fullname-asc")
      .addEventListener("click", sortByFullNameAsc);
    document
      .getElementById("btn-sort-fullname-desc")
      .addEventListener("click", sortByFullNameDesc);
    document
      .getElementById("btn-sort-marks")
      .addEventListener("click", sortByMarks);
    document
      .getElementById("btn-sort-passing")
      .addEventListener("click", sortByPassing);
    document
      .getElementById("btn-sort-class")
      .addEventListener("click", sortByClass);
    document
      .getElementById("btn-sort-gender")
      .addEventListener("click", sortByGender);
  })
  .catch((error) => console.log(error));
