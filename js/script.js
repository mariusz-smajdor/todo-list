{
  const DUMMY_TASKS = [
    {
      content: "test task 1",
      done: false
    },
    {
      content: "test task 2",
      done: true
    }
  ]

  const render = () => {
    let htmlString = ""

    for (const task of DUMMY_TASKS) {
      htmlString += `
          <li class="tasks__item">
            <button class="tasks__button">${task.done ? "✖" : "✔"}</button>
            <span class="${task.done ? "tasks__text--done" : ""}">${task.content}</span>
            <button class="tasks__button tasks__button--remove">🗑️</button>
          </li>
      `
    }

    const tasksElement = document.querySelector(".js-tasks")
    tasksElement.innerHTML = htmlString
  }

  const addNewTask = () => {
    const newTaskElement = document.querySelector(".js-new-task")
    const newTaskContent = newTaskElement.value.trim()

    DUMMY_TASKS.push({
      content: newTaskContent, done: false
    })

    render()
  }

  const onFormSubmit = event => {
    event.preventDefault()

    addNewTask()
  }

  const init = () => {
    render()

    const formElement = document.querySelector(".js-form")

    formElement.addEventListener("submit", onFormSubmit)
  }

  init()
}