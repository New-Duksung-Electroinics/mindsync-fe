import React, { useState } from "react";
const API_BASE_URL = process.env.API_BASE_URL;

// 컴포넌트 내에서 상태 관리 및 비동기 로직 처리
export async function agendaCreation (roomId, description){
 
    const url = `${API_BASE_URL}/agenda_generation/`;
    if (!roomId) {
      console.log("채팅방 ID가 없습니다.");
      return;
    }

    try {
        console.log('try안에')

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId: roomId, description: description }),
      });

      if (!response.ok) {
        throw new Error("안건 생성 실패");
      }

      const data = await response.json();

      if (data.status === "SUCCESS") {
        return data;
      } else {
        
      }
    } catch (err) {
    console.log('error for agenda creation', err)
    }
  };


