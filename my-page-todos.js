var sampleDataDB = [
    [{
        date: 'today',
        section: 'morning routine',
        startTime: '6:00AM',
        endTime: '6:05AM',
        task: 'Wake up',
        status: 0
    },
    {
        section: 'morning routine',
        startTime: '6:05AM',
        endTime: '6:20AM',
        task: 'Coffee',
        status: 1
    },
    {
        section: 'morning routine',
        startTime: '6:20AM',
        endTime: '6:50AM',
        task: 'Yoga',
        status: 1
    },
    {
        section: 'dinner',
        startTime: '6:30PM',
        endTime: '6:35PM',
        task: 'Track macros for the day',
        status: 0
    },
    {
        section: 'dinner',
        startTime: '6:35PM',
        endTime: '7:12PM',
        task: 'Cook, Eat',
        status: 2
    },
    {
        section: 'productivity session',
        startTime: '8:15PM',
        endTime: '8:20PM',
        task: 'Pill Organization',
        status: 2
    }],
    [{
        date: 'yesterday',
        section: 'morning routine',
        startTime: '6:00AM',
        endTime: '6:05AM',
        task: 'Wake up',
        status: true
    },
    {
        section: 'morning routine',
        startTime: '6:05AM',
        endTime: '6:20AM',
        task: 'Coffee',
        status: true
    },
    {
        section: 'morning routine',
        startTime: '6:20AM',
        endTime: '6:50AM',
        task: 'Yoga',
        status: true
    },
    {
        section: 'dinner',
        startTime: '6:30PM',
        endTime: '6:35PM',
        task: 'Track macros for the day',
        status: true
    },
    {
        section: 'dinner',
        startTime: '6:35PM',
        endTime: '7:12PM',
        task: 'Cook, Eat',
        status: true
    },
    {
        section: 'productivity session',
        startTime: '8:15PM',
        endTime: '8:20PM',
        task: 'Pill Organization',
        status: true
    }],
    [{
        date: '2 days ago',
        section: 'morning routine',
        startTime: '6:00AM',
        endTime: '6:05AM',
        task: 'Wake up',
        status: true
    },
    {
        section: 'morning routine',
        startTime: '6:05AM',
        endTime: '6:20AM',
        task: 'Coffee',
        status: true
    },
    {
        section: 'morning routine',
        startTime: '6:20AM',
        endTime: '6:50AM',
        task: 'Yoga',
        status: true
    },
    {
        section: 'dinner',
        startTime: '6:30PM',
        endTime: '6:35PM',
        task: 'Track macros for the day',
        status: true
    },
    {
        section: 'dinner',
        startTime: '6:35PM',
        endTime: '7:12PM',
        task: 'Cook, Eat',
        status: true
    },
    {
        section: 'productivity session',
        startTime: '8:15PM',
        endTime: '8:20PM',
        task: 'Pill Organization',
        status: true
    }

    ]


]






class TodoDrawer {

    static update(data) {
        TodoDrawer.drawTodos(data)
        TodoDrawer.addDeleteNodes()
        TodoDrawer.addTodoNodes()
    }




    static drawTodos(data) {
        let colors = ['red', '#fcf75e', '#98FB98']
        let todoDiv = document.getElementById('all-todos')
        data.forEach(dayTodos => {
            let todaysTodosHTML = `
            <table>
                <thead>
                    <tr><th>Section</th><th>Task</th><th>Status</th></tr>
                </thead>
                <tbody>
                    `
            dayTodos.forEach(element => {
                let color = colors[element.status]
                todaysTodosHTML += `<tr><td class = "section">${element.section}</td><td class = "task">${element.task}</td><td class = "status" ><span style = "background-color:${color}; width:20px; height:20px; display:inline-block; border-radius: 5px; border: .25px solid steelblue"></span></td></tr>`
            });

            todaysTodosHTML += `
            </tbody></table>
            <br>
            `
            todoDiv.innerHTML += todaysTodosHTML
        })
    }




    static addDeleteNodes() {
        let todaysTodos = document.querySelectorAll('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')
        for (let row of todaysTodos) {
            let deleteNode = document.createElement('td')
            deleteNode.innerText = 'X'
            deleteNode.setAttribute('class', 'delete')
            deleteNode.style.color = 'red'
            deleteNode.style.position = 'absolute'
            deleteNode.style.marginLeft = '1vw'
            deleteNode.style.fontWeight = '400'
            row.lastElementChild.after(deleteNode)
        }
    }


