//import React, { useState, useEffect } from "react"

const SpinnerComp = ({estado, message}) => {
    // const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //   // Simula un proceso de carga de 2 segundos
    //   setTimeout(() => {
    //     setIsLoading(false)
    //   }, 2000)
    // }, [])
  
    return (
      <>
        {estado && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999
            }}
          >
            <div style={{ color: 'white', fontSize: 24 }}>
              <i className="fa fa-spinner fa-spin" style={{ marginRight: 8 }} />
              {message}
            </div>
          </div>
        )}
      </>
    )
  }
  

export default SpinnerComp