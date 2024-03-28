import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";

interface ProtectedProps {
  comp: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ comp }) => {
  const {  user } = useSelector((state: RootState) => state.AuthSlice);
  const navigate = useNavigate();
 
  useEffect(()=>{
   if(user?.role != "admin"){
    navigate("/login")
   }
   else if(!user){
    navigate("/login")
   }
  },[user?.role])

  if(user?.role != "admin") return null
  return <>{comp}</>
}
export default Protected;