    static addTodoNodes() {
        let todaysTodosTable = document.querySelectorAll('table')[0]
        let addTodoRow = document.createElement('tr')
        let AddTodoNode = document.createElement('td')
        AddTodoNode.colSpan = '3'
        AddTodoNode.setAttribute('id', 'add-todo')
        AddTodoNode.style.textAlign = 'center'
        AddTodoNode.style.color = 'mediumslateblue'
        AddTodoNode.innerHTML = '&#43;'
        addTodoRow.append(AddTodoNode)
        todaysTodosTable.append(addTodoRow)

    }



}


class TodoFunctionality {

    static update() {
        TodoFunctionality.todoEvents()
        TodoFunctionality.statusEvents()
        TodoFunctionality.deleteEvents()
        TodoFunctionality.addTodoEvents()

    }

    static todoEvents() {
        let todaysTodos = document.querySelector('table').querySelectorAll('td.task, td.section')
        for (let td of todaysTodos) {
            TodoFunctionality.addSectionTaskEvents(td)
        }
    }

    static addSectionTaskEvents(td) {
        td.addEventListener('click', () => {
            td.contentEditable = true
            td.innerText = ''
            td.focus()
        })

        td.addEventListener('mouseup', () => {
            checkTdFocus()

        })
        td.addEventListener('keydown', (evt) => {
            if (evt.keyCode === 13 && td.contentEditable) {
                evt.preventDefault();
                checkTdFocus()

            }
            if (evt.keyCode === 9) {
                evt.preventDefault();
                if (td.nextElementSibling.className == 'task') {
                    checkTdFocus()
                    td.nextElementSibling.click()

                } else {
                    if (td.parentElement.nextElementSibling != null) {
                        checkTdFocus()
                        console.log(td)
                        console.log(td.parentElement.nextElementSibling.firstChild)
                        td.parentElement.nextElementSibling.firstElementChild.click()
                    }else{
                        td.blur()
                        checkTdFocus()
                    }
                }

            }
        })

        function checkTdFocus() {
            let todaysTodos = document.querySelector('table').querySelectorAll('td.task, td.section')
            let tdFocus = false
            for (let td of todaysTodos) {
                if (td.contentEditable == "true") {
                    if (td.innerText == '') {
                        td.innerText = 'Click to edit'
                    }
                    td.contentEditable = false
                }
            }
            return tdFocus
        }
    }

    static statusEvents() {
        let todaysTodosStatus = document.querySelector('table').querySelectorAll('td.status>span')
        let statusColors = ['red', 'rgb(252, 247, 94)', 'rgb(152, 251, 152)']
        for (let todoStatus of todaysTodosStatus) {
            todoStatus.parentElement.addEventListener('mousedown', () => {
                let nextColorIndex = statusColors.indexOf(todoStatus.style.backgroundColor) + 1
                if (nextColorIndex == 3) {
                    todoStatus.style.backgroundColor = 'red'
                } else {
                    todoStatus.style.backgroundColor = statusColors[nextColorIndex]
                }
            })
        }
    }

    static deleteEvents() {
        let todaysTodosDelete = document.querySelector('table').querySelectorAll('td.delete')
        for (let todoDelete of todaysTodosDelete) {
            todoDelete.addEventListener('click', () => {
                todoDelete.parentElement.remove()
            })
        }
    }

    static addTodoEvents() {
        let addTodo = document.getElementById('add-todo')
        let todaysTable = document.querySelector('table').querySelector('tbody')
        addTodo.addEventListener('click', () => {
            let newTodoTr = document.createElement('tr')
            newTodoTr.innerHTML = `
            <td class = "section"></td><td class = "task"></td><td class = "status" ><span style = "background-color:red; width:20px; height:20px; display:inline-block; border-radius: 5px; border: .25px solid steelblue"></span></td>
            `
            TodoFunctionality.addSectionTaskEvents(newTodoTr.firstElementChild)
            TodoFunctionality.addSectionTaskEvents(newTodoTr.firstElementChild.nextElementSibling)
            console.log(newTodoTr.firstElementChild )
            todaysTable.append(newTodoTr)


            newTodoTr.lastElementChild.after(addDeleteNode(newTodoTr))
            newTodoTr.firstElementChild.click()

        })


        function addDeleteNode(newTodoTr) {
            let deleteNode = document.createElement('td')
            deleteNode.innerText = 'X'
            deleteNode.setAttribute('class', 'delete')
            deleteNode.style.color = 'red'
            deleteNode.style.position = 'absolute'
            deleteNode.style.marginLeft = '1vw'
            deleteNode.style.fontWeight = '400'
            
            deleteNode.addEventListener('click', () => {
                newTodoTr.remove()
            })
            return deleteNode
        }



        
    }
}





TodoDrawer.update(sampleDataDB)
TodoFunctionality.update()