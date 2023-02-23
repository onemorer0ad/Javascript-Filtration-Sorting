const students = [
  {
    id: 1,
    name: "Олег",
    surname: "Чижевский",
    middleName: "Кириллович",
    objDate: new Date("05.29.1995"),
    startEducation: 2018,
    faculty: "Программирование",
  },
  {
    id: 2,
    name: "Алина",
    surname: "Власова",
    middleName: "Андреевна",
    objDate: new Date("12.11.2003"),
    startEducation: 2022,
    faculty: "Нетфегазовое дело",
  },
  {
    id: 3,
    name: "Алёна",
    surname: "Петрова",
    middleName: "Георгиевна",
    objDate: new Date("03.03.2005"),
    startEducation: 2019,
    faculty: "Приборостроение",
  },
  {
    id: 4,
    name: "Кирилл",
    surname: "Задорнов",
    middleName: "Батькович",
    objDate: new Date("11.03.2001"),
    startEducation: 2021,
    faculty: "Приборостроение",
  },
  {
    id: 5,
    name: "Юлия",
    surname: "Киреева",
    middleName: "Андреевна",
    objDate: new Date("02.08.1998"),
    startEducation: 2016,
    faculty: "Кибер-безопасность",
  },
];

let studentList = document.getElementById("student-list");

function getStudentItem(student) {
  let curDate = new Date();
  let newRow = document.createElement("tr");
  newRow.innerHTML =
    "<td>" +
    student.surname +
    " " +
    student.name +
    " " +
    student.middleName +
    "</td><td>" +
    student.faculty +
    "</td><td>" +
    student.objDate.toLocaleDateString() +
    "</td><td>" +
    (student.startEducation + 4 < curDate.getFullYear()
      ? "Закончил"
      : student.startEducation +
        "-" +
        parseInt(student.startEducation + 4) +
        " (" +
        (curDate.getFullYear() - student.startEducation) +
        " курс)") +
    "</td>";
  return newRow;
}

function renderStudentList(students) {
  studentList.innerHTML = "";
  for (let student of students) {
    studentList.appendChild(getStudentItem(student));
  }
}
console.log(students);
renderStudentList(students);
let form = document.getElementById("student-form");
let studentData = [...students];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let name = document.querySelector('[data-sort="name"]').value;
  let surname = document.querySelector('[data-sort="surname"]').value;
  let middleName = document.querySelector('[data-sort="middleName"]').value;
  let objDate = document.querySelector('[data-sort="objDate"]');
  let startEducation = document.querySelector('[data-sort="startEducation"]');
  let faculty = document.querySelector('[data-sort="faculty"]').value;

  form.querySelectorAll("input").forEach((element) => {
    element.classList.remove("is-invalid");
    if (!element.value.trim().length) {
      element.classList.add("is-invalid");
      return false;
    }
  });

  const curDate = new Date();
  const checkBirthDate = new Date("01.01.1900");
  if (objDate.valueAsDate > curDate || objDate.valueAsDate < checkBirthDate) {
    objDate.classList.add("is-invalid");
  }

  if (
    startEducation.value < 2000 ||
    startEducation.value > curDate.getFullYear()
  ) {
    startEducation.classList.add("is-invalid");
  }

  if (form.querySelectorAll(".is-invalid").length) {
    return false;
  }

  let newStudent = {
    id: students.length + 1,
    name: name,
    surname: surname,
    middleName: middleName,
    objDate: objDate.valueAsDate,
    startEducation: parseInt(startEducation.value),
    faculty: faculty,
  };

  students.push(newStudent);
  studentData.push(newStudent);
  console.log(studentData);
  studentData.forEach((student) => {
    student.fio = `${student.surname} ${student.name}  ${student.middleName}`;
    console.log(student.fio);
  });
  renderStudentList(studentData);

  form.reset();
});

function sortStudents(property) {
  studentData.sort((a, b) => {
    if (a[property] > b[property]) {
      return 1;
    } else if (a[property] < b[property]) {
      return -1;
    } else {
      return 0;
    }
  });
}
studentData.forEach((student) => {
  student.fio = `${student.surname} ${student.name}  ${student.middleName}`;
});

const sort = document.querySelectorAll(".sort");
sort.forEach((el) => {
  el.addEventListener("click", function (evt) {
    sortStudents(el.dataset.sort);
    console.log(studentData);
    renderStudentList(studentData);
  });
});

let filteredStudents = [];
const filter = document.querySelectorAll(".filter_input");

filter.forEach((item) => {
  item.addEventListener("input", function (e) {
    filteredStudents = [...studentData];
    filter.forEach((item) => {
      if (item.value.length) {
        const self = item;
        switch (item.getAttribute("data-filter")) {
          case "fio":
            filteredStudents = filteredStudents.filter((item) => {
              if (
                `${item.surname} ${item.name} ${item.middleName}`
                  .toLowerCase()
                  .includes(self.value.toLowerCase())
              ) {
                return item;
              }
            });
            break;
          case "faculty":
            filteredStudents = filteredStudents.filter((item) => {
              if (
                `${item.faculty}`
                  .toLowerCase()
                  .includes(self.value.toLowerCase())
              ) {
                return item;
              }
            });
            break;
          case "admission":
            filteredStudents = filteredStudents.filter((item) => {
              if (`${parseInt(item.startEducation)}` === self.value) {
                return item;
              }
            });
            break;
          case "graduation":
            filteredStudents = filteredStudents.filter((item) => {
              if (`${parseInt(item.startEducation) + 4}` === self.value) {
                return item;
              }
            });
            break;
        }
      }
    });
    renderStudentList(filteredStudents);
  });
});
