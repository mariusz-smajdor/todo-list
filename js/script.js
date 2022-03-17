{
  let tasks = []

  const render = () => {
    const htmlTaskElements = tasks.map(task => {
      return `
          <li class="tasks__item">
            <button class="tasks__button js-toggle">
              ${task.done ? "✖" : "✔"}
            </button>
            <span class="${task.done ? "tasks__text--done" : ""}">
              ${task.content}
            </span>
            <button class="tasks__button tasks__button--remove js-remove">
              🗑️
            </button>
          </li>
      `
    }).join("")

    const tasksElement = document.querySelector(".js-tasks")
    tasksElement.innerHTML = htmlTaskElements

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

  const bindAddTaskEvent = () => {
    const newTaskElement = document.querySelector(".js-new-task")
    const newTaskContent = newTaskElement.value.trim()

    const afterFormSubmission = () => {
      newTaskElement.value = ""
      newTaskElement.focus()
    }

    if (newTaskContent === "") {
      afterFormSubmission()
      return
    }

    addNewTask(newTaskContent)
    afterFormSubmission()
  }

  const toggleDoneTask = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      { ...tasks[index], done: !tasks[index].done },
      ...tasks.slice(index + 1)
    ]

    render()
  }

  const removeTask = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1)
    ]

    render()
  }

  const addNewTask = (taskContent) => {
    tasks = [
      ...tasks,
      { content: taskContent, done: false }
    ]

    render()
  }

  const onFormSubmit = event => {
    event.preventDefault()

    bindAddTaskEvent()
  }

  const init = () => {
    const formElement = document.querySelector(".js-form")

    formElement.addEventListener("submit", onFormSubmit)


  }

  init()
}