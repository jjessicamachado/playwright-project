import { test, expect } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';
import { deleteTaskByHelper, postTask } from './support/helpers';
import { TasksPage } from './pages/tasks/index';
import data from './fixtures/tasks.json';

let tasksPage: TasksPage

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page)
})

test.describe('cadastro', () => {
    test('deve poder cadastrar nova tarefa', async ({ request }) => {
        const task = data.success as TaskModel

        await deleteTaskByHelper(request, task.name)
        await tasksPage.go()
        await tasksPage.createNewTask(task)
        await tasksPage.shouldHaveText(task.name)

    })

    test('nao pode cadastrar duplicado', async ({ request }) => {
        const task = data.duplicated as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)
        await tasksPage.go()
        await tasksPage.createNewTask(task)
        await tasksPage.alertHaveText('Task already exists!')
    })

    test('campo vazio', async () => {
        const task = data.required as TaskModel

        await tasksPage.go()
        await tasksPage.createNewTask(task)

        const requiredField = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        await expect(requiredField).toEqual('This is a required field')
    })
})

test.describe('atualizacao', () => {
    test('concluir tarefa', async ({ request }) => {
        const task = data.done as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.toggle(task.name)
        await tasksPage.shouldBeDone(task.name)

    })
    test('excluir tarefa', async ({ request }) => {
        const task = data.delete as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.remove(task.name)
        await tasksPage.shouldNotExist(task.name)

    })
})
