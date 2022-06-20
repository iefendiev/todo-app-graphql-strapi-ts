import React from 'react'

import Todo from './Todo'
import { useGetTodosQuery } from '../graphql/generated'

interface TodosProps {
  selectedRows: string[] | undefined
  setSelectedRows: React.Dispatch<React.SetStateAction<string[] | undefined>>
}

const Todos = ({ selectedRows, setSelectedRows }: TodosProps) => {
  const { data, loading } = useGetTodosQuery()

  return (
    <ul className="flex flex-col gap-3 bg-slate-100 rounded-lg p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col max-h-96 overflow-y-auto gap-3 px-4">
          {data?.todos?.data.map((todo) => (
            <Todo
              todo={todo}
              key={todo.id}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          ))}
        </div>
      )}
    </ul>
  )
}

export default Todos
