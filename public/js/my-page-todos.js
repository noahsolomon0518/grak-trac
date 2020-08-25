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


class TodoController {
    static update(data) {
        TodoController.drawDaysTodos(data[0],true)
        TodoController.drawAllTodos(data)
    }


    static drawDaysTodos(data, event) {
        let allTodosDiv = document.getElementById('all-todos')
        let table = document.createElement('table')
        let tbody = document.createElement('tbody')
        data.forEach(dataRowJSON=>{
            let row = ''
            if(event){
                row = TodoDrawer.todoBodyRow(dataRowJSON, true)
                TodoDrawer.todoBodyRowAddEvents(row)
            }else{row = TodoDrawer.todoBodyRow(dataRowJSON, false)}

            tbody.append(row)
        })
        if(event){
            let addTodo = TodoDrawer.addTodoRow()
            TodoEventAdd.addTodoEvents(addTodo)
            tbody.append(addTodo)
        }
        table.append(TodoDrawer.todoHeaderRow(['Section','Task','Status']))
        table.append(tbody)
        allTodosDiv.append(table)

    }

    static drawAllTodos(data){
        data.forEach((day,index)=>{
            if(index!=0){
                TodoController.drawDaysTodos(day, false)
            }
        })
    }
}



class TodoDrawer {
    static todoHeaderRow(headers) {
        let element = document.createElement('thead')
        let html = '<tr>'
        headers.forEach(header=> {
            html += `<th>${header}</th>`
        })
        html += '</tr>'
        element.innerHTML = html
        return element
    }

    static todoBodyRow(dataRow, includeDelete=true) {
        let statusColors = ['red', 'rgb(252, 247, 94)', 'rgb(152, 251, 152)']
        let element = document.createElement('tr')
        let html = `
            <td class = "section">${dataRow.section}</td>
            <td class = "task">${dataRow.task}</td>
            <td class = "status">
                <span style = "background-color:${statusColors[dataRow.status]};"></span></td>`
        if(includeDelete) html+= `<td class = "delete">X</td>`
        element.innerHTML = html

        return element

    }

    static addTodoRow(){
        let addTodoRow = document.createElement('tr')
        let html = '<td class = "add-todo" colspan = 3 >&#43;</td>'
        addTodoRow.innerHTML = html
        return addTodoRow
    }

    static todoBodyRowAddEvents(tr) {
        let sectionTaskTds = tr.querySelectorAll('td.section, td.task')
        let statusTd = tr.querySelector('td.status')
        let deleteTd = tr.querySelector('td.delete')
        for (let td of sectionTaskTds) {
            TodoEventAdd.sectionTaskEvents(td)
        }
        TodoEventAdd.statusEvents(statusTd)
        TodoEventAdd.deleteEvents(deleteTd)
    }


}


class TodoEventAdd {



    static sectionTaskEvents(td) {
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
                        td.parentElement.nextElementSibling.firstElementChild.click()
                    } else {
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

    static statusEvents(td) {
        let statusColors = ['red', 'rgb(252, 247, 94)', 'rgb(152, 251, 152)']
        td.addEventListener('mousedown', () => {
            let nextColorIndex = statusColors.indexOf(td.firstElementChild.style.backgroundColor) + 1
            console.log(nextColorIndex)
            if (nextColorIndex == 3) {
                td.firstElementChild.style.backgroundColor = 'red'
            } else {
                td.firstElementChild.style.backgroundColor = statusColors[nextColorIndex]
            }
        })

    }

    static deleteEvents(td) {
        if(td!=null){
            td.addEventListener('click', () => {
                td.parentElement.remove()
            })
        }

    }

    static addTodoEvents(addTodo) {
        addTodo.addEventListener('click', () => {
            let prevRow = addTodo.previousElementSibling
            console.log(prevRow)
            let newRow = TodoDrawer.todoBodyRow({
                section:'Click to edit',
                task: 'Click to edit',
                status:0
            })
            TodoDrawer.todoBodyRowAddEvents(newRow)
            if(prevRow!=null){
                prevRow.after(newRow)
            }else{
                let table = addTodo.parentElement.parentElement
                console.log(table)
                table.insertBefore(newRow,addTodo.parentElement)
            }

        })
    }
}


TodoController.update(sampleDataDB)