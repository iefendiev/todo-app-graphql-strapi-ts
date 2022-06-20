import React, { useState } from 'react'
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
} from '../graphql/generated'

interface FormProps {
  selectedRows: string[] | undefined
  setSelectedRows: (arg: string[] | [] | undefined) => void
}

const Form = ({ selectedRows, setSelectedRows }: FormProps) => {
  const [value, setValue] = useState('')
  const { refetch } = useGetTodosQuery()
  const [createTodoMutation] = useCreateTodoMutation()
  const [deleteTodoMutation] = useDeleteTodoMutation()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (value) {
      createTodoMutation({
        variables: {
          data: {
            title: value,
          },
        },
      }).then(() => {
        setValue('')
        refetch()
      })
    }
  }

  // Bulk delete action is not working with strapi
  const handleMultipleDelete = () => {
    selectedRows?.forEach((id: string) =>
      deleteTodoMutation({
        variables: {
          id: id!,
        },
      }).then(() => {
        refetch()
      })
    )

    setSelectedRows([])
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        className="bg-slate-100 rounded-lg p-2 border focus:outline-slate-500 hover:border-slate-500 w-full"
        placeholder="Todo Ekle"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="bg-slate-100 rounded-lg p-2 hover:bg-slate-200"
      >
        Ekle
      </button>
      {selectedRows?.length ? (
        <button
          type="button"
          className="bg-red-500 rounded-lg p-2 hover:bg-red-700 text-white min-w-[60px]"
          onClick={handleMultipleDelete}
        >
          Sil
        </button>
      ) : null}
    </form>
  )
}

export default Form
