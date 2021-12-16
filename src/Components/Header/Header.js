import React from "react";
import "./Header.scss";

function Header({userId, setUserId, userList}) {
  return (
    <header className = "header">
      <div className = "header__icon"></div>
      <div className = "container">
        <div className = "header__wrapper">
          <h1 className = "header__title">Tasks</h1>
          <select className = "header__select" 
                  name = "userName" 
                  value = {userId} 
                  onChange = {(event) => setUserId(event.target.value)}
          >
            {userList.map(item => <option key = {item.id} value = {item.id}>
                                    {item.name}
                                  </option>)}
          </select>
        </div>
      </div>
    </header>
    );
}

export default Header;