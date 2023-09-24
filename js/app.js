//Константа для проверки email
const MATCH_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let SORT_TYPE = 'name'
// Получение доступа к элементам
const tableWrap = document.getElementById('table'),
    //Элементы формы добавления пользователя
    addForm = document.getElementById('add-form'),
    nameInp = document.getElementById('add-form__name'),
    surnameInp = document.getElementById('add-form__surname'),
    ageInp = document.getElementById('add-form__age'),
    emailInp = document.getElementById('add-form__email'),
    addBtn = document.querySelector('add-form__btn'),
    //Элементы формы фильтрации данных
    filterForm = document.getElementById('filter-form'),
    //Элементы сортировки данных
    sortAgeBtn = document.getElementById('sort__user-age'),
    sortNameBtn = document.getElementById('sort__user-name')

// Создание таблицы 
const table = document.createElement('table'),
    tableHead = document.createElement('thead'),
    tableBody = document.createElement('tbody'),
    tableHeadTr = document.createElement('tr'),
    tableHeadThName = document.createElement('th'),
    tableHeadThSurname = document.createElement('th'),
    tableHeadThAge = document.createElement('th'),
    tableHeadThEmail = document.createElement('th');

tableHeadTr.append(tableHeadThName),
    tableHeadTr.append(tableHeadThSurname),
    tableHeadTr.append(tableHeadThAge),
    tableHeadTr.append(tableHeadThEmail),

    tableHeadThName.textContent = "Имя"
tableHeadThSurname.textContent = "Фамилия"
tableHeadThAge.textContent = "Возраст"
tableHeadThEmail.textContent = "Почта"

tableHead.append(tableHeadTr)
table.append(tableHead)
table.append(tableBody)
tableWrap.append(table)

/**
 * Создание пользователя
 * @param {Данные пользователя} oneUser 
 * @returns 
 */
function createUser(oneUser) {
    const userTr = document.createElement('tr'),
        userName = document.createElement('th'),
        userSurname = document.createElement('th'),
        userAge = document.createElement('th'),
        userEmail = document.createElement('th');

    userName.textContent = oneUser.name
    userSurname.textContent = oneUser.surname
    userAge.textContent = oneUser.age
    userEmail.textContent = oneUser.email

    userTr.append(userName)
    userTr.append(userSurname)
    userTr.append(userAge)
    userTr.append(userEmail)

    return userTr
}


// "База данных"
let users = [
    {
        name: "Иван",
        surname: "Иванов",
        age: 30,
        email: "ivan@example.com"
    },
    {
        name: "Петр",
        surname: "Петров",
        age: 25,
        email: "petr@example.com"
    },
    {
        name: "Анна",
        surname: "Сидорова",
        age: 35,
        email: "anna@example.com"
    },
];

/**
 * 
 * @param {Массив данных о пользователях} arrData 
 */

function render(arrData) {
    tableBody.innerHTML = '';
    let copyListData = [...arrData]

    //Сортировка
    copyListData = copyListData.sort((a, b) => {
        if (a[SORT_TYPE] < b[SORT_TYPE]) return -1
    })

    //Фильтрация
    const minAgeInp = parseInt(document.getElementById('minAge').value);
    const maxAgeInp = parseInt(document.getElementById('maxAge').value);
    if (minAgeInp && maxAgeInp) {
        copyListData = copyListData.filter((user) => {
            if (user.age >= minAgeInp && user.age <= maxAgeInp) {
                return true
            }
            return false
        })

    }

    //Отрисовка
    for (const oneUser of copyListData) {
        const newUser = createUser(oneUser)
        tableBody.append(newUser)
    }


}

//Первая отрисовка при загрузке
render(users)

//Добавление
addForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!validateData()) {
        return
    }

    users.push({
        name: nameInp.value.trim(),
        surname: surnameInp.value.trim(),
        age: parseInt(ageInp.value.trim()),
        email: emailInp.value.trim(),
    })
    render(users)
})

//Сортировка данных
sortAgeBtn.addEventListener('click', (e) => {
    SORT_TYPE = 'age'
    render(users)
})

sortNameBtn.addEventListener('click', (e) => {
    SORT_TYPE = 'name'
    render(users)
})

//Фильтрация
filterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    render(users)
})



/**
 * Валидация данных 
 * @returns 
 */
function validateData() {
    if (nameInp.value.trim() == '' || nameInp.value[0] !== nameInp.value[0].toLocaleUpperCase()) {
        alert(`${nameInp.value} - неподходящие значание`)
        return false

    }

    if (surnameInp.value.trim() == '' || surnameInp.value[0] !== surnameInp.value[0].toLocaleUpperCase()) {
        alert(`${surnameInp.value} - неподходящие значание`)
        return false

    }

    if (!ageInp.value || Number.isInteger(ageInp.value)) {
        alert(`${ageInp.value} - неподходящие значание`)
        return false

    }

    if (!emailInp.value.match(MATCH_EMAIL)) {
        alert(`${emailInp.value} - неподходящие значание`)
        return false

    }

    return true
}