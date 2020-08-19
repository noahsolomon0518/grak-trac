




longTermGoalsDB = [
    {
        order: 1,
        goal: "Get a job"
    },
    {
        order: 2,
        goal: "Gain weight"
    }
]




class GoalDrawer {

    draw(data, parent) {
        this.goalHTML = ''
        data.forEach(goal => {
            this.goalHTML += `
            <span class = "goal-HTML">${goal.goal}</span>`
        })
        this.goalHTML += `<span class = "add-goal">&#43; Add Goal</span>`
        this.show(parent)
    }

    show(parent) {
        document.getElementById(parent).innerHTML = this.goalHTML
    }

}

class GoalNodeEventHandler {

    update() {
        this.goalNodeEvents()
        this.addGoalEvents()
    }
    goalNodeClick(goalNode) {
        this.last = ''
        goalNode.addEventListener('click', () => {
            this.resetGoalNodes()
            this.last = goalNode.innerText
            goalNode.contentEditable = true
            goalNode.innerHTML = ''
            goalNode.focus()
        })

    }
    goalNodeEnter(goalNode) {
        goalNode.addEventListener('keydown', (evt) => {
            if (evt.keyCode === 13 && goalNode.contentEditable) {
                evt.preventDefault();
                if (goalNode.innerText == '') {
                    goalNode.remove()
                }
                goalNode.contentEditable = false
                GoalDBHandler.update()
            }
        })
        document.addEventListener('mousedown', (evt) => {
            if (goalNode.contentEditable) evt.preventDefault()
        })

    }

    goalNodeEvents() {
        let goalNodes = document.getElementsByClassName('goal-HTML')
        for (let goalNode of goalNodes) {
            this.goalNodeClick(goalNode)
            this.goalNodeEnter(goalNode)
        }

    }




    resetGoalNodes() {
        let goals = document.querySelectorAll('.goal-HTML')
        let editing = false
        for (let goal of goals) {
            if (goal.contentEditable == "true") {
                editing = true
                goal.contentEditable = false
                if (goal.innerText == '') {
                    console.log(this.last)
                    goal.innerText = this.last
                }
            }
        }
    }




    addGoalEvents() {
        let addGoalNode = document.getElementsByClassName('add-goal')[0]
        let longTermGoalDiv = document.getElementById('long-term-goal')

        addGoalNode.addEventListener('click', () => {
            this.resetGoalNodes()
            let newGoalNode = document.createElement('span')
            newGoalNode.setAttribute('class', 'goal-HTML')
            newGoalNode.textContent = 'Click to Edit'
            this.goalNodeClick(newGoalNode)
            this.goalNodeEnter(newGoalNode)

            longTermGoalDiv.insertBefore(newGoalNode, addGoalNode)
            let x = document.getElementById('long-term-goal').lastChild.previousSibling
            x.click()
            console.log(x)
        })
    }

}

class GoalDBHandler {
    static update(){
        GoalDBHandler.updateCache()
        GoalDBHandler.updateDB()
    }  

    static updateCache() {
        let goalNodes = document.querySelectorAll('.goal-HTML')
        this.goalData = []
        for (let i = 0; i < goalNodes.length; i++) {
            this.goalData.push({
                order: i,
                goal: goalNodes[i].innerText
            })
        }
        console.log(this.goalData)
    }


    static updateDB(){
        
    }
}

goalDrawer = new GoalDrawer()
goalEventHandler = new GoalNodeEventHandler()

document.addEventListener("DOMContentLoaded", function (e) {
    goalDrawer.draw(longTermGoalsDB, 'long-term-goal')
    goalEventHandler.update()

})

