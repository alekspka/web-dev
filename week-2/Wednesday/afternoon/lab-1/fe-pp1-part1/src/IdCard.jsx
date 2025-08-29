import React from 'react'

const IdCard = (props) => {
  return (

    <div className="idcard">
      <img src={props.picture} alt={`${props.firstName} ${props.lastName}`} />
      <div className="info">
        <p><strong>First name:</strong> {props.firstName}</p>
        <p><strong>Last name:</strong> {props.lastName}</p>
        <p><strong>Gender:</strong> {props.gender}</p>
        <p><strong>Height:</strong> {props.height} cm</p>
        <p><strong>Birth:</strong> {props.birth.toDateString()}</p>
      </div>
    </div>

  )
}

export default IdCard;