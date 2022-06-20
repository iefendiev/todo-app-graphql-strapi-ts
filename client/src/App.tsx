import React, { useState } from 'react'

import Form from './components/Form'
import Todos from './components/Todos'

const App = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>()

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <div className="mt-24 flex flex-col gap-2">
        <p className="text-center">TodoList with GraphQL-Codegen-Strapi</p>
        <div className="flex flex-col gap-4 p-6 rounded-lg border-[1px] border-slate-400">
          <Form selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
          {selectedRows?.length ? `${selectedRows.length} todo seçildi.` : ''}
          <Todos
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        </div>
      </div>
    </div>
  )
}

export default App
