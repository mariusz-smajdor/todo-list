{
  let tasks = []
  let hideDone = false

  const renderTasks = () => {
    const htmlTaskElements = tasks.map(task => {
      return `
          <li class="tasks__item  ${task.done && hideDone ? "task__item--hidden" : ""}">
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
  }

  const renderTaskButtons = () => {
    const buttonsElement = document.querySelector('.js-buttons')

    if (!tasks.length) {
      buttonsElement.innerHTML = ""
      return
    }

    const htmlTaskButtonsElements = `
      <button class="buttons__button js-hide-done">
        ${hideDone ? "Pokaż" : "Ukryj"} ukończone
      </button>
      <button class="buttons__button js-mark-all-done" ${tasks.every(task => task.done) ? "disabled" : ""}>
        Ukończ wszystkie
      </button>
    `

    buttonsElement.innerHTML = htmlTaskButtonsElements
  }


  const render = () => {
    renderTasks()
    renderTaskButtons()

    bindRemoveEvents()
    bindToggleEvents()
    bindButtonEvents()
  }

  const hideDoneTasks = () => {
    hideDone = !hideDone

    render()
  }

  const markAllDone = () => {
    tasks = tasks.map(task => ({ ...task, done: true }))

    render()
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

  const bindButtonEvents = () => {
    const markAllDoneButton = document.querySelector(".js-mark-all-done")
    const hideDoneButton = document.querySelector('.js-hide-done')

    markAllDoneButton.addEventListener("click", markAllDone)
    hideDoneButton.addEventListener("click", hideDoneTasks)
  }

  const bindRemoveEvents = () => {
    const removeElement = document.querySelectorAll(".js-remove")

    removeElement.forEach((button, index) => {
      button.addEventListener("click", () => {
        removeTask(index)
      })
    })
  }

  const bindToggleEvents = () => {
    const toggleDoneElement = document.querySelectorAll(".js-toggle")

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