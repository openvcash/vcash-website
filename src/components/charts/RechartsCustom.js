import React from 'react'

/**
 * Custom tooltip.
 * @function CustomTooltip
 */
export const CustomTooltip = props => {
  if (props.active === false) return null

  return (
    <div className='chartTooltip'>
      {props.payload.map(entry =>
        <div className='flex-sb' key={entry.name}>
          <p style={{ margin: '0 72px 0 0' }}>
            {entry.name}
          </p>
          <p style={{ fontWeight: 'bold' }}>
            {entry.value}
          </p>
        </div>
      )}
    </div>
  )
}
