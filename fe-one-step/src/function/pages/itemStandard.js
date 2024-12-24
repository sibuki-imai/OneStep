import React from 'react';
function Item() {
  const handle = () => {
    console.log('test', `${process.env.REACT_APP_FE_DOMAIN}/record-input`);
    window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/record-input`;
  };
  return (
    <div>
      <h1>Item</h1>
      <button type="button" onClick={handle}>
        Home遷移
      </button>
    </div>
  );
}

export default Item;
