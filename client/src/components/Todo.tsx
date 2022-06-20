import React from 'react'
import clsx from 'clsx'

import {
  TodoEntity,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from '../graphql/generated'

export interface TodoProps {
  todo: TodoEntity
  selectedRows: string[] | undefined
  setSelectedRows: React.Dispatch<React.SetStateAction<string[] | undefined>>
}

const Todo = ({ todo, selectedRows, setSelectedRows }: TodoProps) => {
  const { id } = todo
  const { refetch } = useGetTodosQuery()
  const [updateTodoMutation] = useUpdateTodoMutation()
  const [deleteTodoMutation] = useDeleteTodoMutation()

  const handleDeleteTodo = () => {
    deleteTodoMutation({
      variables: {
        id: id!,
      },
    }).then(() => {
      refetch()
      setSelectedRows([])
    })
  }

  const toggleTodoStatus = () => {
    updateTodoMutation({
      variables: {
        data: {
          status: !todo.attributes?.status,
        },
        id: id!,
      },
    }).then(() => {
      refetch()
    })
  }

  const handleRowSelect = (checked: boolean, todoId: string) => {
    if (checked) {
      setSelectedRows((prev) => {
        if (prev) {
          return [...prev, todoId]
        }
        return [todoId]
      })
    } else {
      setSelectedRows((prev) => prev?.filter((item) => item !== todoId))
    }
  }

  return (
    <li className="flex items-center gap-4">
      <input
        type="checkbox"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          handleRowSelect(e.target.checked, todo.id!)
        }
        checked={selectedRows?.includes(todo.id!)}
      />
      <button
        type="button"
        onClick={toggleTodoStatus}
        className="flex justify-between items-center gap-4 py-2 px-4 rounded-lg hover:bg-white w-full border-[1px] border-slate-300"
      >
        <p
          className={clsx(
            'max-w-[400px] overflow-x-auto min-w-[280px] text-left',
            todo.attributes?.status ? 'line-through' : 'no-underline	'
          )}
        >
          {todo.attributes?.title}
        </p>
      </button>
      <button
        type="button"
        onClick={handleDeleteTodo}
        className="hover:scale-125"
      >
        X
      </button>
    </li>
  )
}

export default Todo
