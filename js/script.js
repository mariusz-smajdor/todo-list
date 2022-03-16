{
  const tasks = []

  const render = () => {
    let htmlString = ""

    for (const task of tasks) {
      htmlString += `
          <li class="tasks__item">
            <button class="tasks__button js-toggle">${task.done ? "✖" : "✔"}</button>
            <span class="${task.done ? "tasks__text--done" : ""}">${task.content}</span>
            <button class="tasks__button tasks__button--remove js-remove">🗑️</button>
          </li>
      `
    }

    const tasksElement = document.querySelector(".js-tasks")
    tasksElement.innerHTML = htmlString

    bindEvents()
  }

  const bindEvents = () => {
    const removeElement = document.querySelectorAll(".js-remove")
    const toggleDoneElement = document.querySelectorAll(".js-toggle")

    removeElement.forEach((button, index) => {
      button.addEventListener("click", () => {
        removeTask(index)
      })
    })

    toggleDoneElement.forEach((button, index) => {
      button.addEventListener("click", () => {
        toggleDoneTask(index)
      })
    })
  }

  const toggleDoneTask = (index) => {
    tasks[index].done = !tasks[index].done

    render()
  }

  const removeTask = (index) => {
    tasks.splice(index, 1)

    render()
  }

  const addNewTask = () => {
    const newTaskElement = document.querySelector(".js-new-task")
    const newTaskContent = newTaskElement.value.trim()

    tasks.push({
      content: newTaskContent, done: false
    })

    render()
  }

  const onFormSubmit = event => {
    event.preventDefault()

    addNewTask()
  }

  const init = () => {
    const formElement = document.querySelector(".js-form")

    formElement.addEventListener("submit", onFormSubmit)
  }

  init()
}