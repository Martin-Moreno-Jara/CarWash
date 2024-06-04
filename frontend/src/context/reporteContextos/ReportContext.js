import { createContext, useReducer } from 'react'

export const ReportContext = createContext()

export const reportReducer = (state, action) => {
  switch (action.type) {
    case 'GENERATE':
      return { 
        showGenerate: action.payload 
      }
    case 'VISUALIZE':
      return { 
        showVisualize: action.payload
      }
    default:
      return state
  }
}

export const ReportContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reportReducer, { 
    showGenerate: true
  })
  
  return (
    <ReportContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ReportContext.Provider>
  )
}