import React from 'react'

/**
 * Custom axis tick.
 * @function CustomTick
 */
export const CustomTick = props => {
  let value = ''

  switch (props.textType) {
    case 'amount':
      value = props.payload.value + ' XVC'
      break

    case 'number':
      value = new Intl.NumberFormat(props.language).format(props.payload.value)
      break

    default:
      value = props.payload.value
      break
  }

  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <text
        fill="#666666"
        textAnchor={props.textAnchor || 'end'}
        x={props.textX || 0}
        y={props.textY || 0}
      >
        {value}
      </text>
    </g>
  )
}

/**
 * Custom tooltip.
 * @function CustomTooltip
 */
export const CustomTooltip = props => {
  if (props.active === false) return null

  return (
    <div className="chartTooltip">
      {props.hasOwnProperty('labelText') === true && (
        <p className="label">
          {props.labelText}{' '}
          {props.labelType === 'number' &&
            new Intl.NumberFormat(props.language).format(props.label)}
        </p>
      )}

      {props.payload.map(entry => (
        <div className="flex-sb" key={entry.name}>
          <p style={{ color: entry.color, margin: '0 72px 0 0' }}>
            {entry.name}
          </p>
          <p style={{ color: entry.color, fontWeight: '500' }}>
            {(props.amounts === true &&
              new Intl.NumberFormat(props.language, {
                minimumFractionDigits: 6,
                maximumFractionDigits: 6
              }).format(entry.value) + ' XVC') ||
              (props.amounts !== true && entry.value)}
          </p>
        </div>
      ))}
    </div>
  )
}
