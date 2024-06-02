import { createContext, useReducer } from 'react'

export const ReportContext = createContext()

export const reportReducer = (state, action) => {
  switch (action.type) {
    case 'GENERATE':
      return { 
        report: action.payload 
      }
    case 'VISUALIZE':
      return { 
        report: action.payload
      }
    default:
      return state
  }
}

export const ReportContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reportReducer, { 
    report: null
  })
  
  return (
    <ReportContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ReportContext.Provider>
  )
}