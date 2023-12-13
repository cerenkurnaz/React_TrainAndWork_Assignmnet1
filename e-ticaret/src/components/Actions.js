import React from 'react'

export const addOrder = (order) => {
    return {
      type: "ADD_ORDER",
      payload: order,
    };
  };
  
